package com.skillswap.api.skill;

import org.springframework.stereotype.Service;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.SearchHit;

import java.text.Normalizer;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Locale;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class SkillService {

    private final ElasticsearchOperations elasticsearchOperations;
    private final Map<String, SkillDocument> fallbackSkills = new LinkedHashMap<>();
    private boolean elasticsearchSeeded;

    public SkillService(ElasticsearchOperations elasticsearchOperations) {
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public List<SkillDocument> findAll() {
        NativeQuery query = NativeQuery.builder()
                .withQuery(builder -> builder.matchAll(matchAll -> matchAll))
                .build();

        try {
            ensureElasticsearchSeeded();

            return elasticsearchOperations.search(query, SkillDocument.class)
                    .stream()
                    .map(SearchHit::getContent)
                    .sorted(skillComparator())
                    .toList();
        } catch (RuntimeException exception) {
            return fallbackSkills.values().stream()
                    .sorted(skillComparator())
                    .toList();
        }
    }

    public SkillDocument findById(String id) {
        try {
            ensureElasticsearchSeeded();

            SkillDocument skill = elasticsearchOperations.get(id, SkillDocument.class);

            if (skill != null) {
                return skill;
            }
        } catch (RuntimeException ignored) {
            // When Elasticsearch is offline, the local fallback keeps the API usable for class demos.
        }

        SkillDocument fallbackSkill = fallbackSkills.get(id);

        if (fallbackSkill == null) {
            throw new NoSuchElementException("No existe la habilidad con id " + id);
        }

        return fallbackSkill;
    }

    public List<SkillDocument> search(String query, String category, SkillModality modality, SkillLevel level) {
        String normalizedQuery = normalize(query);

        if (normalizedQuery.isBlank() && (category == null || category.isBlank()) && modality == null && level == null) {
            return findAll();
        }

        NativeQuery elasticsearchQuery = NativeQuery.builder()
                .withQuery(builder -> builder.bool(bool -> {
                    if (!normalizedQuery.isBlank()) {
                        bool.must(clause -> clause.multiMatch(multiMatch -> multiMatch
                                .query(normalizedQuery)
                                .fields("title", "description", "fullDescription", "category", "userName")
                        ));
                    }

                    if (category != null && !category.isBlank()) {
                        bool.filter(clause -> clause.match(match -> match.field("category").query(category)));
                    }

                    if (modality != null) {
                        bool.filter(clause -> clause.term(term -> term.field("modality").value(modality.name())));
                    }

                    if (level != null) {
                        bool.filter(clause -> clause.term(term -> term.field("level").value(level.name())));
                    }

                    return bool;
                }))
                .build();

        try {
            ensureElasticsearchSeeded();

            return elasticsearchOperations.search(elasticsearchQuery, SkillDocument.class)
                    .stream()
                    .map(SearchHit::getContent)
                    .toList();
        } catch (RuntimeException exception) {
            return searchFallback(normalizedQuery, category, modality, level);
        }
    }

    public SkillDocument create(SkillRequest request) {
        SkillDocument skill = new SkillDocument(
                slug(request.title()) + "-" + UUID.randomUUID(),
                request.title().trim(),
                request.category().trim(),
                request.description().trim(),
                request.description().trim() + " Esta publicacion fue creada desde la API Spring Boot de SkillSwap.",
                request.level(),
                request.modality(),
                request.exchangeFor().trim(),
                request.availability().trim(),
                request.userName().trim(),
                "Miembro de la comunidad SkillSwap",
                "Comunidad SkillSwap",
                false
        );

        fallbackSkills.put(skill.getId(), skill);

        try {
            ensureElasticsearchSeeded();
            return elasticsearchOperations.save(skill);
        } catch (RuntimeException exception) {
            return skill;
        }
    }

    public void seedIfEmpty() {
        if (!fallbackSkills.isEmpty()) {
            return;
        }

        SkillSeedData.initialSkills().forEach(skill -> fallbackSkills.put(skill.getId(), skill));

        try {
            ensureElasticsearchSeeded();
        } catch (RuntimeException ignored) {
            // Elasticsearch can be started later; the API still serves fallback data meanwhile.
        }
    }

    private void ensureElasticsearchSeeded() {
        if (fallbackSkills.isEmpty()) {
            SkillSeedData.initialSkills().forEach(skill -> fallbackSkills.put(skill.getId(), skill));
        }

        if (elasticsearchSeeded) {
            return;
        }

        IndexOperations indexOperations = elasticsearchOperations.indexOps(SkillDocument.class);

        if (!indexOperations.exists()) {
            indexOperations.create();
            indexOperations.putMapping();
        }

        fallbackSkills.values().forEach(elasticsearchOperations::save);
        elasticsearchSeeded = true;
    }

    private String slug(String value) {
        return normalize(value).replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }

    private Comparator<SkillDocument> skillComparator() {
        return Comparator.comparing(SkillDocument::isFeatured).reversed().thenComparing(SkillDocument::getTitle);
    }

    private List<SkillDocument> searchFallback(String normalizedQuery, String category, SkillModality modality, SkillLevel level) {
        return fallbackSkills.values().stream()
                .filter(skill -> normalizedQuery.isBlank() || searchableText(skill).contains(normalizedQuery))
                .filter(skill -> category == null || category.isBlank() || skill.getCategory().equalsIgnoreCase(category))
                .filter(skill -> modality == null || skill.getModality() == modality)
                .filter(skill -> level == null || skill.getLevel() == level)
                .sorted(skillComparator())
                .toList();
    }

    private String searchableText(SkillDocument skill) {
        return normalize(String.join(" ",
                skill.getTitle(),
                skill.getDescription(),
                skill.getFullDescription(),
                skill.getCategory(),
                skill.getUserName()
        ));
    }

    private String normalize(String value) {
        if (value == null) {
            return "";
        }

        return Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .trim();
    }
}
