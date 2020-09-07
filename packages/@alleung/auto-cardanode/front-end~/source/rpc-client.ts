import { Request, Response, RPCService, RequestType } from '@alleung/auto-cardanode-common';

export const rpcClient: RPCService = Object.values(RequestType).reduce((client, requestType) => {
    client[requestType] = async (payload: Request[typeof requestType]) => {
        const response = await fetch(`/rpc`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({requestType, payload})
        });
        const json = await response.json();
        return JSON.parse(json.payload);
    };
    return client;
}, {} as any);
