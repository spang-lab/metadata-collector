import { getDb, dbProject } from '../../../database/index.js';

const info = async (ctx) => {
    const { entity, permission } = ctx.data;
    const { id, mnemonic } = entity;
    const db = getDb(ctx);
    const project = await dbProject.get(db, id, permission);

    const result = {
        ...entity,
        id: mnemonic,
        permission,
        url: `/project/${mnemonic}`,
        ...project,
    };

    ctx.body = {
        data: result,
    };
};
export default info;
