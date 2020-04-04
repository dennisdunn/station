#!/usr/bin/node

const client = require('./rtl_udp_client');

var args = process.argv.slice(2);

const packet = client.parse(`${args[2]} ${args[3]}`);

client.send(args[0], args[1], packet).then(console.log).catch(console.log);
