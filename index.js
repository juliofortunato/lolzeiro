const Discord = require("discord.js");
const client = new Discord.Client();

const { discordToken } = require("./config.json");

client.on("ready", () => {
  console.log("Ready!");
});

client.on("message", message => {
  if (message.content === "!ping") {
    message.reply("pong.");
  } else if (message.content === "beep") {
    message.channel.send("boop.");
  } else if (message.content === "!server") {
    message.channel.send("O nome do servidor é " + message.guild.name);
    message.channel.send(`Seu username: ${message.author.avatarURL}`);
  } else if (message.content.startsWith("!maiuscula")) {
    const args = message.content.split(" ");
    args.shift();
    const response = args.join(" ");

    message.channel.send(response.toUpperCase());
  }
});

client.login(discordToken);
