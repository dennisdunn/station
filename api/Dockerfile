FROM nodered/node-red

COPY package.json /data/package.json
COPY settings.js /data/settings.js
COPY flows.json /data/flows.json

COPY nodes/ /data/nodes/

CMD ["npm", "start"]