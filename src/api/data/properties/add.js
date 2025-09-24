import { getDb, dbEntity, dbProperties } from '../../../database/index.js';

import {
    validateNewPropery,
} from '../../../util/validation.js';

const add = async (ctx) => {
    const { body } = ctx.request;
    const { property } = body;
    if (!property || !property.data) {
        throw new Error('No property to add');
    }
    const db = getDb(ctx);

    const { data } = property;
    const newData = {
        sortPriority: '0',
        regex: '',
        description: '',
        ...data,
    };

    const newProperty = {
        ...property,
        permission: 'read',
        data: newData,
    };
    if (property.entity) {
        const entity = await dbEntity.get(db, property.entity, 'project');
        newProperty.entity = entity.id;
    }
    validateNewPropery(newProperty);

    await dbProperties.add(db, newProperty);

    ctx.body = {
        ok: true,
    };
};
export default add;
