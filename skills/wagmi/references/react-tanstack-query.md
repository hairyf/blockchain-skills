---
name: wagmi TanStack Query
description: Query and mutation options, caching, and persistence with TanStack Query.
---

# TanStack Query Integration

Wagmi hooks are built on TanStack Query. Query hooks (e.g. `useReadContract`, `useBlockNumber`) use **query** options; mutation hooks (e.g. `useWriteContract`, `useSendTransaction`) use **mutation** options.

## Query Options (supported)

Pass **query** to hooks that support it (e.g. `useReadContract`, `useBalance`):

- **enabled** — Disable auto-run (e.g. dependent queries).
- **gcTime** — Cache retention (ms); default 5 min (or `Infinity` in SSR).
- **staleTime** — Consider data fresh for this duration.
- **initialData** — Initial cache value.
- **refetchInterval**, **refetchOnWindowFocus**, etc. — Per TanStack Query; `queryKey`/`queryFn` are reserved by Wagmi.

## Mutation Options

Pass **mutation** to write hooks:

- **onSuccess**, **onError**, **onSettled** — Callbacks with (data, variables, context).
- **onMutate** — Optimistic updates; return value passed to onError/onSettled for rollback.
- **retry**, **networkMode**, **queryClient** — Standard TanStack mutation options.

## QueryClient

Default: from nearest `QueryClientProvider`. Override per hook with `mutation: { queryClient }` or `query: { queryClient }`.

## SSR

Use **cookieToInitialState** (React) or framework-specific helpers to hydrate from cookies so client state matches server. Persist with `createStorage` and same backend (e.g. cookie) for connection/chain.

## Devtools

TanStack Query Devtools work with Wagmi. Use a custom `queryKeyFn` or Wagmi’s `hashFn` from `@wagmi/core/query` so BigInt serializes correctly in devtools.

<!--
Source references:
- https://wagmi.sh/react/guides/tanstack-query
- sources/wagmi/site/shared/query-options.md
- sources/wagmi/site/shared/mutation-options.md
- sources/wagmi/site/react/guides/tanstack-query.md
-->
