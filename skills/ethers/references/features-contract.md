---
name: ethers-contract
description: Ethers.js Contract — creation, view/pure calls, state-changing tx, staticCall, events, queryFilter.
---

# Contract Interaction

Contract is created with address, ABI, and Provider or Signer. Connect to Provider for read-only; to Signer for state-changing calls.

## Create and read-only (view/pure)

```ts
const contract = new ethers.Contract("dai.tokens.ethers.eth", abi, provider);
const sym = await contract.symbol();
const balance = await contract.balanceOf("ethers.eth");
```

## State-changing (requires Signer)

```ts
const contract = new ethers.Contract("dai.tokens.ethers.eth", abi, signer);
const tx = await contract.transfer("ethers.eth", parseUnits("1.0", 18));
await tx.wait();
```

## Static call (simulate without sending)

```ts
await contract.transfer.staticCall("ethers.eth", amount);
contract.foo.estimateGas(addr);
contract.foo.populateTransaction(addr);
```

## Events

```ts
contract.on("Transfer", (from, to, amount, event) => {
  console.log(formatEther(amount));
  event.removeListener();
});
contract.on(contract.filters.Transfer(null, "ethers.eth"), (from, to, amount, event) => { });
const events = await contract.queryFilter(contract.filters.Transfer, -100);
```

## Key Points

- Provider → read-only; Signer → can send transactions.
- Use `.staticCall()` to simulate; `.estimateGas()` for gas; `.populateTransaction()` for unsigned tx.
- Event listener receives (...params, event); event has `removeListener()`. Use `queryFilter` for historic logs.

<!--
Source references:
- sources/ethers/docs.wrm/getting-started.wrm
- https://docs.ethers.org/v6/
-->
