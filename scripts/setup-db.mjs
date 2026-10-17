import {readFile} from 'node:fs/promises';
import {neon} from '@neondatabase/serverless';
import {seed} from '../server/seed.js';
if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL in .env.local first.');
const sql=neon(process.env.DATABASE_URL);
const schema=await readFile(new URL('../database/schema.sql',import.meta.url),'utf8');
await sql.transaction(schema.split(';').map(x=>x.trim()).filter(Boolean).map(q=>sql.query(q)));
await sql.query('INSERT INTO site_content (id,json,revision,updated_at) VALUES ($1,$2,1,$3) ON CONFLICT (id) DO NOTHING',['main',JSON.stringify(seed()),Date.now()]);
console.log('Neon tables are ready. Existing content was preserved.');
