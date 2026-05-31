# Shared-State concurrency

Message passing is a fine way of handling concurrency, but it's not the only one.
"Do not communicate by sharing memory, instead, share memory by communicating"
Consider this part "communicate by sharing memory".

Channels are similar to single ownership, you transfer a value down a channel, you should no longer
use that value.

Shared memory concurrency is like multiple ownership: multiple threads can access the same memory location at the same time.
This can add complexity because owners need managing.


## Using Mutexes to Allow Access to Data from one Thread at a time 

Mutex is mutual exclusion, allows one thread to access some data at any given time.
To access the data in the mutex: 
- First, asking to acquire the mutex's lock
- Second, done with the data, must unlock the data so other threads can acquire the lock

## The API of `Mutex<T>`

Create the mutex `let m = Mutex::new(...)`
Get the lock `let mut num = m.lock().unwrap()`
Use the data `*num = 6`

The num is a smart pointer, type `MutexGuard`, it will be drop at the end of the scope.
You will never forget unlock.

## Sharing a `Mutex<T>` between multiple threads

Can't move the mutex in different threads because the ownership rules.
Remember about `Rc<T>` becasue it allows multiple owner. But it won't work in context that has mutiple threads.
Cause compile errors

## Atomic Reference Counting with `Arc<T>` 

`Arc<T>` is like `Rc<T>`  that is safe to use concurrency situations.

Allow multiple ownership, in multiple threads
- Create an Arc `let counter = Arc::new(Mutex::new(0));` 
- Passing them to different threads `Arc::clone(...)`

## Similarities Between `RefCell<T>/Rc<T>` and `Mutex<T>/Arc<T>`

```rs
let conter = Mutex::new(5);
```

Notice that counter is **immutable**, but we could get a mutable reference to the value inside it.
This means `Mutex<T>` provides interior mutability as Cell family does. Same way `RefCell<T>`

Use `Rc<T>` with `RefCell<T>`
