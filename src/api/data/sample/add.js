import { getDb, dbSample } from '../../../database/index.js';

const route = async (ctx) => {
    const db = getDb(ctx);
    const { sub } = ctx.session;
    const { entity } = ctx.data;
    const { id } = entity;

    const sample = await dbSample.add(db, id, sub);
    ctx.body = {
        data: sample,
    };
};
export default route;
