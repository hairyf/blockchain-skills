---
name: ethers-units-format
description: Ethers.js unit conversion — parseEther, parseUnits, formatEther, formatUnits for wei/gwei display and user input.
---

# Units and Formatting

Ethereum uses integer wei internally. Use parse helpers for user input and format helpers for display.

## Parsing (string → wei)

```ts
import { parseEther, parseUnits } from "ethers";

const eth = parseEther("1.0");           // 10^18 wei
const feePerGas = parseUnits("4.5", "gwei");  // gwei → wei
```

## Formatting (wei → string)

```ts
import { formatEther, formatUnits } from "ethers";

formatEther(eth);                    // wei → ether string
formatUnits(feePerGas, "gwei");      // wei → gwei string
formatUnits(balance, decimals);      // token balance with token decimals
```

## Key Points

- Use parse* when accepting user input (e.g. "2.56" ether).
- Use format* when displaying to users; avoid showing raw wei.
- One ether = 10^18 wei; one gwei = 10^9 wei.

<!--
Source references:
- sources/ethers/docs.wrm/getting-started.wrm
- https://docs.ethers.org/v6/
-->
