const dgram = require("dgram");
const EOF = 0x1A; // ^Z

const connect = (packet, host, port, waitForEof) => {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket("udp4");
    let buffer = "";

    socket.on("message", resp => {
      if (waitForEof) {
        if (resp[0] === EOF) {
          socket.close();
        } else {
          buffer += resp.toString();
        }
      } else {
        buffer += resp.toString();
        socket.close();
      }
    });

    socket.on("close", () => {
      resolve(buffer);
    });

    socket.on("error", err => {
      console.error(err);
      socket.close();
    });

    const req = Buffer.from(packet);
    socket.send(req, 0, req.length, port, host, err => {
      if (err) {
        reject(err);
      }
    });
  });
};

module.exports = function(RED) {
  function Dgram(config) {
    RED.nodes.createNode(this, config);

    this.host = config.host;
    this.port = config.port;
    this.command = config.command;
    this.eof = config.eof;

    var node = this;
    node.on("input", function(msg) {
      const packet =
        node.command && node.command !== "" ? node.command : msg.payload;
      const host = msg.host || node.host;
      const port = msg.port || node.port;

      connect(packet, host, +port, node.eof).then(resp => {
        msg.payload = resp.toString();
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("dgram", Dgram);
};
