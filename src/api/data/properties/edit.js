import { getDb, dbProperties } from '../../../database/index.js';

import { validatePropertyData } from '../../../util/validation.js';

const edit = async (ctx) => {
    const { body } = ctx.request;
    const { property } = body;
    if (!property) {
        throw new Error('No property to edit');
    }
    validatePropertyData(property);

    const db = getDb(ctx);
    await dbProperties.edit(db, property);

    ctx.body = {
        ok: true,
    };
};
export default edit;
