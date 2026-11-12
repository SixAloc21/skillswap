
package com.skillswap.api.registration;

import com.skillswap.api.session.Session;
import com.skillswap.api.session.SessionRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RegistrationServiceWhiteBoxTest {

    private RegistrationRepository registrationRepository;
    private SessionRepository sessionRepository;
    private RegistrationService service;

    @BeforeEach
    void setUp() {
        registrationRepository =
                mock(RegistrationRepository.class);

        sessionRepository =
                mock(SessionRepository.class);

        service = new RegistrationService(
                registrationRepository,
                sessionRepository
        );
    }

    // =========================================
    // REG-01: REGISTRO VALIDO
    // =========================================

    @Test
    void registrarUsuarioCorrectamente() {

        Session session = new Session();
        session.setCupo(5);

        Registration registro = new Registration();
        registro.setSessionId(22L);
        registro.setNombreUsuario("Gael");

        when(sessionRepository.buscarSesionConBloqueo(22L))
                .thenReturn(Optional.of(session));

        when(registrationRepository
                .existsBySessionIdAndNombreUsuarioIgnoreCase(
                        22L, "Gael"))
                .thenReturn(false);

        when(registrationRepository.save(registro))
                .thenReturn(registro);

        Registration resultado =
                service.crearRegistro(registro);

        assertNotNull(resultado);
        assertEquals(4, session.getCupo());
        assertNotNull(registro.getFechaRegistro());

        verify(registrationRepository).save(registro);
        verify(sessionRepository).save(session);
        verify(sessionRepository)
                .buscarSesionConBloqueo(22L);
    }

    // =========================================
    // REG-02: ACTIVIDAD INEXISTENTE
    // =========================================

    @Test
    void rechazarActividadInexistente() {

        Registration registro = new Registration();
        registro.setSessionId(999L);
        registro.setNombreUsuario("Gael");

        when(sessionRepository.buscarSesionConBloqueo(999L))
                .thenReturn(Optional.empty());

        ResponseStatusException excepcion =
                assertThrows(
                        ResponseStatusException.class,
                        () -> service.crearRegistro(registro)
                );

        assertEquals(
                HttpStatus.NOT_FOUND,
                excepcion.getStatusCode()
        );

        verify(sessionRepository)
                .buscarSesionConBloqueo(999L);

        verify(registrationRepository, never())
                .save(any(Registration.class));

        verify(sessionRepository, never())
                .save(any(Session.class));
    }

    // =========================================
    // REG-03: USUARIO DUPLICADO
    // =========================================

    @Test
    void rechazarRegistroDuplicado() {

        Session session = new Session();
        session.setCupo(5);

        Registration registro = new Registration();
        registro.setSessionId(22L);
        registro.setNombreUsuario("Gael");

        when(sessionRepository.buscarSesionConBloqueo(22L))
                .thenReturn(Optional.of(session));

        when(registrationRepository
                .existsBySessionIdAndNombreUsuarioIgnoreCase(
                        22L, "Gael"))
                .thenReturn(true);

        ResponseStatusException excepcion =
                assertThrows(
                        ResponseStatusException.class,
                        () -> service.crearRegistro(registro)
                );

        assertEquals(
                HttpStatus.CONFLICT,
                excepcion.getStatusCode()
        );

        assertEquals(5, session.getCupo());

        verify(registrationRepository, never())
                .save(any(Registration.class));

        verify(sessionRepository, never())
                .save(any(Session.class));
    }

    // =========================================
    // REG-04: ACTIVIDAD SIN CUPO
    // =========================================

    @Test
    void rechazarActividadSinCupo() {

        Session session = new Session();
        session.setCupo(0);

        Registration registro = new Registration();
        registro.setSessionId(22L);
        registro.setNombreUsuario("Gael");

        when(sessionRepository.buscarSesionConBloqueo(22L))
                .thenReturn(Optional.of(session));

        when(registrationRepository
                .existsBySessionIdAndNombreUsuarioIgnoreCase(
                        22L, "Gael"))
                .thenReturn(false);

        ResponseStatusException excepcion =
                assertThrows(
                        ResponseStatusException.class,
                        () -> service.crearRegistro(registro)
                );

        assertEquals(
                HttpStatus.CONFLICT,
                excepcion.getStatusCode()
        );

        assertEquals(0, session.getCupo());

        verify(registrationRepository, never())
                .save(any(Registration.class));

        verify(sessionRepository, never())
                .save(any(Session.class));
    }

    // =========================================
    // REG-05: NORMALIZACION DEL NOMBRE
    // =========================================

    @Test
    void eliminarEspaciosDelNombre() {

        Session session = new Session();
        session.setCupo(3);

        Registration registro = new Registration();
        registro.setSessionId(22L);
        registro.setNombreUsuario("  Gael  ");

        when(sessionRepository.buscarSesionConBloqueo(22L))
                .thenReturn(Optional.of(session));

        when(registrationRepository
                .existsBySessionIdAndNombreUsuarioIgnoreCase(
                        22L, "Gael"))
                .thenReturn(false);

        when(registrationRepository.save(registro))
                .thenReturn(registro);

        service.crearRegistro(registro);

        assertEquals(
                "Gael",
                registro.getNombreUsuario()
        );

        assertEquals(2, session.getCupo());

        verify(sessionRepository)
                .buscarSesionConBloqueo(22L);
    }

    // =========================================
    // REG-06: CONSULTA POR USUARIO
    // =========================================

    @Test
    void consultarRegistrosPorUsuario() {

        when(registrationRepository
                .findByNombreUsuarioIgnoreCase("Gael"))
                .thenReturn(List.of());

        List<Registration> resultado =
                service.obtenerPorUsuario("  Gael  ");

        assertNotNull(resultado);
        assertTrue(resultado.isEmpty());

        verify(registrationRepository)
                .findByNombreUsuarioIgnoreCase("Gael");
    }
}
