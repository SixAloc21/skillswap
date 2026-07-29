package com.skillswap.api.match;

import java.time.Instant;

public record MatchResponse(
        String id,
        String requesterName,
        String requesterHeadline,
        String ownerName,
        String offeredSkill,
        String desiredSkill,
        String modality,
        String availability,
        String message,
        MatchStatus status,
        Instant createdAt,
        Instant updatedAt
) {
}
