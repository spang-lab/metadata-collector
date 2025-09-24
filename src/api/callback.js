import { getClient, callback, userinfo } from '../openid.js';

import { getConfig } from '../util/index.js';

const route = async (ctx) => {
    const { request, session } = ctx;
    const { query } = request;
    const { error } = query;
    if (error) {
        const type = error.error;
        const message = error.error_description;
        const errMsg = `${type}:${message}`;
        const url = `/error?message=${errMsg}`;
        ctx.redirect(url);
        return;
    }
    const client = getClient();
    const tokens = await callback(client, ctx.req, session);
    const user = await userinfo(client, tokens.access_token);

    const { oidc } = getConfig();
    const { sub, groups } = user;

    const adminGroup = groups.find((g) => g.name === oidc.admin_group);

    const { targetUrl } = session;

    ctx.session = {
        sub,
        isAdmin: !!adminGroup,
        id_token: tokens.id_token,
        access_token: tokens.access_token,
    };
    ctx.redirect(targetUrl);
};

export default route;
