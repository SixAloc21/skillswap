package com.skillswap.api.support;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportMessageRepository
        extends JpaRepository<SupportMessage, Long> {

    List<SupportMessage>
    findByConversationIdOrderByFechaEnvioAsc(
            Long conversationId
    );
}