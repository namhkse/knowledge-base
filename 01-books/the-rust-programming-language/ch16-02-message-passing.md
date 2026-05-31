# Using Message Passing to Transfer Data between Threads

One popular approach to ensuring safe concurrency is `message passing`.
Slogan: *Do not communicate by sharing memory; instead, share memory by communicating*
Rust has message-sending concurrency, it is *channel*
Imagine a channel in programming as being like a channel of water, such as stream or river.
A channel has two halves: a transmitter and a receiver.

## Channels and Ownership Transference

Concurrency mistakes has caused a compile-time error.
The `send` function takes ownership of its parameter, and when the value is moved, the receiver takes ownership of it.

## Sending Multiple Values and Seeing the Receiver Waiting

Put the transmitter in a thread, put the receiver in other thread.
Invoke `send` method in the transmitter to send the data. Use `recv()` in the receiver (NOTE this will block the thread that has the receiver)
Or you can use `try_recv`, if you want to wait, use `for received in rx {...}`

## Creating Multiple Producers by Cloning the Transmitter

Can't pass the transmitter in multiple threads because the ownership rules.
Let's clone the transmitter by using `Sender::clone` function.
