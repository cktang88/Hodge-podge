/* concurrency playground */
import io.reactivex.Flowable;
import io.reactivex.schedulers.Schedulers;
import java.util.concurrent.*;
import java.lang.Thread;

public class server {
    public static void main(String[] args){
        // Java 8 double-colon operator refers to method itself
        Flowable.just("Hello world - double colon").subscribe(System.out::println);
        // same as:
        Flowable.just("Hello world - lambda").subscribe(data -> System.out.println(data));

        Flowable.fromCallable(() -> {
            Thread.sleep(1000); //  imitate expensive computation
            return "Done.";
        })
        .subscribeOn(Schedulers.io())
        .observeOn(Schedulers.single())
        .subscribe(System.out::println, Throwable::printStackTrace);

        try {
            Thread.sleep(2000); // <--- wait for the flow to finish
        }
        catch(InterruptedException err){
            System.out.println(err);
        }
    }
}
