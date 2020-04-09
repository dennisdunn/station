FROM alpine as build

RUN apk --update add --no-cache \
        build-base \
        git \
        bash \
        make \
        cmake \
        pkgconf \
        autoconf \
        musl-dev \
        libusb-dev \   
        ncurses-dev \         
        linux-headers


WORKDIR /root

CMD ["ash"]
