package com.internship.insighthub.api.controllers;

import com.internship.insighthub.business.abstracts.UserService;
import com.internship.insighthub.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Transactional
    @GetMapping("/getAll")
    public List<Users> getAllUsers(){
        return this.userService.getAllUsers();
    }

    @PostMapping("/newUser")
    public Users createUser(@RequestBody Users user) {
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users loginRequest) {
        Optional<Users> userOpt = userService.findByEmail(loginRequest.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı bulunamadı.");
        }

        Users user = userOpt.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Şifre yanlış.");
        }

        return ResponseEntity.ok(user);
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(
            @RequestParam String email,
            @RequestParam String newPassword) {

        Optional<Users> userOptional = userService.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kullanıcı bulunamadı.");
        }

        Users user = userOptional.get();
        user.setPassword(newPassword);
        userService.saveUser(user);

        return ResponseEntity.ok("Şifre güncellendi.");
    }



}
