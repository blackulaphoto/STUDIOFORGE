import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareImport} from './backup.js';
import {sampleProject} from './model.js';
test('portable backup restores media and handoff references into a separate production',()=>{
 const p=sampleProject();p.assets=[{id:'original',name:'Frame.png',type:'image/png'}];p.shots[0].assetIds=['original'];p.attempts=[{events:[],referenceIds:['original'],prompt:'Historic original prompt'}];
 const input={format:'studioforge-backup',project:p,media:[{id:'original',data:'data:image/png;base64,AQ=='}]};
 const restored=prepareImport(input),copy=restored.projects[0];
 assert.notEqual(copy.id,p.id);assert.notEqual(copy.assets[0].id,'original');assert.equal(restored.media[0].id,copy.assets[0].id);assert.equal(copy.shots[0].assetIds[0],copy.assets[0].id);assert.equal(copy.attempts[0].referenceIds[0],copy.assets[0].id);assert.equal(copy.attempts[0].prompt,'Historic original prompt');assert.equal(p.assets[0].id,'original');
});
test('an incomplete portable media backup fails before any import writes',()=>{const p=sampleProject();p.assets=[{id:'missing',name:'Missing.png'}];assert.throws(()=>prepareImport({format:'studioforge-backup',project:p,media:[]}),/incomplete/);assert.throws(()=>prepareImport({projects:[]}),/no productions/);});
test('legacy project imports retain data without inventing media bytes',()=>{const p=sampleProject();p.assets=[{id:'legacy',name:'External reference'}];const result=prepareImport(p);assert.equal(result.projects[0].assets.length,1);assert.equal(result.media.length,0);});

