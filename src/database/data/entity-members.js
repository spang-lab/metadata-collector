import { insert, where } from '../query-helpers.js';

const list = async (db, entityId) => {
    const query = `
        SELECT
            sub,
            permission
        FROM entity_members WHERE
            entity = $(entityId)
    `;
    return db.any(query, { entityId });
};

const listProjects = async (db) => {
    const query = `
        SELECT
            entities.*,
            (
                SELECT JSON_AGG(sub) FROM entity_members 
                    WHERE entities.id = entity_members.entity
            ) AS members
        FROM entities WHERE
            entities.type = 'project' AND
            deleted IS NULL 
    `;
    return db.any(query);
};

const get = async (db, entityId, sub) => {
    const conditions = where({
        entity: entityId,
        sub,
    });
    const query = `
        SELECT permission FROM entity_members
        WHERE ${conditions}
    `;
    return db.oneOrNone(query);
};

const add = async (db, entityId, member) => {
    const mapping = {
        entity: entityId,
        ...member,
    };
    const query = insert(mapping, 'entity_members');
    return db.none(query);
};
const remove = async (db, entityId, sub) => {
    const mapping = {
        entity: entityId,
        sub,
    };
    const wquery = where(mapping);
    const query = `DELETE FROM entity_members WHERE ${wquery}`;
    return db.none(query);
};

const removeAll = async (db, entityId) => {
    const mapping = {
        entity: entityId,
    };
    const wquery = where(mapping);
    const query = `DELETE FROM entity_members WHERE ${wquery}`;
    return db.none(query);
};

export default {
    listProjects,
    get,
    list,
    add,
    remove,
    removeAll,
};
