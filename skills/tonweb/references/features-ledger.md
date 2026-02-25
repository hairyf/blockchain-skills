---
name: tonweb-ledger
description: Ledger hardware wallet — AppTon, getPublicKey, getAddress, sign, transfer; TransportWebUSB, TransportWebHID, Bluetooth.
---

# Ledger Hardware Wallet

TonWeb integrates Ledger TON app via `@ledgerhq/hw-transport-*` and exposes `TonWeb.ledger` with transports and `AppTon` for get address, sign, and transfer.

## Setup

```js
const TonWeb = require('tonweb');
const { TransportWebUSB, TransportWebHID, BluetoothTransport, AppTon } = TonWeb.ledger;

const transport = await TransportWebUSB.create();
const ton = new TonWeb();
const app = new AppTon(transport, ton);
```

Use `TransportWebHID.create()` or `BluetoothTransport.create()` for HID or BLE.

## AppTon API

- **getAppConfiguration()** — `{ version }` (e.g. "1.2.3").
- **getPublicKey(accountNumber, isDisplay)** — `{ publicKey: Uint8Array }`. `accountNumber` is index; set `isDisplay` to show on device.
- **getAddress(accountNumber, isDisplay, addressFormat)** — returns Wallet V3R1 address: `{ address: Address }`. `addressFormat` is a sum of:
  - `ADDRESS_FORMAT_HEX` (0)
  - `ADDRESS_FORMAT_USER_FRIENDLY` (1)
  - `ADDRESS_FORMAT_URL_SAFE` (2)
  - `ADDRESS_FORMAT_BOUNCEABLE` (4)
  - `ADDRESS_FORMAT_TEST_ONLY` (8)
- **sign(accountNumber, buffer)** — sign arbitrary bytes: `{ signature: Buffer }`.
- **transfer(accountNumber, wallet, toAddress, amount, seqno, addressFormat)** — build and sign a wallet transfer. Uses same semantics as `WalletContract.createTransferMessage`. If `seqno === 0`, produces deploy + transfer. Returns a method object (e.g. `.send()`).

## Example: get address and send

```js
const { address } = await app.getAddress(0, true, app.ADDRESS_FORMAT_USER_FRIENDLY + app.ADDRESS_FORMAT_BOUNCEABLE);
const wallet = ton.wallet.create({ address });
const seqno = await wallet.methods.seqno().call();
const method = await app.transfer(0, wallet, 'EQ...', TonWeb.utils.toNano('0.01'), seqno, 0);
await method.send();
```

## Key points

- Ledger app returns Wallet V3R1 address; use `tonweb.wallet.create({ address })` to get a wallet interface.
- For transfer, pass the same `wallet` instance and current `seqno`; the device signs the transfer message.
- Close transport when done: `transport.close()`.

<!--
Source references:
- sources/tonweb/src/ledger/AppTon.js
- sources/tonweb/src/index.js (TonWeb.ledger)
-->
