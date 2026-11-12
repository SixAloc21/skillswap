
package com.skillswap.api.session;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SessionControllerWhiteBoxTest {

    private SessionService sessionService;
    private SessionController controller;

    @BeforeEach
    void setUp() {
        sessionService = mock(SessionService.class);
        controller = new SessionController(sessionService);
    }

    // WEB-01: CONSULTA EXITOSA
    @Test
    void consultarSesionExistente() {
        Session sesion = new Session();
        sesion.setNombre("Prueba White Box");

        when(sessionService.obtenerSesionPorId(1L))
                .thenReturn(Optional.of(sesion));

        ResponseEntity<Session> respuesta =
                controller.obtenerSesionPorId(1L);

        assertEquals(HttpStatus.OK,
                respuesta.getStatusCode());

        assertEquals("Prueba White Box",
                respuesta.getBody().getNombre());

        verify(sessionService).obtenerSesionPorId(1L);
    }

    // WEB-02: SESION INEXISTENTE
    @Test
    void consultarSesionInexistente() {
        when(sessionService.obtenerSesionPorId(999L))
                .thenReturn(Optional.empty());

        ResponseEntity<Session> respuesta =
                controller.obtenerSesionPorId(999L);

        assertEquals(HttpStatus.NOT_FOUND,
                respuesta.getStatusCode());
    }

    // WEB-03: CREACION EXITOSA
    @Test
    void crearSesionValida() {
        Session sesion = new Session();
        sesion.setNombre("Actividad nueva");
        sesion.setCupo(10);

        when(sessionService.crearSesion(sesion))
                .thenReturn(sesion);

        ResponseEntity<Session> respuesta =
                controller.crearSesion(sesion);

        assertEquals(HttpStatus.OK,
                respuesta.getStatusCode());

        assertNotNull(respuesta.getBody());

        verify(sessionService).crearSesion(sesion);
    }

    // WEB-05: ELIMINACION EXITOSA
    @Test
    void eliminarSesionExistente() {
        when(sessionService.obtenerSesionPorId(1L))
                .thenReturn(Optional.of(new Session()));

        ResponseEntity<Void> respuesta =
                controller.eliminarSesion(1L);

        assertEquals(HttpStatus.NO_CONTENT,
                respuesta.getStatusCode());

        verify(sessionService).eliminarSesion(1L);
    }

    // WEB-06: ELIMINACION INEXISTENTE
    @Test
    void eliminarSesionInexistente() {
        when(sessionService.obtenerSesionPorId(999L))
                .thenReturn(Optional.empty());

        ResponseEntity<Void> respuesta =
                controller.eliminarSesion(999L);

        assertEquals(HttpStatus.NOT_FOUND,
                respuesta.getStatusCode());

        verify(sessionService, never())
                .eliminarSesion(999L);
    }
}
