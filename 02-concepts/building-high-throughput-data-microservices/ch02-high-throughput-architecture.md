# High throughput data architectures using Spring

Most microservices that process data are designed based on a 
- Batching architecture
- Event streaming architecture
- API architecture

# Database throughput

Vertical scaling
- CPU cores: Improved concurrency read/write
- Memory: memory faster than disk
- Disk: faster read/write operations
- Improves bytes-per-second throughput

Horizontal Scaling
- Replicate

# Batch architecture throughput

A batch is application is a short-live pocess.

```
[ Source ] ---> [ Batch App ] --> [Target]
```

Sources and target can be:
- FPT
- Network storage
- Database
- Event stream

There are several throughtput limitations thaht you should consider with a batch application.
- Typically start based on a time schedule
- Scaling batch application horizontaly is limited.
    If you horizontally scale a batch application into multiple instances taht process the
    same file, this will result in duplicate processing

# Event streaming throughput

An event streaming architecture consists of a broker.

The event broker is a long lived or long running data service that facilitates asynchronous communication two type of application.

That is publisher applications and consumer applications where the communication is in the 
real time.

```mermaid
flowchart LR

Publisher ---> Event Streaming Broker ---> Consumer
```

Vertical scaling:
- Memory: faster processing
- CPU cores: faster processing,
- Disk: IO
- Bandwidth

Horizontal scaling:
Scale yor brokers accross multiple servers

# RabbitMQ stream for high throughput

Single and cluster

Super stream

# Apache Kafka for high throughput

Kafka tracks message, have one consumer app.


