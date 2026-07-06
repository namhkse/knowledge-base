# Why caching ?

Caching allows you to skip doing important things

```
MUL 6 7
    result: 42
MUL 3 4
    result: 12
MUL 373 2389
    result: 891,097
MUL 1839 2383
    result: 4,382,337
MUL 16 12
    result: 192
MUL 3 4
    result: 12
```

`MUL 3 4` is repeated. If the service already has performed the same operation and return teh same
result, why should it have to redo the same operation.

This is where the caching comes into play