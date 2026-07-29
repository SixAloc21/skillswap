package com.skillswap.api.skill;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SkillRequest(
        @NotBlank @Size(min = 4, max = 90) String title,
        @NotBlank @Size(max = 40) String category,
        @NotBlank @Size(min = 30, max = 600) String description,
        @NotNull SkillLevel level,
        @NotNull SkillModality modality,
        @NotBlank @Size(max = 160) String exchangeFor,
        @NotBlank @Size(max = 160) String availability,
        @NotBlank @Size(max = 80) String userName
) {
}
