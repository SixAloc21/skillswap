package com.skillswap.api.match;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MatchServiceTest {

    private final MatchService matchService = new MatchService();

    @Test
    void createsPendingRequestAndExposesItToWearableFlow() {
        MatchRequest request = new MatchRequest(
                "Ana",
                "Disenadora",
                "Luis",
                "Diseno UI",
                "Kotlin",
                "Online",
                "Tardes",
                "Me interesa intercambiar habilidades"
        );

        MatchResponse created = matchService.create(request);

        assertThat(created.id()).startsWith("match-");
        assertThat(created.status()).isEqualTo(MatchStatus.PENDIENTE);
        assertThat(matchService.findPending()).containsExactly(created);
    }

    @Test
    void acceptedRequestIsRemovedFromPendingNotifications() {
        MatchResponse created = matchService.create(new MatchRequest(
                "Ana",
                "Disenadora",
                "Luis",
                "Diseno UI",
                "Kotlin",
                "Online",
                "Tardes",
                "Solicitud de prueba"
        ));

        MatchResponse accepted = matchService.updateStatus(created.id(), MatchStatus.ACEPTADO);

        assertThat(accepted.status()).isEqualTo(MatchStatus.ACEPTADO);
        assertThat(matchService.findPending()).isEmpty();
    }
}
