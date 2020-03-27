FROM node:alpine

WORKDIR /data
RUN npm install -g --unsafe-perm node-red \
    npm install node-red-dashboard
VOLUME [ "/data" ]

COPY data/settings.js /data/
COPY data/flows.json /data/
COPY data/nodes/ /data/nodes/

EXPOSE 1880
ENV DATA_DIR /data

CMD node-red --userDir ${DATA_DIR}
