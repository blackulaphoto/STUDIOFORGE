/** Provider execution capabilities, distinct from a model's creative prompt mode.
 * Future live adapters must supply discovery, schema, pricing, submit and status methods.
 * A provider must never be marked live solely because it is connected in ChatGPT.
 */
export const PROVIDERS={
 openart:{id:'openart',label:'OpenArt',execution:'guided-handoff',
  documentation:'https://openart.ai/mcp/',
  supportedTransports:['Official MCP with OAuth','Official CLI with user login'],
  liveInStudio:false,
  reason:'A separate authorized application connection is required. Hosted connector eligibility is not exposed in the current Sites environment.',
  handoffSteps:['Verify the current model, input schema and credit estimate in OpenArt.','Attach the actual approved references. Text asset IDs do not upload files.','Review and approve the exact prompt and cost.','Generate in the authorized OpenArt surface.','Record the job ID, result and actual credits, then review continuity in StudioForge.'],
 },
};
export function providerFor(id){const provider=PROVIDERS[id];if(!provider)throw Error('Unknown production provider');return provider;}
export function assertLiveProvider(id){const p=providerFor(id);if(!p.liveInStudio)throw Error(p.reason);return p;}
