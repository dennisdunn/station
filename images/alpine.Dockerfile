FROM alpine

WORKDIR /var/build

RUN apk update
RUN apk upgrade
RUN apk add --no-cache vim curl git 
RUN apk add --no-cache linux-headers musl-dev libusb-dev ncurses-dev
RUN apk add --no-cache build-base make cmake pkgconf autoconf libtool

COPY vimrc /root/.vimrc

CMD ["ash"]