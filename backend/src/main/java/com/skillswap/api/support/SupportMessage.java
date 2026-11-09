package com.skillswap.api.support;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "support_messages")
public class SupportMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "conversation_id",
            nullable = false
    )
    private Long conversationId;

    @Column(nullable = false)
    private String emisor;

    @Column(
            nullable = false,
            length = 2000
    )
    private String mensaje;

    @Column(
            name = "fecha_envio",
            nullable = false
    )
    private LocalDateTime fechaEnvio;

    public SupportMessage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id
    ) {
        this.id = id;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(
            Long conversationId
    ) {
        this.conversationId = conversationId;
    }

    public String getEmisor() {
        return emisor;
    }

    public void setEmisor(
            String emisor
    ) {
        this.emisor = emisor;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(
            String mensaje
    ) {
        this.mensaje = mensaje;
    }

    public LocalDateTime getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(
            LocalDateTime fechaEnvio
    ) {
        this.fechaEnvio = fechaEnvio;
    }
}