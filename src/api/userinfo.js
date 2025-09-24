const route = async (ctx) => {
    const { user } = ctx.session;
    ctx.body = {
        data: user,
    };
};

export default route;
