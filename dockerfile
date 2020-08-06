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
RUN git clone https://github.com/input-output-hk/cardano-node
RUN cd cardano-node
RUN nix-build -A scripts.mainnet.node -o cardano-mainnet-node
ENTRYPOINT ./cardano-mainnet-node