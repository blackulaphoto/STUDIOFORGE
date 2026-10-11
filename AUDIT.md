# StudioForge functional and production-readiness audit

Audited 10 October 2026 (America/Los_Angeles). Live application: https://studioforge-production-desk.lifestream.chatgpt.site/ . Source: `outputs/studioforge`, commit `afd6ebb2a1df1d22f776beca77c7a7161337274d`.

**Verdict: a functional personal production-planning foundation, but not yet an operational AI filmmaking studio.** Real persistence, media storage, reusable text contracts, manual shot planning, prompt compilation, approval snapshots and portable backup exist. Adaptive creative direction is unavailable in the deployed application. Media generation, voice synthesis, lip-sync, sound production and film assembly require external tools. Do not call the complete workflow production-ready yet.

The existing visual interface and source were preserved. No feature code was changed or redeployed. No paid generation or credential setup was initiated. Three clearly titled audit productions remain in the live workspace as evidence. Their data is synthetic; the uploaded image is a tiny test fixture, not production artwork. The 100-credit handoff was approved only as a record for testing; it was never submitted or charged. Delivery state was restored to Not started after the bypass test.

## How status is assigned

- **Fully functional:** the stated bounded operation was actually exercised successfully. This does not imply its entire subsystem is complete.
- **Partially implemented:** useful working behavior exists, but important parts of the requested subsystem are absent or defective.
- **Placeholder:** text guidance, fields or labels stand in for the requested intelligent or executable behavior.
- **Missing:** no implementation of the requested operation was found.

Evidence is explicitly distinguished below: **Live** means exercised in the deployed browser; **Source** means code inspection; **Automated** means local execution with tests/fixtures. Real paid AI quality, generation and output quality were deliberately not tested.

## Subsystem matrix

