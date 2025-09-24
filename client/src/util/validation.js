export const isObject = (jsObj) => {
    if (typeof jsObj !== 'object') {
        return false;
    }
    if (jsObj === null) {
        return false;
    }
    if (Array.isArray(jsObj)) {
        return false;
    }
    return true;
};

export const checkKeys = (obj, requiredKeys) => {
    const keys = Object.keys(obj);
    requiredKeys.forEach((rkey) => {
        if (!keys.includes(rkey)) {
            throw new Error(`${rkey} is mandatory, please set a value`);
        }
    });
};

export const validateProperty = (data, value) => {
    if (!value) {
        return null;
    }

    const { regex } = data;
    try {
        const re = new RegExp(regex);
        return re.test(value);
    } catch (err) {
        return false;
    }
};
