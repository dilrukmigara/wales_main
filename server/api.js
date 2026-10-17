import {seed} from './seed.js';
import {validateContent,publicContent} from './validation.js';
const enc=new TextEncoder();
const hash=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',enc.encode(v)))).map(x=>x.toString(16).padStart(2,'0')).join('');
const json=(data,status=200,extra={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}});
const error=(message,status)=>Object.assign(new Error(message),{status});
const tokenFrom=r=>r.headers.get('cookie')?.match(/(?:^|;\s*)wales_admin=([a-f0-9-]{73})/)?.[1]||'';
const cookie=(value,age)=>`wales_admin=${value}; Path=/; HttpOnly; ${process.env.NODE_ENV==='production'?'Secure; ':''}SameSite=Strict; Max-Age=${age}`;
async function readContent(env){let row=await env.DB.prepare('SELECT json,revision,updated_at FROM site_content WHERE id = ?').bind('main').first();if(!row){await env.DB.prepare('INSERT INTO site_content (id,json,revision,updated_at) VALUES (?,?,1,?) ON CONFLICT (id) DO NOTHING').bind('main',JSON.stringify(seed()),Date.now()).run();row=await env.DB.prepare('SELECT json,revision,updated_at FROM site_content WHERE id = ?').bind('main').first()}return {data:JSON.parse(row.json),revision:row.revision,updatedAt:row.updated_at};}
async function authorized(request,env){const token=tokenFrom(request);if(!token)return false;const session=await env.DB.prepare('SELECT expires_at FROM admin_sessions WHERE token_hash = ?').bind(await hash(token)).first();return Boolean(session&&session.expires_at>Date.now());}
function checkOrigin(r){const origin=r.headers.get('origin');if(!origin||origin!==new URL(r.url).origin||r.headers.get('x-wales-admin')!=='1')throw error('Request origin rejected. Reload the admin page.',403)}
async function readJson(r){const length=Number(r.headers.get('content-length')||0);if(length>1600000)throw error('Request too large.',413);const text=await r.text();if(text.length>1600000)throw error('Request too large.',413);try{return JSON.parse(text)}catch{throw error('Invalid JSON.',400)}}
export async function handleApi(request,env){try{const url=new URL(request.url),path=url.pathname; if(!env.DB)throw error('Storage is not configured.',503);
 if(path==='/api/site'&&request.method==='GET'){const r=await readContent(env);return json({...r,data:publicContent(r.data)})}
 if(!path.startsWith('/api/admin/'))return json({error:'Not found'},404);
 if(!['GET','HEAD'].includes(request.method))checkOrigin(request);
 if(path==='/api/admin/login'&&request.method==='POST'){
  if(!env.ADMIN_PASSWORD)throw error('Admin password has not been configured.',503);
  const ip=request.headers.get('x-vercel-forwarded-for')||'local-admin';const now=Date.now(),expires=now+600000,bucket=await hash(ip)+':'+Math.floor(now/600000);
  await env.DB.prepare('DELETE FROM login_attempts WHERE expires_at < ?').bind(now).run();
  const a=await env.DB.prepare('INSERT INTO login_attempts (bucket,count,expires_at) VALUES (?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=login_attempts.count+1 RETURNING count').bind(bucket,expires).first();
  if(a.count>8)return json({error:'Too many login attempts. Try again in 10 minutes.'},429,{'Retry-After':'600'});
  const body=await readJson(request);if(typeof body.password!=='string'||body.password.length>256)throw error('Incorrect password.',401);
  const lhs=await hash(body.password),rhs=await hash(env.ADMIN_PASSWORD);let mismatch=0;for(let i=0;i<lhs.length;i++)mismatch|=lhs.charCodeAt(i)^rhs.charCodeAt(i);if(mismatch)throw error('Incorrect password.',401);
  const token=crypto.randomUUID()+'-'+crypto.randomUUID();await env.DB.batch([env.DB.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').bind(now),env.DB.prepare('DELETE FROM login_attempts WHERE bucket = ?').bind(bucket),env.DB.prepare('INSERT INTO admin_sessions (token_hash,expires_at) VALUES (?,?)').bind(await hash(token),now+28800000)]);
  return json({ok:true},200,{'Set-Cookie':cookie(token,28800)});
 }
 if(!await authorized(request,env))return json({error:'Please log in to the admin dashboard.'},401);
 if(path==='/api/admin/session'&&request.method==='GET')return json({ok:true});
 if(path==='/api/admin/logout'&&request.method==='POST'){await env.DB.prepare('DELETE FROM admin_sessions WHERE token_hash = ?').bind(await hash(tokenFrom(request))).run();return json({ok:true},200,{'Set-Cookie':cookie('',0)})}
 if(path==='/api/admin/content'&&request.method==='GET')return json(await readContent(env));
 if(path==='/api/admin/content'&&request.method==='PUT'){const body=await readJson(request);if(!Number.isInteger(body.revision))throw error('Missing content revision.',400);const data=validateContent(body.data),now=Date.now();const result=await env.DB.prepare('UPDATE site_content SET json=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?').bind(JSON.stringify(data),now,'main',body.revision).run();if(result.meta.changes!==1)throw error('This site changed in another tab. Your edits were kept. Download a backup, then reload the latest version.',409);return json({data,revision:body.revision+1,updatedAt:now})}
 return json({error:'Not found'},404);
 }catch(e){if(e.status)return json({error:e.message},e.status);console.error('Admin API error', {name:e?.name,code:e?.code});return json({error:'The server could not complete this request. Please try again.'},500)}}
