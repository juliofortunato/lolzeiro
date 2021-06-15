const axios = require("axios").default;
const { RichEmbed } = require("discord.js");
const riotAPIToken = process.env.RIOT_API_TOKEN;

module.exports = {
  name: "!mastery",
  description: "Informações sobre sua maior mastery",
  async execute(message, args) {
    const name = encodeURI(args.join(" "));

    try {
      const { data } = await axios.get(
        `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotAPIToken}`
      );

      const response = await axios.get(
        `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${data.id}?api_key=${riotAPIToken}`
      );
      const mastery = response.data[0];
      const championImgURL = `https://cdn.communitydragon.org/latest/champion/${mastery.championId}/square.png`;

      const championsResponse = await axios.get(
        `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`
      );
      const championsInfo = Object.values(championsResponse.data.data);
      const champion = championsInfo.find(
        champion => champion.key === String(mastery.championId)
      );

      const embed = new RichEmbed()
        .setTitle("Maior Maestria")
        .setThumbnail(championImgURL)
        .setColor(0xff0000)
        .addField("Campeão", champion.name, true)
        .addField("Pontos", mastery.championPoints, true);

      message.channel.send(embed);
    } catch (error) {
      console.error(error);
    }
  }
};
