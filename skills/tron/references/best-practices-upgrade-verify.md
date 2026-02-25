---
name: tron-best-practices-upgrade-verify
description: java-tron upgrade steps and JAR signature verification for integrity and security.
---

# Upgrade and Signature Verification

## Upgrade (releases/upgrade-instruction)

- **Mandatory vs optional**: For mandatory upgrades, follow the upgrade guide strictly. For optional, decide based on need.
- **Standard steps**: Prepare new package (download or compile) -> Verify signature (see below) -> Stop node -> Back up critical data -> Replace JAR (and config if needed) -> Start node. Primary/backup setups: follow primary/backup upgrade guide for failover.
- **Backup**: Include database and config. Restore procedure documented in backup_restore.md.

## Signature verification (releases/signature_verification)

- **Purpose**: Ensure FullNode.jar (or other artifacts) has not been tampered with. Verify before every upgrade or first use.
- **Process**: Download the JAR and the published signature/checksum file from official java-tron releases. Use the verification method described in the signature_verification doc (e.g. GPG verify or hash comparison). Do not skip this step for production nodes.

## Usage for agents

When scripting upgrades or CI: (1) Download JAR and signature from official GitHub releases. (2) Run the documented verification command (GPG or hash). (3) Proceed with replace and start only after verification succeeds. Log verification result for audit.

<!-- Source: sources/tron/docs/releases/upgrade-instruction.md, sources/tron/docs/releases/signature_verification.md -->
