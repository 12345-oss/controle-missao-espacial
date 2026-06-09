package com.example.spacemissioncontrol.repository;

import com.example.spacemissioncontrol.model.SensorModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SensorModuleRepository extends JpaRepository<SensorModule, Long> {
    List<SensorModule> findTop5ByOrderByRecordedAtDesc();
}
