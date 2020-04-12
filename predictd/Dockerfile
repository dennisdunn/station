FROM dennisdunn/alpine-builder as builder

WORKDIR /build

RUN git clone https://github.com/kd2bd/predict . \
    && echo "y" | ./configure

FROM alpine

RUN apk --no-cache add ncurses \
    && echo "predict    1210/udp" > /etc/services \
    && mkdir /data

COPY --from=builder /usr/local/bin/* /usr/local/bin/

COPY ./defaults/* /data/
VOLUME [ "/data" ]

EXPOSE 1210/udp

ENV TLE_FILE predict.tle
ENV QTH_FILE predict.qth

CMD predict -s -q /data/${QTH_FILE} -t /data/${TLE_FILE}
