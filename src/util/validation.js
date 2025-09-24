import { checkValue } from '../database/enums.js';
import { log } from './logger.js';

export const checkKeys = (obj, requiredKeys) => {
    const keys = Object.keys(obj);
    requiredKeys.forEach((rkey) => {
        if (!keys.includes(rkey)) {
            throw new Error(`Object ${JSON.stringify(obj, null, 2)} has missing key ${rkey}`);
        }
    });
};

export const validateProperty = (property, value) => {
    const { data } = property;
    const { regex } = data;
    if (regex) {
        const re = new RegExp(regex);
        return re.test(value);
    }
    return true;
};

const checkExamples = (property) => {
    const { data, key } = property;
    let { examples } = data;

    if (!examples) {
        return;
    }
    if (!Array.isArray(examples)) {
        log(`Legacy property detected ${JSON.stringify(property, null, 2)}`);
        examples = examples.valid;
    }

    examples.forEach((string) => {
        if (!validateProperty(property, string)) {
            throw new Error(`Invalid example for ${key} that should be valid "${string}"`);
        }
    });
};
export const validatePropertyData = (property) => {
    const { data } = property;
    const requiredDataKeys = [
        'type',
        'name',
        'description',
    ];
    checkKeys(data, requiredDataKeys);
    checkExamples(property);
};

export const validateNewPropery = (property) => {
    const requiredKeys = [
        'key',
        'type',
        'permission',
        'data',
    ];
    checkKeys(property, requiredKeys);
    const { permission, type } = property;
    checkValue('user_permission', permission);
    checkValue('entity_type', type);
    validatePropertyData(property);
};