| # | Subsystem | Status | What works / what prevents completion |
|---|---|---|---|
| 1 | Intelligent creative interviews and recommendations | **Placeholder in the live workflow; partial AI backend** | Live: the active interview stores answers and selects the next missing field. It did not extract audience/runtime from an idea or answer a creative recommendation request. AI panel says unconfigured and disables paid request preview. Source: a real server-side Responses API adapter exists, but deployed creative reasoning and output quality are untested. |
| 2 | Project and story development | **Partial** | Live: create, name, edit idea/audience/runtime/synopsis/script, refresh, reopen and switch projects work. No automatic concept development, beat construction or script-to-scene breakdown occurred. Those remain manually authored fields. |
| 3 | Reusable visual style bibles | **Partial** | Live: medium/signature saved, flowed into prompts, copied to another production and applied. Prior style retained as a snapshot. Missing linked approved style-media roles, visual comparison and drift detection. |
| 4 | Character design, references, expressions and identities | **Partial** | Live: appearance, immutable details, costume, expressions and voice pointer persist and copy. Prompt includes identity and wardrobe. Expression/turnaround fields are text; there is no design generation, expression asset collection or visual identity validation. Character rename breaks shot links. |
| 5 | Locations, environments, costumes and props | **Partial** | Live: set design/geometry and prop contract can be authored; location snapshot can be reused. Source: costume is a character text field; props use text name matching; no independent costume inventory/versioning, spatial editor or cross-production prop-copy flow. |
| 6 | Scriptwriting, dialogue, scenes and shot lists | **Partial** | Live: script text and explicit shot/scene records work. Duplicate and reorder reach the cut list. No screenplay editor/parser, scene extraction or synchronized script/shot dialogue model. Dialogue is separately stored and can diverge. |
| 7 | Storyboarding and camera direction | **Partial** | Live: shot cards, uploaded reference, scene rename, framing and camera movement persist. Missing generated boards, camera visualization, timing preview/animatic and motion validation. Camera language is free text. |
| 8 | Model-specific image/video prompts | **Partial** | Live: generic and Sora profile compilation and Copy prompt work; output includes entered identity, costume, geometry, action and reference checklist. Source: generic plus three named profiles are static formatting guidance. No discovered input schema, executable payload, duration/resolution enforcement or model availability validation. |
| 9 | Consistent voices, dialogue and lip-sync | **Partial planning; execution missing** | Live: voice pointer and voice snapshot reuse/apply work, No dialogue mode saves. Source: exact transcript/performance sections and lip-sync handoff templates exist. No auditioning, voice synthesis, approved audio version links, timing alignment, phoneme mapping or lip-sync generation. |
| 10 | Music, effects and audio production | **Partial planning; execution missing** | Live: musical identity, mix and rights notes save. Source: music/foley prompt templates exist. No music/effects generation, sound timeline, stems, mix playback, ducking, loudness measurement or mastered audio. |
| 11 | OpenArt integration and handoffs | **Partial manual handoff; live adapter missing** | Live: honest unavailable notice, prompt handoff and immutable manual attempt record. No app OAuth connection, capability discovery, reference upload to OpenArt, live quote, job submission, polling or result ingestion. Provider registry is metadata and a guard, not a runnable provider architecture. |
| 12 | Assets, continuity, revisions and approvals | **Partial** | Live: original upload, approval checkbox, shot attachment, reload, export and restoration work. Concept/story approval snapshots work; story edits visibly stale the story approval. Source and reproduction: accepted render can remain eligible after its creative inputs change. No full asset lineage/version comparison, undo history or automated media QC. |
| 13 | Credits and spending safeguards | **Partial** | Live: manual estimate ledger and unknown-cost labels work. A 100-credit estimate was approved despite a 1-credit project budget and unapproved production gates. No external charge occurred. Automated: separate AI text request reservation/approval logic passes tests, but is untested with a paid live request. OpenArt credits are manually entered, not reconciled balances. |
| 14 | Final assembly and export | **Partial exports; film assembly missing** | Live: ordered cut list and full portable JSON download/import work. Source: production and cut Markdown exporters exist and export tests pass. Editing screen explicitly requires an external editor. No film rendering, transitions, soundtrack mix, caption generation or final movie export. Release dropdown can say Approved for release with no media and unchecked QC. |

No broad subsystem qualifies as fully complete against the requested studio objective. The bounded operations explicitly marked successful above are real functionality, not mocks.

## Live test record

1. Started from the empty deployed workspace and created **AUDIT — Night Bloom**. Opening idea: a deaf botanist, Iona, deciding whether to illuminate the final night-blooming flower during a blackout; 20 seconds, silent charcoal animation, adults, uneasy hope. Asked for a visual turning-point recommendation.
2. Saved this in the guided interview. It next asked who the audience was, although the idea already specified adults. It produced no recommendation, and the runtime retained its default until manually edited. This verifies checklist behavior, not contextual understanding.
3. Manually authored brief, synopsis, script, style, Iona's appearance/identity/costume/expressions, greenhouse geometry, a 20-second shot and sound plan. Compiled prompt included those canonical fields. Clipboard output contained the character identity.
4. Set budget to 1 credit. Prepared a handoff with model label **AUDIT ONLY — no submission**, estimated at 100 credits. Clicked its record-only approval. The UI accepted it, without an over-budget block. Did not click submission or call a provider.
5. Renamed Iona to Iona Vale. Production warnings reported an unknown shot character, because the shot still contained Iona. Restored the name afterward. Scene rename, by contrast, correctly updated the shot's scene selection.
6. Uploaded `reference-test.png`, marked it as a synthetic audit reference, approved it and attached it to the shot. Performed a full browser reload. Reopened storyboard and prompt: renamed scene, image preview, character/wardrobe, location geometry and asset checklist remained present.
7. Created **AUDIT — Bible Reuse**. Copied character, style, location and voice; applied style and voice snapshots. Reopened the original production. Copies retain source information and independent records. This does not copy a production-ready media collection.
8. Downloaded **Full backup with media** from the live saved-export link. Parsed the resulting file locally: real script, Iona, scene ID, shot-to-scene link, asset link and embedded image bytes were present. Imported that same file through the live UI. **AUDIT — Night Bloom (imported)** reopened with the correct shot, character/location text, scene and image.
9. In the imported audit copy, duplicated the shot and moved the copy earlier. Editing cut showed copy first at 0–20 seconds and original second at 20–40 seconds. Both correctly showed No approved result.
10. Approved original concept and story snapshots. Added a beat-sheet revision; Director showed Story **Changed · review again** and **APPROVAL STALE**, while Concept remained approved.
11. With no generated media or assembled master, set Delivery state to Approved for release. It accepted the value with all six human QC boxes unchecked. Restored Not started. The separate Director gate is stricter; these competing status systems are inconsistent.
12. Visited every production navigation section. No crashing or broken navigation route was observed. Browser error/warning log inspection returned no entries. This was one browser session, not an exhaustive browser/accessibility certification.

