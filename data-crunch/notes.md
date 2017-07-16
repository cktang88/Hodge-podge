# Notes

* RxJava2 is entire rewritten to be compatible with Reactive Streams spec. **Reactive Streams** is an initiative to provide a standard for asynchronous stream processing with non-blocking back pressure. **Backpressure** is when Observer emits events faster than can be consumed.

* RxJava 2 introduces a new base type called Flowable which is an Observable with backpressure support. Backpressure is when an Observable emits values faster than an Observer is able to handle. With RxJava2, Observables do not support backpressure while Flowables will support backpressure (with different strategies).

* Work is under way to make the Java implementation of Reactive Streams part of Java 9: Doug Lea, leader of JSR 166, has proposed[6] a new Flow class[7] that will include the interfaces currently provided by Reactive Streams


* RxJava operators don't work with Threads or ExecutorServices directly but with so called Schedulers that abstract away sources of concurrency behind an uniform API.

* In RxJava the default Schedulers run on daemon threads, which means once the Java main thread exits, they all get stopped and background computations may never happen.

* Practically, paralellism in RxJava means running independent flows and merging their results back into a single flow. The operator flatMap does this by first mapping each number from 1 to 10 into its own individual Flowable, runs them and merges the computed squares.