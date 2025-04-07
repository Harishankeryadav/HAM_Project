package com.ham.controller;

import com.ham.model.User;
import com.ham.model.UserLogin;
import com.ham.repo.UserRepository;
import com.ham.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public List<User> allUsers (){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public boolean userExistsById(@PathVariable Integer id) {
        return userService.existsById(id);
    }

    @GetMapping("/data/{id}")
    public Optional<User> getUserData(@PathVariable Integer id)
    {
        return userRepository.findById(id);
    }


    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        String email = user.getEmail();
        if(userRepository.existsByEmail(email))
        { return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        List<User> users = userService.getUsersByRole(role);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Optional<User>> loginUser(@RequestBody UserLogin userLogin) {
        Optional<User> user = userRepository.findByEmail(userLogin.getEmail());
        String password = userLogin.getPassword();
        if (user.isPresent() && userService.checkPassword(password,user.get().getPassword())) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).build();
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id,@RequestBody User user) {
        User updatedUser = userService.updateUserById(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            userService.deleteUserById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
