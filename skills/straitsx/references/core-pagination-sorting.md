---
name: straitsx-pagination-sorting
description: StraitsX Card Issuing API — list pagination and sort query parameters.
---

# Pagination and sorting

List endpoints support `page[size]`, `page[number]`, and `sort` query parameters.

## Pagination

- **page[size]**: Number of items per page. Default: 10.
- **page[number]**: Page index. Default: 1.

Example — third page, 10 per page:

```
?page[size]=10&page[number]=3
```

## Sorting

- **sort**: Order by field. Prefix `+` = ascending, `-` = descending. `+` must be URL-encoded as `%2B` in query strings.

Example — ascending by creation date:

```
?sort=%2BcreatedAt
```

Descending:

```
?sort=-createdAt
```

## Usage

- Use consistent `page[size]` to avoid surprises; respect 429 (rate limit) when paging quickly.
- Combine with filters when the API supports them to narrow result sets before pagination.

<!--
Source references:
- https://docs.straitsx.com/v1-CARDS/docs/pagination-sorting
-->
