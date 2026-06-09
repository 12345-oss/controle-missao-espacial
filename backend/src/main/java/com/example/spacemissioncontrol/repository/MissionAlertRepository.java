package com.example.spacemissioncontrol.repository;

import com.example.spacemissioncontrol.model.MissionAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MissionAlertRepository extends JpaRepository<MissionAlert, Long> {
    List<MissionAlert> findByResolvedFalseAndSeverityIgnoreCase(String severity);
}
