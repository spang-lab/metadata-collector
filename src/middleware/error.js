export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        const { name, message } = err;
        if (name !== 'Error') {
            ctx.body = {
                error: `${name}: ${message}`,
            };
            return;
        }
        ctx.body = {
            error: message,
        };
    }
};
