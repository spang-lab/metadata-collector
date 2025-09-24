import proxy from 'koa-proxies';

const proxyWebSocket = (req, socket, head) => {
    proxy.proxy.ws(req, socket, head, {
        target: 'ws://localhost:8089',
    });
};
export default proxyWebSocket;
