---
name: test-cli for mev-boost
description: Using test-cli to generate validator data, register, and test getHeader/getPayload against mev-boost and a relay.
---

# test-cli

`test-cli` is a utility to run proposer flows against MEV-Boost + relay (generate validator data, register, getHeader, getPayload). Use it for integration testing or local debugging.

## Build

From the mev-boost repo:

```bash
make build-testcli
```

## Commands

| Command | Purpose |
|---------|---------|
| `generate` | Generate validator data (gas limit, fee recipient) and write to validator data file. |
| `register` | Register the validator with MEV-Boost (which forwards to relays). |
| `getHeader` | Request current best header from MEV-Boost for the slot. |
| `getPayload` | Submit signed blinded block and retrieve full payload. |

## Environment and defaults

- **Validator data file**: `-vd-file` or `VALIDATOR_DATA_FILE` (default `./validator_data.json`).
- **MEV-Boost**: `-mev-boost` or `MEV_BOOST_ENDPOINT` (default `http://127.0.0.1:18550`).
- **Beacon node**: `-bn` or `BEACON_ENDPOINT` (e.g. `http://localhost:5052`) — required for getHeader/getPayload unless using mergemock.
- **Execution node**: `-en` (e.g. `http://localhost:8545`) — used for pre-Bellatrix or when using mergemock (`-mm`).
- **Network fork version**: `-genesis-fork-version` (e.g. mainnet `0x00000000`, Sepolia `0x90000069`).

## Typical workflow

1. **Start MEV-Boost** (e.g. Hoodi + one relay):

   ```bash
   ./mev-boost -hoodi -relay-check -relay "URL-OF-TRUSTED-RELAY"
   ```

2. **Generate validator data** (optional; or supply your own validator data file):

   ```bash
   ./test-cli generate [-gas-limit 30000000] [-fee-recipient 0x...]
   ```

3. **Register validator**:

   ```bash
   ./test-cli register -genesis-fork-version 0x90000069 [-mev-boost http://127.0.0.1:18550]
   ```

4. **Test getHeader** (beacon node required unless `-mm`):

   ```bash
   ./test-cli getHeader -genesis-fork-version 0x90000069 [-mev-boost] [-bn BEACON_ENDPOINT] [-en ENGINE_ENDPOINT] [-mm]
   ```

5. **Test getPayload**:

   ```bash
   ./test-cli getPayload [-mev-boost] [-bn BEACON_ENDPOINT] [-en ENGINE_ENDPOINT] [-mm]
   ```

Use `-mm` for mergemock mode: use execution for block hash and fake slot; no need for a real beacon node.

<!--
Source references:
- cmd/test-cli/README.md
- sources/flashbots/cmd/test-cli/
-->
