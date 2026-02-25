---
name: thegraph-features-unit-testing
description: Matchstick unit testing for subgraph mappings — graph test, describe/test, assertions, mocking, coverage.
---

# The Graph — Unit Testing with Matchstick

Matchstick is a unit testing framework for subgraph mappings. Tests run in a sandbox; you mock events/calls and assert on store state.

## Setup

```sh
yarn add --dev matchstick-as
```

Add a test script: `"test": "graph test"`. PostgreSQL is required (or use Docker with `graph test -d`).

## Running tests

```sh
graph test                    # all tests
graph test gravity            # tests in gravity.test.ts or gravity/
graph test path/to/file.test.ts
graph test -d                 # run in Docker
graph test -c                 # coverage mode
graph test -r                 # force recompile
```

## Test structure (matchstick-as >= 0.5.0)

- **describe(name, () => {})** — group tests.
- **test(name, () => {}, should_fail?: bool)** — single test.
- **beforeAll / afterAll** — run once per file or describe.
- **beforeEach / afterEach** — use **clearStore()** to reset store between tests when needed.

## Assertions and mocks

- **assert.fieldEquals(entityType, id, fieldName, value)** — assert one field.
- **assert.entityCount(n)** — assert number of entities.
- **createMockedFunction(...)** — mock contract calls (eth_calls).
- **newMockEvent()** — build mock events.
- **dataSourceMock** — mock context(), address(), network() for dynamic data source tests.

Handlers must be **exported** from the test file. Use create*Event helpers to build event instances.

## Key points

- Clear store between tests (beforeEach + clearStore) when they share entities.
- Mock contract calls with createMockedFunction when mappings use eth_calls.
- Keep graph-ts and matchstick-as versions aligned.

<!--
Source references:
- https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/
-->
