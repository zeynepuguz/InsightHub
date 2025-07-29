package com.internship.insighthub.business.abstracts;

import com.internship.insighthub.entities.Users;

import java.util.List;
import java.util.Optional;

public interface UserService {

    Users saveUser(Users user);
    List<Users> getAllUsers();
    Optional<Users> getUserByEmail(String email);
    Optional<Users> findByEmail(String email);
    Users getById(Long userId);
}
