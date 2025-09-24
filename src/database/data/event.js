import { where, values, insert } from '../query-helpers.js';
import entity from './entity.js';
import dbProperties from './properties.js';

const find = async (db, mapping) => {
    const conditions = where(mapping);
    const query = `
        SELECT * FROM events WHERE
             ${conditions}
        `;
    return db.any(query);
};

const add = async (db, event) => {
    const { property, value } = event;
    const dbProp = await dbProperties.validate(db, property, value);
    if (!dbProp.isValid) {
        throw new Error(`Invalid property ${property} with value ${value}`);
    }
    const mapping = {
        ...event,
        property: dbProp.id,
        timestamp: 'now',
    };
    const query = insert(mapping, 'events');
    await db.none(query);
    await entity.touch(db, event.entity);
};
const remove = async (db, event) => {
    const { property } = event;
    const dbProp = await dbProperties.get(db, property);
    const mapping = {
        ...event,
        property: dbProp.id,
        value: null,
        timestamp: 'now',
    };
    const query = insert(mapping, 'events');
    await db.none(query);
    await entity.touch(db, event.entity);
};

const listProjects = async (db, projectIds) => {
    const propList = await dbProperties.listIds(db, 'project', 'none', null);
    const propValues = values(propList);
    const idValues = values(projectIds);
    if (projectIds.length === 0) {
        return [];
    }

    const query = `
        SELECT DISTINCT ON (property, events.entity)
            events.entity,
            value, 
            timestamp,
            properties.key
        FROM events JOIN properties ON
            events.property = properties.id
        WHERE
            events.entity IN ${idValues} AND
            property IN ${propValues}
        ORDER BY property, events.entity, timestamp DESC
    `;
    return db.any(query);
};

const get = async (db, entityId, permission) => {
    const propList = await dbProperties.listIds(db, 'any', permission, entityId);
    const propValues = values(propList);
    const query = `
        SELECT DISTINCT ON (events.property, events.entity)
            value, 
            owner,
            timestamp,
            properties.key,
            properties.data 
        FROM events JOIN properties ON
            events.property = properties.id
        WHERE
            events.entity = $(entityId) AND
            property IN ${propValues} 
        ORDER BY events.property, events.entity, timestamp DESC
    `;
    return db.any(query, { entityId });
};

const history = async (db, entityId, permission) => {
    const propList = await dbProperties.listIds(db, 'any', permission);
    const propValues = values(propList);
    const query = `
        SELECT
            events.id,
            events.value,
            events.owner,
            events.timestamp,
            properties.key,
            properties.data,
            entities.mnemonic,
            events.entity = $(entityId) as isParent
        FROM events JOIN entities ON
            events.entity = entities.id
        JOIN properties ON
            events.property = properties.id
        WHERE
            (
            events.entity = $(entityId) OR
            parent = $(entityId)
            ) AND
            property IN ${propValues}
        ORDER BY timestamp DESC
    `;
    return db.any(query, { entityId });
};

const listSamples = async (db, parentId, permission) => {
    const propList = await dbProperties.listIds(db, 'any', permission);
    const propValues = values(propList);
    const query = `
        SELECT DISTINCT ON (property, events.entity)
            events.value, 
            events.owner,
            entities.mnemonic,
            events.timestamp,
            properties.key
        FROM events JOIN entities ON
            events.entity = entities.id
        JOIN properties ON
            events.property = properties.id
        WHERE
            entities.parent = $(parentId) AND
            events.property IN ${propValues}
        ORDER BY property, events.entity, timestamp DESC
    `;
    return db.any(query, { parentId });
};

export default {
    find,
    get,
    history,
    remove,
    listProjects,
    listSamples,
    add,
};
