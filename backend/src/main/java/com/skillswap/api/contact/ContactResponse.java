package com.skillswap.api.contact;

import java.time.Instant;

public record ContactResponse(
        String id,
        String name,
        String email,
        String subject,
        String message,
        Instant createdAt
) {
}
