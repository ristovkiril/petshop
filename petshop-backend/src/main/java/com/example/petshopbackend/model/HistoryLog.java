package com.example.petshopbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "logs")
@AllArgsConstructor
@NoArgsConstructor
public class HistoryLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private Long successfulCount;
    private Long deniedCount;

    public Long getSuccessfulCount() {
        return successfulCount;
    }

    public void setSuccessfulCount(Long successfulCount) {
        this.successfulCount = successfulCount;
    }

    public Long getDeniedCount() {
        return deniedCount;
    }

    public void setDeniedCount(Long deniedCount) {
        this.deniedCount = deniedCount;
    }
}
