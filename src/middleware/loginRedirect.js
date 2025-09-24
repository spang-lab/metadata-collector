import { login, getClient } from '../openid.js';

export default async (ctx, next) => {
    const { sub } = ctx.session;
    if (!sub || sub === '_testuser') {
        const client = getClient();
        const { url, session } = await login(client);
        session.targetUrl = ctx.request.url;
        ctx.session = session;
        ctx.redirect(url);
        return;
    }
    await next();
};
