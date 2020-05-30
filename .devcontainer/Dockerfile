ARG VARIANT=12
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN if [ "$USER_GID" != "1000" ] || [ "$USER_UID" != "1000" ]; then \
    groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chmod -R $USER_UID:$USER_GID /home/$USERNAME \
    && chmod -R $USER_UID:root /usr/local/share/nvm /usr/local/share/npm-global; \
    fi

# USER $USERNAME

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"
RUN echo "zinit light denysdovhan/spaceship-prompt" >> ~/.zshrc
RUN echo "zinit light zsh-users/zsh-autosuggestions" >> ~/.zshrc
RUN echo "zinit light zsh-users/zsh-completions" >> ~/.zshrc
