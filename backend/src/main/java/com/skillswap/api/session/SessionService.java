
package com.skillswap.api.session;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;

    public SessionService(
            SessionRepository sessionRepository
    ) {
        this.sessionRepository = sessionRepository;
    }

    // CREAR SESION CON VALIDACIONES
    public Session crearSesion(Session session) {

        // Validar que la sesion no sea nula
        if (session == null) {
            throw new IllegalArgumentException(
                "La sesión no puede ser nula"
            );
        }

        // Validar que el cupo sea mayor que cero
        if (session.getCupo() <= 0) {
            throw new IllegalArgumentException(
                "El cupo debe ser mayor que cero"
            );
        }

        // Establecer cupo total
        session.setCupoTotal(
            session.getCupo()
        );

        // Guardar en PostgreSQL
        return sessionRepository.save(session);
    }

    // OBTENER TODAS LAS SESIONES
    public List<Session> obtenerSesiones() {
        return sessionRepository.findAll();
    }

    // OBTENER SESION POR ID
    public Optional<Session> obtenerSesionPorId(Long id) {
        return sessionRepository.findById(id);
    }

    // ELIMINAR SESION
    public void eliminarSesion(Long id) {
        sessionRepository.deleteById(id);
    }
}
