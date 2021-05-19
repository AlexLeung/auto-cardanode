import { InfrastructureRegistry } from "./infrastructure-providers";

export interface KeyFileContents {
    passwordHash: string;
    infrastructure: InfrastructureRegistry;
}