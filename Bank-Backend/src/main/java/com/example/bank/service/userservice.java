package com.example.bank.service;

import com.example.bank.Entity.transaction;
import com.example.bank.Entity.user;
import com.example.bank.repository.transactionrepository;
import com.example.bank.repository.userrepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class userservice {

    @Autowired
    private userrepository ur;

    @Autowired
    private transactionrepository tr;



    public user createuser(String userid, String password) {
        if(ur.findByUsername(userid).isPresent()){
            throw new RuntimeException("User Already Exists");
        }
        else {
            String sc=generateaccountnumber();
            user use=new user(userid,password,sc);
            ur.save(use);
            return use;
        }
    }

    private String generateaccountnumber() {
        Random r=new Random();
        return String.valueOf(100000+ r.nextInt(90000000));
    }

    public Optional<user> login(String username, String password) {
            Optional<user> uss=ur.findByUsernameAndPassword(username,password);
            if(uss.isPresent()){
                return uss;

            }
            else {
                return Optional.empty();
            }

    }

    public String deposit(user us, double amount) {

        us.setBalance(us.getBalance()+amount);
        ur.save(us);


        transaction t=new transaction();
        t.setUser(us);
        t.setAmount(amount);
        t.setType("Depoit");
        tr.save(t);
        return "Amount "+amount +" is Deposited successfully";

    }

    public String withdraw(user us, double amount) {



        if(us.getBalance()>=amount){

        us.setBalance(Math.max(0,us.getBalance()-amount));
        ur.save(us);


        transaction t=new transaction();
        t.setUser(us);
        t.setAmount(amount);
        t.setType("Withdraw");
        tr.save(t);
        return "Amount "+amount +" is Withdraw successfully"; }
        else {
            return "Insufficient Balance";
        }
    }

    public List<transaction> statement(user us) {
        return  tr.findByuser(us);


    }



    public double checkbalance(user usss) {
        return usss.getBalance();
    }

    public String transferamount(String username, user usss, double amount) {
        Optional<user> destination=ur.findByUsername(username);
        if(destination.isPresent()){
            if(usss.getBalance()>=amount){

                double src=usss.getBalance()-amount;
                usss.setBalance(src);
                ur.save(usss);
                destination.get().setBalance(destination.get().getBalance()+amount);
                ur.save(destination.get());
                transaction t=new transaction();
                t.setUser(usss);
                t.setAmount(amount);
                t.setType("transfer");
                tr.save(t);

                return "Amount "+ amount+" transfer to "+" Account -> " +destination.get().getUsername();
            }
            else{
                return "Insufficiant Balance";
            }
        }
        else {
            return "Invalid Credential";
        }
    }
}
