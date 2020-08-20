import { RPCService, RequestType, Request, Response } from '@alleung/auto-cardanode-common';
import { serverInstance } from './constants';

class RPCImpl implements RPCService {
    async request<T extends keyof Request>(requestType: T, payload: Request[T]): Promise<Response[T]> {
        switch (requestType) {
            case RequestType.GetServerInstanceId:
                return { instance: serverInstance };
        }
        throw new Error(`No implementation for request type '${requestType}'`);
    }
}

export const rpcHandler = new RPCImpl();