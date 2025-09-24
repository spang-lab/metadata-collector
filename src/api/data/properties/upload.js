import fs from 'fs';
import yaml from 'js-yaml';
import { getDb, dbProperties } from '../../../database/index.js';
import { log } from '../../../util/index.js';

import {
    validateNewPropery,
} from '../../../util/validation.js';

const fsPromise = fs.promises;

const add = async (ctx) => {
    const { files } = ctx.request;
    if (!files || !files.file) {
        throw new Error('No file recieved');
    }
    const { path } = files.file;
    let data = null;
    try {
        const string = await fsPromise.readFile(
            path,
            'utf8',
        );
        data = yaml.load(string);
    } catch (err) {
        throw new Error('Failed to parse yaml in file upload');
    }

    const properties = data.map((p) => {
        const newProp = { ...p };
        delete newProp.id;
        return newProp;
    });
    properties.forEach(validateNewPropery);

    const db = getDb(ctx);

    const existing = await dbProperties.listAll(db);
    const existingKeys = new Set(existing.map((p) => p.key));

    const promises = properties.map(async (p) => {
        const { key } = p;
        try {
            if (existingKeys.has(key)) {
                log(`Property ${key} already exists. Updating... `);
                await dbProperties.edit(db, p);
            } else {
                await dbProperties.add(db, p);
            }
        } catch (err) {
            throw new Error(`Failed to add property ${key}: ${err.toString()}`);
        }
    });
    await Promise.all(promises);

    ctx.body = {
        ok: true,
    };
};
export default add;
