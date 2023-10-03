const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
const { riotToken } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mastery')
    .setDescription('Information about your League of Legends greatest mastery')
    .addStringOption(option =>
      option
        .setName('puuid')
        .setDescription('The PUUID of the summoner')),
  async execute(interaction) {
    const target = interaction.options.getString('puuid');
    const endpoint = `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${target}?api_key=${riotToken}`

    try {
      const response = await axios.get(endpoint);
      const mastery = response.data[0];
      const championIcon = await `https://cdn.communitydragon.org/latest/champion/${mastery.championId}/square.png`;
      const championsResponse = await axios.get(`http://ddragon.leagueoflegends.com/cdn/13.19.1/data/pt_BR/champion.json`);
      const championsInfo = Object.values(championsResponse.data.data);
      const champion = championsInfo.find(champion => champion.key === String(mastery.championId));

      const embed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle('Maior Maestria')
        .setThumbnail(championIcon)
        .addFields(
          { name: "Campeão", value: `${champion.name}, ${champion.title}`, inline: true },
          { name: "Pontos", value: mastery.championPoints.toString() }
        )

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  }
};
