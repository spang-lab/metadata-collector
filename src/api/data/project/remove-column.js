import { getDb, dbProject } from '../../../database/index.js';

const columns = async (ctx) => {
    const { property } = ctx.request.body;
    const { entity } = ctx.data;
    const { id } = entity;
    const db = getDb(ctx);

    if (!property) {
        throw new Error('No property key');
    }

    await dbProject.removeColumn(db, id, property);

    ctx.body = {
        data: 'ok',
    };
};
export default columns;
