# Using Thread to Run Code Simultaneously

An excuted program's code is run in a process, and the OS will manage multiple processes at once.
Within a proram, you can also have independent parts that run simultaneously.
The features that run these independent part are called *threads*.
For example, a web server could have multiple threads so that it can respond to more that one request at the same time.

Splitting the computation in your prgram into multiple threads to run multile tasks at the same time
can improve performance, but it also adds complexity. Because threads can run simultaneousely, there's
no inherent gurantee about the order in which parts of your code on different threads will run.
This can lead to problems, such as:
* Race conditions, in which threads are accessing data or resources in an inconsistent order
* Deadlocks, in which two threads are wainting for each other, preventing both threads from continuing
* Bugs that only happen in certaint situations and are hard to reproduce and fix reliably

Rust attemps to mitigate the negative effects of using threads, but programming in a multithreaded context still takes careful thought and requires a code structure that is different from that in programs running in a single thread.

Programming languages impelment threads in a few different ways, and many OS provide an API the programmig lanauge can call for creating new threads. The rust standard library uses a 1:1 model of thread implementation,
whereby a program uses one OS thread per one langauge thread.

There are creates that implement other models of threading that make different trade-offs to the 1:1 model.

## Createing a new therad with *spawn*

To create a new thread, we call the `thread::spawn` func and pass it a closure

```rs
fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi humber {i} from  the spawned thread.");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
            println!("hi humber {i} from  the main thread.");
            thread::sleep(Duration::from_millis(1));
    }
}
```

Note that when the main thread complete, all spaned thread are shut down.

```
hi number 1 from the main thread!
hi number 1 from the spawned thread!
hi number 2 from the main thread!
hi number 2 from the spawned thread!
hi number 3 from the main thread!
hi number 3 from the spawned thread!
hi number 4 from the main thread!
hi number 4 from the spawned thread!
hi number 5 from the spawned thread!
```

The calls to `thread::sleep` force a thread to stop its exection for a short duration, allowing a different thread to run.
The threads will probably take turns but that isn't guraranteed. It depends on how your OS schedules the threads.

## Waiting for all threads to finish

The code in Listing 16-1 not only stops the spanwed thread permaturely most of the time due to the main thread ending, but because there
is no gurantee on the order in which threads run, we also can't gurantee that the spaned thread will get to run at all.

We can fix the problem of the spanwed thread not running or it ending prematurely by saving the return value of the `thread::spawn` is a variable.
The return type is `JoinHandle<T>`, when we call `join` method on it, will wait for its thread to finish.

```rs
fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi humber {i} from  the spawned thread.");
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi humber {i} from  the main thread.");
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();
}
```

Calling `join` on the handle blocks the thread currently running until the thread represented by the handle terminates.
Blocking a thread means that thread is prevented from performing work or exiting.
Because we've pput the call join after the thread's for loop.

The two threads continue alterating, but the main thread waits because of the call to `handle.join()` and does not end until the spaned thread
is finished.

Let's see what happen when we instead mvoe `handle.join()` before teh for loop in main.

```
hi number 1 from the spawned thread!
hi number 2 from the spawned thread!
hi number 3 from the spawned thread!
hi number 4 from the spawned thread!
hi number 5 from the spawned thread!
hi number 6 from the spawned thread!
hi number 7 from the spawned thread!
hi number 8 from the spawned thread!
hi number 9 from the spawned thread!
hi number 1 from the main thread!
hi number 2 from the main thread!
hi number 3 from the main thread!
hi number 4 from the main thread!
```

The main thread will wait for teh spawned thead to finish and run, won't be interleaved anymore.

## Using move closure with threads

We often use *move* keyword with closures passed to `thread::spawn` because closure will then take ownership of the valus it used  from the env,
thus transfering ownership of those values from one thread to another thread

```rs
fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(|| {
        println!("Here's a vector: {v:?}");
    });

    handle.join().unwrap();
}
```
The closure use v, so it will capture v and make it part of the closure's env.
Because thread::spawn runs this closure in a new thread. we should be alboe to
access v inside that new thread.
But when we compile this example, we get the following error:
```
error[E0373]: closre may outline the current function, but it borrows `v`, which is owned by the current function
```

Rust invers how to capture v and because println! only need reference to v, the
closure tryies to borrow v. However, there's a problem: Rust can't tell how long
the spanwed thread will run, so it doesn't  