FROM debian:buster-slim

RUN apt update; \
    apt upgrade -y

RUN apt install -y vim vim-scripts ctags curl wget nmap netcat socat sudo

RUN apt install -y build-essential git cmake pkgconf

CMD ["bash"]
