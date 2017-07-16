/* concurrency playground */
import io.reactivex.Flowable;
import io.reactivex.schedulers.Schedulers;
import java.util.concurrent.*;
import java.lang.Thread;

public class concurrentplayground {
    public static void main(String[] args){
        // Java 8 double-colon operator refers to method itself
        Flowable.just("Hello world - double colon").subscribe(System.out::println);
        // same as:
        Flowable.just("Hello world - lambda").subscribe(data -> System.out.println(data));

        // chaining methods is called a fluent API which resembles the builder pattern.
        // all types immutable, works like Javascript promise
        Flowable.fromCallable(() -> {
            Thread.sleep(1000); //  imitate expensive computation
            return "Done.";
        })
            .subscribeOn(Schedulers.io())
            .observeOn(Schedulers.single())
            .subscribe(System.out::println, Throwable::printStackTrace);

        // square 1 to 10 (concurrent, but not parallel)
        Flowable.range(1, 10)
            .observeOn(Schedulers.computation())
            .map(v -> v * v)
            .blockingSubscribe(System.out::println);

        // square 1 to 10 (concurrent and parallel)
        Flowable.range(1, 10)
            .flatMap(v -> Flowable.just(v)
                .subscribeOn(Schedulers.computation())
                .map(w -> w * w)
            )
            .blockingSubscribe(System.out::println);

        try {
            Thread.sleep(2000); // wait for the flow to finish

        }
        catch(InterruptedException err){
            System.out.println(err);
        }
    }
}
