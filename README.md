# Movie API

A small Cloudflare Worker that serves curated movie rails for Harry Potter, James Bond, and Marvel.  This API is used by the stream-shelf set top app.

## Quick start

```bash
npm install
npm run dev
```

The local Worker URL is shown by Wrangler (usually `http://localhost:8787`).

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Health check |
| `GET` | `/fetchRail/movies` | All movie rails |
| `GET` | `/fetchRail/movies/harrypottery` | Harry Potter rail |
| `GET` | `/fetchRail/movies/jamesbond` | James Bond rail |
| `GET` | `/fetchRail/movies/marvel` | Marvel rail |

For example:

```bash
curl http://localhost:8787/fetchRail/movies/marvel
```

Responses are JSON. Unknown paths return a JSON `404` response.

## Scripts

```bash
npm run dev      # Start the local Worker
npm run check    # Type-check the project
npm test         # Run the test suite
npm run deploy   # Deploy with Wrangler
```

## Project structure

```text
src/
  data/       Movie catalog data
  models/     TypeScript data models
  routes/     HTTP route handling
  services/   Movie-rail lookup logic
  index.ts    Worker entry point
```
