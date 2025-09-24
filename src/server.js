import Koa from 'koa';
import mount from 'koa-mount';

import {
    log,
    COLOR,
    createConfig,
    getConfig,
    createTemplates,
    startCronJobs,
    createUserIndex,
} from './util/index.js';

import {
    logRequests,
    error,
    getSession,
    getClientApp,
    websocket,
    indexFallback,
} from './middleware/index.js';

import {
    createClient,
} from './openid.js';

import {
    createDb,
} from './database/index.js';

import apiRouter from './api/router.js';

export default async () => {
    await createConfig();
    await createDb();
    await createClient();
    await createUserIndex();
    await createTemplates();

    const app = new Koa();
    const { server, secrets } = getConfig();
    app.use(logRequests);
    app.use(error);

    // keys need for signed cookies
    app.keys = [secrets.cookieSecret];
    const session = getSession(app);
    app.use(session);

    const apiRoutes = apiRouter.routes();
    app.use(apiRoutes);

    const clientApp = getClientApp();
    clientApp.keys = [secrets.cookieSecret];
    app.use(mount(clientApp));

    app.use(indexFallback);

    const appServer = app.listen(server.port);
    appServer.on('upgrade', websocket);
    log(`HTTP Server listening on port ${server.port}`, COLOR.YELLOW);

    startCronJobs();
};
