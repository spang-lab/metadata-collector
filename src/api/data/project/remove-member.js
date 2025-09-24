import { getDb, dbEntityMember } from '../../../database/index.js';

import { isValidSub } from '../../../util/index.js';

const route = async (ctx) => {
    const db = getDb(ctx);
    const { body } = ctx.request;
    if (!body) {
        throw new Error('No request body');
    }
    const { entity } = ctx.data;
    const { id, owner } = entity;
    const { sub } = body;

    if (!isValidSub(sub)) {
        throw new Error(`Invalid user id ${sub}`);
    }
    if (sub === owner) {
        throw new Error(`${sub} is the owner and cannot be removed`);
    }

    try {
        await dbEntityMember.remove(db, id, sub);
        ctx.body = {
            data: 'ok',
        };
    } catch (err) {
        throw new Error(`${sub} could not be removed`);
    }
};
export default route;
