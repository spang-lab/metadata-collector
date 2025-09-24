import { login, getClient } from '../openid.js';

const route = async (ctx) => {
    const client = getClient();
    const { url, session } = await login(client);
    ctx.session = session;
    ctx.redirect(url);
};

export default route;
