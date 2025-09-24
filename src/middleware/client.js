import Koa from 'koa';
import dist from 'koa-static';
import favicon from 'koa-favicon';
import proxy from 'koa-proxies';
import { join } from 'path';
import { getConfig, log } from '../util/index.js';

import loginRedirect from './loginRedirect.js';

const getClientApp = () => {
    const app = new Koa();
    const { secrets, client } = getConfig();
    const env = secrets.nodeEnv;
    const { faviconIco } = client;
    const clientPath = join('client', 'dist');
    const logs = (ctx, target) => {
        log(`Proxy to ${new URL(ctx.req.url, target)}`);
    };
    app.use(loginRedirect);
    if (env === 'development') {
        log('Proxying requests to local dev server...');
        app.use(proxy(
            '*',
            {
                target: 'http://0.0.0.0:8089',
                logs,
            },
        ));
    } else {
        app.use(dist(clientPath));
    }
    const faviconPath = join(clientPath, faviconIco);
    app.use(favicon(faviconPath));

    return app;
};

export default getClientApp;
