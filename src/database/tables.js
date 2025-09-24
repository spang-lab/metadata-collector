/* eslint-disable no-await-in-loop */
import { log } from '../util/index.js';

const tables = [
  {
    name: 'entities',
    columns: [
      'id',
      'mnemonic',
      'type',
      'parent',
      'owner',
      'created',
      'edited',
      'deleted',
    ],
    create: (db) => db.none(`
            CREATE TABLE entities (
                id              BIGSERIAL           PRIMARY KEY NOT NULL,
                mnemonic        text                NOT NULL UNIQUE,
                type            entity_type         NOT NULL,
                parent          INTEGER             REFERENCES entities(id),
                owner           text                NOT NULL,
                created         timestamptz         NOT NULL,
                edited          timestamptz         NOT NULL,
                deleted         timestamptz         
            );
        `),
  },
  {
    name: 'properties',
    columns: ['id', 'type', 'key', 'permission', 'entity', 'data'],
    create: (db) => db.none(`
            CREATE TABLE properties (
                id         BIGSERIAL       PRIMARY KEY NOT NULL,
                type       entity_type     NOT NULL,
                key        text            NOT NULL UNIQUE,
                permission user_permission NOT NULL,
                entity     BIGINT          REFERENCES entities(id),
                data       JSON            NOT NULL
            );
        `),
  },
  {
    name: 'events',
    columns: ['id', 'entity', 'property', 'value', 'owner', 'timestamp'],
    create: async (db) => {
      await db.none(`
            CREATE TABLE events (
                id               BIGSERIAL    PRIMARY KEY NOT NULL,
                entity           BIGINT       NOT NULL REFERENCES entities(id),
                property         BIGINT       NOT NULL REFERENCES properties(id),
                value            text         ,
                owner            text         ,
                timestamp        timestamptz  NOT NULL
            );
        `);
      await db.none('CREATE INDEX on events(entity, property, timestamp)');
    },
  },
  {
    name: 'entity_members',
    columns: ['id', 'entity', 'sub', 'permission'],
    create: (db) => db.none(`
            CREATE TABLE entity_members (
                id         BIGSERIAL       PRIMARY KEY NOT NULL,
                entity     BIGINT          NOT NULL REFERENCES entities(id),
                sub        text            NOT NULL,
                permission user_permission NOT NULL,
                UNIQUE (entity, sub)
            );
        `),
  },
  {
    name: 'entity_columns',
    columns: ['id', 'entity', 'property', 'data'],
    create: (db) => db.none(`
            CREATE TABLE entity_columns (
                id         BIGSERIAL       PRIMARY KEY NOT NULL,
                entity     BIGINT          NOT NULL REFERENCES entities(id),
                property   BIGINT          NOT NULL REFERENCES properties(id),
                data       JSON
            );
        `),
  },
];

const tableExists = async (db, table) => {
  const query = `
        SELECT EXISTS (
            SELECT 1
            FROM   information_schema.tables 
            WHERE  table_name = $(name)
        );
    `;
  const res = await db.one(query, {
    name: table.name,
  });
  return res.exists;
};

const checkTable = async (db, table) => {
  log(`Checking Table ${table.name}...`);
  const exists = await tableExists(db, table);
  if (!exists) {
    log(`Table ${table.name} does not exist, creating it...`);
    await table.create(db);
    log('done.');
  }
  log(`Table ${table.name} ok.`);
};

export const initTables = async (db) => {
  log('Initializing tables...');
  for (let i = 0; i < tables.length; i += 1) {
    const table = tables[i];
    await checkTable(db, table);
  }
  log('done.');
};

export const getTable = (name) => tables.find((t) => t.name === name);
