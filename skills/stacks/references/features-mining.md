---
name: stacks-mining
description: Stacks mining (PoX) — node/miner config, burn commitment, fee and cost estimation.
---

# Stacks Mining (PoX)

STX are mined via Proof of Transfer (PoX): miners commit BTC on the burnchain to participate in leader election. Configure `[node]` and `[miner]` / `[burnchain]` in the node config (e.g. `mainnet-miner-conf.toml`).

## Node and miner config

```toml
[node]
miner = true
seed = "YOUR_BITCOIN_PRIVATE_KEY"
# mock_mining = true   # Test without spending BTC (requires miner = true)

[miner]
nakamoto_attempt_time_ms = 20000

[burnchain]
burn_fee_cap = 20000           # Max sats for burn commitment
satoshis_per_byte = 50         # Fee rate for Bitcoin tx
rbf_fee_increment = 5         # Sats per byte when RBF'ing
max_rbf = 150                 # Max % of satoshis_per_byte for RBF
```

RBF (Replace-by-Fee) is important: if the miner cannot replace an outdated commit with a higher-fee tx, it may build on the wrong tenure and have blocks rejected. Allow at least a few fee increments within `max_rbf`.

## Verify miner is running

Check logs for UTXO discovery:

```bash
grep -i utxo /path/to/node/logs
# Expect: "Miner node: checking UTXOs at address: ..." then "UTXOs found - will run as a Miner node"
```

## Fee and cost estimation

Optional `[fee_estimation]` section (non–consensus-critical):

```toml
[fee_estimation]
cost_estimator = naive_pessimistic
fee_estimator = fuzzed_weighted_median_fee_rate
fee_rate_fuzzer_fraction = 0.1
fee_rate_window_size = 5
cost_metric = proportion_dot_product
log_error = true
enabled = true
```

Estimators use observed tx costs/fees to suggest fee rates and execution costs for clients and miners. Set `enabled = false` to disable.

## Key points

- Miner needs a Bitcoin key with UTXOs for burn commitments.
- Use mock_mining only for testing (no real BTC spent).
- RBF settings should allow multiple bumps to stay on canonical chain.

<!--
Source references:
- sources/stacks/docs/mining.md
- https://github.com/stacks-network/stacks-blockchain
-->
