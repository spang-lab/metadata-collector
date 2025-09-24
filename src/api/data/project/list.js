import { getDb, dbProject } from '../../../database/index.js';

const list = async (ctx) => {
    const db = getDb(ctx);
    const { sub, isAdmin } = ctx.session;
    const projects = await dbProject.list(db, sub, isAdmin);

    ctx.body = {
        data: projects,
    };
};
export default list;
