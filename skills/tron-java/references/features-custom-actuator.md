---
name: java-tron custom actuator
description: Implement a custom Actuator: proto, ContractType, execute/validate/getOwnerAddress/calcFee, WalletApi.
---

# Custom Actuator (java-tron)

Actuators execute specific transaction (contract) types. To add a new type:

1. Define contract in **protocol** (proto).
2. Register **ContractType** in `Tron.proto`.
3. Add **gRPC/HTTP** in `api.proto` (Wallet service).
4. Implement **Actuator** and register in **WalletApi**.

## 1. Define contract (protocol)

Create e.g. `protocol/src/main/protos/core/contract/math_contract.proto`:

```protobuf
syntax = "proto3";
package protocol;
option java_package = "org.tron.protos.contract";
message SumContract {
    int64 param1 = 1;
    int64 param2 = 2;
    bytes owner_address = 3;
}
```

## 2. Register ContractType

In `protocol/src/main/protos/core/Tron.proto`, inside `Transaction.Contract.ContractType`:

```protobuf
SumContract = 52;  // pick unused enum value
```

## 3. Add API (api.proto)

In `src/main/protos/api/api.proto`, Wallet service:

```protobuf
rpc InvokeSum (SumContract) returns (Transaction) {
  option (google.api.http) = {
    post: "/wallet/invokesum"
    body: "*"
    additional_bindings { get: "/wallet/invokesum" }
  };
};
```

## 4. Implement Actuator

Create class in `org.tron.core.actuator`, extending `AbstractActuator`:

```java
public class SumActuator extends AbstractActuator {
  public SumActuator() {
    super(ContractType.SumContract, SumContract.class);
  }

  @Override
  public boolean execute(Object object) throws ContractExeException {
    TransactionResultCapsule ret = (TransactionResultCapsule) object;
    SumContract c = any.unpack(SumContract.class);
    long sum = c.getParam1() + c.getParam2();
    // persist or log; then:
    ret.setStatus(calcFee(), code.SUCESS);
    return true;
  }

  @Override
  public boolean validate() throws ContractValidateException {
    SumContract c = any.unpack(SumContract.class);
    if (!DecodeUtil.addressValid(c.getOwnerAddress().toByteArray())) throw new ContractValidateException("Invalid ownerAddress!");
    // other checks
    return true;
  }

  @Override
  public ByteString getOwnerAddress() throws InvalidProtocolBufferException {
    return any.unpack(SumContract.class).getOwnerAddress();
  }

  @Override
  public long calcFee() { return TRANSFER_FEE; }
}
```

## 5. Wire in WalletApi

In `WalletApi` (extends `WalletImplBase`), implement the RPC handler:

```java
@Override
public void invokeSum(MathContract.SumContract req, StreamObserver<Transaction> responseObserver) {
  try {
    responseObserver.onNext(createTransactionCapsule(req, ContractType.SumContract).getInstance());
  } catch (ContractValidateException e) {
    responseObserver.onNext(null);
  }
  responseObserver.onCompleted();
}
```

## Build

Project build compiles protos. Use project protoc version (e.g. v3.4.0) if compiling manually:

```bash
./gradlew build -x test
```

## Key Points

- Contract definition and enum live in protocol; API in api.proto; execution in actuator + WalletApi.
- For persistent state, add or use a chainbase; for wallet-cli support, add CLI commands.

<!--
Source references:
- https://github.com/tronprotocol/java-tron (docs/implement-a-customized-actuator-en.md)
-->
