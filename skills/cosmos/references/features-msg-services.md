---
name: cosmos-msg-services
description: Implementing Protobuf Msg services, validation, state transition, events.
---

# Msg Services

Each module implements a Protobuf **Msg service** that processes `sdk.Msg` requests. BaseApp routes messages to the correct module's Msg service during FinalizeBlock (DeliverTx).

## Implementation

- Define the service in `tx.proto`; Protobuf generates a `MsgServer` interface. Implement it on the keeper or a `msgServer` struct that embeds the keeper (e.g. `keeper/msg_server.go`).
- Get `sdk.Context` from the handler's `context.Context` with `sdk.UnwrapSDKContext(ctx)`.
- Register the implementation in `RegisterServices` with the generated `RegisterMsgServer`.

## Handler Steps

1. **Validation**: Perform all stateful and stateless checks. The signer is charged gas. Prefer a separate validation function that takes state as arguments for testability. Do not rely on deprecated `ValidateBasic` for full validation.

2. **State transition**: Use keeper getters/setters to apply the transition.

3. **Events**: Emit events before returning:
   - `ctx.EventManager().EmitTypedEvent(&module.EventXYZ{...})` (protobuf-based), or
   - `ctx.EventManager().EmitEvent(sdk.NewEvent(type, sdk.NewAttribute(k, v), ...))`.

Return value and error are wrapped with `sdk.WrapServiceResult(ctx, res, err)`, which marshals the response and attaches events.

## Telemetry

You can record metrics from msg server methods (e.g. vesting events) for observability.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/03-msg-services.md
-->
