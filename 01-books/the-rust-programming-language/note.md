# Futures and the Async Syntax

The key elements of asyncronous programming in Rust:
- Futures
- `async` and `await` keywords

You can apply the async keyword to blocks and functions to specify that they can be interrupted and resumed.

Within an async block or async function, you can use the `await` keyrod to await a future(that is, wait for it to become ready).

Any point whre you await a future  within an async block or function is potential spot for that block or
function to pause and resume.
The process of checking within a future to see if its value is available yet is called polling.

Rust compiles async blocks, async functions to `Future`, much as it compiles `for` loop into code using the `Iterator` trait.

## our First Async Program: Web scraper

```rs
async fn page_title(url: &str) -> Option<String> {
    let response = trpl::get(url).await;
    let response_text = response.text().await;
    Html::parse(&response_text)
        .select_first("title")
        .map(|title| title.inner_html())
}
```

For the `get` function, we have to wait for the server to send back the first part of its response (HTTP headers, cookies).
For the `text` function, the body is very large, can take some time for it all to arrive.

Futures in Rust are lazy: they don't do anything until you ask them to with the `await` keyword.
This laziness allows Rust to avoid running async code until it's actually needed.

When Rusts see a block marked with the `async` keyword, it compiles it into a unique, anonymous data type
that implements the `Future` trait.

Async functions, Rust compile it to a non-async function whose body is an async block. 

```rs
async fn do_async -> String {...}

// After Rust compiles

fn do_non_async -> impl Future<Output = String> {
    async move {
        ...
    }
}
```

## Executing an Async Function with a Runtime

The `main` can't be marked `async` is that async code nees a runtime: a rust create that manages the details of
executing asynchronous code.
A `main` function can initialize a runtime, but it's not a runtime itself.

Every  Rust program that executes async code has at least one place where ti sets up a runtime that executes the futures.

Each await point, that is, every place where the code uses the `await` keyword, represetns a place where control is
handed back to the runtime

Explain `Each await point ...`
When rust reachs an `.await`, the currenc async function can pause so other task can run
```rs
async fn download() {
    let text = get_data().await;
    prinln("{text}");
}
```

At this line 
```rs
get_data().await
```

Rust does:
1. Start the operation `get_data`
2. Check if it is finished
3. If not finished
    - pause this async function
    - save its current state
    - return control to the async runtime
4. The runtime can now run other async tasks
5. Later, when `get_data` is ready, the runtime resumes this function from the `.await`

So 
> "control is handed back to the runtime"
means:
> "this task stops running teporarily and the runtime decides what to run next."

Q: What runs the async code ?
A: The executor, it is a part of a runtime responsible for executing the async code.

## Racing two URLs against each other concurrently

```rs
use trpl::{Either, Html};

fn main() {
    let args: Vec<String> = std::env::args().collect();

    trpl::block_on(async {
        let title_fut_1 = page_title(&args[1]);
        let title_fut_2 = page_title(&args[2]);

        let (url, maybe_title) =
            match trpl::select(title_fut_1, title_fut_2).await {
                Either::Left(left) => left,
                Either::Right(right) => right,
            };

        println!("{url} returned first");
        match maybe_title {
            Some(title) => println!("Its page title was: '{title}'"),
            None => println!("It had no title."),
        }
    })
}

async fn page_title(url: &str) -> (&str, Option<String>) {
    let response_text = trpl::get(url).await.text().await;
    let title = Html::parse(&response_text)
        .select_first("title")
        .map(|title| title.inner_html());
    (url, title)
}
```