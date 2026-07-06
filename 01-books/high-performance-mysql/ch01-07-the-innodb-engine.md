# The InnoDB Engine

InnoDB is transactin storage engine, general-purpose storage engine
It was designed for processing many short lived transactions that usallly complete rather
beging rolled back.

It is best practice to use the InnoDB storage engine.

InnoDB uses MVCC to achives high concurrency, and 4 SQL standard isolation levels.
Default isolation level is `REPEATABLE READ`.

It prevents phantom reads with next-key locing stratergy.

InnoDB provies very fast primary key lookups because it uses special index structures.