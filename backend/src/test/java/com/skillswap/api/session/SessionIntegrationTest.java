package com.skillswap.api.session;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SessionIntegrationTest {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private SessionRepository sessionRepository;

    @AfterEach
    void limpiarBaseDeDatos() {
        sessionRepository.deleteAll();
    }

    @Test
    void debeGuardarYConsultarUnaSesionCorrectamente() {

        Session session = new Session();

        session.setNombre("Curso de Flutter");
        session.setDescripcion("Introducción a Flutter");
        session.setInstructor("Profesor de prueba");
        session.setFecha(LocalDate.of(2026, 10, 30));
        session.setHora(LocalTime.of(10, 0));
        session.setCupo(20);

        Session guardada = sessionService.crearSesion(session);

        assertNotNull(guardada.getId());

        Optional<Session> encontrada =
                sessionService.obtenerSesionPorId(guardada.getId());

        assertTrue(encontrada.isPresent());
        assertEquals("Curso de Flutter", encontrada.get().getNombre());
        assertEquals("Profesor de prueba", encontrada.get().getInstructor());
        assertEquals(20, encontrada.get().getCupo());
    }

    @Test
    void debeManejarBusquedaDeSesionInexistente() {

        Optional<Session> resultado =
                sessionService.obtenerSesionPorId(999999L);

        assertTrue(resultado.isEmpty());
    }
} 