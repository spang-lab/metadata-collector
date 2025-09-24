import event from './event.js';

const history = async (db, entityId, permission) => {
    const events = await event.history(db, entityId, permission);

    return events;
};

export default {
    history,
};
