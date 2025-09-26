package com.example.bank.repository;

import com.example.bank.Entity.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface userrepository extends JpaRepository<user,String> {


    Optional<user> findByUsernameAndPassword(String username,String password);
    Optional<user> findByUsername(String userid);
}
