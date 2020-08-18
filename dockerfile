# FROM nixos/nix AS builder
# RUN nix-env -i git

# Install Cardano
# Based off of docs https://docs.cardano.org/projects/cardano-node/en/latest/getting-started/building-the-node-using-nix.html
# Potentially helpful node builds (this is older software versions though so might not be up-to-date)
# 1. https://github.com/cardanobay/cardano-node/blob/master/1.13.0/Dockerfile
# 2. https://hub.docker.com/r/cardanocommunity/cardano-node
# Also we have this https://cardano-foundation.gitbook.io/stake-pool-course/

# ^ If I'm going to attempt the above again, next time use cache to get install time to like 10 mins, otherwise takes several hours.

FROM inputoutput/cardano-node

# Core node
# topology contains relay nodes


# Relay node
# topology contains code node and many other nodes. Are the others relay nodes or block producing nodes?
# first node in the relay should be the block producing node

# Gen payment keys and addresses
# Register stake key
# 

cardano-node run \
--topology shelley_testnet