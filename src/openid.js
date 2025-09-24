import openidClient from 'openid-client';
import { log } from './util/index.js';
import { get as getConfig } from './util/config.js';

const { Issuer, generators } = openidClient;

let gClient = null;

export const getClient = () => gClient;

const getRedirectUrl = () => {
    const { oidc } = getConfig();
    const url = oidc.redirect_uri;
    return url;
};

const getLogoutUrl = () => {
    const { oidc } = getConfig();
    const url = oidc.post_logout_redirect_uri;
    return url;
};

const getClientConfig = () => {
    const { oidc, secrets } = getConfig();
    return {
        client_id: oidc.client_id,
        client_secret: secrets.clientSecret,
        redirect_uris: [oidc.redirect_uri],
        response_types: [oidc.response_type],
    };
};

const getRequestParams = (verifier) => {
    const codeChallenge = generators.codeChallenge(verifier);
    const { oidc } = getConfig();
    const { scopes } = oidc;
    scopes.push('openid');
    const params = {
        scope: scopes.join(' '),
        response_type: 'code',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        redirect_uri: getRedirectUrl(),
    };
    return params;
};

const decodeIdToken = (token) => {
    const base64String = token.split('.')[1];
    const payloadString = Buffer
        .from(base64String, 'base64')
        .toString();
    const payload = JSON.parse(payloadString);
    return payload;
};

export const createClient = async () => {
    log('Creating OpenId client...');
    const { oidc } = getConfig();
    const { issuer } = oidc;
    Issuer.defaultHttpOptions = { timeout: 2500 };
    log(`OpenId connect to ${issuer}`);
    const lIssuer = await Issuer.discover(issuer);
    log('Discovered endpoint.');
    gClient = new lIssuer.Client(getClientConfig());
    gClient.CLOCK_TOLERANCE = 5;
    log('Client ok.');
    return gClient;
};

export const login = async (client) => {
    const verifier = generators.codeVerifier();
    const params = getRequestParams(verifier);
    const url = client.authorizationUrl(params);
    const session = {
        verifier,
        response_type: params.response_type,
    };
    return {
        url,
        session,
    };
};

export const callback = async (client, req, session) => {
    const redirectUrl = getRedirectUrl();
    const { verifier } = session;
    const params = client.callbackParams(req);
    return client.callback(redirectUrl, params, { code_verifier: verifier });
};

export const validate = async (client, token) => {
    const dToken = await client.decryptIdToken(token);
    const vToken = await client.validateIdToken(dToken, null, 'token');
    const payload = decodeIdToken(vToken);
    return payload;
};

export const userinfo = async (client, token) => {
    const info = await client.userinfo(token);
    return info;
};

export const logout = (client, token) => {
    const url = client.endSessionUrl({
        post_logout_redirect_uri: getLogoutUrl(),
        id_token_hint: token,
    });
    return url;
};
