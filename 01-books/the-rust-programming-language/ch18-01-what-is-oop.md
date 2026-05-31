# Characteristic of oop language

## Objects contain data and behavior

The Gang of Four book defines OOP in this way:

> Object-oriented programs are made up of objects. An **object** packages both data
> and the procedures that operation on that data. The procedures are typically called 
> **methods** or **operation**

Using this defineition, Rust is object oriented: struct and enum have data, and
`impl` block provide methods on strucs and enums.

## Encapsulation that hides implementation details

Which means that the implemeantion details of an object aren't accessible to code using that object.
Therefore, the only way to interact with an object is through its pbulic API.
Code using the object shouldn't be abloe to reach into the object's internals and change data or
behavior directly. 

## Inheritance as a type system and as code sharing

Inheritance is a mechanism whereby an object can inherit elements from another object's definition,
thus gaining the parent object's data and behavior without you having to define them again. 

You would choose inheritance for two main reasons:
- Reuse of code
- Enable a child to be used in the same places as the parent type. Aka *polymorphism*.

> Polymorphism
> To many people, polymprphism is synonymous with inheritance. But it's actually a more
> general concept that refers to code that can work with data of multiple types. For inheritance
> those types are generally subclasses.