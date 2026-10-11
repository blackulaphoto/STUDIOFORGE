const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
const TEXT='id name title code description synopsis beats script payoff pacing exclusions medium signature palette line texture lighting background styleRef forbidden handle role species appearance immutable wardrobe expressions reference voiceId voice pronunciation geometry props camera references constraints sceneId characters location action movement dialogueSpeaker dialogue sound endFrame mode model negative renderUrl status qc type source license owner continuity editor notes masterUrl audioMode music arc ambience foley mix rights resolution framerate captions exports credits qa release createdAt approvedAt submittedAt resultUrl review reviewNotes prompt'.split(' ');
function record(value){if(!object(value))throw Error('Invalid production record.');for(const key of TEXT)if(value[key]!=null&&typeof value[key]!=='string')throw Error('Invalid text field: '+key);for(const key of ['duration','estCredits','spentCredits','estimatedCredits','actualCredits'])if(value[key]!=null&&value[key]!==''&&(!['number','string'].includes(typeof value[key])||!Number.isFinite(Number(value[key]))||Number(value[key])<0))throw Error('Invalid nonnegative number: '+key);}
export function validateProjectRecords(p){
 for(const scope of ['story','style','audio','delivery','edit'])record(p[scope]);
 if(!object(p.workflow))throw Error('Invalid workflow record.');
 for(const key of ['characters','locations','scenes','shots','assets','props','attempts','bibles']){
  if(!Array.isArray(p[key])||p[key].length>2000)throw Error('Invalid or oversized '+key+' list.');
  for(const item of p[key]){
   record(item);
   for(const ref of ['assetIds','referenceIds'])if(item[ref]!=null&&(!Array.isArray(item[ref])||item[ref].some(id=>typeof id!=='string')))throw Error('Invalid media reference list.');
   if(key==='attempts'&&(!Array.isArray(item.events)||item.events.some(event=>!object(event))))throw Error('Invalid generation action history.');
   if(key==='bibles'&&(!object(item.data)||typeof item.kind!=='string'))throw Error('Invalid bible snapshot.');
  }
 }
 if(p.workflow.approvals.some(a=>!object(a)||typeof a.gate!=='string'||!object(a.snapshot)))throw Error('Invalid approval snapshot.');
 if(p.delivery.checks!=null&&(!object(p.delivery.checks)||Object.values(p.delivery.checks).some(v=>typeof v!=='boolean')))throw Error('Invalid delivery checklist.');
}
