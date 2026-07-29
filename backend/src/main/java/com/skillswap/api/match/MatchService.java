package com.skillswap.api.match;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MatchService {

    private final Map<String, MatchResponse> matches = new ConcurrentHashMap<>();

    public MatchService() {
        seed();
    }

    public List<MatchResponse> findAll() {
        return matches.values().stream()
                .sorted(Comparator.comparing(MatchResponse::createdAt).reversed())
                .toList();
    }

    public List<MatchResponse> findPending() {
        return findAll().stream()
                .filter(match -> match.status() == MatchStatus.PENDIENTE || match.status() == MatchStatus.VER_DESPUES)
                .toList();
    }

    public MatchResponse create(MatchRequest request) {
        Instant now = Instant.now();
        MatchResponse response = new MatchResponse(
                "match-" + UUID.randomUUID(),
                request.requesterName(),
                request.requesterHeadline(),
                request.ownerName(),
                request.offeredSkill(),
                request.desiredSkill(),
                request.modality(),
                request.availability(),
                request.message(),
                MatchStatus.PENDIENTE,
                now,
                now
        );

        matches.put(response.id(), response);
        return response;
    }

    public MatchResponse updateStatus(String id, MatchStatus status) {
        MatchResponse current = matches.get(id);

        if (current == null) {
            throw new NoSuchElementException("No existe la solicitud con id " + id);
        }

        MatchResponse updated = new MatchResponse(
                current.id(),
                current.requesterName(),
                current.requesterHeadline(),
                current.ownerName(),
                current.offeredSkill(),
                current.desiredSkill(),
                current.modality(),
                current.availability(),
                current.message(),
                status,
                current.createdAt(),
                Instant.now()
        );

        matches.put(id, updated);
        return updated;
    }

    private void seed() {
        create(new MatchRequest("Camila Ruiz", "Recruiter bilingue y coach de speaking", "Maria Torres", "Ingles conversacional para entrevistas", "Mentoria de UX con Figma", "Online", "Martes por la noche", "Puedo ayudarte a practicar entrevistas en ingles y me encantaria recibir feedback sobre mi portafolio."));
        MatchResponse accepted = create(new MatchRequest("Paola Neri", "Fotografa comercial y creadora de contenido", "Maria Torres", "Fotografia de producto con celular", "Mentoria de UX con Figma", "Hibrido", "Sabados despues de las 3 pm", "Busco mejorar la presentacion de mi portafolio para clientes digitales."));
        updateStatus(accepted.id(), MatchStatus.ACEPTADO);
    }
}
