package com.skillswap.api.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank @Size(max = 80) String name,
        @NotBlank @Email @Size(max = 120) String email,
        @NotBlank @Size(max = 100) String subject,
        @NotBlank @Size(min = 10, max = 700) String message
) {
}
