import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {brochureTeachers,mergeBrochureTeachers} from '../scripts/imports/teachers-2027.js';
import {seed} from '../server/seed.js';
import {validateContent,publicContent} from '../server/validation.js';
test('28 brochure teachers and 128 published slots preserve sources without assigning halls',()=>{
 assert.equal(brochureTeachers.length,28);
 assert.equal(brochureTeachers.reduce((n,t)=>n+t.announcedSchedule.length,0),128);
 const data=mergeBrochureTeachers(seed());validateContent(data);
 for(const t of brochureTeachers){assert(existsSync(new URL('../public'+t.photo,import.meta.url)));assert.equal(t.schedule.length,0);}
 assert(publicContent(data).teachers.some(t=>t.announcedSchedule?.length));
});
test('repeated imports preserve existing profiles, unpublished records, and later edits',()=>{
 const original=seed();original.teachers[0].published=false;
 const once=mergeBrochureTeachers(original);once.teachers.find(t=>t.id===brochureTeachers[0].id).name='Admin correction';
 const twice=mergeBrochureTeachers(once);assert.deepEqual(twice,once);assert.deepEqual(twice.teachers[0],original.teachers[0]);
});
test('invalid timetable edits and unsafe brochure links are rejected',()=>{
 const data=mergeBrochureTeachers(seed());const t=data.teachers.at(-1);
 t.announcedSchedule[0].end='99:00';assert.throws(()=>validateContent(data));
 t.announcedSchedule[0].end='16:00';t.brochure='https://example.test/x.jpg';assert.throws(()=>validateContent(data));
});
