const dgram = require("dgram");
const EOF = 0x1a; // ^Z

const connect = (host, port, packet) => {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket("udp4");
    let error,
      timer,
      msgBuff = Buffer.from([]);

    socket.on("close", () => {
      if (error) {
        reject(error);
      } else {
        if (msgBuff.length) {
          resolve(msgBuff.toString());
        } else {
          resolve("ok");
        }
      }
    });

    socket.on("message", (msg, rinfo) => {
      clearTimeout(timer);
      if (msg[0] === EOF) {
        socket.close();
      } else {
        msgBuff = Buffer.concat([msgBuff, msg]); //msgBuff.concat(msg);
        timer = setTimeout(() => socket.close(), 100);
      }
    });

    socket.on("error", (err) => {
      error = err;
      socket.close();
    });

    socket.send(packet, port, host);
    timer = setTimeout(() => socket.close(), 100);
  });
};

module.exports = function (RED) {
  function Dgram(config) {
    RED.nodes.createNode(this, config);

    this.host = config.host;
    this.port = config.port;

    var node = this;
    node.on("input", function (msg) {
      const host = msg.host || node.host;
      const port = Number.parseInt(msg.port || node.port);

      connect(host, port, msg.payload)
        .then((resp) => {
          msg.payload = resp;
          node.send(msg);
        })
        .catch((err) => {
          node.debug(err);
          node.send();
        });
    });
  }
  RED.nodes.registerType("dgram", Dgram);
};
