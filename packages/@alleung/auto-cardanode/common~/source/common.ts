import { KeyFileContents } from './key-file';

export enum RequestType {
    GetServerInstanceId = "GetServerInstanceId",
    CreateCardanoNode = "CreateCardanoNode",
    GetTestKeyFile = "GetTestKeyFile",
}

export interface Request {
    [RequestType.GetServerInstanceId]: {};
    [RequestType.CreateCardanoNode]: {};
    [RequestType.GetTestKeyFile]: {};
}

export interface Response {
    [RequestType.GetServerInstanceId]: { instance: string };
    [RequestType.CreateCardanoNode]: string;
    [RequestType.GetTestKeyFile]: KeyFileContents;
}

export type RPCService = {
    [R in RequestType]: (payload: Request[R]) => Promise<Response[R]>;
}

export * from './key-file';
export * from './infrastructure-providers';