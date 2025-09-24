import Router from '@koa/router';

import {
  apiTransaction,
  requireLogin,
  authToken,
  resolveEntity,
  requirePermission,
} from '../../middleware/index.js';

import {
  listProjects,
  newProject,
  projectInfo,
  removeProject,
  addMember,
  removeMember,
  addColumn,
  removeColumn,
} from './project/index.js';

import { downloadProject, uploadProject } from './excel/index.js';

import { addSample, listSamples, sampleMatrix } from './sample/index.js';

import {
  newMetadata,
  getMetadata,
  removeMetadata,
  metadataHistory,
} from './metadata/index.js';

import {
  addProperty,
  listProperties,
  editProperty,
  downloadProperties,
  uploadProperties,
} from './properties/index.js';

import { listUsers, getMe } from './users/index.js';

import { listTemplates } from './templates/index.js';

const dataRouter = new Router();
dataRouter.use(apiTransaction);
dataRouter.use(authToken);
dataRouter.use(requireLogin);

// Project routes

dataRouter.get('/project/list', listProjects);
dataRouter.post('/project/new', newProject);
dataRouter.get(
  '/project/:id',
  resolveEntity,
  requirePermission('read'),
  projectInfo,
);

dataRouter.post(
  '/project/:id/remove',
  resolveEntity,
  requirePermission('owner'),
  removeProject,
);

dataRouter.post(
  '/project/:id/member/new',
  resolveEntity,
  requirePermission('owner'),
  addMember,
);
dataRouter.post(
  '/project/:id/member/remove',
  resolveEntity,
  requirePermission('owner'),
  removeMember,
);
dataRouter.post(
  '/project/:id/column/add',
  resolveEntity,
  requirePermission('write'),
  addColumn,
);
dataRouter.post(
  '/project/:id/column/remove',
  resolveEntity,
  requirePermission('write'),
  removeColumn,
);

dataRouter.get(
  '/project/:id/download/excel',
  resolveEntity,
  requirePermission('read'),
  downloadProject,
);
dataRouter.post(
  '/project/:id/upload/excel',
  resolveEntity,
  requirePermission('write'),
  uploadProject,
);

// Sample routes
dataRouter.post(
  '/sample/list',
  resolveEntity,
  requirePermission('read'),
  listSamples,
);
// Sample routes
dataRouter.post(
  '/sample/matrix',
  resolveEntity,
  requirePermission('read'),
  sampleMatrix,
);

dataRouter.post(
  '/sample/add',
  resolveEntity,
  requirePermission('write'),
  addSample,
);

// Metadata routes

dataRouter.get('/metadata/:id', getMetadata);
dataRouter.get(
  '/metadata/:id/history',
  resolveEntity,
  requirePermission('read'),
  metadataHistory,
);
dataRouter.post(
  '/metadata/:id',
  resolveEntity,
  requirePermission('write'),
  newMetadata,
);
dataRouter.post(
  '/metadata/:id/remove',
  resolveEntity,
  requirePermission('write'),
  removeMetadata,
);

// Property routes

dataRouter.get('/properties/list', requirePermission('none'), listProperties);

dataRouter.post('/properties/add', requirePermission('admin'), addProperty);
dataRouter.post('/properties/edit', requirePermission('admin'), editProperty);
dataRouter.get(
  '/properties/download',
  requirePermission('admin'),
  downloadProperties,
);
dataRouter.post(
  '/properties/upload',
  requirePermission('admin'),
  uploadProperties,
);

dataRouter.get('/template/list', listTemplates);

// User routes

dataRouter.get('/user/list', listUsers);
dataRouter.get('/user/me', getMe);

export default dataRouter;
