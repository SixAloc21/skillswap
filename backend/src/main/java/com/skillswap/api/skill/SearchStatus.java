package com.skillswap.api.skill;

public record SearchStatus(
        String engine,
        boolean elasticsearchAvailable,
        String indexName
) {
}
