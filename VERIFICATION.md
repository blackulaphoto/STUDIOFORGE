# Foundation verification — 2026-10-10

## Automated results

56 tests pass with `node --test src/*.test.js server/*.test.mjs` (also available as `npm test`). The Vinext production build passes.

Coverage includes legacy import preservation, malformed nested records, exact dialogue, zero costs, style isolation, scene/shot order, reference approval warnings, independent bible copies and replacement snapshots, mode-compatible prompt profiles, immutable handoffs, duplicated-shot reset, explicit approvals and stale dependencies, accepted-video cut selection, owner-isolated storage, atomic workspace revision conflicts, save pause/recovery, immutable media IDs, portable backup remapping, saved exports, and AI budget/approval/idempotency safeguards against a mocked transport. Tests do not call a paid provider.

## Browser workflow exercised on the local preview

| Workflow | Observed result |
| --- | --- |
| Create a new production | Opens the Director and saves a real project |
| Guided concept questions | Saved decisions advance progressively |
| Reload and reopen | Title, concept, audience and intent retained |
| Script and bibles | Script, style, character design, costume, voice and set geometry save and appear in prompts |
| Props and sound | Editable continuity and sound contracts save |
| Storyboard | Create, duplicate, reorder, create a second scene, and assign a shot to it |
| Media library | Upload a local PNG fixture, store ownership notes, approve, attach to shot, render preview |
| Prompt profiles | Image/video/speech profile controls work; video Copy prompt yields expected clipboard text; exact speech remains separate from acting instructions |
| Handoff history | Prepare, approve, record submission/result, and accept a zero-credit local fixture in a clearly named test production |
| Editing handoff | Ordered time ranges appear; accepted still is correctly excluded from video results |
| Portable backup | Downloaded actual JSON contains two shots, one media file and one attempt; import creates a separate production with visible media |
| Reusable bibles | Copy character and set into another production; apply style and voice with retained prior snapshots |
| Stage approvals | Concept through sound approve in order; missing real video results block the render gate |
| Responsive design | Populated Director/storyboard screenshots reviewed at 1440, 768 and 375px; no critical layout issue |

The test PNG is a one-pixel synthetic fixture, not generated artwork. The test handoff record explicitly states no external generation occurred. Real film delivery was not marked approved. Native confirmation dialogs were removed from bible application after embedded-browser timeouts; prior contracts remain recoverable.

## Known limits and unfinished functionality

- Live AI Creative Director inference and account access are not tested or activated. The interactive guided workflow works independently and is labeled as structured guidance, not AI output. Live activation remains deferred.
- OpenArt is a modular guided handoff. No in-app OpenArt generation, credit quote, job polling, account linkage, or media retrieval is currently connected. The official MCP and CLI exist but require a separately authorized application integration.
- Music/foley currently have provider-neutral prompt briefs. Model-specific music/foley adapters remain future work.
- References are actually stored in the library, but text handles copied in bibles do not automatically attach files in external generators.
- There is no internal video timeline renderer, audio mixer, lip-sync engine, or final-movie export. The cut list and production packages are real exports for an external editor. Human review remains necessary.
- Revisions include generation attempts/events, explicit approval snapshots, and retained bible replacement snapshots. There is no complete undo history of every keystroke or automatic media continuity analysis.
- Local preview data persists on this computer in emulated storage. Hosted data is separate. The local test was performed with the starter's local test identity; production identity is enforced by the hosting platform.
- The embedded browser did not report a download event for temporary blob downloads. Direct authenticated saved-export links were added; the complete saved backup download and re-import were verified. The unsaved in-memory backup fallback is retained but its download event was not independently confirmed in this embedded browser.
- A normal editing session uses one active writer. Conflicting tabs are detected and blocked rather than silently merged; recovery requires backup and refresh.

This is a tested foundation milestone, not a claim that the full autonomous filmmaking vision is complete.
