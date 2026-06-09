package com.example.spacemissioncontrol.controller;

import com.example.spacemissioncontrol.model.MonitoredSystem;
import com.example.spacemissioncontrol.repository.MonitoredSystemRepository;
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
@RequestMapping("/api/systems")
public class MonitoredSystemController {

    private final MonitoredSystemRepository repository;

    public MonitoredSystemController(MonitoredSystemRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MonitoredSystem> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MonitoredSystem create(@Valid @RequestBody MonitoredSystem monitoredSystem) {
        return repository.save(monitoredSystem);
    }
}
