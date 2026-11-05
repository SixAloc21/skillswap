package com.skillswap.api.registration;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "*")
public class RegistrationController {

    private final RegistrationService registrationService;

    public RegistrationController(
            RegistrationService registrationService
    ) {
        this.registrationService = registrationService;
    }

    @PostMapping
    public ResponseEntity<?> crearRegistro(
            @RequestBody Registration registration
    ) {

        try {

            Registration nuevoRegistro =
                    registrationService.crearRegistro(
                            registration
                    );

            return ResponseEntity.ok(
                    nuevoRegistro
            );

        } catch (ResponseStatusException e) {

            Map<String, String> respuesta =
                    new HashMap<>();

            respuesta.put(
                    "mensaje",
                    e.getReason()
            );

            return ResponseEntity
                    .status(e.getStatusCode())
                    .body(respuesta);
        }
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<Registration>>
    obtenerPorSesion(
            @PathVariable Long sessionId
    ) {

        return ResponseEntity.ok(
                registrationService
                        .obtenerPorSesion(
                                sessionId
                        )
        );
    }

    @GetMapping("/user/{nombreUsuario}")
    public ResponseEntity<List<Registration>>
    obtenerPorUsuario(
            @PathVariable String nombreUsuario
    ) {

        return ResponseEntity.ok(
                registrationService
                        .obtenerPorUsuario(
                                nombreUsuario
                        )
        );
    }
}