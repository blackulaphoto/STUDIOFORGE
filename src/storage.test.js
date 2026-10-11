import test from 'node:test';
import assert from 'node:assert/strict';
import * as store from './storage.js';

test('storage pauses after stale revision and resumes only after explicit refresh',async()=>{
 const previous=globalThis.fetch;const writes=[];let conflict=true;
 globalThis.fetch=async(path,options)=>{
  if(options.method==='PUT'){writes.push(JSON.parse(options.body));return conflict?Response.json({error:'Changed elsewhere'},{status:409}):Response.json({revision:8});}
  return Response.json({workspace:{projects:[],active:null},revision:7});
 };
 try{
  await store.loadWorkspace();await assert.rejects(store.saveWorkspace({projects:[]}),/Changed elsewhere/);
  await assert.rejects(store.saveWorkspace({projects:[]}),/paused/);assert.equal(writes.length,1);
  conflict=false;await store.loadWorkspace();await store.saveWorkspace({projects:[]});assert.equal(writes[1].revision,7);
 }finally{globalThis.fetch=previous;}
});
test('a network failure blocks further writes rather than risking silent overwrite',async()=>{
 const previous=globalThis.fetch;let calls=0;
 globalThis.fetch=async(path,options)=>{if(!options.method)return Response.json({workspace:null,revision:0});calls++;throw Error('Disconnected');};
 try{await store.loadWorkspace();await assert.rejects(store.saveWorkspace({projects:[]}),/Disconnected/);await assert.rejects(store.saveWorkspace({projects:[]}),/paused/);assert.equal(calls,1);}finally{globalThis.fetch=previous;}
});
test('restoration rejects active content and oversize metadata before uploading',async()=>{
 const previous=globalThis.fetch;let writes=0;globalThis.fetch=async()=>{writes++;return Response.json({});};
 try{await assert.rejects(store.restoreMedia([{id:'x',data:'data:image/svg+xml;base64,PHN2Zy8+'}]),/Unsupported/);await assert.rejects(store.restoreMedia([{id:'../x',data:'data:image/png;base64,AQ=='}]),/Unsupported/);assert.equal(writes,0);
 await store.restoreMedia([{id:'safe',data:'data:image/png;base64,AQ=='}]);assert.equal(writes,1);
 }finally{globalThis.fetch=previous;}
});
