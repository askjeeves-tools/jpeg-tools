# JPEG Converter

Convert JPEG files in your browser. Nothing leaves your device.

**Try it online:** [jpeg.askjeeves.cc](https://jpeg.askjeeves.cc)

**More free tools:** [askjeeves.cc](https://askjeeves.cc) — PDF, images, CSV/JSON/Excel, Word, and more.

## Supported conversions

| Conversion | Status | Notes |
|------------|--------|-------|
| JPEG → PNG | Enabled | Quality + max width options; max ~50 MB |
| JPEG → WebP | Enabled | Quality + max width options; max ~50 MB |
| Convert to PDF | Enabled | Max ~50 MB |
| Convert to Base64 | Enabled | `.base64.txt` output |
| Crop image | Enabled | Interactive crop box |
| Compress image | Enabled | Quality slider |
| Compress images (batch) | Enabled | Requires ≥2 files; ZIP output |

## How it works

All conversion runs **in your browser**. Files are never uploaded to a server. Shared UI and validation live in vendored `@askjeeves/*` packages under `vendor/`. This repo wires [tool.config.ts](tool.config.ts) to processor functions in [src/scripts/processors.ts](src/scripts/processors.ts).

## Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 22.12 |
| pnpm | 10.27+ |

Enable pnpm once if needed:

```bash
corepack enable pnpm
```

**Use pnpm, not npm** — a `preinstall` script enforces this.

## Install and run

```bash
git clone https://github.com/askjeeves-tools/jpeg-tools.git
cd jpeg-tools
pnpm install
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build and preview

```bash
pnpm build      # output → dist/
pnpm preview    # serves dist/ locally
```

Do not open `dist/index.html` via `file://` — ES modules require a local server.

## Deploy

### Option A — Cloudflare Pages (built-in)

```bash
pnpm deploy
```

This runs `pnpm build` then `wrangler pages deploy dist`. Log in first with `wrangler login`. Configuration lives in [wrangler.toml](wrangler.toml).

**First-time Cloudflare setup:**

1. Create a Cloudflare Pages project (or let Wrangler create one on first deploy).
2. In the Cloudflare dashboard, open the project → **Custom domains** → add `jpeg.askjeeves.cc`.
3. Add the DNS record Cloudflare provides (typically a CNAME to your Pages hostname).

**GitHub repo setup** (for [askjeeves-tools/jpeg-tools](https://github.com/askjeeves-tools/jpeg-tools)):

1. Create a public repo named `jpeg-tools` in the [askjeeves-tools](https://github.com/orgs/askjeeves-tools/repositories) org.
2. Push this directory (source, `vendor/`, `pnpm-lock.yaml`, config files — not `node_modules/` or `dist/`).
3. Set the repo website to `https://jpeg.askjeeves.cc` and topics such as `astro`, `jpeg`, `image-converter`, `browser`, `cloudflare-pages`.

### Option B — Any static host

After `pnpm build`, upload the contents of `dist/` to Netlify, Vercel, GitHub Pages, S3, or any static host. No server-side runtime is required.

## Scripts

| Script | Purpose |
|--------|---------|
| `dev` | Astro dev server |
| `build` | Static production build |
| `preview` | Preview `dist/` |
| `deploy` | Build + Cloudflare Pages deploy |
| `test:e2e` | Playwright end-to-end tests (see below) |
| `lint` | Biome check |

## Packages

### Runtime dependencies

| Package | Role |
|---------|------|
| `astro` | Static site framework |
| `@askjeeves/ui` | Layout, converter UI, client controller |
| `@askjeeves/conversion-core` | Config, validation, errors, file limits |
| `@askjeeves/astro-integration` | Astro plugin, branding globals |
| `@askjeeves/processors-images` | JPEG conversion, crop, compress, PDF, Base64 |

The five `@askjeeves/*` packages are vendored under `vendor/@askjeeves/` and linked via `file:` paths in [package.json](package.json). You do not install them separately.

### Dev dependencies

| Package | Role |
|---------|------|
| `typescript` | Type checking |
| `@playwright/test` | End-to-end tests |
| `wrangler` | Cloudflare Pages deploy |

### Transitive (via processors)

[pdf-lib](https://pdf-lib.js.org/) (JPEG → PDF) and [JSZip](https://stuk.github.io/jszip/) (batch compress) are pulled in automatically by `@askjeeves/processors-images`. Image format conversion uses the browser Canvas API.

## Tests

End-to-end tests under `tests/e2e/` import `@askjeeves/test-e2e`, which is **not** included in this standalone export. To run them locally, sync that package from the [Ask Jeeves Modules](https://github.com/montana-digital/askjeeves-modules) monorepo into `vendor/@askjeeves/test-e2e` and add a matching `file:` dependency in `package.json`, or run tests from the upstream monorepo instead.

```bash
pnpm test:e2e
```

## Errors users may see

Failures appear in `#tool-status` with accessible error styling. Common cases:

| Situation | What to do |
|-----------|------------|
| Wrong file type | Upload a JPEG file |
| File too large | Use a smaller file (max ~50 MB, lower for some conversions) |
| Invalid file content | Use a valid JPEG file |
| Conversion failed | Try different options or another file |
| Cancelled | Click Convert again |
| Load / engine error | Refresh the page |

## For maintainers

This repo was exported from the [Ask Jeeves Modules](https://github.com/montana-digital/askjeeves-modules) monorepo as a self-contained project. Shared packages live in `vendor/@askjeeves/`.

Do **not** copy `tools/jpeg-tools/` directly from the monorepo — that folder uses `workspace:*` dependencies that only resolve inside the monorepo. To re-export after upstream changes:

```bash
node scripts/export-standalone-tool.mjs jpeg-tools ./export/jpeg-tools
```

See [docs/sub-projects.md](https://github.com/montana-digital/askjeeves-modules/blob/main/docs/sub-projects.md) in the upstream repo. See also [STANDALONE.md](STANDALONE.md).
