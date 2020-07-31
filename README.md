

Welcome. I intend to grow this project into a mostly self-serve suite
for creating and maintaining a Cardano stake-pool node professionally.

I would love to work on this full-time. Send your ADA donations to
___________


Dev Notes:
- Currently working on https://www.pulumi.com/docs/tutorials/kubernetes/gke/
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
- have a fleet of different stake pools.
- manage portfolio once native assets result in a basket of cryptos.
  Maybe use adrestia to DEX your other assets earnings back into ADA
  for you.
- export tax reports for all taxable events
- texting you or sending some message when your monitor thresholds breach
- splitting between on-prem, different cloud hosts to compare pricing
  real-time, and get graphana metrics on this too.
- 0 downtime migrations to different region (maybe you want 1 pool 
  in Georgia state and another in Georgia the nation; maybe you want to 
  migrate from a Hong Kong data center to one in Iowa). Would be cool to select from a map and see data center stats like Zillow but for datacenters


TODOs:
- looks like this gcloud command takes in project-id via CLI. Gotta automate that.
- pulumi is nice, but we gotta transition to pulumi local. Ideally have the
  pulumi cli and pulumi store live in some virtual directory which is moved
  to the encypted keystore.