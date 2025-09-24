import yaml from 'js-yaml';
import { getDb, dbProperties } from '../../../database/index.js';

const download = async (ctx) => {
    const db = getDb(ctx);

    const properties = await dbProperties.listAll(db);

    const yamlString = yaml.dump(properties);
    const buffer = Buffer.from(yamlString, 'utf8');

    ctx.attachment('properties.yaml');
    ctx.body = buffer;
};
export default download;
