import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
public class Test {
    public static void main(String[] args) {
        System.out.println("Input your name: ");
        Scanner my=new Scanner(System.in);
        String n;
        n=my.nextLine();
        System.out.println("Input your age: ");
        int m;
        m=my.nextInt();
        LocalDate y;
        y = LocalDate.now();
        
        System.out.println("Current date is: "+y);
        LocalTime t;
        t=LocalTime.now();
        System.out.println("Current time is: "+t);
        
        
    }
}
