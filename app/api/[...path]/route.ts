import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../chatgpt-auth';
import { handleStudio } from '../../../server/studio.mjs';
export const dynamic = 'force-dynamic';
async function handle(request: Request) { return handleStudio(request, env, await getChatGPTUser()); }
export { handle as GET, handle as PUT, handle as POST, handle as DELETE };
