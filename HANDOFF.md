# StudioForge source preservation handoff

Prepared 2026-10-10. This is the existing deployed application, not a new scaffold. No application behavior was changed for this handoff.

- Destination repository: https://github.com/blackulaphoto/STUDIOFORGE
- Branch: `main`
- Application source baseline: `afd6ebb2a1df1d22f776beca77c7a7161337274d` (`Update Site source`). The handoff commit adds documentation, a blank environment template and its ignore exception only.
- Live application: https://studioforge-production-desk.lifestream.chatgpt.site/
- Sites project: `appgprj_6acb06e0d6ec819190ed57fe991b42d5`
- Existing successful deployment: `appgdep_6acb1238b1a8819197bfd04e21f985be`
- No redeployment was performed for this handoff.

## Architecture and source map

React 19 with Vinext/Vite, using the Next-style app router and a Cloudflare Worker runtime. `app/page.tsx` loads the real production desk in `src/App.jsx`; the obsolete standalone prototype entry was removed before deployment. This is not a conventional static Vite-only application or a generic Next server deployment.

| Location | Responsibility |
|---|---|
| `app/` | Page, layout, ChatGPT identity integration and catch-all API route |
| `src/App.jsx`, `src/Workflow.jsx` | Production workspace, editors, scenes, shots, assets, stage approvals, manual generation ledger and editing/delivery handoffs |
| `src/AIDirector.jsx` | AI request preview, approval, usage, history and suggestion application |
| `src/model.js`, `src/validate-project.js` | Project schema, migrations/normalization and validation |
| `src/compiler.js`, `src/model-prompts.js` | Original creative fields, production prompt compiler and explicit model formatting profiles |
| `src/workflow.js` | Fixed guided questions, approval snapshots, generation-attempt transitions, credits and ordered cut list |
| `src/BibleLibrary.jsx`, `src/bible-library.js` | Independent cross-production character, location, style and voice snapshots |
| `src/storage.js`, `src/backup.js` | Shared persistence, save conflict handling, media access, full backups and additive import |
| `server/studio.mjs`, `server/exports.mjs` | Authenticated workspace/media/export endpoints; owner isolation; revision checks |
| `server/director.mjs`, `server/providers/openai.mjs` | Real server-side OpenAI adapter, structured output, context, reservations and accounting |
| `src/providers.js` | OpenArt capability metadata/guard; no executable OpenArt adapter yet |
| `db/`, `drizzle/` | Database definitions and two checked-in SQL migrations, including workspace and AI request ledger |
| `build/`, `scripts/`, `vendor/` | Required Sites/Vinext worker and local-install/build support; these are source dependencies, not disposable build output |
| `.openai/hosting.json` | Non-secret Sites project ID and `DB`/`BUCKET` binding declarations |

D1 stores an owner-scoped workspace JSON document with compare-and-swap revisions and a separate AI request ledger. R2 stores immutable media originals under owner-scoped IDs. Cloud data does not live in this Git repository. Local emulated storage is separate from the deployed storage.

## Completed, exercised functionality

Live audit confirmed production creation, manual brief/script/style/cast/set/prop/audio authoring, full browser refresh/reopen, project switching, real reference upload and shot attachment, scene rename, prompt compilation/copy, cross-project bible copy/apply, shot duplication/reordering, ordered cut list, approval snapshots and stale story approval detection. A full live backup with media was downloaded and imported successfully; scene and image links survived.

These are real planning/storage functions. The application is not yet a complete AI filmmaking studio. See `AUDIT.md` for the detailed 14-subsystem assessment and evidence.

## Incomplete functionality and known limitations

- Deployed AI Director is unconfigured. Active guided questions are deterministic missing-field checks, not contextual intelligence. Real provider quality has not been evaluated.
- AI proposal schema edits allowed text fields on existing entities; it cannot yet create a complete scene/shot graph. Context is text/metadata only, limited to 65,000 bytes and the last four assistant responses rather than full conversation history.
- No in-app OpenArt generation, OAuth, capability discovery, live pricing, job polling or result ingestion. The manual ledger records user actions; it does not execute them.
- Character, speaker and location shot references use names. Renaming a character breaks those links; scenes and attached assets use stable IDs.
- An accepted result can remain selected after changing its source dialogue/style. Result strings do not prove that media exists. Historical approvals need source revision tracking.
- A 100-credit manual attempt can be approved against a 1-credit project budget. Manual attempt approval is independent of Director gate approval. No external credit charge occurs in this app.
- Delivery state can be marked Approved for release without a master or completed QC. Separate status dropdowns and stricter Director gates can disagree.
- Expressions/costumes/voices are largely text contracts. No visual identity checking, voice auditioning/synthesis, lip-sync execution, music/effects generation, sound mixer, timeline editor or movie rendering.
- Editing is an external-editor handoff and cut list. Exporting production Markdown/JSON is not exporting a finished movie.
- Workspace JSON limit 5 MB; media upload limit 50 MB per asset; saved portable export limit 16 MB aggregate media. Browser backup uses memory/base64. Large productions need a streamed archive strategy.
- Save conflicts pause further writes pending explicit refresh. There is no full undo/version restore UI. Asset metadata deletion does not garbage-collect originals; failed imports may orphan uploads.
- `npm run lint` currently fails (6 errors, 6 warnings), mostly React purity/ref/effect rules in `AIDirector.jsx` and `App.jsx`. Do not misreport this as a passing check.

## Windows installation and local run

Use a current Node.js release satisfying `>=22.13.0`, npm, Git and PowerShell. Keep the lockfile. The existing checkout built successfully in Windows; a fresh machine install was not repeated for this preservation task.

