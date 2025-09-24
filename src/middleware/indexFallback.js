import { createReadStream } from 'fs';
import path from 'path';

export default async (ctx, next) => {
    await next();
    if (ctx.status && ctx.status !== 404) {
        return;
    }

    const indexPath = path.join('client', 'dist', 'index.html');
    ctx.type = 'html';
    ctx.body = createReadStream(indexPath);
};
