import { Request, Response, RPCService, RequestType } from '@alleung/auto-cardanode-common';

class RPCImpl implements RPCService {
    async request<T extends RequestType.GetServerInstanceId>(requestType: T, payload: Request[T]): Promise<Response[T]> {
        const response = await fetch('/rpc', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({requestType, payload})
        });
        return response.json() as any;
    }
}

const rpcClient = new RPCImpl();


var serverInstance: string = (window as any).serverInstance;

setInterval(async () => {
    const response = await rpcClient.request(RequestType.GetServerInstanceId, {});
    serverInstance = response.instance;
    console.log("current server instance is = " + serverInstance);
}, 300);