package com.bootcamp.EcommerceBackend.repository;

import com.bootcamp.EcommerceBackend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByRole(String role);


}
