package com.example.bank.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class user {



    @Id
    private String username;
    private String password;
    private String accountnumber;

    private double balance=0.0;

    public user(String username, String password, String accountnumber) {
        this.username = username;
        this.password = password;
        this.accountnumber = accountnumber;
        this.balance=0.0;
    }
}
