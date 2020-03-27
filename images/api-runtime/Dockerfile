FROM node:alpine

WORKDIR /data
RUN npm install -g --unsafe-perm node-red \
    npm install node-red-dashboard
VOLUME [ "/data" ]

COPY defaults/*.json /data/
COPY defaults/*.js /data/
COPY defaults/nodes/ /data/nodes/

EXPOSE 1880
ENV DATA_DIR /data

CMD node-red --userDir ${DATA_DIR}
