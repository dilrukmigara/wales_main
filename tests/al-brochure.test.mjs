import {test} from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {AL_IMPORT,alTeachers,mergeAlTeachers} from '../scripts/imports/teachers-al-2029.js';
import {seed} from '../server/seed.js';
import {validateContent} from '../server/validation.js';
test('A/L brochure has 24 unique teachers, 30 slots and extracted portraits',()=>{
 assert.equal(alTeachers.length,24);assert.equal(new Set(alTeachers.map(t=>t.id)).size,24);
 assert.equal(alTeachers.reduce((n,t)=>n+t.announcedSchedule.length,0),30);
 const merged=mergeAlTeachers(seed());validateContent(merged);
 for(const t of alTeachers)assert(existsSync(new URL('../public'+t.photo,import.meta.url)));
 const vimuth=alTeachers.find(t=>t.id.endsWith('vimuth-chanaka'));
 assert.deepEqual(vimuth.announcedSchedule.map(r=>[r.day,r.start,r.end]),[['ඉරිදා','09:00','13:00'],['බ්‍රහස්පතින්දා','09:00','13:00'],['සෙනසුරාදා','12:30','15:30']]);
 const nuwan=alTeachers.find(t=>t.id.endsWith('nuwan-wijesurendra'));
 assert.deepEqual([nuwan.announcedSchedule[0].day,nuwan.announcedSchedule[0].start,nuwan.announcedSchedule[0].end],['ඉරිදා','13:00','15:00']);
});
test('A/L update matches profiles, preserves media and drafts, supersedes old 2029 times only once',()=>{
 const original=seed();const existing=structuredClone(alTeachers.find(t=>t.id.endsWith('chathushka-susage')));
 existing.published=false;existing.media='/videos/chathushka.mp4';existing.notes='Admin note';
 existing.schedule=[{grade:'2029 AL',start:'08:00',end:'10:00'},{grade:'2028 AL',start:'08:00',end:'10:00'}];
 original.teachers.push(existing);const untouched=structuredClone(original.teachers[0]);
 const merged=mergeAlTeachers(original);const t=merged.teachers.find(t=>t.id===existing.id);
 assert.equal(merged.teachers.filter(t=>t.id===existing.id).length,1);assert.equal(t.published,false);assert.equal(t.media,existing.media);
 assert.equal(t.schedule.length,1);assert.equal(t.schedule[0].grade,'2028 AL');assert.equal(t.announcedSchedule[0].end,'12:00');assert(t.notes.includes('Admin note'));
 assert.deepEqual(merged.teachers[0],untouched);assert(merged.completedImports.includes(AL_IMPORT));
 t.announcedSchedule[0].end='11:30';merged.teachers=merged.teachers.filter(t=>!t.id.endsWith('kelum-abeyratne'));
 assert.deepEqual(mergeAlTeachers(merged),merged);
});
