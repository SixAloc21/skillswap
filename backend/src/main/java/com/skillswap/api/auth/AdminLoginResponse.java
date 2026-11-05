package com.skillswap.api.auth;

public class AdminLoginResponse {

    private boolean acceso;
    private String mensaje;

    public AdminLoginResponse(
            boolean acceso,
            String mensaje
    ) {
        this.acceso = acceso;
        this.mensaje = mensaje;
    }

    public boolean isAcceso() {
        return acceso;
    }

    public String getMensaje() {
        return mensaje;
    }
}