package com.internship.insighthub.business.abstracts;

import com.internship.insighthub.entities.DataEntry;
import com.internship.insighthub.entities.Users;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface DataEntryService {
    DataEntry save(DataEntry entry);
    List<DataEntry> getAll();
    List<DataEntry> getByUser(Users user);
    List<DataEntry> getByDate(LocalDate date); // LocalDateTime değil!
    List<DataEntry> getByDateRange(LocalDate startDate, LocalDate endDate);

}
