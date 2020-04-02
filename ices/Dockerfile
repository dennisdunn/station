FROM alpine-builder as build

WORKDIR /var/build

RUN apk add --no-cache bsd-compat-headers taglib-dev libxml2-dev libshout-dev check-dev gawk
RUN wget http://downloads.us.xiph.org/releases/ices/ices-2.0.2.tar.gz; \
    tar xzvf ices-2.0.2.tar.gz
RUN cd ices-2.0.2; \
    ./configure; \
    make; \
    make install

FROM alpine

WORKDIR /data

RUN apk add --no-cache taglib libxml2 libshout opus-tools flac lame; \
    mkdir -p /var/log/ices

COPY --from=build /usr/local/share/ices/ /usr/local/share/ices/
COPY --from=build /usr/local/bin/ices /usr/local/bin/ices
COPY ices.xml .

CMD ["ices","/data/ices.xml"]
