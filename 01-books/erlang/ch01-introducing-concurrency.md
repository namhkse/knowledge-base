# Introducing Concurrency

I see a woman taking a dog for a walk.
I see a car trying to find a parking space.
I see a plane flying overhead and a boat sailing by.
All these things happne in parallel. In this book, we will learn how to 
describe parallel activities as sets of communicationg parallel processes.
We will lear how to write concurrent program.

If we have only single-core computer, then we can never run a parallel program
on it. This is because we have one CPU, an dit can do only one thing at a time.

However,we can run concurrent programs on single-core computer.
The computer time-shares between the different tasks, maintaining the illusion 
that the different tasks run in parallel.

We'll start with some simple concurrency modeling move on to see the benefits
of solving problems using concurrency, and finally look at some precise
definitions that highlight the different between concurrency and parallelism

## 1.1 Modeling Concurrency

I magine I see 4 people out for a walk. There are two dogs and a large
number of rabbits. The people are talking to each other, and the dogs want to
chase the rabbits.

To simulate this in Erlang, we'd make 4 modules calld `person, dog, rabbit, world.` The code for `person` would be in a file called `person.erl`:

```erlang
-module(person).-
export([init/1]).

init(Name -> ) ...
```

```erlang
-module(hello).
-export([hello/0]).

hello() ->
    io:format("Hello, world!~n").
```

`-module(person).` says that this file contains code for the module called `person`.

Following the module declaration is an *export declaration*. The export
declaration tells which functions in the module can be called from outside module. They are like *public* in many programming languages.

The syntax `-export([init/1])` means the func `init` with one arg (what `/1` means).
The brackets means "list of".

### Starting the Simulation

To start the program, we'll call `world:start().`.

```erlang
-module(world). -
export([start/0]).
start() ->
Joe = spawn(person, init, ["Joe"]),
Susannah = spawn(person, init, ["Susannah"]),
Dave = spawn(person, init, ["Dave"]),
Andy = spawn(person, init, ["Andy"]),
Rover = spawn(dog, init, ["Rover"]),
...
Rabbit1 = spawn(rabbit, init, ["Flopsy"]),
...
```

`spawn` is an Erlang primitive that creates a concurrent process and returns a
process identifier.

```erlang
spawn(<module-name>, <function-name>, [arg1, arg2, ..., argN])
```

When `spawn` is evaluated, the Erlang runtime creates a new process(not an OS
process but a lightweight process that is managed by the Erlang system).

The following call means start a progcess that evaluates the function `person:init("Joe")`

```erlang
spawn(person, init, ["Joe"])
```

> Analogy with objects
> Modules in Erlang are liek classes in OOPL,
> processes are like objects(or class instances) in an OOPL.
> `spawn` create a new process, like `new`.
> All the Erlang processes execute concurrently and independently

### Sending Message

We want to send messages between the different processes in the program.
In Erlang, proceses share no memory and can interact only with only each
other by sending messages. This is extractly how objects in the real world behave.

Suppose Joe wants to say something to Susannah.

```erlang
Susannah ! {self(), "Hope the dogs don't chase the rabbits"}
```

The syntax `Pid ! Msg` means send the message Msg to the process Pid.
`self()` argument identifies the process sendign the message(in this case Joe).

### Receiving Messages

For Susannah's process to receive the message from Joe, we'd write this:

```erlang
receive:
    {From, Message} ->
    ...
end
```

## 1.2 Benefits of Concurrency

Concurrent programming can be used to improve perf, to create scalable and
fault-tolerant system.

*Performance*   
You have 2 tasks, A which take 10s to perform, and B which takes 15s.
On single CPU doing both, A and B take 25s.
On 2 CPUs that operate independently, doing A and B will take 15s

*Scalability*   
Concurrent programs are made from small independent processes. We can easily
scale the system by increasing the number of processes and adding more CPUs.

*Fault tolerance*   
Erlang processes are made up of many small independent processes. Errors in
one process cannot crash another process.

*Clarity*   
In the real world things happen in parallel, but in most programming languages
things happen sequentialliy.
The mismatch between the parallelism in the real world and the sequentiality in our programming languages amkes writing real-world control problems in
sequential language difficult.

In Erlang we can mapp real-world parallelism onto Erlang concurrency in straightforward manner.

## 1.3 Concurrent Programs and Parallel Computers

A concurrent program is a program written in a concurrent programming  
language. We write concurrent programs for reasons of performance, scalability, or fault tolerance.

A parallel computer is a computer that has serveral processing units(CPUs or cores) that run at the same time.

## 1.4 Sequential vs. Concurrent programming languages

Programming languages fall into 2 categories:
- Sequential
- Concurrent
