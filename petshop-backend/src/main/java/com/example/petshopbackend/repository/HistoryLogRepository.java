package com.example.petshopbackend.repository;

import com.example.petshopbackend.model.HistoryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryLogRepository extends JpaRepository<HistoryLog, Long> {
}
