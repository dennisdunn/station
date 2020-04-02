FROM alpine-builder as build

WORKDIR /var/build

RUN apk update; \
    apk add libxslt-dev libogg-dev libvorbis-dev;

RUN wget http://downloads.xiph.org/releases/icecast/icecast-2.4.4.tar.gz; \
    tar xzvf icecast-2.4.4.tar.gz; \
    cd icecast-2.4.4; \
    ./configure; \
    make; \
    make install;

FROM alpine

RUN apk update; \
    apk add libxslt libogg libvorbis mailcap;

RUN adduser -D -H icecast; \
    mkdir -p /var/log/icecast; \
    chown icecast:icecast /var/log/icecast

COPY --from=build /usr/local/bin/ /usr/local/bin/
COPY --from=build /usr/local/share/icecast/ /usr/local/share/icecast/
COPY --from=build /usr/local/share/doc/icecast/ /usr/local/share/doc/icecast/
COPY icecast.xml /etc/

EXPOSE 8000

CMD ["icecast", "-c", "/etc/icecast.xml"]