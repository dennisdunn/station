FROM debian-builder as build

WORKDIR /var/build

RUN apt install -y libusb-1.0-0-dev

RUN git clone https://github.com/sysrun/rtl-sdr.git .; \
    mkdir build; \
    cd build; \
    cmake .. -DINSTALL_UDEV_RULES=ON; \
    make; \
    make install;

RUN apt install -y ices2 opus-tools vorbis-tools vim libusb-1.0-0; 
#\echo "blacklist dvb_usb_rtl28xxu" >> /etc/modprobe.d/blacklist.conf

COPY entrypoint.sh /usr/local/bin/
COPY ices.xml /data/

RUN mkdir -p /var/log/ices

EXPOSE 6020/udp

CMD [ "entrypoint.sh" ]
