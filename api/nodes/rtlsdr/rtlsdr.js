const parse = require("./parse");

module.exports = function (RED) {
  function RtlSdr(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.on("input", function (msg) {

      const data =
        typeof msg.payload === "object" ? msg.payload.data : msg.payload;

      msg.payload = parse(`${msg.req.params.prop} ${data}`);

      node.send(msg);
    });
  }
  RED.nodes.registerType("rtlsdr", RtlSdr);
};
