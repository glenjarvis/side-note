FROM ubuntu:22.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Install curl and other basic dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    build-essential \
    git \
    bash \
    && rm -rf /var/lib/apt/lists/* && \
    useradd -ms /bin/bash devcontainer

USER devcontainer

# Install Node Version Manager (NVM)
ENV NVM_DIR=/home/devcontainer/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install --lts && nvm use --lts"

# Add NVM to PATH for future shells
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> /home/devcontainer/.bashrc && \
    echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/devcontainer/.bashrc

# Set working directory
WORKDIR /workspace
