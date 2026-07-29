package com.skillswap.api.contact;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final List<ContactResponse> contacts = new ArrayList<>();

    @GetMapping
    public List<ContactResponse> findAll() {
        return contacts.stream()
                .sorted(Comparator.comparing(ContactResponse::createdAt).reversed())
                .toList();
    }

    @PostMapping
    public ContactResponse create(@Valid @RequestBody ContactRequest request) {
        ContactResponse response = new ContactResponse(
                "contact-" + UUID.randomUUID(),
                request.name(),
                request.email(),
                request.subject(),
                request.message(),
                Instant.now()
        );

        contacts.add(response);
        return response;
    }
}
