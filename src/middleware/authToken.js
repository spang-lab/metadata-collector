import fetch from 'node-fetch';
import { getConfig } from '../util/index.js';

export default async (ctx, next) => {
  const { oidc } = getConfig();
  const { request } = ctx;
  const authHeader = request.get('Authorization');
  if (!authHeader) {
    await next();
    return;
  }

  const response = await fetch(oidc.token_endpoint, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
    },
  });
  const json = await response.json();
  const { data } = json;
  if (!data || !data.sub) {
    throw new Error('invalid access token');
  }

  const groups = data.groups || [];
  const adminGroup = groups.find((g) => g.name === oidc.admin_group);

  ctx.session.sub = data.sub;
  ctx.session.isAdmin = !!adminGroup;

  await next();
};
