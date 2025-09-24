import fs from 'fs';
import yaml from 'js-yaml';

const fsPromise = fs.promises;

let templates = null;

export const createTemplates = async () => {
    const path = './config/templates.yaml';
    const string = await fsPromise.readFile(
        path,
        'utf8',
    );
    const data = yaml.load(string);
    templates = data.templates;
};

export const getTemplates = () => templates;
