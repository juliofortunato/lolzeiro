const axios = require("axios").default;
const { RichEmbed } = require("discord.js");
const riotAPIToken = process.env.RIOT_API_TOKEN;

module.exports = {
  name: "!free-week",
  description: "Informações sobre a rotação semanal de campeões grátis",
  async execute(message, args) {
    try {
      const response = await axios.get(
        `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${riotAPIToken}`
      );
      const freeWeekIds = response.data.freeChampionIds;
      const championsResponse = await axios.get(
        `http://ddragon.leagueoflegends.com/cdn/9.19.1/data/pt_BR/champion.json`
      );
      const championsInfo = Object.values(championsResponse.data.data);

      const getChampionInfo = id => {
        return championsInfo.find(champion => champion.key === String(id));
      };

      freeWeekIds.forEach(id => {
        const champion = getChampionInfo(id);
        const embed = new RichEmbed()
          .setTitle("Free-week")
          .setThumbnail(
            `https://cdn.communitydragon.org/latest/champion/${id}/square.png`
          )
          .addField("Campeão", champion.name, true)
          .addField("Roles", champion.tags.join(", "), true)
          .setColor(0xff0000);

        message.channel.send(embed);
      });
    } catch (error) {
      console.error(error);
    }
  }
};
