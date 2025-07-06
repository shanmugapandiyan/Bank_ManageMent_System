package Bank_ManageMent_System;

import java.util.Date;

public class Transactions {
    Date date;
    double amount;
    String type;

    public Transactions(double amount, String type) {
        this.date=new Date();
        this.amount = amount;
        this.type = type;
    }

    @Override
    public String toString() {
        return "Transactions{" +
                "date=" + date +
                ", amount=" + amount +
                ", type='" + type + '\'' +
                '}';
    }
}
