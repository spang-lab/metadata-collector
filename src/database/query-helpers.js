import pgPromise from 'pg-promise';
import { getTable } from './tables.js';

const pgp = pgPromise({ capSQL: true });

export const where = (conditions, keyword = 'AND') => {
    const queries = Object.keys(conditions).map((key) => {
        const name = pgp.as.value(key);
        if (conditions[key] === null) {
            return `${name} IS NULL`;
        }
        const value = pgp.as.text(conditions[key]);
        return `${name}=${value}`;
    });
    const query = queries.join(` ${keyword} `);
    return query;
};

export const insertLax = (values, tableName) => {
    const { name } = getTable(tableName);
    return pgp.helpers.insert(
        values,
        null,
        name,
    );
};
export const update = (values, tableName) => {
    const { name } = getTable(tableName);
    return pgp.helpers.update(
        values,
        null,
        name,
    );
};

export const values = (list) => {
    const valueList = list.map((v) => pgp.as.text(v));
    return `(${valueList.join(', ')})`;
};

export const insert = (vals, tableName) => {
    const { name, columns } = getTable(tableName);
    const insertColumns = columns.filter((c) => c !== 'id');
    return pgp.helpers.insert(
        vals,
        insertColumns,
        name,
    );
};