Artifacts: `StudioForge-audit-backup.json` is the downloaded live portable backup; it predates the later approval-staleness test. `StudioForge-audit-live.jpg` captures the unavailable AI panel. The original audit production is left open.

## Creative Director assessment

The current live experience does **not** satisfy the central intelligent-director requirement. Its fixed questions do not read the meaning of prior answers, challenge an inconsistency, suggest creative options or make usable story/shot outputs. The interface honestly labels the fallback as a structured planning aid rather than AI output; this is preferable to pretending it is intelligent, but it is still a major product gap.

There is substantial real AI groundwork in `server/director.mjs`, `server/providers/openai.mjs`, `src/AIDirector.jsx` and `src/director-proposals.js`:

- Server-side provider call; project context; structured reply/questions/recommendations/proposals; explicit application of suggestions; usage accounting; request expiry; canonical-context check; atomic daily reservation; no automatic retry after uncertain completion.
- Configurable server model list and UI selection. This is not a fake provider response implementation. Test responses are mocked only in tests.

However, even activating it would not complete the studio:

- Proposals change allowed text fields on existing records. They cannot create scenes, characters, locations or shots, make ordered multi-record breakdowns, or change numeric timing through the proposal schema. Props, editing and delivery are not fully represented as executable proposal scopes.
- Context includes asset metadata, not images/audio/video. It cannot evaluate actual character resemblance, framing, visual continuity or lip-sync.
- It sends the last four completed **assistant responses**, not a full user/assistant conversation. Long-term decisions must already be in canonical fields. Earlier user explanations can be lost.
- Context has a 65,000-byte bound; large productions fail rather than retrieving the relevant scene/character context.
- Older suggestions can be applied to a newer project without a field-version conflict check. Human review alone does not identify exactly what changed since the suggestion.
- No live quality evaluation proves professional recommendations, follow-up relevance, continuity preservation or usable production outputs.

Keep activation deferred until the foundation and evaluation harness are ready. Credentials were neither inspected nor requested during this audit.

## Prioritized gap analysis

### P1 — required before calling this an end-to-end production studio

**1. Replace fragile text references with stable identity links.** Live rename reproduction is above. Source: `src/compiler.js:62`, `:105`, `:113` resolve characters/locations by names; props are matched through text. Use IDs for cast, speaker, location, wardrobe, prop and media roles, with migration and readable labels. Rename must preserve every prompt and shot relationship. Deletion needs explicit dependency handling.

**2. Bind outputs and approval to the exact creative revision.** `src/workflow.js:25–27` retains immutable attempt prompts, but cut selection uses shot ID and accepted review without checking whether its inputs are still current. A local executable reproduction changed dialogue and style after accepting a nonexistent fixture path: `cutList()` returned that old path alongside new dialogue and `nextQuestion(project,'render')` returned null. The reproduction did not alter live records. Preserve historical acceptance, but require re-review or a new render when relevant source hashes change; validate actual media existence/type and reconcile the separate shot/release status dropdowns.

