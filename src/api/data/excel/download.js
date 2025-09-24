/* eslint-disable no-underscore-dangle, no-param-reassign */
import excel from 'exceljs';

import { getDb, dbProject, dbSample } from '../../../database/index.js';

const excelVersion = 'v1.0.0';

const getWidth = (w) => Math.max(Math.round(w), 15);

const createProjectWorksheet = (workbook, project) => {
  const { properties, owner, mnemonic } = project;
  const sheet = workbook.addWorksheet('Project');

  sheet.columns = [
    { header: 'Project Property', key: 'property', width: 20 },
    { header: 'key', key: 'key', width: 20 },
    { header: 'Value', key: 'value', width: 40 },
  ];

  sheet.addRow({
    property: 'Identifier',
    key: 'mnemonic',
    value: mnemonic,
  });
  sheet.addRow({
    property: 'Owner',
    key: 'owner',
    value: owner,
  });
  sheet.addRow({
    property: 'File Version',
    key: 'version',
    value: excelVersion,
  });
  sheet.addRow({});

  properties.forEach((property) => {
    const { key, data, value } = property;
    const { name } = data;
    const row = {
      property: name,
      key,
      value,
    };
    sheet.addRow(row);
  });
};

const createSampleWorksheet = (workbook, sampleMatrix) => {
  const sheet = workbook.addWorksheet('Samples');

  const { samples, columns } = sampleMatrix;

  columns.unshift({
    name: 'ID',
    key: 'mnemonic',
    size: 20,
  });

  sheet.columns = columns.map((c) => ({
    header: c.name,
    key: c.key,
    width: getWidth(c.size),
  }));

  samples.forEach((sample) => {
    const { cells, id } = sample;
    const row = { mnemonic: id };
    const selections = { mnemonic: [] };
    cells.forEach((cell) => {
      const { column, data, values } = cell;
      const { value } = data;
      row[column] = value || '';
      selections[column] = values;
    });
    const erow = sheet.addRow(row);
    erow._cells.forEach((cell) => {
      const key = cell._column._key;
      cell.dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: [`"${selections[key].join(',')}"`],
      };
    });
  });
  const header = sheet.getRow(1);
  header.height = 25;
  header.eachCell({ includeEmpty: true }, (cell) => {
    cell.border = {
      top: { style: 'thin' },
      right: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'F08080' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
};

const download = async (ctx) => {
  const { entity, permission } = ctx.data;
  const { id, mnemonic } = entity;
  const db = getDb(ctx);
  const project = await dbProject.get(db, id, permission);

  const samples = await dbSample.matrix(db, id, permission);

  const workbook = new excel.Workbook();
  workbook.creator = `${project.owner}`;
  workbook.created = new Date();

  createProjectWorksheet(workbook, {
    ...entity,
    ...project,
  });
  createSampleWorksheet(workbook, samples);

  const buffer = await workbook.xlsx.writeBuffer();
  ctx.set('Pragma', 'public');
  ctx.set('Expires', '0');
  ctx.set('Content-Type', 'application/x-unknown');

  ctx.set('Content-disposition', `attachment; filename=${mnemonic}.xlsx`);

  ctx.body = buffer;
};
export default download;
