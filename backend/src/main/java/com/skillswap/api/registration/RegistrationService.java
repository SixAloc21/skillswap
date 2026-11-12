
package com.skillswap.api.registration;

import com.skillswap.api.session.Session;
import com.skillswap.api.session.SessionRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final SessionRepository sessionRepository;

    public RegistrationService(
            RegistrationRepository registrationRepository,
            SessionRepository sessionRepository
    ) {
        this.registrationRepository = registrationRepository;
        this.sessionRepository = sessionRepository;
    }

    // =========================================
    // CONSULTAR REGISTROS POR USUARIO
    // =========================================

    public List<Registration> obtenerPorUsuario(
            String nombreUsuario
    ) {
        return registrationRepository
                .findByNombreUsuarioIgnoreCase(
                        nombreUsuario.trim()
                );
    }

    // =========================================
    // CREAR REGISTRO CON CONTROL DE CONCURRENCIA
    // =========================================

    @Transactional
    public Registration crearRegistro(
            Registration registration
    ) {

        // Obtener la sesion con bloqueo de escritura
        // Evita que dos transacciones modifiquen
        // el cupo de la misma actividad simultaneamente.
        Session session = sessionRepository
                .buscarSesionConBloqueo(
                        registration.getSessionId()
                )
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "La actividad no existe"
                        )
                );

        // Normalizar nombre
        String nombreUsuario =
                registration.getNombreUsuario().trim();

        // Verificar duplicados
        boolean yaRegistrado = registrationRepository
                .existsBySessionIdAndNombreUsuarioIgnoreCase(
                        registration.getSessionId(),
                        nombreUsuario
                );

        if (yaRegistrado) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "El usuario ya está registrado en esta actividad"
            );
        }

        // Verificar cupo
        if (session.getCupo() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "La actividad ya no tiene cupo disponible"
            );
        }

        // Preparar inscripcion
        registration.setNombreUsuario(nombreUsuario);

        registration.setFechaRegistro(
                LocalDateTime.now()
        );

        // Guardar inscripcion
        Registration nuevoRegistro =
                registrationRepository.save(registration);

        // Descontar un lugar
        session.setCupo(
                session.getCupo() - 1
        );

        // Actualizar cupo
        sessionRepository.save(session);

        return nuevoRegistro;
    }

    // =========================================
    // CONSULTAR REGISTROS POR SESION
    // =========================================

    public List<Registration> obtenerPorSesion(
            Long sessionId
    ) {
        return registrationRepository
                .findBySessionId(sessionId);
    }
}
