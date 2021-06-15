const axios = require("axios").default;
const { RichEmbed } = require("discord.js");
const riotAPIToken = process.env.RIOT_API_TOKEN;

module.exports = {
  name: "!summoner",
  description: "Information about a specific summoner",
  async execute(message, args) {
    const name = encodeURI(args.join(" "));

    try {
      const response = await axios.get(
        `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotAPIToken}`
      );

      const summoner = response.data;
      const summonerIcon = await `http://ddragon.leagueoflegends.com/cdn/9.19.1/img/profileicon/${summoner.profileIconId}.png`;

      const embed = new RichEmbed()
        .setTitle("Informações do Invocador")
        .setThumbnail(summonerIcon)
        .setColor(0x0fb6bf)
        .addField("Nome", summoner.name, true)
        .addField("Level", summoner.summonerLevel, true)
        .addField("Summoner ID", summoner.id);

      message.channel.send(embed);
    } catch (error) {
      console.error(error);
    }
  }
};
