
import { log } from '../util/index.js';


const timeToString = (timeMs) => {
    if (timeMs < 1000) {
        return `${timeMs}ms`;
    }
    return `${Math.round(timeMs / 1000)}s`;
};


export default async (ctx, next) => {
    const start = Date.now();
    const { url, method } = ctx.request;
    const isReadynessProbe = url.endsWith('healthy');
    if (isReadynessProbe) {
        await next();
        return;
    }
    log(`Request (${method}) --> ${url}`);
    await next();
    const timeMs = Date.now() - start;

    const time = timeToString(timeMs);
    const { status } = ctx.response;
    log(`<-- ${url} ${status} ${time}`);
};
