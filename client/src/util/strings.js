export const capitalize = (word) => word.charAt(0).toUpperCase()
    + word.slice(1).toLowerCase();

export const toCamelCase = (string) => string
    .split('_')
    .map((w, i) => {
        if (i === 0) return w.toLowerCase();
        return capitalize(w);
    })
    .join('');

export const toSnakeCase = (string) => string
    .replace(/\s+/g, '')
    .replace(/[A-Z]/g, (letter, i) => ((i === 0) ? letter.toLowerCase() : `_${letter.toLowerCase()}`));

export const prettify = (string) => string.split('_').map(capitalize).join(' ');

export const nameToId = (string) => string
    .replace(/\s+/g, '-')
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue')
    .replace('ß', 'ss')
    .replace(/[^\w-]/g, '');

/**
 * checks if the value is a valid string
 * @param {String} text - the text to check
 * @param {Number} maxLength - maximum allowed length
 */
export const isText = (text, minLength = 1, maxLength = 64) => {
    if (typeof text !== 'string') {
        return false;
    }
    if (text.length < minLength || text.length > maxLength) {
        return false;
    }
    return true;
};

export const checkText = (text, minLength = 1, maxLength = 64) => {
    if (typeof text !== 'string') {
        throw new Error(`"${text}" is not a string`);
    }
    if (text.length < minLength) {
        throw new Error(`"${text}" to short, min length: ${minLength}`);
    }
    if (text.length > maxLength) {
        throw new Error(`"${text}" to long, max length: ${maxLength}`);
    }
};

/**
 * checks if the value is a numeric id, no cast since
 * ids can exceed int_max
 * @param {String} value - the value to test
 */
export const isInteger = (value) => {
    let text = value;
    if (typeof text === 'number') {
        text = text.toString();
    }
    if (typeof text !== 'string') {
        return false;
    }
    const re = /^[0-9]+$/;
    return re.test(text);
};

export const joinPaths = (...strings) => strings
    .map((s, i) => {
        const tmp = s.replace(/\/$/g, '');
        if (i === 0) {
            return tmp;
        }
        return tmp.replace(/^\//g, '');
    })
    .join('/');

export const formatDate = (dbDate) => new Date(dbDate).toLocaleString('de-DE');
