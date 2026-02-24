---
name: cosmos-errors
description: Defining, registering, and wrapping module errors; ABCI helpers.
---

# Error Handling

Modules should define and register their own errors so failed messages or handlers return clear, identifiable errors. Use the SDK **errors** package for registration and ABCI mapping.

## Registration

Define and register errors in `x/{module}/errors.go` (or `types/errors.go`). Each error has:

- **Codespace**: Usually the module name (e.g. `"distribution"`), unique per module.
- **Code**: `uint32`, unique within the module. Must be > 1 (1 is reserved for internal errors).

Example pattern:

```go
var (
    ErrInvalidRequest = sdkerrors.Register(ModuleName, 2, "invalid request")
    ErrSomeCondition  = sdkerrors.Register(ModuleName, 3, "description")
)
```

The SDK also provides common errors in `types/errors/errors.go`; use or wrap them when appropriate.

## Wrapping

Return registered errors as-is or wrap them for extra context:

```go
return sdkerrors.Wrap(ErrInvalidRequest, "from_address is empty")
```

Use `errors.Is(err, ErrInvalidRequest)` to check the error kind regardless of wrapping.

## ABCI

Registered errors can be mapped to ABCI info via the errors package (e.g. `ABCIInfo`). Helpers like `ResponseCheckTxWithEvents`, `ResponseExecTxResultWithEvents`, and `QueryResult` build CheckTx, ExecTxResult, and ResponseQuery from errors in the ABCI++ model.

<!--
Source references:
- https://github.com/cosmos/cosmos-sdk/blob/main/docs/docs/build/building-modules/12-errors.md
-->
