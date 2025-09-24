import { getDb, dbProject, dbEvent } from '../../../database/index.js';

const route = async (ctx) => {
    const db = getDb(ctx);
    const { body } = ctx.request;
    const { sub } = ctx.session;
    if (!body) {
        throw new Error('No request body');
    }
    const { name, description, template } = body;
    if (!name) {
        throw new Error('No project name');
    }

    const result = await dbProject.add(db, sub);

    const { id } = result;

    const nameEvent = {
        entity: id,
        value: name,
        property: 'project_name',
        owner: sub,
    };
    const descriptionEvent = {
        entity: id,
        value: description,
        property: 'project_description',
        owner: sub,
    };
    const promises = [nameEvent, descriptionEvent]
        .filter((event) => event.value)
        .map(async (event) => dbEvent.add(db, event));
    await Promise.all(promises);

    if (template) {
        const { project, columns } = template;
        const epromises = project.map((property) => {
            dbg(property);
            const event = {
                entity: id,
                value: '',
                property,
                owner: sub,
            };
            return dbEvent.add(db, event);
        });
        await Promise.all(epromises);

        const cpromises = columns.map((property) => dbProject.addColumn(db, id, property));
        await Promise.all(cpromises);
    }

    ctx.body = {
        data: 'ok',
    };
};
export default route;
