package com.ham.repo;

import com.ham.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
//    void deleteByEmail(String email);
    boolean existsByEmail(String email);
}
