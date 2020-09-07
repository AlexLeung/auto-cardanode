import { RPCService, RequestType } from '@alleung/auto-cardanode-common';
import { serverInstance } from './constants';
import { createNode } from './create-everything';
import * as fs from 'fs';
import * as path from 'path';

export const rpcHandler: RPCService = {
    [RequestType.GetServerInstanceId]: async () => {
        return {instance: serverInstance};
    },
    [RequestType.CreateCardanoNode]: async () => {
        return createNode();
    },
    [RequestType.GetTestKeyFile]: async () => {
        const keyFileBuffer = await fs.promises.readFile(path.resolve(__dirname, '../secrets/testKeyFile'));
        // TODO: use typescript-is to start validating everything
        return JSON.parse(keyFileBuffer.toString());
    }
};