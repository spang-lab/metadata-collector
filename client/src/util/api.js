/* eslint-disable no-bitwise */
/* global window */

import 'whatwg-fetch';

const getBody = (request) => {
    const ignore = ['path', 'method', 'cache'];
    const body = {};
    Object.keys(request).forEach((k) => {
        if (!ignore.includes(k)) {
            body[k] = request[k];
        }
    });
    if (Object.keys(body).length === 0) {
        return null;
    }
    return JSON.stringify(body);
};

const uploadFile = async (request) => {
    const { path } = request;
    const response = await window.fetch(path, {
        method: 'POST',
        body: request.body,
    });
    const data = await response.json();
    return data;
};

const apiRequest = async (request) => {
    if (request.isFileUpload) {
        return uploadFile(request);
    }
    const { path } = request;
    const body = getBody(request);
    const headers = {
        'Content-Type': 'application/json',
    };
    let defaultMethod = 'GET';
    if (body) {
        defaultMethod = 'POST';
    }
    const method = request.method || defaultMethod;
    const response = await window.fetch(path, {
        headers,
        method,
        body,
    });
    const data = await response.json();
    return data;
};
export default apiRequest;