**3. Deliver an actual contextual Director.** The deployed fallback is static. Complete structured proposals that can create/update a scene graph, timing and bibles, retain user decisions and explain choices. Tests must cover the silent-Iona case, conflicting constraints, later revisions and multi-session continuity, then separately evaluate real model output with explicit spending approval.

**4. Enforce budget and readiness before production approval.** `src/workflow.js:25–26` does not compare estimates with project budget or gate approvals. Both conditions were bypassed live. Add a reviewable cost reservation, aggregate pending cost, unknown-price blocking/explicit policy, and refreshed approval when prompt/model/references/quote change. The present manual ledger cannot stop spending in another website; make that boundary clear.

**5. Implement a real provider interface and reliable handoff lifecycle.** `src/providers.js` lists future discovery/schema/pricing/submit/status requirements but implements metadata only. The application connection response is hardcoded unavailable. Add provider capabilities and a durable job contract, reference mapping, result ingestion, job ID, cancellation/error states and reconciliation. Until independently authorized and supported, retain honest manual handoffs. Do not reuse a ChatGPT connection as app authorization.

**6. Finish at least one complete media-to-delivery path.** Editing and audio are planning surfaces. Choose a bounded first path: approved clips and dialogue/audio assets → timed assembly/preview → validated export. A movie file and repeatable acceptance checks are required; a Markdown list or arbitrary master filename is insufficient.

### P2 — readiness and durability work

**7. Restore a passing engineering quality gate.** `npm test`: 56/56 pass. `npm run build`: passes. `npm run lint`: fails with 6 errors and 6 warnings. Errors concern render purity/ref access and synchronous effect state updates in `src/AIDirector.jsx:5,7,8,9` and `src/App.jsx:14`. Warnings include missing effect dependency and unused variables. These are real failing checks, not proof of a user-visible crash. Add end-to-end regression cases for the newly found gaps.

**8. Make backup practical for production media.** Upload permits 50 MB per asset, while the saved portable export caps aggregate media at 16 MB (`server/studio.mjs:5`, `server/exports.mjs`). A single allowed video can therefore exceed the convenient full-backup route. Browser backup builds a base64 package in memory; large-project behavior was not load-tested. Prefer a manifest plus streamed archive/originals with integrity checks. Test interrupted restore and large media. Metadata-only deletion leaves stored objects; failed imports can leave uploaded orphans.

**9. Improve durable history and recovery.** The whole workspace is stored as a bounded JSON document (5 MB) and rewritten on edits. Approval snapshots repeat prior stage data and can grow rapidly. Save conflict handling conservatively pauses writes, which is good, but there is no automatic merge, full revision restoration or global undo. Distinguish retained approval snapshots from a complete revision history. Import remaps current media IDs but not every historic prompt/snapshot embedded ID; preserve explicit original-to-imported mapping.

**10. Complete AI cost/error lifecycle.** The UI calls the estimate a maximum approved charge while the server says it is not a provider billing guarantee. Use consistent wording and a documented bound. Uncertain requests retain reservations, but there is no reconciliation/recovery flow for a stuck running/uncertain request. Model rates/configuration need a review process rather than permanent checked-on strings. Local tests prove accounting logic under fixtures, not provider billing behavior.

**11. Add operational acceptance evidence.** Owner-scoped SQL/media, same-origin mutations, body limits, immutable originals, no-store responses and active-content restrictions are positive implemented controls, with tests. This audit did not perform a multi-account live authorization test, penetration test, package advisory audit, sustained load test, disaster recovery drill or hosted backup-retention verification. No operating alerting/reconciliation system was found in the app source. These remain unverified, not presumed passing or insecure.

### P3 — workflow depth after integrity is fixed

