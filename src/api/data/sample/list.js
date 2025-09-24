import { getDb, dbSample } from '../../../database/index.js';

const route = async (ctx) => {
    const db = getDb(ctx);
    const { entity, permission } = ctx.data;
    const { id } = entity;

    const samples = await dbSample.list(db, id, permission);
    ctx.body = {
        data: samples,
    };
};
export default route;
