# Microservices overview

Microservices is not a technology.
It is a desing principle for building software.

It is a small thing for a small team.

A single domain is in a set of feature.

The microservice is the single owner of the business doomain's data managed in some data store.

# What are cloud-native data services

The cloud is a infrastructure that supports on-demand provisioning of computer resources.
The cloud allows you to easily manage and dynamically scalle your applications.

A microservice application needs basic principle to run in the cloud. These priciples are ofen
referred to as 12-factor.

# Throughput overview

Microservices expose interfaces to csutomers or users (a.k.a clients).

A very popular microservie can hava a large of clients.
Each client may submit many requests for data using the microservice interfaces.
There may be many requests to read and write data.

For example, the clients need to read customer's address information, or product's detail.
There may aslo need to write or insert a new payment purchase to saved in the microservices database.

There may be many requests to query data from a database, or consume and publish data from a messaging system.

Throughtput is defined as the number of requests or transactios per second, TPS for short.

> How do you achive high throughtput ?

Imagine you have 100 payment transactions to process. If you have 1 payment app that can only
process one payment at a time, or single threaded, you will have low throughput.
You can increase the throughput if one application can do more than than one payment
transaction at a time, using something called software threads.

Two payment app instances can complete the work faster than one, even if that one app is
multi-threaded.

It's important to consider scalling applications based how they are used.

Because cloud native applications are stateless, you can easily scale the number of application instances to handle higher throughtput.

Dataservices can become bottelneck

# Why is hight throughtput with microservices important?

# High throughtput scalability

> **Scalability**  
> Ability to dynamically increase capacity as needed to handle demand increases

Vertical scaling: Adding resources to a server (scaling up)
- Memory
- CPU core
- Network bandwidth
- Disk I/O speed

Horizontal scaling: using a convention known as clustering.
A cluster allows you to have multiple servers that manage your data. The application are able
to read or write data from any instance in the cluster. Increasing the number of  




