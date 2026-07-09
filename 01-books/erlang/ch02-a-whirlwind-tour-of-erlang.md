# A Whirlwind Tour of Erlang

We'll make a file server. The file server has 2 concurrent processes;
one process is the server, and the other is the client.

## 2.1 The Shell

Each expression must be finished with a dot followed by a dot

### The = operator

Once we said X = 123, the X is 123 forever and cannot be changed.
It's is a *patten matching operator*, not *assign*.

### Syntax of variable and Atoms

Erlang variables start with uppercase characters.

## 2.2 Processes, Modules, and Compilation

Erlang programs are build from a number of parallel processes.
Processes evaluate functions that are defined in modules.
Modules are files with the extension `.erl` and must be compiled before they
can be run.

### Compiling and Runnign "hello world" in the shell

### Compiling outside the erlang shell

```sh
erlc hello.erl
$ erl -noshell -s hello start -s init stop
```

`-s hello start` means evalute the `hello:start`
`-s init stop` means evalute the `init:stop`

## 2.3 Hello, Concurrency

The basic unit of concurrency in Erlang is the process.
A process is a *lightweight virtual machine* that can communicate with other
processes only by sending and receiving messages.

### The File Server Process

To create a process, we call the primitive `spawn`, which creates the process.