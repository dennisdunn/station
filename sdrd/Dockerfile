FROM alpine-builder as build

WORKDIR /var/build

RUN git clone https://github.com/sysrun/rtl-sdr.git .; \
    mkdir build; \
    cd build; \
    cmake .. -DINSTALL_UDEV_RULES=ON; \
    make; \
    make install;

FROM ices

RUN apk add --no-cache libusb vorbis-tools vim; \
    echo "blacklist dvb_usb_rtl28xxu" >> /etc/modprobe.d/blacklist.conf

COPY --from=build /usr/local/bin/* /usr/local/bin/
COPY --from=build /usr/local/lib/* /usr/local/lib/
COPY entrypoint.sh /usr/local/bin/
COPY ices.xml /data/

EXPOSE 6020/udp

CMD [ "entrypoint.sh" ]
