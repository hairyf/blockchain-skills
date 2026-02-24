---
name: best-practices-reindexing
description: When and how to reindex the ord database (index.redb).
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/guides/reindexing.md)
---

# Reindexing ord

Reindexing means **deleting the ord index** and rebuilding it with `ord index update` or `ord server`. Do this when:

1. A new **major release** of ord changes the database schema.
2. The database is **corrupted**.

## Index location

Default index file: `index.redb` (redb). Default directory by OS:

| Platform | Path |
|----------|------|
| Linux | `$XDG_DATA_HOME/ord` or `$HOME/.local/share/ord` |
| macOS | `$HOME/Library/Application Support/ord` |
| Windows | `{FOLDERID_RoamingAppData}\ord` |

Full path example (macOS): `~/Library/Application Support/ord/index.redb`.

## Steps

1. Stop any running `ord server` (or other ord process using the index).
2. Delete the index file:  
   `rm "<data_dir>/index.redb"`  
   (or use `--datadir` / `--index` if you overrode paths.)
3. Rebuild:  
   `ord index update`  
   or start `ord server` (which will rebuild the index).

Custom paths:

```bash
ord --datadir /path/to/dir index update
ord --index /path/to/index.redb index update
```

Reindexing from scratch can take a long time on a full chain; ensure enough disk space and that bitcoind is synced with txindex.

<!--
Source references:
- sources/ordinals/docs/src/guides/reindexing.md
-->
