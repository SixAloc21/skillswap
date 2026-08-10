package com.skillswap.api.skill;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.SearchHit;

import java.text.Normalizer;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class SkillService {

    private final ElasticsearchOperations elasticsearchOperations;
    private boolean elasticsearchSeeded;

    public SkillService(ElasticsearchOperations elasticsearchOperations) {
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public List<SkillDocument> findAll() {
        NativeQuery query = NativeQuery.builder()
                .withQuery(builder -> builder.matchAll(matchAll -> matchAll))
                .withPageable(PageRequest.of(0, 100))
                .build();

        ensureElasticsearchSeeded();

        return elasticsearchOperations.search(query, SkillDocument.class)
                .stream()
                .map(SearchHit::getContent)
                .sorted(skillComparator())
                .toList();
    }

    public SkillDocument findById(String id) {
        ensureElasticsearchSeeded();
        SkillDocument skill = elasticsearchOperations.get(id, SkillDocument.class);

        if (skill == null) {
            throw new NoSuchElementException("No existe la habilidad con id " + id);
        }

        return skill;
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
                                .fuzziness("AUTO")
                                .prefixLength(1)
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
                .withPageable(PageRequest.of(0, 100))
                .build();

        ensureElasticsearchSeeded();

        return elasticsearchOperations.search(elasticsearchQuery, SkillDocument.class)
                .stream()
                .map(SearchHit::getContent)
                .toList();
    }

    public List<SkillSuggestion> suggestions(String query) {
        String normalizedQuery = normalize(query);

        if (normalizedQuery.length() < 2) {
            return List.of();
        }

        NativeQuery elasticsearchQuery = NativeQuery.builder()
                .withQuery(builder -> builder.multiMatch(multiMatch -> multiMatch
                        .query(normalizedQuery)
                        .fields("title^3", "description", "fullDescription", "category")
                        .fuzziness("AUTO")
                        .prefixLength(1)
                ))
                .withPageable(PageRequest.of(0, 6))
                .build();

        ensureElasticsearchSeeded();

        return elasticsearchOperations.search(elasticsearchQuery, SkillDocument.class)
                .stream()
                .map(SearchHit::getContent)
                .map(this::toSuggestion)
                .distinct()
                .toList();
    }

    public SearchStatus searchStatus() {
        ensureElasticsearchSeeded();
        return new SearchStatus("Elastic Cloud", true, "skillswap-skills");
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

        ensureElasticsearchSeeded();
        return elasticsearchOperations.save(skill);
    }

    public void seedIfEmpty() {
        ensureElasticsearchSeeded();
    }

    private void ensureElasticsearchSeeded() {
        if (elasticsearchSeeded) {
            return;
        }

        IndexOperations indexOperations = elasticsearchOperations.indexOps(SkillDocument.class);

        if (!indexOperations.exists()) {
            indexOperations.create();
            indexOperations.putMapping();
        }

        SkillSeedData.initialSkills().forEach(elasticsearchOperations::save);
        elasticsearchSeeded = true;
    }

    private String slug(String value) {
        return normalize(value).replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }

    private Comparator<SkillDocument> skillComparator() {
        return Comparator.comparing(SkillDocument::isFeatured).reversed().thenComparing(SkillDocument::getTitle);
    }

    private SkillSuggestion toSuggestion(SkillDocument skill) {
        return new SkillSuggestion(skill.getId(), skill.getTitle(), skill.getCategory());
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
