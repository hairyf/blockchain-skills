---
name: Account Space
description: Calculating account size for the space constraint and using InitSpace.
---

# Account Space

For non–zero-copy accounts, the `space` constraint must include **8 bytes for the discriminator** plus the size of the account data. Zero-copy uses C layout; this table applies to serialized (non–zero-copy) accounts.

## Type sizes (bytes)

| Type | Size |
|------|------|
| bool | 1 |
| u8, i8 | 1 |
| u16, i16 | 2 |
| u32, i32 | 4 |
| u64, i64 | 8 |
| u128, i128 | 16 |
| Pubkey | 32 |
| [T; N] | size(T) * N |
| Vec<T> | 4 + size(T) * len |
| String | 4 + byte length |
| Option<T> | 1 + size(T) |
| Enum | 1 + size of largest variant |
| f32, f64 | 4, 8 (NaN fails serialize) |

## Example

```rust
#[account]
pub struct MyData {
    pub val: u16,
    pub state: GameState,
    pub players: Vec<Pubkey>,  // e.g. max 10
}

impl MyData {
    pub const MAX_SIZE: usize = 2 + (1 + 32) + (4 + 10 * 32);
}

#[derive(Accounts)]
pub struct InitializeMyData<'info> {
    #[account(init, payer = signer, space = 8 + MyData::MAX_SIZE)]
    pub acc: Account<'info, MyData>,
    // ...
}
```

## InitSpace macro

Use `#[derive(InitSpace)]` to get a constant for the data part (still add 8 for discriminator in `space`):

```rust
#[account]
#[derive(InitSpace)]
pub struct ExampleAccount {
    pub data: u64,
    #[max_len(50)]
    pub string_one: String,
    #[max_len(10, 5)]
    pub nested: Vec<Vec<u8>>,
}

// In Accounts:
#[account(init, payer = payer, space = 8 + ExampleAccount::INIT_SPACE)]
pub data: Account<'info, ExampleAccount>,
```

`max_len` on Vec is element count, not bytes (e.g. `Vec<u32>` with `#[max_len(10)]` → 4 + 10*4 = 44 bytes).

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/space.mdx)
-->
