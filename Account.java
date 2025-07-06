package Bank_ManageMent_System;

import java.util.*;

public class Account {
    private int accountnumber;
    private int password;
    private String name;
    private double balance;
    List<Transactions> statements;

    public Account(int accountnumber, String name, int password) {
        this.accountnumber = accountnumber;
        this.name = name;
        this.password = password;
        this.balance=0.0;
        this.statements=new ArrayList<>();

    }

    @Override
    public String toString() {
        return "Account{" +
                "accountnumber=" + accountnumber +
                ", password=" + password +
                ", name='" + name + '\'' +
                ", balance=" + balance +
                '}';
    }

    public int getAccountnumber() {
        return accountnumber;
    }

    public double getBalance() {
        return balance;
    }

    public String getName() {
        return name;
    }

    public int getPassword() {
        return password;
    }


    public List<Transactions> getStatements() {
        return statements;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public void setStatements(List<Transactions> statements) {
        this.statements = statements;
    }
}
