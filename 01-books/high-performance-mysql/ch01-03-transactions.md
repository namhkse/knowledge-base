# Transactions

A transaction is a group of SQL statements that are treated atomically, as a single unit of work.
It's all or nothing.

Example: A banking application
Bank's database with two tables: checking and savings.
To move $200 from Jane's checking account to hersavings account. You need to perform 3 steps:
1. Make sure the checking account balance is greather than $200.
2. Substract $200 from the checking account balance.
3. Add $200 to the saving account balance.

The entire operation should be wrapped in a transaction.
So the SQL might look like this:

```sql
1   START TRASACTION;
2   SELECT balance FROM checking WHERE customer_id = 1;
3   UPDATE checking SET balance = balance - 200.00 WHERE customer_id = 1;
4   UPDATE saving SET balance = balance + 200.00 WHERE customer_id = 1;
5   COMMIT;
```

What happen if the database server crashes while performing line 4 ? 
What if another process comes along between lines 3 and 4 and removes the the checking account balance ?
This is why highly complex and slow two phase-commit systems exist.

Transactions aren't enough unless the system pass the ACID test. 

Atomicity: A transaction must be unit of work, it's all or nothing

Consistency: TODO: explain this

Isolation: Teh results of a transaction are usually invisible to other transactin until the transaction is complete.
**Remember usually invisible**

Durability: Once commited, a transaction's change are permanent

## Isolation Levels

ISO/IEC 9075-2:1999 (E) ©ISO/IEC 4.32 SQL-transactions

The isolation level specifies the kind of penomena that can occur during the execution of concurrent SQL-transactions.

1) P1("Dirty read"): 
SQL-transaction T1 modifies a row. 
SQL-transaction T2 then reads that row before T1 perform `COMMIT`.
If T1 then performs a `ROLLBACK`, T2 will have read a row that was never commited and that many thus be considered to have never exitsted.

2) P2("Non-repeatable read"): 
SQL-transaction T1 reads a row. 
SQL-transaction T2 then modifies or deletes that row and performs a `COMMIT`.
If T1 then attemps to reread the row, it may receive the modified value or discover that the row has been deleted.

3) P3("Phantom"):
SQL-transaction T1 reads the set of rows N that satifis some search conditions.
SQL-transaction T2 then executes SQL-statements that generate one or more rows that satisfy the search conditions used by SQL-transaction T1.
If T1 repeats the initial read with the same search condition, it obtains a different collection of rows.

| Level             | P1            | P2            | P3            |
|-------------------|---------------|---------------|---------------|
| READ UNCOMMITED   | Possible      | Possible      | Possible      |
| READ COMMITED     | Not Possible  | Possible      | Possible      |
| REPEATABLE READ   | Not Possible  | Not Possible  | Possbile      | 
| SERIALIZABLE      | Not Possible  | Not Possible  | Not Possible  |

## Deadlock

A deadlock is when 2 or more transactions are mutually holding and requesting locks on the same resouces, creating a cycle of dependencies.

Dealocks occur when transactions try to lock resources in a different order.
They can happen whenever multiple transactions lock the same resoruces.

For example, consider these two trnsactions running agains a `StockPrice` table.

Transaction 1
```sql
START TRANSACTION;
UPDATE StockPrice SET close = 45 WHERE stock_id = 4 AND date = '2020-05-01';
UPDATE StockPrice SET close = 19 WHERE stock_id = 3 AND date = '2020-05-02';
COMMIT;
```

Transaction 2
```sql
START TRANSACTION;
UPDATE StockPrice SET close = 20 WHERE stock_id = 3 AND date = '2020-05-01';
UPDATE StockPrice SET close = 47 WHERE stock_id = 4 AND date = '2020-05-02';
COMMIT;
```

Each trasaction will execute its first query and update a row data, locking that row in the PK index.
Each trasaction will execute its second row, and find that it is already locked.

To combat this problem, database systems implements various forms of deadlock detection and timeouts.
The InnoDB storage engine, will notice circular dependencises and return an error instantly.
Deadlocks are very slow queries, ohters will give up after the query exeeds a lock wait timeout.
InnoDB handles deadlocks is to roll back the transaction that has the fewest exclusive row locks.

## Transaction Logging

Transaction logging helps make trasactions more efficient.
Instead of updating the tables on disk each time a change occurs, the storeage engine can change its in-momory
copy of the data. This is very fast.

The storage engine can then write a record of the change to the transaction log, which is on disk.
Appending log evetns involes I/O in one small area of the disk instead of randon I/O in may place.
Then, at some later time, a proces scan update the table on disk.
Thus, most storage engines that use this technique aka *write-ahead logging*.

If there's a crash after the update is written to the transaction log but before the chagnes are made
to the data itself, the storage engine can still recover the changes.

## Transactions in MySQL

Storage engines are the software that drives hwo data will be stored and retrieved from disk.

MySQL offers a nubmer of storage engines.
InnoDB is now the gold standard and the recommended engine to use.

### unserdatnding AUTOCOMMIT

By default, a single `INSERT, UPDATE, DELETE` statement is wrapped in a transaction and committed immediately.
This si known as `AUTOCOMMIT` mode

```sql
SELECT @@AUTOCOMMIT
-- 0: OFF
-- 1: ON
```

With `AUTOCOMMIT` enabled, you start a multistatement transaction by `BEGIN` or `START TRANSACTION`.

Certain commands, when issued during an open transaction, cause MySQL to commit the transaction before they execute.
These are DLL commands, such as `ALTER TABLE, LOCK TABLE`

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

CREATE TABLE test(id INT);
```

So MySQL commit implicit does

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

COMMIT; -- commit the UPDATE

CREATE TABLE test(id INT);
```

MySQL lets you set the isolation lvel using the 
`SET TRANSACTION ISOLATION LEVEL`.

Which takes effect when the next trasaction starts.
You can set the isolation level for the whole server or just for your session.

`SET SESSION TRASANCTION ISOLATION LEVEL READ COMMITED;`

It is preferable to set at the server level and change it in explicit cases.

### Implicit and explicit locking

InnoDB uses a two phase locking protocol.
It can qcquire locks at any time during a transaction, but it doesn't not release them until a `COMMIT` or `ROLLBACK`.

In a transaction, it can acuire locks at any time, and release them in `COMMIT` or `ROLLBACK`.

MYSQL supports `LOCK`, which is implemetned in the server, not in the storage engine.
If you need transactions, use a transaction storage engine.

Example acquiring share lock.

Session A
```sql
START TRANSACTION;
SELECT * FROM dog WHERE id = 1 FOR SHARE;
```

Session B
```sql
START TRANSACTION;
UPDATE dog SET price = 10 WHERE id = 1;
```

Because Session A get a lock in the transaction and doesn't call `COMMIT` the Session B will get an error

`[2026-06-13 15:36:50] [40001][1205] Lock wait timeout exceeded; try restarting transaction`

Exampel acuqirign the X lock (exclusive lock).
Session A
```sql
START TRANSACTION;
SELECT * FROM dog WHERE id = 1 FOR UPDATE;
```

Other transaction cannot: UPDATE, DELETE, FOR SHARE, FOR UPDATE.

