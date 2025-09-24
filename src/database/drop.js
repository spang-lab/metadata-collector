import { log, COLOR } from '../util/index.js';

export const dropTable = async (db, tableName) => {
    log('');
    log('----------WARNING-----------', COLOR.RED);
    log(`CLEARING THE TABLE ${tableName}`, COLOR.RED);
    log('----------WARNING-----------', COLOR.RED);
    log('');

    const query = `DROP TABLE ${tableName}`;
    await db.none(query);
};

export const dummy = 0;
