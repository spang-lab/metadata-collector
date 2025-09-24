/* eslint-disable no-console */
/**
 * Termial color codes
 */
export const COLOR = {
    RESET: '\x1b[0m',
    RED: '\x1b[31m',
    GREEN: '\x1b[32m',
    YELLOW: '\x1b[33m',
    BLUE: '\x1b[34m',
    MAGENTA: '\x1b[35m',
    CYAN: '\x1b[36m',
};

export const log = (text, color = COLOR.RESET) => {
    const time = new Date().toISOString().substr(5);
    const arr = [COLOR.CYAN, time, color, ' >> ', text, COLOR.RESET];
    console.log(arr.join(''));
};
export const dbg = (...args) => {
    console.log(COLOR.MAGENTA, '+---------- DEBUG ---------+', COLOR.RESET);
    const string = args.map((arg) => JSON.stringify(arg, null, 2)).join('\n\n');
    log(string);
    console.log(COLOR.MAGENTA, '+--------------------------+', COLOR.RESET);
};
global.dbg = dbg;
