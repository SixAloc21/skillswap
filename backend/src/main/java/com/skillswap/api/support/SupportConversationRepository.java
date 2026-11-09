package com.skillswap.api.support;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportConversationRepository
        extends JpaRepository<SupportConversation, Long> {

    List<SupportConversation>
    findAllByOrderByUltimaActualizacionDesc();

    List<SupportConversation>
    findByNombreUsuarioIgnoreCaseOrderByUltimaActualizacionDesc(
            String nombreUsuario
    );
}