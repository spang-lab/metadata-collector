import { getDb, dbProperties } from '../../../database/index.js';

const list = async (ctx) => {
    const db = getDb(ctx);

    const properties = await dbProperties.listAll(db);

    ctx.body = {
        data: properties,
    };
};
export default list;
