package com.ham.feign;

import com.ham.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient (name="USERSERVICE")
public interface userfeign {
    @GetMapping("users/{id}")
    boolean userExistsById(@PathVariable("id") Integer id);
    @GetMapping("users/data/{id}")
    public Optional<User> getUserData(@PathVariable Integer id);
}