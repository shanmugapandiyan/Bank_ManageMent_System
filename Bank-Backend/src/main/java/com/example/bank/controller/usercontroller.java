package com.example.bank.controller;

import com.example.bank.Entity.transaction;
import com.example.bank.Entity.user;
import com.example.bank.service.userservice;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000/",allowCredentials = "True")
public class usercontroller {

    @Autowired
    public userservice userservice;

    @PostMapping("/signup")
    public ResponseEntity<user> newuser(@RequestParam("username") String username,@RequestParam("password") String password){
        user u=userservice.createuser(username,password);
        return ResponseEntity.ok(u);
    }
    @PostMapping("/login")
    public String login(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession session) {
        Optional<user> userr=userservice.login(username,password);
        if(userr.isPresent()){
                session.setAttribute("user",userr.get());
                return "Login in SuccessFully";
        }
        else {
            return "INVALID CREDENTIAL";
        }
     }
     @PostMapping("/deposit")
    public String deposit( @RequestParam("amount") double amount ,HttpSession session){
        user us= (user) session.getAttribute("user");
        if(us!=null){
           return userservice.deposit(us,amount);

        }
        else {
                return "please login First";
        }
     }
     @PostMapping("/withdraw")
    public String withdraw(@RequestParam("amount") double amount,HttpSession session){
         user us= (user) session.getAttribute("user");
         if(us!=null){
             return userservice.withdraw(us,amount);

         }
         else {
             return "please login First";
         }
     }
     @GetMapping("/history")
    public List<transaction> statement(HttpSession session){
         user us= (user) session.getAttribute("user");
         if(us!=null){
             return userservice.statement(us);

         }
         else {
             throw new RuntimeException("retry");

         }
     }
    @GetMapping("/balance")
    public double balance(HttpSession session){
        user usss=(user) session.getAttribute("user");
        if(usss!=null){
            return userservice.checkbalance(usss); }
        else {
            throw new RuntimeException("first Login ");
        }
    }
    @PostMapping("/transfer")
    public String transfer(@RequestParam("username") String username,@RequestParam("amount") double amount, HttpSession session){
        user usss=(user) session.getAttribute("user");
        if(usss!=null){
            return userservice.transferamount(username,usss,amount); }
        else {
            throw new RuntimeException("first Login ");
        }
    }


    @PostMapping("/logout")
    public String logout(HttpSession session){
        session.invalidate();
        return "logout successfully";
     }








}
