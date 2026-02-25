---
name: best-practices-gas
description: Gas best practices — contract params vs init(), binary vs text receivers, message/cashback/deploy, sender() vs context(), throwUnless vs require, SignedBundle, inline, BasechainAddress.
---

# Gas best practices

Practical patterns to reduce gas: contract design, receivers, sending, and assertions.

## Contract design

- Prefer **contract parameters** for initial state instead of `init()` and extra fields; avoids lazy-init bit and storage write optimizations.
- Do not deploy with deprecated **Deployable** trait; use a simple empty-body receiver and deploy with it.
- Use **BasechainAddress** and `hasSameBasechainAddress()` for basechain sender checks instead of `contractAddress(init) == sender()` when both are basechain.
- **Inline** rarely-called functions to save call overhead; balance with code size. Consider `experimental.inline` in tact.config.json for full inlining.
- Avoid **internal contract functions** when they don't touch state; move to global (module-level) functions to reduce stack push/pop.

## Receiving

- Prefer **binary receivers** and message structs with opcodes over **text receivers**; text uses body hash (500+ gas).
- Prefer **inMsg()** over `msg.toSlice()` for raw body access (Tact 1.6.7+).
- Use **sender()** instead of `context().sender` when only the sender is needed.
- Use **throwUnless(code, condition)** with constants (256–2048) instead of **require(condition, "msg")** for production.
- For external messages, use **SignedBundle** as first field and **SignedBundle.verifySignature(publicKey)** for efficient verification.

## Sending

- Prefer **message()** and **cashback()** over `self.forward()`, `self.reply()`, `self.notify()` (BaseTrait internals are costly).
- Use **deploy()** for on-chain deployments and **message()** for non-deployment messages instead of generic **send()**.
- Pay attention to **500+ gas** badges in docs; prefer cheaper alternatives when possible.

## Other

- Prefer **arithmetic** over branching (e.g. `1 + sign(x)` vs ternary).
- Prefer **log2** over `log(_, 2)` and **pow2** over `pow(2, _)`.
- Prefer **off-chain** string manipulation; minimize on-chain string work.
- For well-tested contracts only: **safety.nullChecks: false** in config to reduce gas of `!!` (weaker safety).
- Consider **asm functions** for critical paths when stack layout and instruction choice matter.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/book/gas-best-practices.mdx
-->
