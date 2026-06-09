package com.example.spacemissioncontrol.controller;

import com.example.spacemissioncontrol.model.MissionAlert;
import com.example.spacemissioncontrol.repository.MissionAlertRepository;
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
@RequestMapping("/api/alerts")
public class MissionAlertController {

    private final MissionAlertRepository repository;

    public MissionAlertController(MissionAlertRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MissionAlert> findAll() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @GetMapping("/critical")
    public List<MissionAlert> findCriticalOpenAlerts() {
        return repository.findByResolvedFalseAndSeverityIgnoreCase("CRITICAL");
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MissionAlert create(@Valid @RequestBody MissionAlert missionAlert) {
        return repository.save(missionAlert);
    }
}
