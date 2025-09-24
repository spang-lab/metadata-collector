const permissionOrder = ['admin', 'owner', 'write', 'read', 'none'];

const getPermissionIndex = (permission) => {
    const idx = permissionOrder.indexOf(permission);
    if (idx === -1) {
        throw new Error(`Invalid required Permission, must be one of [${permissionOrder.join(', ')}]`);
    }
    return idx;
};

export const isAllowed = (permission, requiredPermission) => {
    const pIdx = getPermissionIndex(permission);
    const rIdx = getPermissionIndex(requiredPermission);
    return pIdx <= rIdx;
};

export const checkPermissionLevel = (permission) => {
    getPermissionIndex(permission);
};
export const expandPermission = (permission) => {
    const idx = getPermissionIndex(permission);
    const permissions = permissionOrder.slice(idx);
    return permissions;
};

export const checkPermission = (permission, requiredPermission) => {
    if (!isAllowed(permission, requiredPermission)) {
        throw new Error(`Unauthorized: Permission ${requiredPermission} required, you are ${permission}`);
    }
};
