# Generation Info

- **Source:** `sources/axelar`
- **Git SHA:** `f303a5aa961771b475b63bce433ed3b0e6cf3b1a`
- **Generated:** 2026-02-24

Documentation was derived from the axelar-core repository (https://github.com/axelarnetwork/axelar-core). Content was synthesized from:

- **README.md** — Build (make build-static, make docker-image), gateway bytecode (contract-version.json, contract-artifacts), verify binary, local node, CLI link
- **docs/cli/toc.md** — Full axelard CLI tree (query/tx for nexus, evm, axelarnet, multisig, tss, snapshot, permission, reward, vote, etc.)
- **docs/cli/*.md** — Individual command help (e.g. nexus chains, latest-deposit-address, transfer-rate-limit; evm gateway-address, batched-commands, sign-commands; multisig key-id)
- **docs/proto/proto-docs.md** — Protobuf API (nexus: Chain, CrossChainAddress, CrossChainTransfer, TransferState, GeneralMessage, FeeInfo, Asset; axelarnet, evm, tss types)
- **proto/axelar/** — Nexus exported types (Chain, CrossChainTransfer, GeneralMessage, WasmMessage, FeeInfo, Asset)
- **x/** — Modules: nexus, evm, axelarnet, multisig, tss, snapshot, permission, reward, vote
