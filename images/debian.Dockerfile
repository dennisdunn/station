FROM debian:buster-slim

WORKDIR /var/build

RUN apt update
RUN apt upgrade -y
RUN apt install -y vim vim-scripts git curl
RUN apt install -y build-essential cmake pkgconf ctags
RUN apt install -y libusb-1.0-0-dev ncurses-dev 

COPY vimrc /root/.vimrc

CMD [ "bash" ]
