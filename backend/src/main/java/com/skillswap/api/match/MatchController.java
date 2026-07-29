package com.skillswap.api.match;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public List<MatchResponse> findAll() {
        return matchService.findAll();
    }

    @PostMapping
    public MatchResponse create(@Valid @RequestBody MatchRequest request) {
        return matchService.create(request);
    }

    @PatchMapping("/{id}/accept")
    public MatchResponse accept(@PathVariable String id) {
        return matchService.updateStatus(id, MatchStatus.ACEPTADO);
    }

    @PatchMapping("/{id}/reject")
    public MatchResponse reject(@PathVariable String id) {
        return matchService.updateStatus(id, MatchStatus.RECHAZADO);
    }

    @PatchMapping("/{id}/later")
    public MatchResponse later(@PathVariable String id) {
        return matchService.updateStatus(id, MatchStatus.VER_DESPUES);
    }
}
