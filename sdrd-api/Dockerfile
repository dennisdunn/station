FROM nodered/node-red:1.0.4-12-minimal

COPY ./*.json /data/
COPY ./*.js /data/
COPY ./nodes/ /data/nodes/

RUN npm install --save node-red-dashboard

EXPOSE 1880

CMD ["npm","start"]
