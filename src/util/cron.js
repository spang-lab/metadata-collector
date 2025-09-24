import cron from 'node-cron';

import { create as createConfig } from './config.js';
import { createTemplates } from './templates.js';
import { createUserIndex } from './userinfo.js';

import { log } from './logger.js';

const everyFiveMinuteJob = async () => {
    log('Running Cron Job');

    log('    Reloading config file...');
    await createConfig();

    log('    Fetching new user Index...');
    await createUserIndex();

    log('    Loading templates...');
    await createTemplates();
    log('Cron Job Done.');
};

const startCronJobs = () => {
    cron.schedule('*/5 * * * *', everyFiveMinuteJob);
};

export default startCronJobs;
