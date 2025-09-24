import { expandPermission } from '../../util/index.js';
import { validateProperty } from '../../util/validation.js';

import { values, insertLax } from '../query-helpers.js';

const expandType = (entityType) => {
  switch (entityType) {
    case 'none':
      return ['none'];
    case 'project':
      return ['project', 'both'];
    case 'sample':
      return ['sample', 'both'];
    case 'both':
      return ['both'];
    case 'any':
      return ['project', 'sample', 'both'];
    default:
      throw new Error(`Unknown entityType '${entityType}'`);
  }
};

const listIds = async (db, type, permission, entityId) => {
  const permissions = expandPermission(permission);
  const types = expandType(type);

  const permValues = values(permissions);
  const typeValues = values(types);

  const query = `
        SELECT
            id
        FROM properties WHERE
            permission IN ${permValues} AND
            type IN ${typeValues} AND
            (
                entity IS NULL OR
                entity = $(entityId)
            )
    `;
  const data = await db.any(query, { entityId });
  return data.map((p) => p.id);
};

const list = async (db, type, permission, entityId) => {
  const permissions = expandPermission(permission);
  const types = expandType(type);

  const permValues = values(permissions);
  const typeValues = values(types);

  const query = `
        SELECT
            id,
            key, 
            data
        FROM properties WHERE
            permission IN ${permValues} AND
            type IN ${typeValues} AND
            (
                entity IS NULL OR
                entity = $(entityId)
            )
    `;
  return db.any(query, { entityId });
};
const listAll = async (db) => {
  const query = `
        SELECT
            *
        FROM properties
        ORDER BY key
    `;
  return db.any(query);
};

const get = async (db, key) => {
  const query = `
        SELECT * from properties
        WHERE key=$(key)
    `;
  const result = await db.oneOrNone(query, { key });
  if (!result) {
    throw new Error(`No property for key ${key}`);
  }
  return result;
};

const add = async (db, property) => {
  const dbProperty = {
    ...property,
    data: JSON.stringify(property.data),
  };
  const query = insertLax(dbProperty, 'properties');
  await db.none(query);
};
const edit = async (db, property) => {
  const dbProperty = {
    key: property.key,
    data: JSON.stringify(property.data),
  };
  const query = `
        UPDATE properties SET
        data=$(data)
        WHERE
        key=$(key)
    `;
  await db.none(query, dbProperty);
};

const validate = async (db, key, value) => {
  const property = await get(db, key);
  return {
    ...property,
    isValid: validateProperty(property, value),
  };
};

export default {
  add,
  get,
  edit,
  list,
  listAll,
  listIds,
  validate,
};
