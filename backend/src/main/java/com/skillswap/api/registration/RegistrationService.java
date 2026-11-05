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

    public List<Registration> obtenerPorUsuario(
        String nombreUsuario
) {

    return registrationRepository
            .findByNombreUsuarioIgnoreCase(
                    nombreUsuario.trim()
            );
}

    @Transactional
    public Registration crearRegistro(
            Registration registration
    ) {

        Session session = sessionRepository
                .findById(registration.getSessionId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "La actividad no existe"
                        )
                );

        String nombreUsuario =
                registration.getNombreUsuario().trim();

        boolean yaRegistrado =
                registrationRepository
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

        if (session.getCupo() <= 0) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "La actividad ya no tiene cupo disponible"
            );
        }

        registration.setNombreUsuario(
                nombreUsuario
        );

        registration.setFechaRegistro(
                LocalDateTime.now()
        );

        Registration nuevoRegistro =
                registrationRepository.save(
                        registration
                );

        session.setCupo(
                session.getCupo() - 1
        );

        sessionRepository.save(session);

        return nuevoRegistro;
    }

    public List<Registration> obtenerPorSesion(
            Long sessionId
    ) {
        return registrationRepository
                .findBySessionId(sessionId);
    }
}