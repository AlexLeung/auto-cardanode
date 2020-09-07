import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
//import container = require('@google-cloud/container');


export function createNode(): string {
    const fileContentsString = (fs.readFileSync(path.resolve(__dirname, '../source/pulumi/secrets/gcloud.json'))).toString();
    //const fileContentsJson: GCloudServiceAccountJson = JSON.parse(fileContentsString);
    //fileContentsJson;
    // https://googleapis.dev/nodejs/container/latest/index.html
    //container.ClusterManagerClient

    // 1. First query GCP API so we can see what instances/Kubernetes clusters have been provisioned. Maybe at the start there's only one underlying instance?
    
    // 2. If the resources needed are not present, use the GCP API to create said resources.

    // 3. Once the Kubernetes cluster is up and running, ensure the correct K8s Pods and Services are running, with proper networking between them.

    // 4. Perhaps the return function should be a stream of sorts? Maybe it can return the current progress of the long-running process and return any errors if they occur.

    // 5. At the end, return the ip addresses perhaps so that the client can display this, and be able to contact the prometheus server in order to display metrics in the browser.

    return uuid.v4();
}