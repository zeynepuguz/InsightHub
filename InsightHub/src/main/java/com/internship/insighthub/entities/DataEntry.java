package com.internship.insighthub.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "data_entries")
public class DataEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "entry_date")
    private LocalDate entryDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("entries")
    private Users user;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public DataEntry() {
        this.createdAt = LocalDateTime.now();
        this.entryDate = LocalDate.now();
    }



}
