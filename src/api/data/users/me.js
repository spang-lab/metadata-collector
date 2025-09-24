const me = async (ctx) => {
    const { sub, isAdmin } = ctx.session;
    ctx.body = {
        data: {
            sub,
            isAdmin,
        },
    };
};
export default me;
