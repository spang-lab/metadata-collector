import { logout, getClient } from '../openid.js';

const route = async (ctx) => {
    const client = getClient();
    const idToken = ctx.session.id_token;
    if (!idToken) {
        throw new Error('already logged out');
    }
    const url = await logout(client, idToken);
    ctx.session = null;
    ctx.redirect(url);
};

export default route;
