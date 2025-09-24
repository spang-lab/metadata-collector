import { getDb } from '../database/index.js';

export default async (ctx, next) => {
    const db = getDb();
    await db.tx(async (transaction) => {
        ctx.state.db = transaction;
        await next();
    });
};
