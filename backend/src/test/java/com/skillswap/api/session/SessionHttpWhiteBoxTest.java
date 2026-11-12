
package com.skillswap.api.session;

import com.skillswap.api.common.ApiExceptionHandler;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class SessionHttpWhiteBoxTest {

    private SessionService sessionService;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        sessionService = mock(SessionService.class);

        SessionController controller =
                new SessionController(sessionService);

        mockMvc = MockMvcBuilders
                .standaloneSetup(controller)
                .setControllerAdvice(new ApiExceptionHandler())
                .build();
    }

    @Test
    void crearSesionConCupoNegativoDevuelve400()
            throws Exception {

        when(sessionService.crearSesion(any(Session.class)))
                .thenThrow(new IllegalArgumentException(
                        "El cupo debe ser mayor que cero"
                ));

        mockMvc.perform(post("/api/sessions")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "nombre": "Prueba inválida",
                      "descripcion": "White Box",
                      "instructor": "Prueba",
                      "cupo": -5
                    }
                    """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.message")
                        .value("El cupo debe ser mayor que cero"));

        verify(sessionService).crearSesion(any(Session.class));
    }

    @Test
    void consultarSesionInexistenteDevuelve404()
            throws Exception {

        when(sessionService.obtenerSesionPorId(999L))
                .thenReturn(java.util.Optional.empty());

        mockMvc.perform(get("/api/sessions/999"))
                .andExpect(status().isNotFound());
    }
}
