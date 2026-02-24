# Blockchain Master Skills

> Forked from [antfu/skills](https://github.com/antfu/skills)

A blockchain-focused collection of [Agent Skills](https://agentskills.io/home),
forked from [Anthony Fu's skills collection](https://github.com/antfu/skills)
and adapted for Web3 engineering workflows.

> [!IMPORTANT]
> This is a proof-of-concept project for generating agent skills from source
> documentation and keeping them in sync. The skills are still evolving, so
> feedback and contributions are highly appreciated.

## Installation

```bash
pnpx skills add hairyf/blockchain-master
```

Or install all skills globally:

```bash
pnpx skills add hairyf/blockchain-master --all -g
```

For CLI details, see [skills](https://github.com/vercel-labs/skills).

## Skills

This repository focuses on blockchain protocols, tooling, and infrastructure.
Most skills are generated from upstream documentation and organized by project.

### Hand-Written Skills

There are currently no hand-written/manual skills enabled in this repository.
See `meta.ts` (`manual`) for the current status.

### Skills Generated from Official Documentation

> Mostly unopinionated, with a modern-stack focus (TypeScript, ESM, Composition API, etc.)

Generated from upstream documentation and adapted for agent workflows.

#### Generated Project Skills

Current generated skills in `skills/` (`53` total):

| Skill | Source |
|-------|--------|
| [aave-v3](skills/aave-v3) | `sources/aave-v3/docs` |
| [aderyn](skills/aderyn) | `sources/aderyn/docs` |
| [alchemy](skills/alchemy) | `sources/alchemy/docs` |
| [anchor](skills/anchor) | `sources/anchor/docs` |
| [arbitrum](skills/arbitrum) | `sources/arbitrum/docs` |
| [arweave](skills/arweave) | `sources/arweave/docs` |
| [avail](skills/avail) | `sources/avail/docs` |
| [axelar](skills/axelar) | `sources/axelar/docs` |
| [bitcoin](skills/bitcoin) | `sources/bitcoin/docs` |
| [bitcoin-js](skills/bitcoin-js) | `sources/bitcoin-js/docs` |
| [bitcoin-rust](skills/bitcoin-rust) | `sources/bitcoin-rust/docs` |
| [bitvm](skills/bitvm) | `sources/bitvm/docs` |
| [cairo](skills/cairo) | `sources/cairo/docs` |
| [celestia](skills/celestia) | `sources/celestia/docs` |
| [circom](skills/circom) | `sources/circom/docs` |
| [cosmos](skills/cosmos) | `sources/cosmos/docs` |
| [did-core](skills/did-core) | `sources/did-core/docs` |
| [echidna](skills/echidna) | `sources/echidna/docs` |
| [eigenlayer](skills/eigenlayer) | `sources/eigenlayer/docs` |
| [envio](skills/envio) | `sources/envio/docs` |
| [ethers](skills/ethers) | `sources/ethers/docs` |
| [filecoin](skills/filecoin) | `sources/filecoin/docs` |
| [flashbots](skills/flashbots) | `sources/flashbots/docs` |
| [foundry](skills/foundry) | `sources/foundry/docs` |
| [getblock](skills/getblock) | `sources/getblock/docs` |
| [geth](skills/geth) | `sources/geth/docs` |
| [halo2](skills/halo2) | `sources/halo2/docs` |
| [halmos](skills/halmos) | `sources/halmos/docs` |
| [hardhat](skills/hardhat) | `sources/hardhat/docs` |
| [hyperlane](skills/hyperlane) | `sources/hyperlane/docs` |
| [mempool](skills/mempool) | `sources/mempool/docs` |
| [moralis](skills/moralis) | `sources/moralis/docs` |
| [openzeppelin](skills/openzeppelin) | `sources/openzeppelin/docs` |
| [optimism](skills/optimism) | `sources/optimism/docs` |
| [ordinals](skills/ordinals) | `sources/ordinals/docs` |
| [risc0](skills/risc0) | `sources/risc0/docs` |
| [searcher-builder](skills/searcher-builder) | `sources/searcher-builder/docs` |
| [slither](skills/slither) | `sources/slither/docs` |
| [solana](skills/solana) | `sources/solana/docs` |
| [solidity](skills/solidity) | `sources/solidity/docs` |
| [sp1](skills/sp1) | `sources/sp1/docs` |
| [stacks](skills/stacks) | `sources/stacks/docs` |
| [starknet](skills/starknet) | `sources/starknet/docs` |
| [subsquid](skills/subsquid) | `sources/subsquid/docs` |
| [thegraph](skills/thegraph) | `sources/thegraph/docs` |
| [ton](skills/ton) | `sources/ton/docs` |
| [tron-java](skills/tron-java) | `sources/tron-java/docs` |
| [uniswap-v4](skills/uniswap-v4) | `sources/uniswap-v4/docs` |
| [viem](skills/viem) | `sources/viem/docs` |
| [wagmi](skills/wagmi) | `sources/wagmi/docs` |
| [walletconnect](skills/walletconnect) | `sources/walletconnect/docs` |
| [wormhole](skills/wormhole) | `sources/wormhole/docs` |
| [zksync-era](skills/zksync-era) | `sources/zksync-era/docs` |

### Vendored Skills

Synced from external repositories that maintain their own skills.

There are currently no vendored skills configured (`vendors` in `meta.ts` is
empty).

## FAQ

### What Makes This Collection Different?

This collection starts from
[Anthony Fu's skills collection](https://github.com/antfu/skills), but is
re-scoped for blockchain engineering:

- **Blockchain-first coverage**: L1/L2 protocols, smart contract tooling, wallet standards, data/indexing infrastructure, ZK stacks, and security tooling.
- **Source-linked generation**: Skills are generated from upstream project docs tracked through Git submodules in `sources/`.
- **Operational update model**: Skills are refreshed using SHA-tracked diffs (`GENERATION.md` / `SYNC.md`) so updates stay traceable.
- **Template-friendly workflow**: The repo can be forked and adapted to your own domain-specific skill collection.

The key difference from the original collection is that this project uses Git
submodules to reference source documentation directly. This improves reliability
and makes it easier to keep skills aligned with upstream updates over time.

The project is also flexible: you can use it as a template to build your own
customized skill collection.

### Skills vs `llms.txt` vs `AGENTS.md`

The core value of skills is that they are both **shareable** and **on-demand**.

Shareable skills make prompts easier to manage and reuse across projects.
On-demand loading allows much larger knowledge coverage than a single context
window can hold at once.

Some people say "`AGENTS.md` outperforms skills." That is often true today:
`AGENTS.md` is loaded upfront, while skills may be missed if they are not
invoked. This is mainly a tooling and integration gap that should improve over
time. In practice, skills are standardized Markdown knowledge modules for
agents. If some skills must always apply, you can reference them directly in
your `AGENTS.md`.

## Generate Your Own Skills

Fork this project to create your own customized skill collection.

1. Fork or clone this repository.
2. Install dependencies: `pnpm install`
3. Update `meta.ts` with your own projects and skill sources.
4. Run `nr start cleanup` to remove existing submodules and skills.
5. Run `nr start init` to clone submodules.
6. Run `nr start sync` to sync vendored skills.
7. Ask your agent to generate skills, for example: `generate skills for <project> author <author>, use <language>`. (Recommended: one project at a time to control token usage.)

**Ongoing maintenance**

- **More, until all**: When you say "more" (or ask for more coverage) for an existing skill, the agent compares current `references/` with source docs, identifies missing modules, adds new reference files, and updates `SKILL.md` (plus `GENERATION.md` for Type 1 skills).
- **Update**: When you say "update" (or ask to refresh from source), the agent runs `git diff` against the SHA recorded in `GENERATION.md` or `SYNC.md`, then updates only affected references, `SKILL.md`, and tracking metadata.

See [AGENTS.md](AGENTS.md) for detailed generation guidelines.

## Credits

- Original project: [antfu/skills](https://github.com/antfu/skills) by [Anthony Fu](https://github.com/antfu)
- Blockchain adaptation: [hairyf/blockchain-master](https://github.com/hairyf/blockchain-master)

## License

Skills and scripts in this repository are licensed under [MIT](LICENSE.md).

Vendored skills from external repositories retain their original licenses. See
each skill directory for details.
