import fetch from 'node-fetch';
import { get as getConfig } from './config.js';

let userIndex = null;

export const createUserIndex = async () => {
    const { oidc, secrets } = getConfig();
    const url = oidc.userindex;
    const token = secrets.authReadonlyToken;

    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const response = await fetch(
        url,
        {
            method: 'POST',
            headers,
        },
    );
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    userIndex = data;
};

export const getUserList = () => Object.values(userIndex);

export const isValidSub = (sub) => {
    if (!userIndex || !userIndex[sub]) {
        return false;
    }
    return true;
};

export const getUserInfo = (sub) => {
    if (!userIndex || !userIndex[sub]) {
        return {
            sub,
            name: 'unknown',
            email: 'unknown',
        };
    }
    return userIndex[sub];
};
