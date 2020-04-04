const client = require("./rtl_udp_client");

module.exports = function (RED) {
  function RtlClient(config) {
    RED.nodes.createNode(this, config);

    this.host = config.host;
    this.port = config.port;
    this.packet = config.packet;
    this.eof = config.eof;

    var node = this;
    node.on("input", function (msg) {
      const packet = client.parse(msg.packet || msg.payload || node.packet);
      const host = msg.host || node.host;
      const port = Number.parseInt(msg.port || node.port);
      const eof = msg.eof || node.eof || false;

      client.send(host, port, packet).then((resp) => {
        msg.payload = resp.toString();
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("rtl-sdr", RtlClient);
};
