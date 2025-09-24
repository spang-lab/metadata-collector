import createDatabase from './init.js';

export * from './connection.js';
export * from './query-helpers.js';

export * from './data/index.js';

let db = null;

export const getDb = (ctx) => {
    if (ctx && ctx.state.db) {
        return ctx.state.db;
    }
    return db;
};
export const createDb = async () => {
    db = await createDatabase();

    // await dropTable(db, 'entities');
};
