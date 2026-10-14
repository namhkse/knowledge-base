# CHAPTER 1 Introduction

Architecture is about the important stuff... whatever that is.

# Defining Software Architecture

Some architects refer to software architecture as the blueprint of the system, while others define it as the 
roadmap for developing a system. 

Software architecture consistes of the structure of the system:
- structure
- architecture characteristics
- architecture decisions
- disign principles

The structure of the system refers to the type or archietcture style the systme is implemented (such as 
microservice, layred or microkernel).

Suppose an architect is asked to describe an architecture and teh architect responds:
"its' a microservices architecture"
Hre the architect is only talking about the *structure* of the system, but not the architecture of the system.
Lacking arch characteristics, arch decisions, design decisions, design principles. 

The arch characteristics define the success criteria of a system.
Notice that all of teh chracterisistcs listed do not require knowledge of teh functionality of the system
yet they are required in order for the system to functioan properly.

Architecture characteristics refers to the *-ilities* that the system must support.
- Availability
- Reliability
- Testability
- Scalability
- Security
- Agility
- More...

Architecture decisions define the rules for how a system should be constructred.
For example, an architect might make an architecture decision that only the business and services layers
within an layered architecture can access the database, restricting the presentation layer from making direct 
database calls

A design principle differs from an architecture decision in that a design principle is a guidelien rather than
a hard-and-fast rule.
For example, the design priciple illustrated that the development teams shoudl leverage asynchromnous messaging
between services within a microservies architecture to increase performance.
