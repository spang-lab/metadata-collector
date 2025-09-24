/* eslint-disable no-await-in-loop */
import fs from 'fs';
import yaml from 'js-yaml';

import {
    log,
} from '../util/index.js';

import {
    validateNewPropery,
} from '../util/validation.js';

import { insertLax } from './query-helpers.js';

const fsPromise = fs.promises;

const readProperties = async () => {
    const path = './src/database/properties.yaml';
    const string = await fsPromise.readFile(
        path,
        'utf8',
    );
    const data = yaml.load(string);
    return data;
};

const listKeys = async (db) => {
    const query = `
        SELECT key from properties
    `;
    const data = await db.any(query);
    return data.map((e) => e.key);
};

const create = async (db, property) => {
    const dbProperty = {
        ...property,
        data: JSON.stringify(property.data),
    };
    const query = insertLax(dbProperty, 'properties');
    await db.none(query);
};

const init = async (db) => {
    log('Initializing properties...');
    const properties = await readProperties();

    const existing = await listKeys(db);
    for (let i = 0; i < properties.length; i += 1) {
        const prop = properties[i];
        validateNewPropery(prop);
        const { key } = prop;
        if (existing.includes(key)) {
            // log(`Property ${key} already exists.`);
        } else {
            log(`Creating property ${key}`);
            await create(db, prop);
            existing.push(key);
        }
    }
    log('Done.');
};
export default init;
