import { getDb, dbEvent } from '../../../database/index.js';

const add = async (ctx) => {
    const db = getDb(ctx);
    const { sub } = ctx.session;
    const { entity } = ctx.data;
    const { body } = ctx.request;
    const { value, property } = body;

    const event = {
        entity: entity.id,
        property,
        value,
        owner: sub,
    };
    await dbEvent.add(db, event);

    ctx.body = {
        data: 'ok',
    };
};
export default add;
