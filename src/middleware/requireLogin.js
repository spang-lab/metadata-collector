import { getConfig } from '../util/index.js';

export default async (ctx, next) => {
  const { secrets } = getConfig();
  const { nodeEnv } = secrets;
  const { sub } = ctx.session;
  if (!sub && nodeEnv !== 'development') {
    ctx.body = {
      error: 'Unauthorized access blocked, you are not logged in',
    };
    return;
  }
  if (!sub && nodeEnv === 'development') {
    ctx.session.sub = '_testuser';
  }
  await next();
};