Add searchable/versioned assets, character expression and costume collections, reusable prop bibles, audio auditions, scene-based transcript linkage, stronger camera/continuity checks and model-specific parameter editors. Preserve the current visual direction; improve behavior within the existing production stages.

## Mocks, placeholders, controls and integration claims

- Fixed questions/guidance live in `src/workflow.js:12–23`; prompt text is concatenated in `src/compiler.js`; profile advice is static in `src/model-prompts.js`. These are not generative reasoning.
- AI request controls are intentionally disabled because the deployed service is unconfigured. OpenArt has no runnable connection controls. They are unavailable features, not unexplained dead buttons.
- Attempt approval/submission/result/review buttons record human assertions. They do not call a generation service. No fake generated media was observed.
- The sample production and example placeholders are seeded examples, not results produced by the user's idea.
- Production status and Delivery state are manually set labels and can overstate readiness. Director snapshots are separate and stricter.
- No dead navigation route was found in the exercised sections. Destructive controls were not tested; arbitrary external links and every download variant were not exhaustively exercised. Live full-backup export/import is confirmed; clipboard copy is confirmed. Do not generalize that result to every legacy Blob-based download button/browser combination.
- Official OpenArt documentation confirms MCP over Streamable HTTP with OAuth, and an official CLI with login. That verifies available integration avenues, not eligibility/authorization for this hosted app. Sources: https://openart.ai/mcp/ and https://github.com/OpenArt-AI/cli . No API endpoint was invented or generation attempted.
- The Connections explanation about hosted connector eligibility is static app copy, not live capability discovery. Keep the accurate conclusion (unavailable here), but replace speculative platform explanations with measured adapter status.
- Named prompt profiles explicitly disclaim provider connection and current model availability. The Worlds template still gives a fixed 1–4 source-image recommendation (`src/compiler.js:112`) without a dynamically checked schema; treat it as creative guidance requiring verification, not guaranteed tool support. This audit did not establish that the number is false.

## Proposed milestones and exit criteria

**Milestone 1 — trustworthy production graph and recovery.** Stable entity/asset IDs, role-based references, revision fingerprints, stale-render handling, consistent gate/status rules, budget-policy enforcement, restore mappings and lint fixes. Exit: rename, reorder, revise, save, reload and export/import a two-scene production without lost links; stale results cannot enter a release cut; all quality checks pass. No paid API required.

**Milestone 2 — Director as a real production partner.** Structured create/update proposals for bibles/scenes/shots, user-turn memory, relevant context retrieval, conflict-aware application, grounded model constraints and a creative-quality evaluation set. Exit: the Iona idea becomes an editable coherent brief, script and timed shot plan; irrelevant repeat questions are avoided; silent-film constraints survive revisions; professional recommendations have rationale. Fixture tests first; real model evaluation only after separately approved activation and spend.

**Milestone 3 — one dependable generation path.** A modular capability/quote/job/result interface and one supported authorized provider path. Manual handoff remains first-class where access is unavailable. Exit: exact references/prompt/model/cost are reviewed, execution cannot silently repeat, job/result/cost are reconciled, failed/rejected generations preserve history, accepted outputs belong to the correct source revision. Live paid acceptance test needs approval.

**Milestone 4 — voice and sound with continuity.** Voice identity plus approved audio versions, exact dialogue/timing, lip-sync plan, music/effects assets and rights metadata. Exit: reuse the same voice across shots, revise one line without corrupting other takes, and preview the intended mix against picture.

**Milestone 5 — a finished personal film.** Timed assembly/animatic, approved-media selection, transitions/audio/captions as scoped, exportable project interchange or integrated render, master validation and review. Exit: a complete short film can be reopened, revised and exported with synchronized audio, correct timing, rights/credits and reproducible media provenance. A real movie file is watched end to end before declaring this milestone complete.

No collaboration, subscription billing or enterprise expansion is needed to complete these milestones.
