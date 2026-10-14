
# Chapter 7. Types, Methods and Interfaces

## Interfaces are type-safe duck typing

Go's interfaces are implemented implicitly.

## Embedding and Interfaces

Embedding is not only for structs.
You can also embed an interface in an interface.

## Accept interfaces, return structs

The reason your functions should return concrete types is they make it easier to update a function's return
values in new versions of your code.

## Interfaces and nil

Interfaces are implemented as a struct with 2 fields
- a pointer of the value
- a pointer of the value's type

## Interfaces are comparable

## The empty interface says nothing

You need a way to say that a variable could store a value of any type.

## Type Assertions and Type Switches

TODO: read

## Function Types are a bridge to interface

# Chapter 9. Errors

Go handles errors by returning a value of type `error` as the last return value for a function.

Go's library provides 2 ways to create an error from a string.
- The `errors.New` function.
- The `fmt.Errorf` function.

You can define your own errors.

# Chapter 9. Go modules

The `import` statement.
Capitalization names.