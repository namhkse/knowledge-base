# Applying concurrency with Async

The APIs for working with concurrency using async are very similar to those for using threads.
In ohter case, they end up being quite different.

## Create a new task with spawn_task

## Sending data betwee two task using message passing

Sharing data betwen futures will also be familiar.

```rs
let (tx, mut rx) = trpl::channel();

let val = String::from("hi");
tx.send(val).unwrap();

let received = rx.recv().await.unwrap();
println!("received '{received}'");

```

`trpl::channel` is an async version channel API.
`recv` produces a futrue we need to await.

The synchronous `Receiver::recv` method in `std::mpsc::channel` block until it receives a message.
The `trpl::Receiveer::recv` method does not, because it is async. Intead of blocking, it hands control back to
the runtime until either a message is received or the send side of the channel closes.

```rs
let (tx, mut rx) = trpl::channel();

let vals = vec![
    String::from("hi"),
    String::from("from"),
    String::from("the"),
    String::from("future"),
];

for val in vals {
    tx.send(val).unwrap();
    trpl::sleep(Duration::from_millis(500)).await;
}

while let Some(value) = rx.recv().await {
    println!("received '{value}'");
}
```

Unfortunately, there still a couple of problems.
- The message do not arrive at 500ms, they arrive all at once, 2s (2000ms)
- The program also never exits, you need to shutdown it using `ctrl-c`

## Code within one async block executes linearly

Within a async lbock, the roder in which `await` keywords appear in the code is also the order
in which they're executed when program runs.
So everything in it runs linearly. There's still n oconcurrency.

To get the behavior we want, where the sleep delay happnes between each message, we need to put
tx, rx in their own async blocks.

```rs
fn main() {
    trpl::block_on(async {
        let (tx, mut rx) = trpl::channel();

        let tx_fut = async {
            let vals = vec![
                String::from("hi"),
                String::from("from"),
                String::from("the"),
                String::from("future"),
            ];

            for val in vals {
                tx.send(val).unwrap();
                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        let rx_fut = async {
            while let Some(value) = rx.recv().await {
                println!("received '{value}'");
            }
        };

        trpl::join(tx_fut, rx_fut).await;
    });
}
```
Now message is printed after each 500ms. But the program doens't exit.

## Moving Ownerships into an async block

The programm still never exits because
- `trpl::join` complete only once both futures passed to it have completed
- The tx_fut future complete once it finishs sleeping after sending the last message.
- The rx_fut future won't complete end until `rx.recv` procudes `None`
- Awaiting `rx.recv` will retunr `None` only once the other of the channel is cloded.
- The channel will close only if we call `rx.close` or when the sender tx is dropped.
- We don't call `rx.close`, tx won't be dropped until the `block_on` end
- The `block_on` won't end because the `trpl::join` completing

Right now, the async block only borrows `tx`, we could move `tx` into async block so it would be dropped once that
block ends.

```rs
fn main() {
    trpl::block_on(async {
        let (tx, mut rx) = trpl::channel();

        let tx_fut = move async {
            let vals = vec![
                String::from("hi"),
                String::from("from"),
                String::from("the"),
                String::from("future"),
            ];

            for val in vals {
                tx.send(val).unwrap();
                trpl::sleep(Duration::from_millis(500)).await;
            }
        };

        let rx_fut = async {
            while let Some(value) = rx.recv().await {
                println!("received '{value}'");
            }
        };

        trpl::join(tx_fut, rx_fut).await;
    });
}
```

Now, it shutdowns gracefully after the last message is sent and received.

## Joining a number of futres with the join! macro

Create multiple producer channel, call `clone` on the `tx`