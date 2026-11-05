package com.skillswap.api.registration;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository
        extends JpaRepository<Registration, Long> {

    List<Registration> findBySessionId(
            Long sessionId
    );

    List<Registration> findByNombreUsuarioIgnoreCase(
            String nombreUsuario
    );

    boolean existsBySessionIdAndNombreUsuarioIgnoreCase(
            Long sessionId,
            String nombreUsuario
    );
}