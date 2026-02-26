---
name: WalletConnect Pay SDK
description: Pay SDK—getPaymentOptions, getRequiredPaymentActions, confirmPayment, provider detection, React Native.
metadata:
  author: hairy
---

# WalletConnect Pay

`@walletconnect/pay` is the TypeScript SDK for WalletConnect Pay: payment flows for React Native and (later) web. You get payment options from a link, resolve required wallet RPC actions, sign with the wallet, then confirm the payment.

## Initialization

```typescript
import { WalletConnectPay } from "@walletconnect/pay";

const client = new WalletConnectPay({
  appId: "your-app-id",
  // or apiKey: "your-api-key",
  clientId: undefined,
  baseUrl: undefined,
  logger: undefined,
});
```

Either `appId` or `apiKey` is required for authentication.

## Get payment options

```typescript
const options = await client.getPaymentOptions({
  paymentLink: "https://pay.walletconnect.com/pay_123",
  accounts: ["eip155:8453:0xYourAddress"], // CAIP-10
  includePaymentInfo: true,
});
// options.paymentId, options.options (array of PaymentOption)
```

## Get required actions and confirm

```typescript
const actions = await client.getRequiredPaymentActions({
  paymentId: options.paymentId,
  optionId: options.options[0].id,
});
// Each action has action.walletRpc: { chainId, method, params (JSON string) }

// Sign with wallet (e.g. signTypedData per action)
const signatures = await Promise.all(
  actions.map((action) =>
    wallet.signTypedData(
      action.walletRpc.chainId,
      JSON.parse(action.walletRpc.params)
    )
  )
);

const result = await client.confirmPayment({
  paymentId: options.paymentId,
  optionId: options.options[0].id,
  signatures,
  collectedData: undefined, // optional, if options.collectData was set
});
// result.status: "requires_action" | "processing" | "succeeded" | "failed" | "expired"
```

## Collected data

When `getPaymentOptions` returns `options.collectData`, collect the required fields from the user and pass them as `collectedData` into `confirmPayment`.

## Provider detection (React Native / Web)

- **React Native**: Requires `@walletconnect/react-native-compat` and the native Pay module. Use `isProviderAvailable()` or `isNativeProviderAvailable()` before using the client.
- **Web**: WASM provider is planned; use `detectProviderType()` for `'native' | 'wasm' | null`.
- Manually set native module if needed: `setNativeModule(NativeModules.RNWalletConnectPay)`.

```typescript
import { isProviderAvailable, detectProviderType, setNativeModule } from "@walletconnect/pay";
if (isProviderAvailable()) {
  const providerType = detectProviderType();
}
```

## Errors

The SDK throws `PayError`, `PaymentOptionsError`, `ConfirmPaymentError`. Check `error instanceof PaymentOptionsError` and use `error.originalMessage` / `error.code` for handling.

## Key points

- Use CAIP-10 accounts in `getPaymentOptions` and when confirming.
- `getRequiredPaymentActions` returns wallet RPC actions; sign them with the same wallet that owns the accounts.
- For React Native, install and link `@walletconnect/react-native-compat` and the Pay native module.

<!--
Source references:
- sources/walletconnect/packages/pay/README.md
-->
