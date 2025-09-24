import { getDb, dbSample } from '../../../database/index.js';

const route = async (ctx) => {
    const db = getDb(ctx);
    const { entity, permission } = ctx.data;
    const { id } = entity;

    const matrix = await dbSample.matrix(db, id, permission);
    ctx.body = {
        data: matrix,
    };
};
export default route;
