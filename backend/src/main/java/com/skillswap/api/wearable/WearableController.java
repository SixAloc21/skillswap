package com.skillswap.api.wearable;

import com.skillswap.api.match.MatchResponse;
import com.skillswap.api.match.MatchService;
import com.skillswap.api.match.MatchStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/wearable/notifications")
public class WearableController {

    private final MatchService matchService;

    public WearableController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping
    public List<MatchResponse> pendingNotifications() {
        return matchService.findPending();
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
