---
name: geth-devp2p
description: devp2p - P2P debugging, ENR, node keys, DNS discovery, discv4/discv5 crawl, eth protocol tests.
---

# devp2p

The devp2p CLI provides low-level P2P utilities: ENR handling, node key management, DNS discovery tree maintenance, discovery v4/v5 crawl and ping, node set filtering, and eth protocol conformance tests.

## ENR and node keys

devp2p enrdump <base64>
devp2p key generate mynode.key
devp2p key to-enode mynode.key -ip 127.0.0.1 -tcp 30303

## DNS discovery

devp2p dns sign <directory>
devp2p dns sync <enrtree-URL>
devp2p dns to-cloudflare <directory> / devp2p dns to-route53 <directory>

## Node set

devp2p nodeset info nodes.json
devp2p nodeset filter nodes.json -eth-network mainnet -snap -limit 20

Filters: -limit N, -ip CIDR, -min-age duration, -eth-network mainnet|sepolia|holesky, -les-server, -snap.

## Discovery v4/v5

devp2p discv4 ping|resolve|crawl | discv5 ping|resolve|listen|crawl|test

## Eth protocol test suite

devp2p rlpx eth-test --chain internal/ethtest/testdata --node enode://... --engineapi http://127.0.0.1:8551 --jwtsecret (cat jwt.secret)

Node must be initialized with test chain and Engine API + JWT.

## Key Points

- Node sets are JSON; use nodeset filter to restrict by network, snap, IP, age, limit. discv5 test requires two local IPs.

<!-- Source: https://github.com/ethereum/go-ethereum/tree/master/cmd/devp2p (README.md), https://geth.ethereum.org/docs/developers/geth-developer/dns-discovery-setup -->
