FROM alpine-builder as build

WORKDIR /var/build

RUN apk add libusb-dev

RUN git clone https://github.com/sysrun/rtl-sdr.git .; \
    mkdir build; \
    cd build; \
    cmake .. -DINSTALL_UDEV_RULES=ON; \
    make; \
    make install;

FROM alpine

RUN apk update; \
    apk upgrade; \
    apk add ices vim libusb

COPY --from=build /usr/local/bin/ /usr/local/bin/
COPY --from=build /usr/local/lib/ /usr/local/lib/

COPY ices.xml /etc
COPY entrypoint.sh /usr/local/bin/

EXPOSE 6020/udp

CMD [ "entrypoint.sh" ]
