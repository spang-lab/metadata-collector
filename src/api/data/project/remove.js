import { getDb, dbProject } from '../../../database/index.js';

const route = async (ctx) => {
    const db = getDb(ctx);
    const { entity } = ctx.data;
    const { id, mnemonic } = entity;
    await dbProject.remove(db, id);
    ctx.body = {
        data: 'ok',
    };
};
export default route;
