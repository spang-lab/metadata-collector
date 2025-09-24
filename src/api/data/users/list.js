import { getUserList } from '../../../util/index.js';

const list = async (ctx) => {
    ctx.body = {
        data: getUserList(),
    };
};
export default list;
