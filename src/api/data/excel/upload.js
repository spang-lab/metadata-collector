/* eslint-disable no-underscore-dangle, no-param-reassign */
import excel from 'exceljs';

import { log } from '../../../util/index.js';

const parseExcel = (workbook) => {
};

const upload = async (ctx) => {
    const { files } = ctx.request;
    if (!files || !files.file) {
        throw new Error('No file recieved');
    }
    const { path } = files.file;
    try {
        const workbook = new excel.Workbook();
        await workbook.xlsx.readFile(path);

        console.log(workbook.worksheets);
    } catch (err) {
        log(err);
        throw new Error('Failed to parse excel in file upload');
    }
    ctx.body = { ok: true };
};
export default upload;
