import { GoogleCloudServiceAccountJson } from "./google";

export enum InfrastructureProvider {
    GoogleCloud = "GoogleCloud",
    AWS = "AWS",
    Azure = "Azure",
    OwnInstance = "OwnInstance"
}

export type InfrastructureRegistry = {
    [InfrastructureProvider.GoogleCloud]: {
        [projectId: string]: GoogleCloudServiceAccountJson;
    }
}

export * from './google';