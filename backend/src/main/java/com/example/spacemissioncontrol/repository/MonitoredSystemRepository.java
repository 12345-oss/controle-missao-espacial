package com.example.spacemissioncontrol.repository;

import com.example.spacemissioncontrol.model.MonitoredSystem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MonitoredSystemRepository extends JpaRepository<MonitoredSystem, Long> {
}
