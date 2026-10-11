import test from 'node:test';
import assert from 'node:assert/strict';
import {sampleProject,migrateProject} from './model.js';
test('malformed nested backup fields fail before entering the workspace',()=>{
 for(const mutate of [p=>p.characters[0].name={},p=>p.shots[0].characters=[],p=>p.shots[0].duration=-1,p=>p.workflow.approvals=[null],p=>p.attempts=[{events:'broken'}],p=>p.bibles=[{kind:'style',data:null}],p=>p.delivery.checks={master:'yes'}]){const p=sampleProject();mutate(p);assert.throws(()=>migrateProject(p),/Invalid/);}
});
test('valid custom metadata remains intact while records are validated',()=>{const p=sampleProject();p.characters[0].custom={artist:'local'};assert.deepEqual(migrateProject(p).characters[0].custom,{artist:'local'});});
