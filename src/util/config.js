import fs from 'fs';
import yaml from 'js-yaml';
import { join } from 'path';

import { log } from './logger.js';

const fsPromise = fs.promises;

let config = null;

const getSecrets = async () => {
    const secrets = {};

    const secretsPath = './secrets';
    try {
        const files = await fsPromise.readdir(secretsPath);
        const promises = files.map(async (fileName) => {
            const path = join(secretsPath, fileName);
            try {
                let secret = await fsPromise.readFile(
                    path,
                    'utf8',
                );
                secret = secret.trim().replace('\n', '');
                secrets[fileName] = secret;
            } catch (err) {
                log(`Warning: Failed to read secret: ${fileName}`);
            }
        });
        await Promise.all(promises);
    } catch (err) {
        log(`Error reading secrets folder: ${err.toString()}`);
        log(`Skipping reading secrets folder ${secretsPath}.`);
    }

    return secrets;
};

const createConfig = async () => {
    const path = './config/config.yaml';
    const string = await fsPromise.readFile(
        path,
        'utf8',
    );
    const data = yaml.load(string);
    data.secrets = await getSecrets();
    return data;
};

export const get = () => config;
export const create = async () => {
    config = await createConfig();
};
