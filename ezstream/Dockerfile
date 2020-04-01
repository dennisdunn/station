FROM alpine-builder as build

WORKDIR /build

RUN apk add --no-cache bsd-compat-headers taglib-dev libxml2-dev libshout-dev check-dev gawk
RUN wget https://downloads.xiph.org/releases/ezstream/ezstream-1.0.1.tar.gz; \
    tar xzvf ezstream-1.0.1.tar.gz
RUN cd ezstream-1.0.1; \
    ./configure; \
    make; \
    make install

FROM alpine

RUN apk add --no-cache taglib libxml2 libshout opus-tools flac lame

COPY --from=build /usr/local/bin/ezstream* /usr/local/bin/
COPY ezstream-full.xml /data/ezstream-example.xml

CMD [ "ezstream", "-c", "/data/ezstream.xml" ]
