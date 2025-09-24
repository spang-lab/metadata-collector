import { where, insert, update } from '../query-helpers.js';

import { generateMnemonic } from '../../util/index.js';

const find = async (db, mapping) => {
  const conditions = where(mapping);
  const query = `
        SELECT * FROM entities WHERE
             ${conditions}
        `;
  return db.any(query);
};

const list = async (db, type) => find(db, { type, deleted: null });
const listSamples = async (db, entityId) => find(db, {
  type: 'sample',
  parent: entityId,
  deleted: null,
});

const insertEntity = async (db, entity) => {
  const iquery = insert(entity, 'entities');
  const query = `
        ${iquery}
        ON CONFLICT (mnemonic) DO NOTHING 
        RETURNING *
    `;
  return db.oneOrNone(query);
};

const add = async (db, mapping) => {
  const entity = {
    ...mapping,
    mnemonic: generateMnemonic(),
    created: 'now',
    edited: 'now',
    deleted: null,
  };
  let result = await insertEntity(db, entity);
  if (result !== null) {
    return result;
  }
  // mnemonic collision results in "null" returned, try again.
  entity.mnemonic = generateMnemonic(true);
  result = await insertEntity(db, entity);
  if (result !== null) {
    return result;
  }
  throw new Error('ID SPACE EXHAUSTED, this should never happen');
};

const get = async (db, mnemonic, type = null) => {
  const mapping = {
    mnemonic,
    deleted: null,
  };
  if (type) {
    mapping.type = type;
  }

  const entities = await find(db, mapping);
  if (entities.length === 0) {
    throw new Error(`No entity with type ${type} and id ${mnemonic}`);
  }
  return entities[0];
};

const touch = async (db, entityId) => {
  const uQuery = update({ edited: 'now' }, 'entities');
  const conditions = where({ id: entityId });
  const query = `${uQuery} WHERE ${conditions}`;
  return db.none(query);
};

const remove = async (db, entityId) => {
  const uQuery = update({ deleted: 'now' }, 'entities');
  const conditions = where({ id: entityId });
  const query = `${uQuery} WHERE ${conditions} RETURNING parent`;
  const { parent } = await db.one(query);
  if (parent) {
    await touch(db, parent);
  }
};

export default {
  list,
  listSamples,
  add,
  touch,
  get,
  remove,
};
