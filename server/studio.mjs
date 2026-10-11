import {migrateProject} from '../src/model.js';
import {handleDirector} from './director.mjs';
import {exportProduction} from './exports.mjs';
export const MAX_WORKSPACE_BYTES=5*1024*1024;
export const MAX_ASSET_BYTES=50*1024*1024;
const ID=/^[a-zA-Z0-9_-]{1,100}$/;
const MEDIA=/^(image\/(png|jpeg|webp|gif)|audio\/[a-z0-9.+-]+|video\/(mp4|webm))$/i;
export function json(data,status=200){return Response.json(data,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});}
export async function boundedBody(request,limit){
 if(Number(request.headers.get('content-length'))>limit)throw Object.assign(Error('File is too large.'),{status:413});
 const reader=request.body?.getReader();if(!reader)return new Uint8Array();
 const chunks=[];let size=0;for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel();throw Object.assign(Error('File is too large.'),{status:413});}chunks.push(value);}
 const result=new Uint8Array(size);let at=0;for(const c of chunks){result.set(c,at);at+=c.length;}return result;
}
export function validateWorkspace(data){
 if(!data||!Array.isArray(data.projects)||data.projects.length>100)throw Error('A workspace must contain at most 100 projects.');
 const projects=data.projects.map(migrateProject);const ids=new Set();
 for(const p of projects){if(typeof p.id!=='string'||!ID.test(p.id)||ids.has(p.id))throw Error('Invalid or duplicate project ID.');ids.add(p.id);if(p.shots.length>2000||p.assets.length>2000)throw Error('Project exceeds the 2,000 shot or asset limit.');for(const a of p.assets){if(typeof a.id!=='string'||!ID.test(a.id))throw Error('Invalid asset ID.');}}
 if(data.active!=null&&!ids.has(data.active))throw Error('Active project does not exist.');
 return {...data,projects,active:data.active??projects[0]?.id??null};
}
export async function handleStudio(request,env,user){
 try{
  if(!user?.userId)return json({error:'Sign in to open your studio.',signInPath:'/signin-with-chatgpt?return_to=%2F'},401);
  const url=new URL(request.url),path=url.pathname;
  if(!['GET','HEAD'].includes(request.method)&&request.headers.get('origin')!==url.origin)return json({error:'This action must originate from your studio.'},403);
  if(!env.DB||!env.BUCKET)return json({error:'Studio storage has not been provisioned.'},503);
  const owner=user.userId;
  const exportMatch=/^\/api\/exports\/([a-zA-Z0-9_-]{1,100})\/(backup|project|production|cut)$/.exec(path);
  if(exportMatch&&request.method==='GET'){
   const row=await env.DB.prepare('SELECT document, revision FROM workspaces WHERE owner = ?').bind(owner).first();
   const project=row?JSON.parse(row.document).projects.find(p=>p.id===exportMatch[1]):null;
   if(!project)return json({error:'Saved production not found.'},404);
   return await exportProduction(project,exportMatch[2],env.BUCKET,owner);
  }
  if(path==='/api/director'||path.startsWith('/api/director/'))return handleDirector(request,env,user);
  if(path==='/api/connection'&&request.method==='GET')return json({storage:'cloud',user:user.displayName,provider:{id:'openart',status:'unavailable',reason:'Hosted OpenArt eligibility discovery is not available in this environment. Use the connected OpenArt tools in chat with exported prompts; no in-app generation is enabled.'}});
  if(path==='/api/workspace'){
   if(request.method==='GET'){
    const row=await env.DB.prepare('SELECT document, revision FROM workspaces WHERE owner = ?').bind(owner).first();
    return json({workspace:row?JSON.parse(row.document):null,revision:row?.revision??0});
   }
   if(request.method==='PUT'){
    let data;try{data=JSON.parse(new TextDecoder().decode(await boundedBody(request,MAX_WORKSPACE_BYTES)));}catch(e){if(e.status)throw e;return json({error:'Invalid workspace JSON.'},400);}
    if(!data||!Number.isSafeInteger(data.revision)||data.revision<0)return json({error:'A valid workspace revision is required.'},400);
    let workspace;try{workspace=validateWorkspace(data.workspace);}catch(e){return json({error:e.message},400);}
    const document=JSON.stringify(workspace),revision=data.revision+1,now=new Date().toISOString();
    const result=data.revision===0
      ?await env.DB.prepare('INSERT OR IGNORE INTO workspaces (owner, document, revision, updated_at) VALUES (?, ?, ?, ?)').bind(owner,document,revision,now).run()
      :await env.DB.prepare('UPDATE workspaces SET document = ?, revision = ?, updated_at = ? WHERE owner = ? AND revision = ?').bind(document,revision,now,owner,data.revision).run();
    if(result.meta.changes!==1)return json({error:'Another tab or device changed this studio. Back up your current project, then refresh the studio before editing again.',code:'revision_conflict'},409);
    return json({revision,updatedAt:now});
   }
  }
  const match=/^\/api\/assets\/([a-zA-Z0-9_-]{1,100})$/.exec(path);
  if(match){
   const key=`users/${encodeURIComponent(owner)}/assets/${match[1]}`;
   if(request.method==='GET'){
    const object=await env.BUCKET.get(key);if(!object)return json({error:'Reference file was not found.'},404);
    return new Response(object.body,{headers:{'Content-Type':object.httpMetadata?.contentType||'application/octet-stream','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Content-Disposition':'inline','Content-Security-Policy':"default-src 'none'; sandbox"}});
   }
   if(request.method==='PUT'){
    const type=request.headers.get('content-type')||'';if(!MEDIA.test(type))return json({error:'Unsupported media type.'},415);
    const bytes=await boundedBody(request,MAX_ASSET_BYTES);if(!bytes.length)return json({error:'Empty files cannot be uploaded.'},400);
    const object=await env.BUCKET.put(key,bytes,{httpMetadata:{contentType:type},onlyIf:{etagDoesNotMatch:'*'}});
    if(!object)return json({error:'This reference already exists. Upload a new version instead.'},409);
    return json({id:match[1],size:bytes.length},201);
   }
  }
  return json({error:'Route or method not supported.'},404);
 }catch(error){return json({error:error.status?error.message:'The studio could not complete the request. Your unsaved changes remain in this tab.'},error.status||500);}
}
