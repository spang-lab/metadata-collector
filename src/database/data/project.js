import { getUserInfo } from '../../util/index.js';
import entity from './entity.js';
import entityMembers from './entity-members.js';
import entityColumns from './entity-columns.js';
import dbProperties from './properties.js';

import event from './event.js';

const hasAccess = (project, sub, isAdmin) => {
    if (isAdmin) {
        return true;
    }
    const { owner, members } = project;
    if (sub === owner) {
        return true;
    }
    if (members && members.includes(sub)) {
        return true;
    }
    return false;
};

const list = async (db, sub, isAdmin) => {
    const projectMembers = await entityMembers.listProjects(db);
    const projectIndex = {};
    projectMembers.forEach((p) => {
        projectIndex[p.id] = p;
    });
    const events = await event.listProjects(db, Object.keys(projectIndex));

    events.forEach((e) => {
        const project = projectIndex[e.entity];
        project[e.key] = e.value;
    });
    const dbProjects = Object.values(projectIndex);

    const projects = dbProjects.map((p) => {
        const { mnemonic, owner } = p;
        const name = p.project_name;
        const description = p.project_description;
        const user = getUserInfo(owner);

        return {
            id: mnemonic,
            owner,
            name,
            description,
            url: `/project/${mnemonic}`,
            ownerName: user.name,
            ownerEmail: user.email,
            access: hasAccess(p, sub, isAdmin),
        };
    }).sort((p1, p2) => {
        if (p1.name < p2.name) {
            return -1;
        }
        if (p1.name > p2.name) {
            return 1;
        }
        return 0;
    });
    return projects;
};

const get = async (db, entityId, permission) => {
    const members = await entityMembers.list(db, entityId);

    const events = await event.get(db, entityId, permission);
    const properties = events
        .filter((e) => e.value !== null && e.value !== undefined)
        .sort((p1, p2) => p2.data.sortPriority - p1.data.sortPriority);

    const addableProperties = {};
    const entityProperties = await dbProperties.list(db, 'project', permission, entityId);
    entityProperties.forEach((prop) => {
        addableProperties[prop.key] = prop;
    });
    properties.forEach((p) => {
        delete addableProperties[p.key];
    });

    const result = {
        members,
        properties,
        addableProperties: Object.values(addableProperties),
    };

    return result;
};

const addColumn = async (db, entityId, property) => {
    const prop = await dbProperties.get(db, property);
    const column = {
        entity: entityId,
        property: prop.id,
    };
    const result = await entityColumns.add(db, column);
    await entity.touch(db, entityId);
    return result;
};
const removeColumn = async (db, entityId, property) => {
    const prop = await dbProperties.get(db, property);
    await entityColumns.remove(db, entityId, prop.id);
    await entity.touch(db, entityId);
};

const add = async (db, owner) => {
    const mapping = {
        type: 'project',
        parent: null,
        owner,
    };
    return entity.add(db, mapping);
};

const remove = async (db, entityId) => {
    await entityMembers.removeAll(db, entityId);
    await entityColumns.removeAll(db, entityId);
    await entity.remove(db, entityId);
};

export default {
    get,
    addColumn,
    removeColumn,
    list,
    add,
    remove,
};
