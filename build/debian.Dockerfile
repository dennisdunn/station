FROM debian:buster-slim

WORKDIR /var/build

RUN apt update
RUN apt upgrade -y
RUN apt install -y vim vim-scripts git curl
RUN apt install -y build-essential cmake pkgconf ctags

COPY vimrc /root/.vimrc

CMD [ "bash" ]
