import { insert, where } from '../query-helpers.js';

const listRaw = async (db, entityId) => {
    const query = `
        SELECT
            entity_columns.id,
            properties.key,
            properties.data
        FROM entity_columns JOIN properties ON
            entity_columns.property = properties.id
        WHERE
            entity_columns.entity = $(entityId)
    `;
    return db.any(query, { entityId });
};

const list = async (db, entityId) => {
    const raw = await listRaw(db, entityId);

    const columns = raw.map((column) => {
        const { key, data, type } = column;
        const { sortPriority } = data;
        return {
            key,
            entityType: type,
            ...data,
            sortPriority: parseInt(sortPriority || '0', 10),
        };
    });

    return columns;
};

const add = async (db, column) => {
    const mapping = {
        ...column,
        data: {},
    };
    const query = insert(mapping, 'entity_columns');
    return db.none(query);
};
const remove = async (db, entityId, property) => {
    const mapping = {
        entity: entityId,
        property,
    };
    const wquery = where(mapping);
    const query = `DELETE FROM entity_columns WHERE ${wquery}`;
    return db.none(query);
};

const edit = async (db, entityId, property, data) => {
    const json = JSON.stringify(data);
    const wquery = where({
        entity: entityId,
        property,
    });
    const query = `
        UPDATE entity_columns SET
            data = $(json)
        WHERE ${wquery}
    `;
    await db.none(query, { json });
};

const removeAll = async (db, entityId) => {
    const mapping = {
        entity: entityId,
    };
    const wquery = where(mapping);
    const query = `DELETE FROM entity_columns WHERE ${wquery}`;
    return db.none(query);
};

export default {
    list,
    add,
    edit,
    remove,
    removeAll,
};
