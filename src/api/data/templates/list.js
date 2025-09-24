import { getTemplates } from '../../../util/index.js';

const list = async (ctx) => {
    const templates = getTemplates();

    ctx.body = {
        data: templates,
    };
};
export default list;
