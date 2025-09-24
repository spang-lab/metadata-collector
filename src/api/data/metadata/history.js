import { getDb, dbMetadata } from '../../../database/index.js';

const get = async (ctx) => {
    const { entity, permission } = ctx.data;
    const { id } = entity;
    const db = getDb(ctx);
    const history = await dbMetadata.history(db, id, permission);
    ctx.body = {
        data: history,
    };
};
export default get;
