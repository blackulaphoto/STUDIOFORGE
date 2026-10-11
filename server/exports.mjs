import {exportPack} from '../src/compiler.js';
import {cutList} from '../src/workflow.js';

export async function exportProduction(project,kind,bucket,owner){
 let text,type,extension;
 if(kind==='backup'){
  const media=[];let total=0;
  for(const a of project.assets){
   const object=await bucket.get(`users/${encodeURIComponent(owner)}/assets/${a.id}`);
   if(!object)throw Object.assign(Error('Missing reference: '+a.name+'. Download project data separately and retain your original files.'),{status:409});
   const bytes=new Uint8Array(await new Response(object.body).arrayBuffer());total+=bytes.length;
   if(total>16*1024*1024)throw Object.assign(Error('This portable backup exceeds 16 MB of media. Use the in-browser backup or export project data and download originals separately.'),{status:413});
   let binary='';for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));
   media.push({id:a.id,data:`data:${object.httpMetadata?.contentType||a.type};base64,${btoa(binary)}`});
  }
  text=JSON.stringify({format:'studioforge-backup',schemaVersion:2,project,media},null,2);type='application/json';extension='json';
 }else if(kind==='project'){text=JSON.stringify(project,null,2);type='application/json';extension='json';}
 else if(kind==='production'){text=exportPack(project);type='text/markdown; charset=utf-8';extension='md';}
 else if(kind==='cut'){text=['# '+project.title+' — Editing cut list','',...cutList(project).map(r=>`${r.start}s → ${r.end}s | ${r.code} | ${r.title} | ${r.duration}s\nResult: ${r.result||'No approved result'}\nDialogue: ${r.dialogue||'None'}\nSound: ${r.sound||'Not specified'}\n`)].join('\n');type='text/markdown; charset=utf-8';extension='md';}
 else throw Object.assign(Error('Unknown export format.'),{status:404});
 const filename=(project.title||'Production').replace(/[^a-zA-Z0-9 _-]/g,'').slice(0,70)+'-'+kind+'.'+extension;
 return new Response(text,{headers:{'Content-Type':type,'Content-Disposition':`attachment; filename="${filename}"`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
}

