package com.skillswap.api.support;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SupportService {

    private final SupportConversationRepository
            conversationRepository;

    private final SupportMessageRepository
            messageRepository;

    public SupportService(
            SupportConversationRepository conversationRepository,
            SupportMessageRepository messageRepository
    ) {
        this.conversationRepository =
                conversationRepository;

        this.messageRepository =
                messageRepository;
    }

    @Transactional
    public SupportConversation crearConversacion(
            String nombreUsuario
    ) {

        if (
                nombreUsuario == null
                || nombreUsuario.trim().isEmpty()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El nombre del usuario es obligatorio"
            );
        }

        LocalDateTime ahora =
                LocalDateTime.now();

        SupportConversation conversacion =
                new SupportConversation();

        conversacion.setNombreUsuario(
                nombreUsuario.trim()
        );

        conversacion.setEstado(
                "ABIERTA"
        );

        conversacion.setFechaCreacion(
                ahora
        );

        conversacion.setUltimaActualizacion(
                ahora
        );

        return conversationRepository.save(
                conversacion
        );
    }

    public List<SupportConversation>
    obtenerConversaciones() {

        return conversationRepository
                .findAllByOrderByUltimaActualizacionDesc();
    }

    public List<SupportConversation>
    obtenerConversacionesUsuario(
            String nombreUsuario
    ) {

        return conversationRepository
                .findByNombreUsuarioIgnoreCaseOrderByUltimaActualizacionDesc(
                        nombreUsuario.trim()
                );
    }

    public SupportConversation
    obtenerConversacionPorId(
            Long conversationId
    ) {

        return conversationRepository
                .findById(conversationId)
                .orElseThrow(
                        () -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Conversación no encontrada"
                        )
                );
    }

    @Transactional
    public SupportMessage enviarMensaje(
            Long conversationId,
            String emisor,
            String mensaje
    ) {

        SupportConversation conversacion =
                obtenerConversacionPorId(
                        conversationId
                );

        if (
                "CERRADA".equalsIgnoreCase(
                        conversacion.getEstado()
                )
        ) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "La conversación está cerrada"
            );
        }

        if (
                mensaje == null
                || mensaje.trim().isEmpty()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El mensaje no puede estar vacío"
            );
        }

        String emisorNormalizado =
                emisor == null
                ? ""
                : emisor.trim().toUpperCase();

        if (
                !emisorNormalizado.equals("USUARIO")
                && !emisorNormalizado.equals("ADMIN")
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El emisor debe ser USUARIO o ADMIN"
            );
        }

        SupportMessage nuevoMensaje =
                new SupportMessage();

        nuevoMensaje.setConversationId(
                conversationId
        );

        nuevoMensaje.setEmisor(
                emisorNormalizado
        );

        nuevoMensaje.setMensaje(
                mensaje.trim()
        );

        nuevoMensaje.setFechaEnvio(
                LocalDateTime.now()
        );

        SupportMessage mensajeGuardado =
                messageRepository.save(
                        nuevoMensaje
                );

        conversacion.setUltimaActualizacion(
                LocalDateTime.now()
        );

        conversationRepository.save(
                conversacion
        );

        return mensajeGuardado;
    }

    public List<SupportMessage>
    obtenerMensajes(
            Long conversationId
    ) {

        obtenerConversacionPorId(
                conversationId
        );

        return messageRepository
                .findByConversationIdOrderByFechaEnvioAsc(
                        conversationId
                );
    }

    @Transactional
    public SupportConversation cerrarConversacion(
            Long conversationId
    ) {

        SupportConversation conversacion =
                obtenerConversacionPorId(
                        conversationId
                );

        conversacion.setEstado(
                "CERRADA"
        );

        conversacion.setUltimaActualizacion(
                LocalDateTime.now()
        );

        return conversationRepository.save(
                conversacion
        );
    }
}