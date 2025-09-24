import { getDb, dbEvent } from '../../../database/index.js';

const get = async (ctx) => {
    const { id } = ctx.params;
    const db = getDb(ctx);
    const metadata = await dbEvent.getCurrent(db, id);
    ctx.body = {
        data: metadata,
    };
};
export default get;
