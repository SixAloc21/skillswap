package com.skillswap.api.session;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping
    public ResponseEntity<Session> crearSesion(
            @RequestBody Session session
    ) {
        Session nuevaSesion =
                sessionService.crearSesion(session);

        return ResponseEntity.ok(nuevaSesion);
    }

    @GetMapping
    public ResponseEntity<List<Session>> obtenerSesiones() {
        return ResponseEntity.ok(
                sessionService.obtenerSesiones()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Session> obtenerSesionPorId(
            @PathVariable Long id
    ) {
        return sessionService
                .obtenerSesionPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarSesion(
            @PathVariable Long id
    ) {
        if (sessionService.obtenerSesionPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        sessionService.eliminarSesion(id);

        return ResponseEntity.noContent().build();
    }
}