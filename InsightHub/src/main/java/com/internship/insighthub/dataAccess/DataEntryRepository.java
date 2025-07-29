package com.internship.insighthub.dataAccess;

import com.internship.insighthub.entities.DataEntry;
import com.internship.insighthub.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface DataEntryRepository extends JpaRepository<DataEntry, Integer> {
    List<DataEntry> findByUser(Users user);
    List<DataEntry> findByEntryDate(LocalDate entryDate);
    List<DataEntry> findByEntryDateBetween(LocalDate startDate, LocalDate endDate);
}
