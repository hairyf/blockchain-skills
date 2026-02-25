---
name: thegraph-features-deployment-publishing
description: Deploying to Subgraph Studio and publishing to the decentralized network; CLI and GRT signal.
---

# The Graph — Deployment and Publishing

Deploying pushes a subgraph to Subgraph Studio for testing; publishing makes it available on The Graph Network for curators and indexers.

## Deploy vs publish

- **Deploy**: Push build to Studio (`graph deploy <SUBGRAPH_SLUG>`). Get a development query URL; not onchain. Limit: 3 unpublished deployments per account.
- **Publish**: From Studio (or `graph publish` as of CLI 0.73.0), publish to the decentralized network. Subgraph becomes visible in Graph Explorer; curators can signal, indexers can index.

## Prerequisites

- [Graph CLI](https://github.com/graphprotocol/graph-tooling/tree/main/packages/cli): `yarn global add @graphprotocol/graph-cli` or `npm install -g @graphprotocol/graph-cli`
- Subgraph created in [Subgraph Studio](https://thegraph.com/studio/); deploy key from the Subgraph details page

## Deploy to Studio

1. **Auth**: `graph auth <DEPLOY_KEY>` (from Studio).
2. **Init** (if new): `graph init <SUBGRAPH_SLUG>` (slug from Studio).
3. **Build**: `graph codegen && graph build`.
4. **Deploy**: `graph deploy <SUBGRAPH_SLUG>`. Choose a version label (e.g. semver `0.0.1`).

After deploy you get a Studio query URL (rate-limited, for testing). New deploys archive the previous Studio version; you can unarchive in Studio.

## Publish to the network

- **From Studio**: Dashboard → Publish. Subgraph then appears in [Graph Explorer](https://thegraph.com/explorer/).
- **From CLI** (0.73.0+): `graph codegen && graph build` then `graph publish`. Optional flags: `--protocol-network arbitrum-one|arbitrum-sepolia`, `--subgraph-id <value>`, `--ipfs <url>`, `--ipfs-hash <value>`.

Metadata (name, description, etc.) can be updated in Studio without publishing a new version; publishing a new deployment creates a new version (costs and curation implications).

## GRT signal

Adding GRT signal to a published subgraph incentivizes indexers. Eligibility: see [feature support matrix](https://github.com/graphprotocol/indexer/blob/main/docs/feature-support-matrix.md) and [supported networks](/supported-networks/). Curators can signal on a specific version or use auto-migrate to follow the latest version. Developers can add signal when publishing from Studio or from Graph Explorer.

## Key points

- Use supported networks for Network indexing; check [supported networks](https://thegraph.com/docs/en/supported-networks/) and feature support matrix.
- Version labels in Studio/Explorer help curators choose which version to signal; prefer semver.
- Each account is limited to 3 deployed (unpublished) subgraphs; archive or publish to free a slot.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/developing/deploying/using-subgraph-studio/
- https://thegraph.com/docs/en/subgraphs/developing/publishing/publishing-a-subgraph/
-->
