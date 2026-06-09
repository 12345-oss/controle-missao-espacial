package com.example.spacemissioncontrol.controller;

import com.example.spacemissioncontrol.model.OperationalEvent;
import com.example.spacemissioncontrol.repository.OperationalEventRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class OperationalEventController {

    private final OperationalEventRepository repository;

    public OperationalEventController(OperationalEventRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<OperationalEvent> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "occurredAt"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OperationalEvent create(@Valid @RequestBody OperationalEvent operationalEvent) {
        return repository.save(operationalEvent);
    }
}
