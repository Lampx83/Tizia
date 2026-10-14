import { createLessonsStore } from '../repositories/lessons.js';
import { WorkerContractError } from '../repositories/store-contract.js';
import { asyncRoutes } from './async-routes.js';

export function attachLessonReviewRoutes(router,{db,requireAuth,requireStrictCsrf,lessonOptions}) {
  const route=asyncRoutes(router),lessons=createLessonsStore(db,lessonOptions);
  const handle=fn=>async(req,res,next)=>{
    try {res.json({schema_version:1,...await fn({id:req.user.id,sessionToken:req.user.token},req)});}
    catch(error){if(error instanceof WorkerContractError)return res.status(error.status).json({error:error.code});next(error);}
  };
  route.get('/api/ai-board/lessons',requireAuth,handle(async a=>({lessons:await lessons.list(a)})));
  route.get('/api/ai-board/lessons/:id',requireAuth,handle(async(a,req)=>({lesson:await lessons.read(a,req.params.id)})));
  route.get('/api/ai-board/lessons/:id/history',requireAuth,handle(async(a,req)=>({history:await lessons.history(a,req.params.id)})));
  route.post('/api/ai-board/lessons/:id/review',requireAuth,requireStrictCsrf,handle(async(a,req)=>({lesson:await lessons.review(a,req.params.id,req.body || {})})));
  route.post('/api/ai-board/lessons/maintenance',requireAuth,requireStrictCsrf,handle(a=>lessons.maintenance(a)));
  route.post('/api/ai-board/lessons/import',requireAuth,requireStrictCsrf,handle((a,req)=>lessons.importLegacy(a,req.body || {})));
  route.post('/api/ai-board/lessons/import/:batch/rollback',requireAuth,requireStrictCsrf,handle((a,req)=>lessons.rollbackImport(a,req.params.batch)));
  const sweep=()=>lessons.prune().catch(error=>console.error('[ai-board/lessons] retention sweep failed:',error.message));
  setInterval(sweep,3600000).unref();
  return lessons;
}

export function attachWorkerLessonRoutes(route,{store,authenticate,handle,lessonOptions}) {
  const lessons=createLessonsStore(store.db,lessonOptions);
  const base='/api/ai-board/worker/tickets/:id/lessons';
  route.post(base,authenticate,handle(async(req,res)=>res.json({schema_version:1,lesson:await lessons.record(req.params.id,req.body || {})})));
  route.post(base+'/recall',authenticate,handle(async(req,res)=>res.json({schema_version:1,lessons:await lessons.recall(req.params.id,req.body || {})})));
  return lessons;
}
