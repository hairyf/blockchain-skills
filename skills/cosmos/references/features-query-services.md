---
name: cosmos-query-services
description: gRPC Query service implementation and module_query_safe annotation.
---

# Query Services

Modules expose **gRPC Query services** defined in `query.proto`. BaseApp routes queries to the module's Query service. Implement the generated `QueryServer` interface on the keeper (e.g. in `keeper/grpc_query.go`).

## Implementation

- Each RPC in the Query service becomes a method on `QueryServer`. First parameter is `context.Context`; use `sdk.UnwrapSDKContext(ctx)` to get `sdk.Context` for store access.
- Register the implementation in `RegisterServices` with the generated `RegisterQueryServer`.
- Wire gRPC-gateway routes in `RegisterGRPCGatewayRoutes` on AppModuleBasic so REST clients can call the same endpoints.

## Module-query-safe

The `cosmos.query.v1.module_query_safe` Protobuf option marks a query as safe to call from inside the state machine (e.g. from another keeper, ADR-033, or CosmWasm). When set to true:

- The query must be deterministic (same height → same response) and not introduce state-machine-breaking changes across patch versions.
- Gas must be tracked so high-computation queries cannot be used without gas accounting.

Use this only for queries that meet these guarantees; otherwise do not mark them module_query_safe.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/04-query-services.md
-->
