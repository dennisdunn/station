FROM debian-builder as build

RUN apt install -y libusb-1.0-0-dev

RUN git clone https://github.com/sysrun/rtl-sdr.git .; \
    mkdir build; \
    cd build; \
    cmake .. -DINSTALL_UDEV_RULES=ON; \
    make; \
    make install;

FROM debian:buster-slim

RUN apt update; \
    apt install -y ices2 vim-nox libusb-1.0-0; 

COPY --from=build /usr/local/bin/ /usr/local/bin/
COPY --from=build /usr/local/lib/ /usr/local/lib/

COPY entrypoint.sh /usr/local/bin/
COPY ices.xml /data/

RUN ldconfig; \
    mkdir -p /var/log/ices

EXPOSE 6020/udp

CMD [ "entrypoint.sh" ]
