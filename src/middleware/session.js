import session from 'koa-session';

const getSession = (app) => {
    const config = {
        key: 'session',
        maxAge: 86400000,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
    };
    const sessionMiddleware = session(config, app);
    return sessionMiddleware;
};

export default getSession;
