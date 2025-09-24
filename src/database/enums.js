/* eslint-disable no-await-in-loop */

import pgPromise from 'pg-promise';
import { log } from '../util/index.js';

const pgp = pgPromise({ capSQL: true });

const enums = [
    {
        name: 'entity_type',
        values: [
            'none',
            'project',
            'sample',
            'both',
        ],
    },
    {
        name: 'user_permission',
        values: [
            'admin',
            'owner',
            'read',
            'write',
            'none',
        ],
    },
];

const enumExists = async (db, enumObj) => {
    const { name } = enumObj;
    const query = `
        SELECT EXISTS (
            SELECT 1
            FROM   pg_type 
            WHERE  typname = $(name)
        );
    `;
    const res = await db.one(query, {
        name,
    });
    return res.exists;
};

const createEnum = async (db, enumObj) => {
    const { name, values } = enumObj;

    const valueSting = values
        .map((v) => pgp.as.text(v))
        .join(', ');
    const query = `CREATE TYPE ${pgp.as.value(name)}
        AS ENUM (${valueSting})
    `;
    await db.none(query);
    log('Done.');
};

const checkEnum = async (db, enumObj) => {
    const { name } = enumObj;
    log(`Checking Enum ${name}...`);
    const exists = await enumExists(db, enumObj);
    if (!exists) {
        log(`Enum ${name} does not exist, creating it...`);
        await createEnum(db, enumObj);
    }
};

export const initEnums = async (db) => {
    log('Initializing enums...');
    for (let i = 0; i < enums.length; i += 1) {
        await checkEnum(db, enums[i]);
    }
    log('done.');
};

export const getEnum = (name) => enums.find((e) => e.name === name);

export const checkValue = (enumName, value) => {
    const enumData = getEnum(enumName);
    if (!enumData) {
        throw new Error(`No enum with name ${enumName}`);
    }
    const { values } = enumData;
    if (!values.includes(value)) {
        throw new Error(`${value} is not in enum ${enumName}, possible values are [${values.join(', ')}]`);
    }
};
