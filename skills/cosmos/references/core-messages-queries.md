---
name: cosmos-messages-queries
description: Msg and Query types, gRPC services, legacy paths, and protobuf conventions.
---

# Messages and Queries

**Messages** trigger state transitions; **queries** read state. They are the main objects modules handle via Msg services and Query services.

## Messages

- Defined in Protobuf; each module has a **Msg service** (e.g. in `tx.proto`) with one RPC per message type.
- Each RPC has one request type (must implement `sdk.Msg`) and one response type. Naming: `Msg<Name>`, `Msg<Name>Response`.
- `sdk.Msg` is an alias of `proto.Message`. Signers are usually specified via `cosmos.msg.v1.signer` protobuf option; for custom signers use `signing.CustomGetSigner` and provide via depinject.
- BaseApp decodes the tx, runs AnteHandler, then routes each message by `type_url` to the module's Msg service via `MsgServiceRouter`.
- Register the Msg service in the module's `RegisterServices` with the generated `RegisterMsgServer`; register the service descriptor in `RegisterInterfaces` with `RegisterMsgServiceDesc`.

## Queries

- **gRPC**: Define a `Query` service in `query.proto`. Implement the generated `QueryServer` in the keeper (e.g. `keeper/grpc_query.go`). Use `sdk.UnwrapSDKContext(ctx)` to get `sdk.Context` in handlers. Register with `RegisterQueryServer` in `RegisterServices`.
- **Legacy**: Path format `queryCategory/queryRoute/queryType/arg1/arg2/...`. Implement a querier and CLI query commands that build this path.
- **Store queries**: Use `clientCtx.QueryABCI(req)` for direct store queries with Merkle proofs.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/02-messages-and-queries.md
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/05-protobuf-annotations.md
-->
