import { log } from '../util/index.js';

const tableHasColumn = async (db, tableName, columnName) => {
    const query = `
        SELECT * FROM information_schema.columns
        WHERE
            table_name=$(tableName) AND
            column_name=$(columnName)
    `;
    const column = await db.oneOrNone(query, { tableName, columnName });
    return !!column;
};

const checkEntityColumns = async (db) => {
    const tableName = 'entity_columns';
    const columnName = 'data';
    const hasDataCol = await tableHasColumn(db, tableName, columnName);
    if (hasDataCol) {
        return;
    }
    log(`Adding column "${columnName}" to table ${tableName}`);
    const query = `
        ALTER TABLE entity_columns
        ADD COLUMN data JSON
    `;
    await db.any(query);
    log(`Dropping column "sortindex" from table ${tableName}`);
    const query2 = `
        ALTER TABLE entity_columns
        DROP COLUMN sortindex
    `;
    await db.any(query2);
};

const migrate = async (db) => {
    log('Checking if database needs updates...');
    await checkEntityColumns(db);

    log('Done.');
};

export default migrate;
