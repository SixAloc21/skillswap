package com.skillswap.api.common;

import com.skillswap.api.skill.SkillService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final SkillService skillService;

    public DataInitializer(SkillService skillService) {
        this.skillService = skillService;
    }

    @Override
    public void run(String... args) {
        skillService.seedIfEmpty();
    }
}
