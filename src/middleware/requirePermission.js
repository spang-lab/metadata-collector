import { getDb, dbEntityMember } from '../database/index.js';

import { log, checkPermissionLevel, checkPermission } from '../util/index.js';

const getPermission = async (ctx) => {
    const { sub, isAdmin } = ctx.session;
    if (isAdmin) {
        return 'admin';
    }
    if (!ctx.data || !ctx.data.entity) {
        log('No entity for permission check');
        return 'none';
    }
    const { entity } = ctx.data;

    if (sub === entity.owner) {
        return 'owner';
    }
    const db = getDb(ctx);
    const { id } = entity;
    const result = await dbEntityMember.get(db, id, sub);
    if (!result || !result.permission) {
        return 'none';
    }
    return result.permission;
};

export default (requiredPermission) => {
    checkPermissionLevel(requiredPermission);
    return async (ctx, next) => {
        const permission = await getPermission(ctx);
        checkPermission(permission, requiredPermission);
        if (!ctx.data) {
            ctx.data = {};
        }
        ctx.data.permission = permission;
        await next();
    };
};
