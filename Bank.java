package Bank_ManageMent_System;
import java.util.*;
public class Bank {
    public static void main(String[] args) {
        Scanner in=new Scanner(System.in);
        Bank_system o=new Bank_system();
        boolean t=true;
        while(t){

            System.out.println("\n1.Create Account \n2.Deposit Amount\n3.Withdraw Amount \n4.Check Balance \n5.View StateMent \n6.View Account Details\n 7.Transfer Money\n8.Exit");
            int c=in.nextInt();
            switch (c){
                case 1:
                    o.createAccount();
                    break;
                case 2:
                    o.Deposit();
                    break;
                case 3:
                    o.withdraw();
                    break;
                case 4:
                    o.Checkbalance();
                    break;
                case 5:
                    o.viewminiStatement();
                    break;
                case 6:
                    o.viewAccountDetails();
                    break;
                case 7:
                    o.transfermoney();
                    break;
                case 8:
                    System.out.println("--------------THANK YOU--------------------");
                    t=false;
                    break;
            }
        }
    }
}
