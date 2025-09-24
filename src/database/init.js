import { connect, getConnection } from './connection.js';
import { initTables } from './tables.js';
import { initEnums } from './enums.js';
import { log } from '../util/index.js';
import initProperties from './init_properties.js';
import migrate from './migration.js';

const init = async () => {
    log('Initializing database...');
    await connect();
    const db = getConnection();
    await initEnums(db);
    await initTables(db);
    await initProperties(db);
    await migrate(db);
    log('Done.');
    return db;
};
export default init;
