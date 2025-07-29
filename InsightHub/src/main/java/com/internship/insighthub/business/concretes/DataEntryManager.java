package com.internship.insighthub.business.concretes;

import com.internship.insighthub.business.abstracts.DataEntryService;
import com.internship.insighthub.dataAccess.DataEntryRepository;
import com.internship.insighthub.entities.DataEntry;
import com.internship.insighthub.entities.Users;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DataEntryManager implements DataEntryService {

    private DataEntryRepository dataEntryRepository;

    public DataEntryManager(DataEntryRepository dataEntryRepository) {
        this.dataEntryRepository = dataEntryRepository;
    }

    @Override
    public DataEntry save(DataEntry entry) {
        if (entry.getEntryDate() == null) {
            entry.setEntryDate(LocalDate.now());
        }
        if (entry.getCreatedAt() == null) {
            entry.setCreatedAt(LocalDateTime.now());
        }
        return dataEntryRepository.save(entry);
    }


    @Override
    public List<DataEntry> getAll() {
        return dataEntryRepository.findAll();
    }

    @Override
    public List<DataEntry> getByUser(Users user) {
        return dataEntryRepository.findByUser(user);
    }

    @Override
    public List<DataEntry> getByDate(LocalDate date) {
        return dataEntryRepository.findByEntryDate(date);
    }

    @Override
    public List<DataEntry> getByDateRange(LocalDate startDate, LocalDate endDate) {
        return dataEntryRepository.findByEntryDateBetween(startDate, endDate);
    }

}
