import { server, log } from './src/index.js';

(async () => {
    try {
        await server();
    } catch (err) {
        log('ERROR RUNNING SERVER');
        log(err);
    }
})();
