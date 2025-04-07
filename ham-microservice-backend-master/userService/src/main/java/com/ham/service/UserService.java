package com.ham.service;

import com.ham.model.User;
import com.ham.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        logger.info("Registering user with email: {}", user.getEmail());
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public boolean existsById(Integer id) {
        return userRepository.existsById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        logger.info("Fetching user by email: {}", email);
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Integer id) {
        logger.info("Fetching user by ID: {}", id);
        return userRepository.findById(id);
    }

    public List<User> getAllUsers(){
        logger.info("Fetching all users");
        return userRepository.findAll();
    }
    public List<User> getUsersByRole(String role) {
        logger.info("Fetching users by role: {}", role);
        return userRepository.findByRole(role);
    }

    public void deleteUserById(int id) {
        logger.warn("Deleting user with ID: {}", id);
        userRepository.deleteById(id);
    }
    public User updateUserById(int id,User user) {
        User user1 = userRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("User not found with ID: {}", id);
                    return new RuntimeException("User not present with " + id);
                });
        user1.setEmail(user.getEmail());
        user1.setName(user.getName());
        user1.setPhone(user.getPhone());
        return userRepository.save(user1);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
