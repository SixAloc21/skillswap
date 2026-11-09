package com.skillswap.api.support;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "*")
public class SupportController {

    private final SupportService supportService;

    public SupportController(
            SupportService supportService
    ) {
        this.supportService =
                supportService;
    }

    @PostMapping("/conversations")
    public ResponseEntity<SupportConversation>
    crearConversacion(
            @RequestBody Map<String, String> body
    ) {

        String nombreUsuario =
                body.get("nombreUsuario");

        return ResponseEntity.ok(
                supportService.crearConversacion(
                        nombreUsuario
                )
        );
    }

    @GetMapping("/conversations")
    public ResponseEntity<
            List<SupportConversation>
    >
    obtenerConversaciones() {

        return ResponseEntity.ok(
                supportService
                        .obtenerConversaciones()
        );
    }

    @GetMapping(
            "/conversations/user/{nombreUsuario}"
    )
    public ResponseEntity<
            List<SupportConversation>
    >
    obtenerConversacionesUsuario(
            @PathVariable
            String nombreUsuario
    ) {

        return ResponseEntity.ok(
                supportService
                        .obtenerConversacionesUsuario(
                                nombreUsuario
                        )
        );
    }

    @GetMapping(
            "/conversations/{conversationId}"
    )
    public ResponseEntity<SupportConversation>
    obtenerConversacion(
            @PathVariable
            Long conversationId
    ) {

        return ResponseEntity.ok(
                supportService
                        .obtenerConversacionPorId(
                                conversationId
                        )
        );
    }

    @PostMapping(
            "/conversations/{conversationId}/messages"
    )
    public ResponseEntity<SupportMessage>
    enviarMensaje(
            @PathVariable
            Long conversationId,

            @RequestBody
            Map<String, String> body
    ) {

        return ResponseEntity.ok(
                supportService.enviarMensaje(
                        conversationId,
                        body.get("emisor"),
                        body.get("mensaje")
                )
        );
    }

    @GetMapping(
            "/conversations/{conversationId}/messages"
    )
    public ResponseEntity<
            List<SupportMessage>
    >
    obtenerMensajes(
            @PathVariable
            Long conversationId
    ) {

        return ResponseEntity.ok(
                supportService
                        .obtenerMensajes(
                                conversationId
                        )
        );
    }

    @PutMapping(
            "/conversations/{conversationId}/close"
    )
    public ResponseEntity<SupportConversation>
    cerrarConversacion(
            @PathVariable
            Long conversationId
    ) {

        return ResponseEntity.ok(
                supportService
                        .cerrarConversacion(
                                conversationId
                        )
        );
    }
}