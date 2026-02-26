---
name: openzeppelin-eoa-delegation
description: EIP-7702 EOA delegation—SignerEIP7702, set-code tx, ERC-4337 with delegated EOAs.
---

# EOA Delegation (EIP-7702)

EIP-7702 lets an **EOA** delegate execution to a smart contract: the EOA keeps its key but runs contract code (batching, gas sponsorship, sub-keys). OpenZeppelin supports this via **SignerEIP7702**, which validates that the signer is the EOA (account) itself.

## Delegating to an account

1. **Authorization**: EOA signs EIP-7702 authorization (chainId, nonce, delegate contract address, signature fields). This restricts execution to that contract and prevents replay.
2. **Set-code transaction**: Send a `SET_CODE_TX_TYPE` (0x04) tx with `authorizationList` and optional `data`. The EOA’s code is set to the delegate (e.g. Account contract); the EVM runs that code when the EOA is used.
3. **Clearing delegation**: Send set-code with delegate = zero address to restore the EOA; storage is not cleared automatically.

Use namespaced storage (e.g. ERC-7201) when changing delegates to avoid storage collisions; follow upgradeability-style care.

## SignerEIP7702 in an account

Build an Account that accepts EOA signatures when the account address is the EOA (delegated):

```solidity
import { SignerEIP7702 } from "@openzeppelin/contracts/utils/cryptography/signers/SignerEIP7702.sol";

contract MyAccountEIP7702 is Account, SignerEIP7702, ... { }
```

After the EOA delegates to this account, UserOperations with `sender = EOA` are validated by SignerEIP7702 (signature checked against the EOA).

## Using with ERC-4337

Once the EOA is delegated to an ERC-4337 Account:

- **UserOp**: `sender` = EOA address, `initCode` = empty (account “is” the EOA). Sign with the EOA key; include the same authorization in the tx if the chain requires it for set-code.
- Send via EntryPoint’s `handleOps`; optionally use a paymaster for gas sponsorship.

Delegates must enforce replay protection (e.g. nonce, domain separator). A bad delegate can give attackers control of the EOA.

## Key Points

- EIP-7702 = EOA keeps key, code comes from delegate contract. Use SignerEIP7702 so the account accepts that EOA’s signatures.
- Authorization + set-code tx must be sent from the EOA; clearing delegation uses delegate address zero.
- When changing delegates, avoid storage clashes and test migration; relayers may require bonds for sponsored txs.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/eoa-delegation.adoc
- EIP-7702
-->
