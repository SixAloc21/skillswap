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

    public Session crearSesion(
            Session session
    ) {

        session.setCupoTotal(
                session.getCupo()
        );

        return sessionRepository.save(
                session
        );
    }

    public List<Session> obtenerSesiones() {

        return sessionRepository.findAll();
    }

    public Optional<Session> obtenerSesionPorId(
            Long id
    ) {

        return sessionRepository.findById(
                id
        );
    }

    public void eliminarSesion(
            Long id
    ) {

        sessionRepository.deleteById(
                id
        );
    }
}