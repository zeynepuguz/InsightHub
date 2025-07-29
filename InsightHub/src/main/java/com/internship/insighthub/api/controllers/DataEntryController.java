package com.internship.insighthub.api.controllers;

import com.internship.insighthub.business.abstracts.DataEntryService;
import com.internship.insighthub.business.abstracts.UserService;
import com.internship.insighthub.entities.DataEntry;
import com.internship.insighthub.entities.Users;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/data_entries")
@CrossOrigin("*")
public class DataEntryController {

    private final DataEntryService dataEntryService;
    private final UserService userService;

    public DataEntryController(DataEntryService dataEntryService, UserService userService) {
        this.dataEntryService = dataEntryService;
        this.userService = userService;
    }

    @GetMapping
    public List<DataEntry> getAllEntries() {
        return dataEntryService.getAll();
    }

    @GetMapping("/date-range")
    public List<DataEntry> getByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return dataEntryService.getByDateRange(startDate, endDate);
    }

    @GetMapping("/entries/user/{userId}")
    public List<DataEntry> getEntriesForUser(@PathVariable Long userId) {
        Users user = userService.getById(userId);

        if (user == null) {
            return List.of();
        }

        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            return dataEntryService.getAll();
        } else {
            return dataEntryService.getByUser(user);
        }
    }

    @GetMapping("/user/{userId}")
    public List<DataEntry> getByUser(@PathVariable Long userId) {
        Users user = userService.getAllUsers().stream()
                .filter(u -> u.getId() == userId)
                .findFirst()
                .orElse(null);

        if (user == null) {
            return List.of();
        }

        return dataEntryService.getByUser(user);
    }

    @GetMapping("/date/{date}")
    public List<DataEntry> getByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return this.dataEntryService.getByDate(date);
    }

    @PostMapping
    public ResponseEntity<?> createEntry(@RequestBody DataEntry entry) {
        try {
            if (entry.getUser() == null || entry.getUser().getId() == 0) {
                return ResponseEntity.badRequest().body("Kullanıcı bilgisi eksik.");
            }
            Users user = userService.getAllUsers().stream()
                    .filter(u -> u.getId() == entry.getUser().getId())
                    .findFirst()
                    .orElse(null);

            if (user == null) {
                return ResponseEntity.badRequest().body("Kullanıcı bulunamadı.");
            }

            entry.setUser(user);
            DataEntry savedEntry = dataEntryService.save(entry);
            return ResponseEntity.ok(savedEntry);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Hata oluştu: " + e.getMessage());
        }
    }

}


