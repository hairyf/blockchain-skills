---
name: geth-beacon-engine
description: Post-merge beacon/Engine API - consensus client connection, JWT auth, checkpoint sync.
---

# Beacon and Engine API

After the Merge, geth (execution) must pair with a consensus client. Communication uses the Engine API (JWT-authenticated). Configure for checkpoint sync and normal operation.

## Geth flags

--beacon.api <url>          Consensus client Engine API URL (e.g. http://localhost:8551)
--authrpc.addr, --authrpc.port   Auth RPC for Engine API (default 8551)
--authrpc.jwtsecret <path>  Path to shared JWT secret file (hex, 32 bytes). Must match consensus client.
--beacon.checkpoint <url>   Optional checkpoint URL for fast sync

## JWT

Engine API uses JWT in the Authorization header. Both geth and the consensus client must use the same secret. Generate with: openssl rand -hex 32 > jwt.secret. Do not expose the auth RPC publicly.

## Key Points

- Auth RPC is separate from HTTP-RPC (--http). Engine API is for consensus<->execution only; not for end-user RPC. For multi-node private nets, run a consensus client and point geth at it via --beacon.api and --authrpc.jwtsecret.

<!-- Source: https://github.com/ethereum/go-ethereum (README.md), https://geth.ethereum.org/docs/ -->
