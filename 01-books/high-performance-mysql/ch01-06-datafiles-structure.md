# Datafiles structure

In version 8.0, MySQL redesigned table metadata into a data dictionary that is included with table's .idb file.

Instead relyion only on `information_scheme` for regrieving table defintion and metadata.
We are introduced to the dictionary object cache.

This change in how the server accesses metadat about tables reduces I/O and is efficient.
