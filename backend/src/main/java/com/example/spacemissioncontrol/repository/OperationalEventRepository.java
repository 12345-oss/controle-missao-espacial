package com.example.spacemissioncontrol.repository;

import com.example.spacemissioncontrol.model.OperationalEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperationalEventRepository extends JpaRepository<OperationalEvent, Long> {
}
