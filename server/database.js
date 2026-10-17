import { neon } from '@neondatabase/serverless';

// Keep SQL and transaction handling on the server, never in the browser.
export function createDatabase(sql) {
  function prepare(text) {
    let index = 0;
    const query = text.replace(/\?/g, () => '$' + (++index));
    function statement(params = []) {
      const execute = () => sql.query(query, params, { fullResults: true });
      return {
        query, params,
        bind: (...values) => statement(values),
        async first() {
          const result = await execute();
          const row = result.rows[0];
          if (!row) return null;
          for (const key of ['updated_at', 'expires_at']) if (row[key] != null) row[key] = Number(row[key]);
          return row;
        },
        async run() { const result = await execute(); return {meta:{changes:result.rowCount}}; }
      };
    }
    return statement();
  }
  return {
    prepare,
    batch: statements => sql.transaction(statements.map(s => sql.query(s.query, s.params)))
  };
}
let cached;
export function database() {
  if (!process.env.DATABASE_URL) throw new Error('Set DATABASE_URL in .env.local or Vercel environment settings.');
  return cached ||= createDatabase(neon(process.env.DATABASE_URL));
}
