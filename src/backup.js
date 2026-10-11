import {parseBackup,uid} from './model.js';

// Import is additive. Uploaded files receive fresh IDs, including every handoff
// reference, so restoring a backup cannot replace an existing original.
export function prepareImport(data){
 if(!data||typeof data!=='object')throw Error('Choose a StudioForge JSON backup.');
 const projects=parseBackup(data);
 if(!projects.length)throw Error('This backup contains no productions.');
 const sourceMedia=data.media??[];
 if(!Array.isArray(sourceMedia))throw Error('Invalid backup media list.');
 const mediaById=new Map();
 for(const item of sourceMedia){if(!item||typeof item.id!=='string'||mediaById.has(item.id))throw Error('Invalid or duplicate backup media ID.');mediaById.set(item.id,item);}
 const remap=new Map();
 for(const p of projects)for(const a of p.assets){
  if(data.format==='studioforge-backup'&&!mediaById.has(a.id))throw Error('This media backup is incomplete: '+a.name+'. Keep the original production.');
  if(!remap.has(a.id))remap.set(a.id,uid());
 }
 for(const p of projects){
  const sourceId=p.id;p.id=uid();p.title+=' (imported)';
  p.importedFrom={projectId:sourceId,at:new Date().toISOString()};
  for(const a of p.assets)a.id=remap.get(a.id);
  for(const shot of p.shots)shot.assetIds=shot.assetIds.map(id=>remap.get(id)||id);
  for(const attempt of p.attempts)attempt.referenceIds=(attempt.referenceIds||[]).map(id=>remap.get(id)||id);
 }
 const media=[...remap].filter(([id])=>mediaById.has(id)).map(([id,newId])=>({...mediaById.get(id),id:newId}));
 return {projects,media};
}
