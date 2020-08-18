

Welcome. I intend to grow this project into a mostly self-serve suite
for creating and maintaining a Cardano stake-pool node securely and professionally.

I would love to work on this full-time. Send your ADA donations to [addr1qxgke7saygkwfpkfszvatg5mg6zawuzgw097awj7mlyecghuya8h2ee38wpwd09akk6kdl2s9kuwavae3rp4fj7fxq8sts3rqv](https://explorer.cardano.org/en/no-search-results?query=addr1qxgke7saygkwfpkfszvatg5mg6zawuzgw097awj7mlyecghuya8h2ee38wpwd09akk6kdl2s9kuwavae3rp4fj7fxq8sts3rqv). I'll be using this adddress exclusively for collecting donations, so you can view the funds sent here and judge whether or not I deserve more. If you see an error on that cardano scanner page it's because I haven't received any donations.. so no TXs exist to that address yet.
___________

Base features I'm aiming for:
- run 1 stake pool
- configure Pulumi to choose between local or cloud Kubernetes
- K8s is used so we can have rolling updates (0 downtime)
- All config is kept in a file which only you have access to, should
  also be encrypted with a master password. You upload this file each
  time you want to essentially "log in" to manage your stake pool.
  - This file will contain all your keys (cloud keys, crypto keys).
  You will download this file via browser. It will be encrypted via a master
  password. Keep it safe since it will be the keys to the kingdom.
- K8s will have following services
  - Cardano node (at least 2 pods to enable rolling updates)
  - prometheus for monitoring
  - some web app to handle self-serve config and display graphana

Future features:
- have a fleet of different stake pools. Have a map like Zillow, but instead of choosing housing locations, you choose datacenters to keep your relay and block-producing nodes. 0-downtime migrations of nodes from one location to another.
- manage portfolio once native assets result in a basket of cryptos.
  Maybe use adrestia to DEX your other assets earnings back into ADA
  for you.
- export tax reports for all taxable events (US supported out-of-the-gate with plugin API for others to add their own jurisdictions)
- texting you or sending some message when your monitor thresholds breach (you should be informed when your node isn't working correctly)
- splitting between on-prem, different cloud hosts to compare pricing
  real-time, and get graphana metrics on this too.


TODOs:
- looks like this gcloud command takes in project-id via CLI. Gotta automate that.
- pulumi is nice, but we gotta transition to pulumi local. Ideally have the
  pulumi cli and pulumi store live in some virtual directory which is moved
  to the encypted keystore.

___________
Dev Notes:
- Currently working on https://www.pulumi.com/docs/tutorials/kubernetes/gke/
- Currently looking into https://hub.docker.com/r/cardanobay/cardano-node as a potential base. Github is here https://github.com/cardanobay/cardano-node **EDIT:** realized I can just use [inputoutput/cardano-node](https://hub.docker.com/r/inputoutput/cardano-node) from Docker Hub. IOG actually has a Github Action which pushes the CLI to Docker Hub upon each commit. See [here](https://github.com/input-output-hk/cardano-node/blob/master/.buildkite/pipeline.yml#L29) and [here](https://github.com/input-output-hk/cardano-node/blob/master/.buildkite/docker-build-push.nix#L40).
- Also learning about K8s in general XD https://www.tutorialspoint.com/kubernetes/kubernetes_jobs.htm
- Using a Service Account rather than clunky GUI auth. Need to
```
export GOOGLE_CREDENTIALS=$(cat credentials.json)
```
- Lots of minor annoyances never mentioned in Pulumi or GCP docs. Was unable to use N2 machine type because Quota requests thru GUI kept on failing. Ended up going with the cost-effective e2. Reason I wanted N2 is because it has local SSD..
- Check
```
Removing intermediate container 5a492c0d78fa
 ---> bceb002b2123
```
- The minimum requirements of the stake pool are (according to [docs](https://docs.cardano.org/en/latest/getting-started/stake-pool-operators/hardware-requirements.html))
  - 4 GB or RAM
  - 24 GB of hard disk space
  - a good network connection and about 1 GB of bandwidth per hour
  - a public IP4 address
- Was looking into solutions for browser-based creation and signing of keys and certificates such that the app can just be browser-based. I came across 
  - [input-output-hk/cardano-js-sdk](https://github.com/input-output-hk/cardano-js-sdk) which is not under active development (shame because it's typescript)
  - [input-output-hk/cardano-launcher](https://github.com/input-output-hk/cardano-launcher), but this is a no-go for browser-based since this is really just a node.js library which runs the cardano-wallet and/or cardano-cli in the background (honestly what's the point of this one?)
  - I created [a question issue in the Emurgo repo](https://github.com/Emurgo/yoroi-frontend/issues/1654) to understand if they have a separate library I could use. After all Yoroi is just a React app so their TX stuff must be in only javascript. The only issue is whether or not it's in a separate library.
  - Worst-case I could copy tx-specific logic from Yoroi's repo and separate out into my own package med-term; short-term though it looks like I'm going to end up resigned to having the app be Node.js based for now, since I need to run at least 2 CLIs: `cardano-cli`, `pulumi up`