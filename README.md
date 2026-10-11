# StudioForge — personal production studio

This preserves the original StudioForge v1 creative fields and prompt compiler, with a persistent production workspace, guided decisions, reusable bibles, approvals, media storage, and generation handoffs. It is a working planning and production-record foundation. It is not yet an autonomous filmmaking system or a video editor.

## Run locally

Requires Node 22.13+ and the included package lock. From this directory:

```powershell
npm run install:ci
npm run build
npm run dev
```

The current development preview is `http://127.0.0.1:5173/`. If prompted, use the local preview sign-in. Local preview uses the starter's test identity and local D1/R2 emulation in `.wrangler/state`; it is not production cloud storage. Preserve that directory to preserve preview productions and originals. Export backups regularly. Deployed storage is provisioned separately by Sites and does not automatically contain local preview projects; import a backup to transfer a production.

For a fresh checkout, generate/build first and apply both migrations to the local database before opening a production:

```powershell
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_magical_shocker.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_common_hydra.sql
```

The existing preview database already has these migrations. Do not replay raw CREATE TABLE migration SQL into it. `npm test` runs the repository tests. `npm run build` builds the Vinext application. Native Windows environments where the helper's npm shim fails can use `node scripts/run-framework.mjs build` directly.

## Production workflow

1. Create a production. The Director asks one missing decision at a time across concept, story, visual style, cast, sets, storyboard, audio, renders, editing and delivery. Fill fields and explicitly approve snapshots. Changing upstream creative decisions makes affected approvals stale.
2. Write the script and canonical visual, character, costume, voice, environment and prop contracts. Reusable bibles copy independent records between productions, retain provenance, and preserve replaced style/voice snapshots.
3. Create scenes and ordered shots. Define action, camera, duration, exact dialogue and references. Upload raster images, audio or MP4/WebM files, record ownership, review, and link them to shots.
4. Compile generic or model-specific prompts. The current explicit profiles cover GPT Image 2 image direction, Sora 2 video direction, and GPT-4o mini TTS speech direction. They format handoffs; they do not establish provider access or promise model availability. Music/foley currently use provider-neutral briefs.
5. Prepare an immutable external generation handoff, review its manual credit estimate, approve, generate in your chosen tool, and record the real result and cost. Keep rejected attempts and prepare a new attempt for revisions. Attempt spend and older shot-level spend are displayed separately to avoid double counting.
6. Export the ordered editing cut list, assemble actual results in an external editor, and record the master and full-cut review. Delivery checks require human review; a planned shot, accepted still, or speech recording is not a finished video.
7. Download a complete backup with media, project-only JSON, production Markdown, or editing-cut Markdown from Delivery. Saved exports read the saved database snapshot. The top Backup action captures the current in-memory project for conflict recovery. Import adds a separate production and remaps media IDs, without replacing originals. Hosted saved-media backups have a 16 MB media limit to bound worker memory; larger projects can use the in-browser backup and individual originals.

## AI activation deliberately deferred

The server-side Creative Director implementation includes configurable model allowlists, strict structured proposals, project continuity context, token usage, an atomic daily spending reservation, expiring request previews, explicit per-request approval, and no automatic retry of uncertain requests. The tests use a fake provider response; no paid inference was run during foundation verification.

`STUDIOFORGE_AI_ENABLED` is false unless explicitly set to `true`. Activation and live-provider testing are deferred at the user's request. The dedicated credential already prepared locally must remain server-only in ignored `.env.local`; never copy it into client code, source archives, screenshots, or Git. No additional credential creation is required for this phase. The hosted environment has not been given the local credential.

Server configuration for a later activation: `STUDIOFORGE_AI_DAILY_USD` (default 1), `STUDIOFORGE_AI_REQUEST_USD` (default 0.10), and optional `STUDIOFORGE_AI_MODELS` JSON containing IDs, labels, inputRate/outputRate per million tokens. Rates and account model access must be rechecked before activation. Cost previews are conservative estimates from configured rates, not a provider billing guarantee. Usage resets by UTC day; unconfirmed calls retain their reservation for that day.

## Architecture and boundaries

- React/Vinext UI in `app/` and `src/`; the old standalone Vite entry was removed so the correct route serves the application.
- `src/model.js`, `workflow.js`, `bible-library.js`, `compiler.js`, and `model-prompts.js` hold portable production logic. Schema validation preserves unknown metadata while rejecting malformed known records.
- `server/studio.mjs` owns authenticated workspace and asset endpoints; compare-and-swap revisions prevent stale tabs from overwriting newer work. Failed or uncertain saves pause until explicit refresh. Media originals use immutable IDs.
- `server/exports.mjs` exports authenticated saved snapshots and media. `src/backup.js` prepares additive restores.
- `server/director.mjs` owns request previews, approvals, budget accounting and validated proposals. `server/providers/openai.mjs` is the server-only Responses API adapter.
- `src/providers.js` separates provider execution capabilities from prompt formatting. OpenArt is currently a guided handoff. A ChatGPT plugin connection is not an application credential.
- No team collaboration, billing, subscriptions, automatic media generation, timeline renderer, voice cloning, or automated quality approval is included.

## Verified integration references

- [OpenArt official MCP](https://openart.ai/mcp/): OAuth-authorized MCP, with capabilities discovered from its current schema.
- [OpenArt official CLI](https://github.com/OpenArt-AI/cli): separate user login. Neither interface has been wired into the hosted application; no guessed REST endpoints are used.
- [OpenAI image prompting](https://developers.openai.com/api/docs/guides/image-prompting), [Sora 2 prompting](https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide), and [speech generation](https://developers.openai.com/api/docs/guides/text-to-speech) inform explicit manual profiles. Availability and destination controls still require verification before external generation.

See `VERIFICATION.md` for tested workflows and remaining limits.

