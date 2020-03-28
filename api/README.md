# REST API

## Filtering search queries

The filter can be applied onto every index action REST endpoint e.g. GET /api/{Model}?filter={"limit": 10}.

Examples:

1. Pagination:

```
filter={"limit": 10, "offset": 0}
```

2. Order:

```
filter={"order": ["createdAt desc"]
```

3. Filter by model fields:

```
filter={"status": "done"}
```

4. Filter by relation:

```
filter={relations:{"categories:{"name":"categoryName"}}}
```

5. Filter by model json field:

```
filter={"json":{"properties":{"color":"red"}}}
```
