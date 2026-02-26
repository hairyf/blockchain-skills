---
name: Tact standard libraries (stdlib)
description: Import and use @stdlib/config, @stdlib/content, @stdlib/deploy, @stdlib/dns, @stdlib/ownable, @stdlib/stoppable.
---

# Standard libraries

Stdlibs are bundled with the Tact compiler but **not** included until you import them:

```tact
import "@stdlib/ownable";
```

## Libraries

| Library | Purpose | Notable APIs |
|---------|---------|----------------|
| **@stdlib/config** | Config and elector addresses | `getConfigAddress()`, `getElectorAddress()` |
| **@stdlib/content** | Encode off-chain link strings to Cell | `createOffchainContent()` |
| **@stdlib/deploy** | Unified deployment | `Deployable`, `FactoryDeployable` |
| **@stdlib/dns** | DNS resolution | `DNSResolver`, `dnsInternalVerify()` |
| **@stdlib/ownable** | Ownership trait | `Ownable`, `requireOwner()`, `OwnableTransferable`, `ChangeOwner` / `ChangeOwnerOk` |
| **@stdlib/stoppable** | Pause/resume (requires ownable) | `Stoppable`, `Resumable` |

## Ownable example

```tact
import "@stdlib/ownable";

contract Counter with Ownable {
    owner: Address;
    init(owner: Address) { self.owner = owner; }
    receive("admin-double") {
        self.requireOwner();
        // ...
    }
}
```

## Key points

- Each stdlib is opt-in; import only what you need.
- Ownable declares `owner: Address` and `requireOwner()`; use for access control.
- Stoppable/Resumable depend on Ownable; enable pausing by owner.

<!--
Source references:
- https://docs.tact-lang.org/ref/standard-libraries
- https://docs.tact-lang.org/ref/stdlib-ownable
- sources/ton-tact/docs/src/content/docs/zh-cn/ref/standard-libraries.mdx
- sources/ton-tact/docs/src/content/docs/ref/stdlib-ownable.mdx
-->
