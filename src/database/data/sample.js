import entity from './entity.js';
import event from './event.js';
import entityColumns from './entity-columns.js';

const list = async (db, entityId, permission) => {
  const dbSamples = await entity.listSamples(db, entityId);
  const sampleIndex = {};
  dbSamples.forEach((s) => {
    sampleIndex[s.mnemonic] = {
      dbId: s.id,
      id: s.mnemonic,
      owner: s.owner,
      properties: {},
    };
  });
  const events = await event.listSamples(db, entityId, permission);
  events.forEach((ev) => {
    const { key, mnemonic } = ev;
    const sample = sampleIndex[mnemonic];
    sample.properties[key] = ev;
  });

  const samples = Object.values(sampleIndex).sort(
    (s1, s2) => s1.dbId - s2.dbId,
  );

  return samples;
};

const matrix = async (db, entityId, permission) => {
  let samples = await list(db, entityId, permission);
  let columns = await entityColumns.list(db, entityId);

  const columnValues = {};
  columns.forEach((column) => {
    const { key, options } = column;
    columnValues[key] = new Set(options);
  });

  samples.forEach((sample) => {
    const { properties } = sample;
    columns.forEach((column) => {
      const { key } = column;
      const property = properties[key];
      if (!property || !property.value) {
        return;
      }
      const { value } = property;
      columnValues[key].add(value);
    });
  });

  columns = columns
    .sort((c1, c2) => c2.sortPriority - c1.sortPriority)
    .map((c) => {
      const { key } = c;
      const values = Array.from(columnValues[key]);
      const size = values.reduce((acc, v) => Math.max(acc, v.length), 0);
      return {
        ...c,
        size,
      };
    });

  samples = samples.map((sample) => {
    const { id, owner, properties } = sample;

    const cells = columns.map((column) => {
      const { key, type } = column;
      return {
        sample: id,
        column: key,
        type,
        values: Array.from(columnValues[key]),
        data: properties[key] || {},
      };
    });
    return {
      id,
      owner,
      cells,
    };
  });

  return {
    columns,
    samples,
  };
};

const add = async (db, entityId, owner) => {
  const mapping = {
    type: 'sample',
    parent: entityId,
    owner,
  };
  const result = await entity.add(db, mapping);
  await entity.touch(db, entityId);
  return result;
};

const remove = async (db, entityId) => {
  await entity.remove(db, entityId);
};

export default {
  matrix,
  list,
  add,
  remove,
};
