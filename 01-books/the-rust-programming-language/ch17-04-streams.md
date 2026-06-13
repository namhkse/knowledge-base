# Streams: Futures in Sequence

The async `rx.recv` method produces a sequence of items over time.
This pattern is stream.

Many concepts are naturally represented as streams:
- items becoming available in a queue
- chunks of data being pulled incrementally from the filesystem
- data arriving over the network over time

Because streams are futures, we can use them with any other kind of future and
combine them in interesting ways.

Example: we can batch up evetns to avoid trigger to many network calls,
set timeouts on sequences of long-running operations.

There are two differents between iterators and the async channel receiver.
- iterators are synchronous, while the channel receiver is asynchronous
- When working with `Iterator`, we call its synchronous `recv` method.
With the `trpl::Receiver` stream in particular, we call asynchronous `recv`. 

Streams provide the next item the way `Iterator` does, but asynchronously.

```rs
let values = [1, 2, 3, 4, 5];
let iter = values.iter().map(|n| n * 2);
let mut stream = trpl::stream_from_iter(iter);

while let Some(value) = stream.next().await {
    println!("value: {value}");
}
```