module.exports = {
  name: "!ping",
  execute(message, args) {
    message.channel.send("Pong.");
  }
};