```powershell
git clone https://github.com/blackulaphoto/STUDIOFORGE.git
Set-Location STUDIOFORGE
npm run install:ci
npm run build
```

For a NEW local database only, apply the checked-in migrations after build produces `dist/server/wrangler.json`:

```powershell
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_magical_shocker.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_common_hydra.sql
npm run dev
```

Open http://127.0.0.1:5173/ . Use local preview sign-in if prompted. Portable local preview uses mock/test identity and D1/R2 emulation in `.wrangler/state`; this is not live authentication or cloud data. Do not expose that development setup as public production. Preserve local runtime data separately or export backups. Do not replay raw CREATE TABLE migrations into an existing initialized database.

`npm start` serves the built worker locally (follow the printed port). If a Windows npm shim is problematic, `node scripts/run-framework.mjs build` and `node scripts/run-framework.mjs dev` are direct equivalents. Clean clones default to the portable execution profile; `.sites-runtime` is machine-local and intentionally excluded.

No API key is necessary to use the manual production workflow. `.env.example` contains names with blank values only. Do not blindly copy all empty optional configuration entries into an active environment: absent optional variables select defaults, while empty numeric/model JSON values are invalid. Leave optional entries absent until deliberately configured.

## Tests and minimum verification

```powershell
npm test
npm run build
npm run lint
```

Immediately before this handoff, audit checks on the same application baseline produced: **56 tests passed; production build passed; lint failed with 6 errors and 6 warnings**. Tests exercise production logic and mocked/local server adapters, including auth isolation, revisions, export/import and AI reservation logic. They do not prove live AI/generation quality. No repeated install/build or paid calls are needed for this documentation-only handoff. Source completeness and secret exclusion were checked when packaging/pushing.

## Existing live deployment

The existing deployment was published through ChatGPT Sites. Its build uses the checked-in Sites/Vinext plugins and Worker entry, with hosted identity supplied through the Sites platform and provisioned D1 `DB` and R2 `BUCKET` bindings. `.openai/hosting.json` preserves the project association; it contains no credential. `.sites-runtime`, local `.wrangler` data and generated `dist` are not portable source and are excluded.

Pushing to GitHub does not itself redeploy this site. This repository preserves the application code and platform integration source; it does not grant management access to the existing hosting account. A different host requires deliberate equivalent identity, worker bindings, database/storage provisioning and secret configuration. Do not assume ordinary `next start` or a static upload reproduces the hosted runtime.

The existing cloud database, uploaded originals, deployment logs and account-level secrets are not included in source control. Export live production backups through Delivery to migrate project content. The synthetic audit backup is delivered separately, not committed as user production data.

## OpenAI configuration and genuine functionality

Real implementation: server-only Responses API adapter with structured replies/proposals, project text context, model selection, explicit request approval, per-request limits, atomic daily reservation, usage history and conservative no-retry handling of uncertain calls. No frontend key usage is intended.

Current hosted state: **unconfigured / activation deferred**. No paid request was tested. Keep it disabled during transfer. No credentials were created, copied to Git or moved into the new environment for this handoff.

Variables (all optional until deliberate activation, except a key when enabling):

- `OPENAI_API_KEY`: dedicated StudioForge secret, server-side only.
- `STUDIOFORGE_AI_ENABLED`: only literal `true` enables requests; absent means disabled.
- `STUDIOFORGE_AI_DAILY_USD`: default 1 when absent.
- `STUDIOFORGE_AI_REQUEST_USD`: default 0.10 when absent.
- `STUDIOFORGE_AI_MODELS`: optional JSON array of model objects with `id`, `label`, `inputRate`, `outputRate`; rates are USD per million tokens. Inspect `configuration()` and defaults in `server/director.mjs`; verify current pricing/model access before activation.

For later authorized setup, use ignored server-side environment configuration or hosting secrets, never frontend-prefixed environment variables. Verify that the worker receives those values; a file existing on disk does not prove hosted configuration. Quotes use configured rates and are estimates, not provider billing guarantees. Uncertain completion retains reservations; reconciliation is unfinished.

## OpenArt configuration and genuine functionality

Only manual prompt/reference handoff and attempt tracking are functional. No OpenArt environment variable or API key is expected by current code. Official integration avenues are OAuth MCP (https://openart.ai/mcp/) and the official CLI (https://github.com/OpenArt-AI/cli), neither wired into the application. A ChatGPT plugin connection does not authorize this application. Do not invent endpoints or infer app access from a chat connector. Model-specific profiles format text only and do not prove current provider/model support.

## Recommended next steps

1. Fix stable character/location/prop/voice references, stale render acceptance, inconsistent status gates, budget enforcement and lint failures. Add focused regressions.
2. Extend the Director to create reviewable scene/shot/bible proposals with conversational memory and conflict-aware application. Evaluate reasoning before claiming intelligence.
3. Implement one verified provider/job lifecycle with reference uploads, quotes, approvals, result/cost reconciliation and explicit failure recovery. Retain manual handoffs where authorization is unavailable.
4. Add actual audio/voice continuity and a bounded media assembly/export path. Finish and watch a real short film before declaring the studio complete.

Preserve the existing visual direction. No billing, team collaboration or enterprise expansion is required.

## Intentionally not transferred

API credentials and ignored `.env.local`; dependency directories; generated `.next`, `.vinext`, `dist`, caches/logs and machine-local runtime directories; local/cloud user databases and media originals; hosting/account access tokens; GitHub/hosting authentication. Dependency manifests, lockfile, worker/plugin source, schemas/migrations, tests, assets checked into source, and configuration templates are included. No required tracked application source was intentionally omitted.
