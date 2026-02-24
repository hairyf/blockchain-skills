---
name: stacks-rpc-endpoints
description: Stacks node RPC API — transactions, accounts, contracts, blocks, PoX, and Nakamoto endpoints.
---

# Stacks RPC Endpoints

The stacks-node exposes HTTP RPC for posting transactions, querying accounts/contracts, and fetching blocks. Base path is typically the node's RPC bind (e.g. `http://localhost:20443`).

## Posting transactions

**POST /v2/transactions** — Submit raw transaction bytes to the mempool (body: `application/octet-stream`). Rejections return 400 with JSON:

```json
{
  "error": "transaction rejected",
  "reason": "BadNonce",
  "reason_data": { "actual": 3, "expected": 0, "is_origin": true, "principal": "ST2MVN..." },
  "txid": "0x..."
}
```

Common `reason` values: `Serialization`, `Deserialization`, `SignatureValidation`, `BadNonce`, `FeeTooLow`, `NotEnoughFunds`, `NoSuchContract`, `NoSuchPublicFunction`, `BadFunctionArgument`, `ContractAlreadyExists`, `ServerFailureDatabase`, `ServerFailureOther`. Use `reason_data` when present for details.

## Accounts and contract data

- **GET /v2/accounts/[Principal]** — Balance (hex), nonce, optional `balance_proof`/`nonce_proof`. Use `?proof=0` to omit proofs. Principal is Stacks address or contract id (e.g. `SP...contract-name`).
- **GET /v2/data_var/[Address]/[Contract]/[VarName]** — Data variable value (hex) and optional proof.
- **GET /v2/map_entry/[Address]/[Contract]/[MapName]** — **POST** with body = hex-serialized Clarity key (JSON string). Returns serialized option (none or some).
- **GET /v2/constant_val/[Address]/[Contract]/[ConstantName]** — Constant value (hex).
- **GET /v2/clarity/marf/[MARF Key]** — Raw MARF key value.
- **GET /v2/clarity/metadata/[Address]/[Contract]/[MetadataKey]** — Contract metadata (JSON string in `data`).
- **GET /v2/fees/transfer** — Estimated fee rate (integer) for STX transfer.

## Contract interface and read-only calls

- **GET /v2/contracts/interface/[Address]/[Contract]** — Contract ABI: `functions`, `variables`, `maps`, `fungible_tokens`, `non_fungible_tokens`.
- **GET /v2/contracts/source/[Address]/[Contract]** — Source code, `publish_height`, optional `proof`. `?proof=0` to skip proof.
- **POST /v2/contracts/call-read/[Address]/[Contract]/[FunctionName]** — Simulate read-only function. Body:
  ```json
  { "sender": "SP...contract.get-info", "arguments": ["0x0011...", "0x00231..."] }
  ```
  Returns `{ "okay": true, "result": "0x..." }` or `{ "okay": false, "cause": "..." }`.
- **GET /v2/traits/[Address]/[Contract]/[TraitAddress]/[TraitContract]/[TraitName]** — Trait implementation check.

## Blocks and headers (v2)

- **GET /v2/pox** — Current PoX-related info (see OpenAPI spec).
- **GET /v2/headers/[Count]** — Ancestral Stacks block headers (newest first). Optional `?tip=<block_id>`. Up to 2100 per request; use `parent_block_id` from last header to page. Returns `consensus_hash`, `header` (hex), `parent_block_id`.

## Nakamoto (v3) and miner

- **POST /v3/block_proposal** — Miner-only (loopback). Submit `NakamotoBlockProposal` (block + chain_id). Response is async via event observer `/proposal_response` (Ok with block hex and cost, or Reject with reason/reason_code).
- **GET /v3/blocks/[Block ID]** — Raw Nakamoto block by ID. 404 if missing.
- **GET /v3/blocks/height/[Height]** — Block by height. Optional `?tip=` for non-canonical tip.
- **GET /v3/tenures/[Block ID]** — Block and ancestors in same tenure (concatenated raw blocks, up to 2 MB).
- **GET /v3/tenures/info** — Highest-known tenure: `consensus_hash`, `reward_cycle`, `tip_block_id`, `tip_height`.
- **GET /v3/signer/[Signer Pubkey]/[Reward Cycle]** — Number of blocks signed by signer in that cycle.
- **GET /v3/transaction/[Txid]** — Index block hash, tx body (hex), result. Requires `txindex`. 404 if not found, 501 if txindex disabled.
- **GET /v3/health** — Sync health: current tip height vs max peer tip; use `difference_from_max_peer` to decide if out of sync.

## Usage tips

- Principals: Stacks address (e.g. `ST2...`, `SP2...`) or contract id `{address}.{contract-name}`.
- Proofs: omit with `?proof=0` when not needed for verification.
- Map keys: POST body must be hex serialization of the Clarity key (JSON string atom).

<!--
Source references:
- sources/stacks/docs/rpc-endpoints.md
- https://github.com/stacks-network/stacks-blockchain
-->
