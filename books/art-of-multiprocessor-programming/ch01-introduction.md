# 1 Introduction

The major chip manufacturers have given up trying to make processors run faster.
Instead, manufacturers are turning to "multicore" architecturesa.
Multiple processors (cores) comunicate directly through shared hardware caches.

Multiprocessors chips make computing more effective by exploiting parallelism.

## 1.1 Shared Objects and Synchronization

Your boss asks you to find all primes between 1 and $10^10$, using a parallel machine that supports 10 concurrent threads.   
This machine is rented by the minute, so the longer your program takes, the more it costs.

As a first attempt, you might ocnisder giving each thread an equal share of the input domain. Each thread might check $10^9$ numbers.

```java
void primePrint {
    int i = ThreadID.get(); // thread IDs are in {0..9}
    int block = power(10, 9);
    for (int j = (i * block) + 1; j <= (i + 1) block; j++) {
        if (isPrime(j)) {
            print(j);
        }
    }
}
```

Figure 1.1 Balancing load by dividing up the input domain.

This approach fails. Equal ranges of inputs do not necessarily produce equal amounts of work.
Primes do not occur uniformly: many primes between 1 and $10^9$, hardly any between 9 * 10^9 and 10^10.   
To make matters worse, the computation time per prime is not the same in all range: it takes longer to test whether a large number in prime than a small number.   
In short, there is no reason to belive that the work will be dived equally among the theads, and it is not clear even wich thread will have the most work.

A more promissing way to split the work among the threads is to assign each thread one integer at time. When a thread is finished with testing an integer, it asks for another. To this end, we introduce a *shared counter*, an obj that encapsulates an integer value, and that provides a `getAndIncrement()` method that increment its value, and return the counter's prior value to the caller.

```java
Counter counter = new Counter(1);       // shared by all threads
void primePrint {
    long i = 0;
    long limit = power(10, 10);
    while(i < limit) {                  // loop until all number taken
        i = counter.getAndIncrement();  // take next untaken number
        if (isPrime(i))
            print(i);
    }
}
```
Figure 1.2 Balancing the work load using a shared counter. Each thread gets a dynamically determined number of numbers to test.

```java
public class Counter {
    private long value;     // counter start at one
    public Counter(int i) {
        value = i;
    }

    public long getAndIncrement() {
        return value++;
    }
}
```
Figure 1.3 An implementation of the shared counter.

This counter implementation works well when used by a singled thread, but it fails when shared by multiple threads. The problem is that the expression   
`return value++;`  
is actually an abbreviation of the following:
```java
long temp = value;
value = temp + 1;
return temp;
```

In this code, *value* is a field of the Counter object, and is shared among all the threads. Each thread, howerver, has it own local copy of *temp*, which is a local variable to each thread.

Now imagine that thread A and B both call the counter's getAndIncrement() method at about the same time. They simultaneously read 1 from the value, set their local temp variable to 1, value to 2, and both return 1.
Concurrent calls to the counter's getAndIncrement() reutrn the same value, we expect them to return distinct values.   
In fact, it could get even worse
1. Thread 1 reads 1 from the value, doesn't set value to 2
2. Thread 2 reads 1 and set value to 2
3. Thread 3 reads 2 and set to 3 
4. Thread 1 sets value to 2

The heart of the problem is that incrementing the counter's value require 2 distinct operations on the shared vairable: reading the value and writing it back to Counter object.

We have two ways that solve above read-modify-write problem.   

1. Modern multiprocessor hardware provides speical read-modify-write instruction that allow threads to read, modify, and write a value to memory in one automic hardware step.

2. Automic behavior by guranteeeing in software(using only read and write instructions) that only one thead executes the read-and-write sequence at time. The problem of making sure that only one thead at time can execute a particular block of code is called *mutual exclusion* problem, is one of the classic coordination problem in multiprocessor programming.

## 1.2 A Fable

We prefer to think of concurrent coordination problems as if they were physics problems. We now present a sequence of fables, illustrating some of the basic problems.   
Like most authors of fables, we retell stories mostly invented by other.   
Alcie and Bob are neightbors, and they shared a yard. Alice owns a cat and Bob owns a dog. Both pets like to run around in the yard, but they do not get along. after soem unfortuante experientces, Alice and Bob aggre that they should cooridiante to make sure that bot pes are never in the yard at the same time.

How should they do it ? Alice and Bob need to agree on mutually compatible procedures of deciding what to do. We call such an agreement a cooridnation protocol.   
   They yard is large, so Alice cannot simply look out the window to check wheter Bob's dog is present. She could perhaps walk over to Bob's house and knwo on the door, but that takes a long time, and what if it rains? Alice might lean out the window and shout "Hey Bob! Can I let the cat out?" The problem is that Bob might not hear her. He could be watching TV, visiting his gf, or out shpping of dog food. They could try to coordinate by cell phone, but the same difficuliteis arise if Bob is in the shower, drivng through a tunnel or recharing this phone's batteries.

   Allice has a clever idea. She sets up one or more mepty beer cans on Bob's windowshill, tires a string around each one and runs the string back to her house. When she wants to send a signal to Bob, she yanks the string to knock over onf of the cans. When bob notices a can has been knocked over, he reests the can.
