---
name: ton-http-deployment-config
description: Run TON HTTP API locally or with Docker; webserver, tonlib, and cache environment variables.
---

# TON HTTP API deployment and configuration

From `sources/ton-http` (toncenter/ton-http-api). The service receives HTTP and accesses TON lite servers via tonlib. Recommended: x86_64 or arm64; HTTP API only 1 vCPU / 2 GB RAM; with cache 2 vCPUs / 4 GB RAM.

## Running the service

**Local (experimental):** `pip install ton-http-api` then `ton-http-api` (mainnet). Not recommended for production. Windows may need OpenSSL 1.1.1 win64.

**Docker Compose (recommended):** Install Docker and Docker Compose V2. Download configs:

```bash
mkdir private
curl -sL https://ton-blockchain.github.io/global.config.json > private/mainnet.json
curl -sL https://ton-blockchain.github.io/testnet-global.config.json > private/testnet.json
```

Run `./configure.py` to generate `.env`, then `docker-compose build` and `docker-compose up -d`. Use `TON_API_LITESERVER_CONFIG=private/testnet.json` (or mainnet) before `./configure.py` for testnet.

## Environment variables (configure.py → .env)

### Webserver

| Variable | Default | Description |
|----------|---------|-------------|
| `TON_API_HTTP_PORT` | 80 | HTTP port for the API |
| `TON_API_ROOT_PATH` | / | API path prefix (e.g. `/api/v2` behind Nginx/Traefik) |
| `TON_API_WEBSERVERS_WORKERS` | 1 | Gunicorn workers; under load use ~ CPU cores / 2 |
| `TON_API_GET_METHODS_ENABLED` | 1 | Enable `runGetMethod` endpoint |
| `TON_API_JSON_RPC_ENABLED` | 1 | Enable `jsonRPC` endpoint |
| `TON_API_LOGS_JSONIFY` | 0 | Log in JSON format |
| `TON_API_LOGS_LEVEL` | ERROR | DEBUG, INFO, WARNING, ERROR, CRITICAL |
| `TON_API_GUNICORN_FLAGS` | (empty) | Extra Gunicorn args |

### Tonlib

| Variable | Default | Description |
|----------|---------|-------------|
| `TON_API_TONLIB_LITESERVER_CONFIG` | docker: private/mainnet.json, local: URL to global config | Lite server config path (Docker: file only) or URL (local) |
| `TON_API_TONLIB_KEYSTORE` | docker: /tmp/ton_keystore, local: ./ton_keystore/ | Tonlib keystore path |
| `TON_API_TONLIB_PARALLEL_REQUESTS_PER_LITESERVER` | 50 | Max parallel requests per liteserver per worker |
| `TON_API_TONLIB_CDLL_PATH` | (empty) | Path to libtonlibjson if built manually |
| `TON_API_TONLIB_REQUEST_TIMEOUT` | 10 | Liteserver request timeout (seconds) |

### Cache (Redis)

| Variable | Default | Description |
|----------|---------|-------------|
| `TON_API_CACHE_ENABLED` | 0 | Enable Redis cache for liteserver responses |
| `TON_API_CACHE_REDIS_ENDPOINT` | localhost (docker: cache_redis) | Redis host |
| `TON_API_CACHE_REDIS_PORT` | 6379 | Redis port |
| `TON_API_CACHE_REDIS_TIMEOUT` | 1 | Redis timeout |

## FAQ (from source)

- **Own lite server:** Set `TON_API_TONLIB_LITESERVER_CONFIG` to a config with your liteserver(s). MyTonCtrl: `mytonctrl` → `installer` → `clcf` saves config; if behind firewall, set liteserver `ip` to `2130706433` (127.0.0.1) in that config.
- **Multiple instances:** Clone repo per instance, set unique `TON_API_HTTP_PORT` per clone, build and run each.
- **Update tonlib:** Docker: `docker-compose build --no-cache`. Local: `pip install -U ton-http-api`.
- **No working liteservers:** Config may reference blocks already pruned. Backup config and run `./scripts/update_init_block.sh private/mainnet.json` (use `--testnet` for testnet).

<!--
Source references:
- sources/ton-http/README.md
- https://github.com/toncenter/ton-http-api
-->
