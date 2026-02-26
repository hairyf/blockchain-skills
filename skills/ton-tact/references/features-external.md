---
name: features-external
description: External message receivers — external(), acceptMessage, no sender/context, config external true.
---

# External messages

External messages have no sender and are sent from off-chain. The contract pays for gas and must accept the message explicitly.

## Enabling

In `tact.config.json` set `options.external: true` for the project. Without it, compilation fails if external receivers are used.

## External receivers

Use `external` instead of `receive`; same ordering and matching (text, binary, slice):

```tact
contract SampleContract {
    external("Check Timeout") {
        require(self.timeout > now(), "Not timed out");
        acceptMessage();
        self.onTimeout();
    }

    external(msg: SignedMessage) {
        throwUnless(35, msg.bundle.verifySignature(self.publicKey));
        acceptMessage();
        // ...
    }
}
```

## Differences from internal

- **Contract pays gas** — sender does not; minimize work before `acceptMessage()`.
- **Must call acceptMessage()** — otherwise the message is rejected (anti-spam).
- **~10k gas before accept** — small limit before your code; validate and accept quickly.
- **Unbounded gas after accept** — test and guard against draining balance.
- **No context/sender** — `context()` and `sender()` are not available in external receivers; do not use them.

Storage handling (including `return` and `throw(0)`) is the same as for internal receivers.

## Key points

- Always call `acceptMessage()` when the message is valid and you intend to process it.
- Use `SignedBundle` + `verifySignature` for authenticated external actions (e.g. wallets).
- Test gas usage; external flows can drain the contract if logic or fees are wrong.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/book/external.mdx
-->
