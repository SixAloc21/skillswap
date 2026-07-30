package com.skillswap.api.skill;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public List<SkillDocument> findAll() {
        return skillService.findAll();
    }

    @GetMapping("/{id}")
    public SkillDocument findById(@PathVariable String id) {
        return skillService.findById(id);
    }

    @GetMapping("/search")
    public List<SkillDocument> search(
            @RequestParam(required = false, defaultValue = "") String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) SkillModality modality,
            @RequestParam(required = false) SkillLevel level
    ) {
        return skillService.search(q, category, modality, level);
    }

    @GetMapping("/suggestions")
    public List<SkillSuggestion> suggestions(@RequestParam(required = false, defaultValue = "") String q) {
        return skillService.suggestions(q);
    }

    @PostMapping
    public SkillDocument create(@Valid @RequestBody SkillRequest request) {
        return skillService.create(request);
    }
}
