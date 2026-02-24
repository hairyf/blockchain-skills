---
name: Bid value verification (Deneb+)
description: Excluding withdrawals from bid value and relay verification logic.
metadata:
  author: hairy
---

# Bid Value Verification (Deneb+)

From Deneb, withdrawals exist in the execution payload. The **value** in a BuilderBid must equal the payment to the proposer (fee_recipient), **excluding** any withdrawal amounts to that same address. Relays must enforce this before serving bids to proposers.

## Why exclude withdrawals

Withdrawals change the fee_recipient balance as part of consensus. If the bid value included those amounts, the builder could inflate the bid with withdrawal funds. So the bid value is defined as the payment from the block’s transaction/block rewards to the fee_recipient, not including withdrawal payouts to that address.

## Verification (relay / builder)

Compute:

- `balance_difference = post_state_balance - pre_state_balance` for the fee_recipient after applying the execution payload.
- `excluded_amount = sum(w.amount for w in execution_payload.withdrawals if w.address == fee_recipient)`.
- `proposer_payment = balance_difference - excluded_amount`.

Then require `proposer_payment == bid_value`. Submissions that fail this check must be treated as invalid and must not be served to proposers.

## Builder rules

Builders **MUST** not include withdrawal amounts to the fee_recipient when computing the `value` for their BuilderBid. Only the “true” payment (e.g. block reward, tx fees) should count toward `value`.

## Agent usage

- **Builder:** When computing `value` for a Deneb+ bid, subtract from the fee_recipient balance delta any withdrawals to that address.
- **Relay:** After receiving an execution payload and bid, simulate the payload, compute `balance_difference`, then run the verification above; reject or do not forward bids that fail.

<!--
Source references:
- sources/searcher-builder/specs/deneb/builder.md (Block scoring, Relaying, verify_bid_value)
-->
