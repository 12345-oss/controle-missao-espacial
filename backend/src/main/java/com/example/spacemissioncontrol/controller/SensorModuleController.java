package com.example.spacemissioncontrol.controller;

import com.example.spacemissioncontrol.model.SensorModule;
import com.example.spacemissioncontrol.repository.SensorModuleRepository;
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
@RequestMapping("/api/sensors")
public class SensorModuleController {

    private final SensorModuleRepository repository;

    public SensorModuleController(SensorModuleRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<SensorModule> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "recordedAt"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SensorModule create(@Valid @RequestBody SensorModule sensorModule) {
        return repository.save(sensorModule);
    }
}
