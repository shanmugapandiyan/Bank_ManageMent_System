package Bank_ManageMent_System;

import java.util.*;

public class Bank_system {
    HashMap<Integer,Account> accounts=new HashMap<>();
    private static int Accountnumber=0;
    Scanner in=new Scanner(System.in);

    public void createAccount() {
        System.out.println("Enter your NAme :");
        String name=in.next();
        System.out.println("Enter Password For Your Account");
        int pass=in.nextInt();
        accounts.put(++Accountnumber,new Account(Accountnumber,name,pass));
        System.out.println("Account SuccessFully Created Your Account NUmber :"+Accountnumber);

    }

    public void Deposit() {
        System.out.println("Enter Your Account Number :");
        int an= in.nextInt();
        System.out.println("Enter Amount To be Deposit");
        double amount=in.nextDouble();
        Account acc=accounts.get(an);
        if(acc!=null){
            acc.setBalance(amount+ acc.getBalance());
            acc.getStatements().add(new Transactions(amount,"Depost"));
            System.out.println("Amount Deposited Succusfully");
        }
        else {
            System.out.println("Account Not Found");
        }

    }

    public void withdraw() {
        System.out.println("Enter Your Account Number :");
        int an= in.nextInt();
        System.out.println("Enter Amount To be withdraw");
        double amount=in.nextDouble();
        Account acc=accounts.get(an);
        if(acc!=null){
            if(acc.getBalance()>=amount){
                acc.setBalance( acc.getBalance()-amount);
            acc.getStatements().add(new Transactions(amount,"WithDraw"));
            System.out.println("Amount Withdrawed Succusfully");
            }
        }
        else {
            System.out.println("Account Not Found");
        }
    }

    public void Checkbalance() {
        System.out.println("Enter Your Account Number :");
        int an= in.nextInt();

        Account acc=accounts.get(an);
        if(acc!=null){

                System.out.println("Balance :"+acc.getBalance());

        }
        else {
            System.out.println("Account Not Found");
        }


    }

    public void viewminiStatement() {
        System.out.println("Enter Your Account Number :");
        int an= in.nextInt();
        Account acc=accounts.get(an);
        if(acc!=null){

            for(Transactions t: acc.statements){
                System.out.println(t);
            }
        }
        else {
            System.out.println("Account Not Found");
        }
    }

    public void viewAccountDetails() {
        for(Account a:accounts.values()){
            System.out.println(a);
        }
    }

    public void transfermoney() {
        System.out.println("Enter Source Account number");
        int sa= in.nextInt();
        System.out.println("Enter Reciver Account Number");
        int de=in.nextInt();
        System.out.println("Enter Amount To Transfer");
        double amt= in.nextDouble();
        Account source=accounts.get(sa);
        Account destination=accounts.get(de);
        if(source!=null && destination!=null){
                 if(source.getBalance()>=amt){
                     source.setBalance(source.getBalance()-amt);
                     source.getStatements().add(new Transactions(amt,"Tranfered to Account Number : "+destination));
                     destination.setBalance(destination.getBalance()+amt);
                     destination.getStatements().add(new Transactions(amt,"Received By Account NUmber :"+source));

                 }
                 else{
                     System.out.println("Insufficiant Amount");
                 }

        }
        else {
            System.out.println("Account Not Found Retry");
        }
    }
}
