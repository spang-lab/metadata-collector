import { getDb, dbEntity } from '../database/index.js';

export default async (ctx, next) => {
  const { params, request } = ctx;
  const db = getDb(ctx);

  let entityId = params.id;
  if (!entityId && request.body) {
    entityId = request.body.entityId;
  }

  if (!entityId) {
    throw new Error(`
            Did not find a ID to resolve in params or body
        `);
  }
  if (!ctx.data) {
    ctx.data = {};
  }
  ctx.data.entity = await dbEntity.get(db, entityId);
  await next();
};
