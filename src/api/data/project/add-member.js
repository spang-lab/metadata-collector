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
    const { sub, permission } = body;

    if (!isValidSub(sub)) {
        throw new Error(`Invalid user id ${sub}`);
    }
    if (sub === owner) {
        throw new Error(`${sub} is already the owner`);
    }

    const permissions = ['read', 'write'];
    if (!permissions.includes(permission)) {
        throw new Error(`Invalid user permission ${permission}
            should be one of [${permissions.join(', ')}]`);
    }
    try {
        await dbEntityMember.add(db, id, {
            sub,
            permission,
        });
        ctx.body = {
            data: 'ok',
        };
    } catch (err) {
        throw new Error(`${sub} is already a member`);
    }
};
export default route;
