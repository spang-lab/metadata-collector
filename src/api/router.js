import Router from '@koa/router';
import body from 'koa-body';
import compress from 'koa-compress';

import login from './login.js';
import callback from './callback.js';
import userinfo from './userinfo.js';
import logout from './logout.js';

import dataRouter from './data/router.js';

import {
    generateMnemonic,
    mnemonicCount,
} from '../util/index.js';

const baseRouter = new Router();
baseRouter.use(body({ multipart: true }));
baseRouter.use(compress());

const apiRouter = new Router();

// User Management
apiRouter.get('/login', login);
apiRouter.get('/logout', logout);
apiRouter.get('/callback', callback);
apiRouter.post('/userinfo', userinfo);

// Kubernetes
apiRouter.get('/healthy', (ctx) => { ctx.body = 'ok'; });
apiRouter.get('/mnemonic', (ctx) => { ctx.body = { data: generateMnemonic() }; });
apiRouter.get('/mnemonic/total', (ctx) => { ctx.body = { data: mnemonicCount }; });
apiRouter.get('/mnemonic/:count', (ctx) => {
    const { count } = ctx.params;
    const n = parseInt(count, 10);
    const data = [...Array(n)].map(() => generateMnemonic()).join('\n');
    ctx.body = { data };
});

apiRouter.use(
    dataRouter.routes(),
    dataRouter.allowedMethods(),
);

baseRouter.use(
    '/api/v1',
    apiRouter.routes(),
    apiRouter.allowedMethods(),
);

export default baseRouter;
