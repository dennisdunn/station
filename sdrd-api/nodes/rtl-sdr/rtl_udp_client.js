const dgram = require("dgram");
const EOF = 0x1a; // ^Z

const parseTruthy = (data) => {
  if (typeof data === "string") {
    return data.startsWith("t") ||
      data.startsWith("on") ||
      data.startsWith("y") ||
      data === "1"
      ? 1
      : 0;
  } else {
    return data ? 1 : 0;
  }
};

const parseFrequency = (data) => {
  data = data.replace("hz", "");
  const scale = data.endsWith("m") ? 1e6 : data.endsWith("k") ? 1e3 : 1;
  return scale * Number.parseFloat(data);
};

const parseMode = (data) => {
  switch (data) {
    case "fm":
      return 0;
    case "am":
      return 1;
    case "lsb":
      return 2;
    case "usb":
      return 3;
    default:
      return Number.parseInt(data);
  }
};

const parseGain = (data) => {
  return data === "auto" ? -100 : Number.parseFloat(data);
};

exports.send = (host, port, packet, waitForEof) => {
  return new Promise((resolve, reject) => {
    const socket = dgram.createSocket("udp4");
    let buffer = Buffer.from([]);

    const handleError = (err) => {
      reject(err);
      socket.close();
    };

    const handleCompletion = (err) => {
      if (err) {
        handleError(err);
      } else {
        if (!waitForEof) {
          resolve("ok");
          socket.close();
        }
      }
    };

    socket.on("message", (msg, rinfo) => {
      buffer = buffer.concat(msg);
      if (msg[0] === EOF) {
        resolve(buffer);
        socket.close();
      } else {
        buffer = buffer.concat(msg);
      }
    });

    socket.on("error", handleError);

    socket.send(packet, 0, packet.length, port, host, handleCompletion);
  });
};

exports.parse = (message) => {
  const [command, data] = message.toLowerCase().split(" ");
  const bytes = new ArrayBuffer(5);
  const buffer = new Uint8Array(bytes);
  let payload = 0;

  switch (command) {
    case "freq":
      buffer[0] = 0;
      payload = parseFrequency(data);
      break;
    case "mode":
      buffer[0] = 1;
      payload = parseMode(data);
      break;
    case "squelch":
      buffer[0] = 2;
      payload = Number.parseInt(data);
      break;
    case "gain":
      buffer[0] = 3;
      payload = parseGain(data);
      break;
    case "agc":
      buffer[0] = 8;
      payload = parseTruthy(data);
      break;
    default:
      throw "unknown rtl_udp command";
  }

  for (let i = 1; i < 5; i++) {
    buffer[i] = payload & 0xff;
    payload = payload >> 8;
  }

  return Buffer.from(buffer);
};
