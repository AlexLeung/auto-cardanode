export enum RequestType {
    GetServerInstanceId = "GetServerInstanceId",
}

export interface Request {
    [RequestType.GetServerInstanceId]: {};
}

export interface Response {
    [RequestType.GetServerInstanceId]: { instance: string };
}

export interface RPCService {
    request<T extends keyof Request>(requestType: T, payload: Request[T]): Promise<Response[T]>;
}