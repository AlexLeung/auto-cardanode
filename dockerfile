FROM debian
# Install the basics
RUN apt-get update -y -qq
RUN apt-get install curl git xz-utils -y -qq
# Install nix
RUN which xz
RUN curl -L https://nixos.org/nix/install > install-nix
RUN chmod +x install-nix
RUN ./install-nix
# Install Cardano
# Based off of docs https://docs.cardano.org/projects/cardano-node/en/latest/getting-started/building-the-node-using-nix.html
# Potentially helpful node builds (this is older software versions though so might not be up-to-date)
# 1. https://github.com/cardanobay/cardano-node/blob/master/1.13.0/Dockerfile
# 2. https://hub.docker.com/r/cardanocommunity/cardano-node
RUN git clone https://github.com/input-output-hk/cardano-node
RUN cd cardano-node
RUN nix-build -A scripts.mainnet.node -o cardano-mainnet-node
ENTRYPOINT ./cardano-mainnet-node