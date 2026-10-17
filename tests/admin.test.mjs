import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
import {createDatabase} from '../server/database.js';
import {handleApi} from '../server/api.js';
import {safeUrl} from '../server/validation.js';

test('PostgreSQL schema, authentication, updates, conflicts and public file paths',async()=>{
 const pg=new PGlite();await pg.exec(await readFile(new URL('../database/schema.sql',import.meta.url),'utf8'));
 // Lazy query objects model the Neon HTTP driver's transaction contract.
 const sql={query(text,params=[]){return {text,params,then(resolve,reject){return pg.query(text,params).then(r=>({rows:r.rows,rowCount:r.affectedRows??r.rows.length})).then(resolve,reject)}}},transaction(queries){return pg.transaction(async tx=>{const out=[];for(const q of queries)out.push(await tx.query(q.text,q.params));return out})}};
 const env={DB:createDatabase(sql),ADMIN_PASSWORD:'test-password-not-for-deployment'};let cookie='';
 async function call(path,method='GET',body,origin='https://wales.test'){
  const headers={'origin':origin,'x-wales-admin':'1','cookie':cookie};
  return handleApi(new Request('https://wales.test/api/'+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body)}),env);
 }
 try {
  assert.equal((await call('admin/content')).status,401);
  let res=await call('site');assert.equal(res.status,200);assert((await res.json()).data.teachers.length);
  assert.equal((await call('admin/login','POST',{password:env.ADMIN_PASSWORD},'https://bad.test')).status,403);
  assert.equal((await call('admin/login','POST',{password:'wrong'})).status,401);
  res=await call('admin/login','POST',{password:env.ADMIN_PASSWORD});assert.equal(res.status,200);cookie=res.headers.get('set-cookie').split(';')[0];
  res=await call('admin/content');const content=await res.json();assert.equal(content.revision,1);
  content.data.teachers[0].photo='/images/teachers/test.jpg';content.data.locations[0].photos=[{url:'/images/halls/GL1.webp',caption:'Hall'}];
  res=await call('admin/content','PUT',{data:content.data,revision:1});assert.equal(res.status,200);assert.equal((await res.json()).revision,2);
  assert.equal((await call('admin/content','PUT',{data:content.data,revision:1})).status,409);
  res=await call('site');assert.equal((await res.json()).data.teachers[0].photo,'/images/teachers/test.jpg');
  content.data.teachers[0].photo='/images/../secret.png';assert.equal((await call('admin/content','PUT',{data:content.data,revision:2})).status,400);
  assert.equal((await call('admin/upload','POST',{})).status,404);
  assert.equal((await call('admin/logout','POST',{})).status,200);assert.equal((await call('admin/session')).status,401);
 }finally{await pg.close()}
});
test('media validation permits only public asset paths',()=>{
 for(const p of ['/logo.png','/cover.png','/images/teachers/sir-1.jpg','/videos/class.mp4'])assert(safeUrl(p,{local:true}));
 for(const p of ['https://drive.google.com/a','//evil.test/a.jpg','/images/../x.jpg','/x.svg','/x.jpg?x=1'])assert(!safeUrl(p,{local:true}));
});
