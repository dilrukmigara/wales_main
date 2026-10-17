import {handleApi} from '../../../server/api.js';
import {database} from '../../../server/database.js';
export const runtime='nodejs';
export const dynamic='force-dynamic';
async function handle(request) {
  try { return await handleApi(request,{DB:database(),ADMIN_PASSWORD:process.env.ADMIN_PASSWORD}); }
  catch { return Response.json({error:'Database is not configured. Set DATABASE_URL and run npm run db:setup.'},{status:503}); }
}
export {handle as GET,handle as POST,handle as PUT,handle as DELETE};
