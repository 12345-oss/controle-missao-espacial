package com.example.spacemissioncontrol.config;

import com.example.spacemissioncontrol.model.MissionAlert;
import com.example.spacemissioncontrol.model.MonitoredSystem;
import com.example.spacemissioncontrol.model.OperationalEvent;
import com.example.spacemissioncontrol.model.SensorModule;
import com.example.spacemissioncontrol.repository.MissionAlertRepository;
import com.example.spacemissioncontrol.repository.MonitoredSystemRepository;
import com.example.spacemissioncontrol.repository.OperationalEventRepository;
import com.example.spacemissioncontrol.repository.SensorModuleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SensorModuleRepository sensorModuleRepository;
    private final MonitoredSystemRepository monitoredSystemRepository;
    private final OperationalEventRepository operationalEventRepository;
    private final MissionAlertRepository missionAlertRepository;

    public DataSeeder(
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

    @Override
    public void run(String... args) {
        if (sensorModuleRepository.count() == 0) {
            sensorModuleRepository.saveAll(List.of(
                    sensor("Thermal Core A1", "Temperature", "Computational Module A", "Engine Bay", 78.4, "C", "NORMAL"),
                    sensor("Oxygen Cabin B2", "Atmosphere", "Life Support Module", "Crew Cabin", 21.1, "%", "NORMAL"),
                    sensor("Radiation Shield C3", "Radiation", "Navigation Module", "Outer Hull", 4.7, "mSv", "ATTENTION")
            ));
        }

        if (monitoredSystemRepository.count() == 0) {
            monitoredSystemRepository.saveAll(List.of(
                    system("Life Support", "Environmental Control", "ONLINE", "O2 stable and CO2 filtered", "Life Support Module"),
                    system("Main Propulsion", "Propulsion", "ONLINE", "Thrust vector nominal", "Computational Module A"),
                    system("Long Range Communication", "Communication", "DEGRADED", "Packet loss above expected range", "Communication Module")
            ));
        }

        if (operationalEventRepository.count() == 0) {
            operationalEventRepository.saveAll(List.of(
                    event("Course correction completed", "Navigation burn completed within planned window.", "MANEUVER", "Cruise", "INFO"),
                    event("Signal latency increased", "Delay exceeded baseline during deep-space relay.", "COMMUNICATION", "Cruise", "WARNING")
            ));
        }

        if (missionAlertRepository.count() == 0) {
            missionAlertRepository.saveAll(List.of(
                    alert("Communication degradation", "High packet loss detected on long range antenna.", "WARNING", "Long Range Communication", false),
                    alert("Radiation level attention", "Radiation sensor crossed attention threshold near shield section C.", "CRITICAL", "Radiation Shield C3", false)
            ));
        }
    }

    private SensorModule sensor(String name, String sensorType, String moduleName, String location, Double reading, String unit, String status) {
        SensorModule sensor = new SensorModule();
        sensor.setName(name);
        sensor.setSensorType(sensorType);
        sensor.setModuleName(moduleName);
        sensor.setLocation(location);
        sensor.setReading(reading);
        sensor.setUnit(unit);
        sensor.setStatus(status);
        return sensor;
    }

    private MonitoredSystem system(String name, String category, String operationalStatus, String telemetry, String responsibleModule) {
        MonitoredSystem system = new MonitoredSystem();
        system.setName(name);
        system.setCategory(category);
        system.setOperationalStatus(operationalStatus);
        system.setTelemetry(telemetry);
        system.setResponsibleModule(responsibleModule);
        return system;
    }

    private OperationalEvent event(String title, String description, String eventType, String missionPhase, String severity) {
        OperationalEvent event = new OperationalEvent();
        event.setTitle(title);
        event.setDescription(description);
        event.setEventType(eventType);
        event.setMissionPhase(missionPhase);
        event.setSeverity(severity);
        return event;
    }

    private MissionAlert alert(String title, String message, String severity, String sourceSystem, Boolean resolved) {
        MissionAlert alert = new MissionAlert();
        alert.setTitle(title);
        alert.setMessage(message);
        alert.setSeverity(severity);
        alert.setSourceSystem(sourceSystem);
        alert.setResolved(resolved);
        return alert;
    }
}
