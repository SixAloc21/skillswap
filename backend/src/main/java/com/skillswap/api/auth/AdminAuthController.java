package com.skillswap.api.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminAuthController {

    @Value("${skillswap.admin.username:admin}")
    private String adminUsername;

    @Value("${skillswap.admin.password:SkillSwap123}")
    private String adminPassword;

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponse> login(
            @RequestBody AdminLoginRequest request
    ) {

        if (
                request.getUsuario() == null ||
                request.getPassword() == null
        ) {
            return ResponseEntity
                    .badRequest()
                    .body(
                            new AdminLoginResponse(
                                    false,
                                    "Usuario y contraseña son obligatorios"
                            )
                    );
        }

        boolean credencialesCorrectas =
                adminUsername.equals(
                        request.getUsuario().trim()
                )
                &&
                adminPassword.equals(
                        request.getPassword()
                );

        if (!credencialesCorrectas) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                            new AdminLoginResponse(
                                    false,
                                    "Usuario o contraseña incorrectos"
                            )
                    );
        }

        return ResponseEntity.ok(
                new AdminLoginResponse(
                        true,
                        "Inicio de sesión correcto"
                )
        );
    }
}