
package com.skillswap.api.session;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class SessionServiceWhiteBoxTest {

    private SessionRepository repository;
    private SessionService service;

    @BeforeEach
    void setUp() {
        repository = mock(SessionRepository.class);
        service = new SessionService(repository);
    }

    // WEB-04: CUP0 NEGATIVO
    // Comprobar el comportamiento actual del servicio
    
@Test
void crearSesionConCupoNegativo() {

    Session sesion = new Session();
    sesion.setNombre("Actividad inválida");
    sesion.setCupo(-5);

    IllegalArgumentException excepcion =
        assertThrows(
            IllegalArgumentException.class,
            () -> service.crearSesion(sesion)
        );

    assertEquals(
        "El cupo debe ser mayor que cero",
        excepcion.getMessage()
    );

    verify(repository, never()).save(any(Session.class));
}

}
