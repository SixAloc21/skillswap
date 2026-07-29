package com.skillswap.api.match;

import jakarta.validation.constraints.NotBlank;

public record MatchRequest(
        @NotBlank String requesterName,
        @NotBlank String requesterHeadline,
        @NotBlank String ownerName,
        @NotBlank String offeredSkill,
        @NotBlank String desiredSkill,
        @NotBlank String modality,
        @NotBlank String availability,
        @NotBlank String message
) {
}
