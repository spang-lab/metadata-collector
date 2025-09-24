import { getDb, dbEvent } from '../../../database/index.js';

const remove = async (ctx) => {
    const db = getDb(ctx);
    const { sub } = ctx.session;
    const { entity } = ctx.data;
    const { body } = ctx.request;
    const { property } = body;

    const event = {
        entity: entity.id,
        property,
        owner: sub,
    };
    await dbEvent.remove(db, event);

    ctx.body = {
        data: 'ok',
    };
};
export default remove;
