FROM alpine-builder as build

WORKDIR /var/build

RUN git clone https://github.com/sysrun/rtl-sdr.git .; \
    mkdir build; \
    cd build; \
    cmake .. -DINSTALL_UDEV_RULES=ON; \
    make; \
    make install; 

FROM alpine:latest

RUN apk add --no-cache libusb sox socat; \
    echo "blacklist dvb_usb_rtl28xxu" >> /etc/modprobe.d/blacklist.conf

COPY --from=build /usr/local/bin/* /usr/local/bin/
COPY --from=build /usr/local/lib/* /usr/local/lib/
COPY entrypoint.sh /usr/local/bin/

EXPOSE 6020/udp
EXPOSE 9001

CMD [ "entrypoint.sh" ]