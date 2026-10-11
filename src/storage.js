export const mode='cloud';
let revision=0;
let blocked=false;
async function request(path,options={}){
 const response=await fetch(path,{...options,cache:'no-store',credentials:'same-origin'});
 if(!response.ok){const data=await response.json().catch(()=>({}));const error=new Error(data.error||'Studio connection failed.');error.status=response.status;error.signInPath=data.signInPath;throw error;}
 return response;
}
export async function loadWorkspace(){const data=await(await request('/api/workspace')).json();revision=data.revision;blocked=false;return data.workspace;}
export async function saveWorkspace(workspace){
 if(blocked)throw Error('Saving is paused after a conflict or uncertain connection. Back up this project, then refresh the studio to reconcile changes.');
 try{const data=await(await request('/api/workspace',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({workspace,revision})})).json();revision=data.revision;}
 catch(error){blocked=true;throw error;}
}
export const putAsset=(id,blob)=>request('/api/assets/'+encodeURIComponent(id),{method:'PUT',headers:{'Content-Type':blob.type},body:blob});
export async function getAsset(id){const response=await request('/api/assets/'+encodeURIComponent(id));return response.blob();}
export function blobData(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.readAsDataURL(blob);});}
export async function backupProject(project){const media=[];for(const a of project.assets){const blob=await getAsset(a.id);media.push({id:a.id,data:await blobData(blob)});}return {format:'studioforge-backup',schemaVersion:2,project,media};}
export async function restoreMedia(media=[]){
 if(!Array.isArray(media))throw Error('Invalid backup media list.');
 const blobs=media.map(m=>{if(typeof m.id!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(m.id)||typeof m.data!=='string'||!/^data:(image\/(png|jpeg|webp|gif)|audio\/[a-z0-9.+-]+|video\/(mp4|webm));base64,/i.test(m.data))throw Error('Unsupported backup media');const [meta,data]=m.data.split(',');const binary=atob(data);if(binary.length>50*1024*1024)throw Error('Backup media exceeds 50 MB per file.');return {id:m.id,blob:new Blob([Uint8Array.from(binary,c=>c.charCodeAt(0))],{type:meta.slice(5,meta.indexOf(';'))})};});
 for(const m of blobs)await putAsset(m.id,m.blob);
}
