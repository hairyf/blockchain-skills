export interface VendorSkillMeta {
  official?: boolean
  source: string
  skills: Record<string, string> // sourceSkillName -> outputSkillName
}

/**
 * Repositories to clone as submodules and generate skills from source
 */
export const submodules = {
  // Blockchain_Documentation
  'solidity': 'https://github.com/ethereum/solidity',

  'solana': 'https://github.com/solana-foundation/solana-com',
  'solana-anchor': 'https://github.com/solana-foundation/anchor',

  'tron': 'https://github.com/tronprotocol/documentation-en',
  'tron-java': 'https://github.com/tronprotocol/java-tron',
  'tronweb': 'https://github.com/tronprotocol/tronweb',
  'tronbox': 'https://github.com/tronprotocol/tronbox',

  'ton': 'https://github.com/ton-org/docs',
  'ton-tact': 'https://github.com/tact-lang/tact',
  'ton-blueprint': 'https://github.com/ton-org/blueprint',
  'ton-http': 'https://github.com/toncenter/ton-http-api',
  'tonweb': 'https://github.com/toncenter/tonweb',

  'geth': 'https://github.com/ethereum/go-ethereum',
  'reth': 'https://github.com/paradigmxyz/reth',

  // Indexing_and_Infrastructure
  'getblock': 'https://github.com/GetBlock-io/getblock-docs',
  'thegraph': 'https://github.com/graphprotocol/docs',
  'subsquid': 'https://github.com/subsquid/docs',
  'moralis': 'https://github.com/MoralisWeb3/docs',
  'envio': 'https://github.com/enviodev/docs',
  'alchemy': 'https://github.com/alchemyplatform/alchemy-sdk-js',
  'helius': 'https://github.com/helius-labs/helius-sdk',

  // Development_Frameworks
  'foundry': 'https://github.com/foundry-rs/foundry',
  'hardhat': 'https://github.com/NomicFoundation/hardhat',
  'hardhat-tron': 'https://github.com/aziz1975/layerzero-hardhat-tron',
  'anchor': 'https://github.com/coral-xyz/anchor',
  'viem': 'https://github.com/wevm/viem',
  'wagmi': 'https://github.com/wevm/wagmi',
  'ethers': 'https://github.com/ethers-io/ethers.js',

  // Security_Auditing
  'openzeppelin': 'https://github.com/OpenZeppelin/openzeppelin-contracts',
  'slither': 'https://github.com/crytic/slither',
  'echidna': 'https://github.com/crytic/echidna',
  'aderyn': 'https://github.com/Cyfrin/aderyn',
  'mythril': 'https://github.com/ConsenSys/mythril',
  'halmos': 'https://github.com/a16z/halmos',

  // ZK_and_zkVM
  'circom': 'https://github.com/iden3/circom',
  'cairo': 'https://github.com/starkware-libs/cairo',
  'snarkjs': 'https://github.com/iden3/snarkjs',
  'sp1': 'https://github.com/succinctlabs/sp1',
  'risc0': 'https://github.com/risc0/risc0',
  'halo2': 'https://github.com/zcash/halo2',
  'zksync-era': 'https://github.com/matter-labs/zksync-era',
  'optimism': 'https://github.com/ethereum-optimism/specs',
  'arbitrum': 'https://github.com/OffchainLabs/nitro',
  'starknet': 'https://github.com/starkware-libs/starknet-specs',

  // Interoperability
  'layerzero': 'https://github.com/LayerZero-Labs/LayerZero',
  'wormhole': 'https://github.com/wormhole-foundation/wormhole',
  'cosmos': 'https://github.com/cosmos/cosmos-sdk',
  'axelar': 'https://github.com/axelarnetwork/axelar-core',
  'hyperlane': 'https://github.com/hyperlane-xyz/hyperlane-monorepo',

  // Modular_and_DA
  'eigenlayer': 'https://github.com/Layr-Labs/eigenlayer-contracts',
  'celestia': 'https://github.com/celestiaorg/celestia-node',
  'avail': 'https://github.com/availproject/avail',

  // Bitcoin_Ecosystem
  'bitcoin': 'https://github.com/bitcoin/bitcoin',
  'bitcoin-js': 'https://github.com/bitcoinjs/bitcoinjs-lib',
  'bitcoin-rust': 'https://github.com/rust-bitcoin/rust-bitcoin',
  'mempool': 'https://github.com/mempool/mempool',
  'ordinals': 'https://github.com/ordinals/ord',
  'stacks': 'https://github.com/stacks-network/stacks-blockchain',
  'bitvm': 'https://github.com/BitVM/BitVM',

  // DeFi_and_MEV
  'uniswap-v4': 'https://github.com/Uniswap/v4-core',
  'aave-v3': 'https://github.com/aave/aave-v3-core',
  'flashbots': 'https://github.com/flashbots/mev-boost',
  'searcher-builder': 'https://github.com/ethereum/builder-specs',

  // Standards_and_Identity
  'eips': 'https://github.com/ethereum/EIPs',
  'walletconnect': 'https://github.com/WalletConnect/walletconnect-monorepo',
  'did-core': 'https://github.com/w3c/did-core',

  // Storage_and_Compute
  'arweave': 'https://github.com/ArweaveTeam/arweave',
  'filecoin': 'https://github.com/filecoin-project/lotus',
}

/**
 * Already generated skills, sync with their `skills/` directory
 */
export const vendors: Record<string, VendorSkillMeta> = {

}

/**
 * Hand-written skills with Anthony Fu's preferences/tastes/recommendations
 */
export const manual = [
]
