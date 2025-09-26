package com.example.bank.repository;

import com.example.bank.Entity.transaction;
import com.example.bank.Entity.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface transactionrepository extends JpaRepository<transaction,Long > {

    List<transaction> findByuser(user user);
}
