package com.example.spacemissioncontrol.controller;

import com.example.spacemissioncontrol.model.MissionAlert;
import com.example.spacemissioncontrol.repository.MissionAlertRepository;
import com.example.spacemissioncontrol.repository.MonitoredSystemRepository;
import com.example.spacemissioncontrol.repository.OperationalEventRepository;
import com.example.spacemissioncontrol.repository.SensorModuleRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mission")
public class MissionStatusController {

    private final SensorModuleRepository sensorModuleRepository;
    private final MonitoredSystemRepository monitoredSystemRepository;
    private final OperationalEventRepository operationalEventRepository;
    private final MissionAlertRepository missionAlertRepository;

    public MissionStatusController(
            SensorModuleRepository sensorModuleRepository,
            MonitoredSystemRepository monitoredSystemRepository,
            OperationalEventRepository operationalEventRepository,
            MissionAlertRepository missionAlertRepository
    ) {
        this.sensorModuleRepository = sensorModuleRepository;
        this.monitoredSystemRepository = monitoredSystemRepository;
        this.operationalEventRepository = operationalEventRepository;
        this.missionAlertRepository = missionAlertRepository;
    }

    @GetMapping("/status")
    public Map<String, Object> getMissionStatus() {
        List<MissionAlert> criticalAlerts = missionAlertRepository
                .findByResolvedFalseAndSeverityIgnoreCase("CRITICAL");

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("missionName", "Orion Deep Space Mission");
        response.put("overallStatus", criticalAlerts.isEmpty() ? "NOMINAL" : "ATTENTION");
        response.put("sensorCount", sensorModuleRepository.count());
        response.put("systemCount", monitoredSystemRepository.count());
        response.put("eventCount", operationalEventRepository.count());
        response.put("criticalAlertCount", criticalAlerts.size());
        response.put("latestSensors", sensorModuleRepository.findTop5ByOrderByRecordedAtDesc());
        response.put("lastUpdated", LocalDateTime.now());
        return response;
    }
}
