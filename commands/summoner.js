const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios').default;
const { riotToken } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('summoner')
    .setDescription('Provides information about a League of Legends summoner.')
    .addStringOption(option =>
      option
        .setName('nickname')
        .setDescription('The in-game nickname of the summoner')),
  async execute(interaction) {
    const target = interaction.options.getString('nickname');
    const endpoint = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${target}?api_key=${riotToken}`

    try {
      const response = await axios.get(endpoint);
      const summoner = response.data;
      const summonerIcon = await `http://ddragon.leagueoflegends.com/cdn/13.19.1/img/profileicon/${summoner.profileIconId}.png`;

      const embed = new EmbedBuilder()
        .setColor(0x0fb6bf)
        .setTitle('Informações do Invocador')
        .setThumbnail(summonerIcon)
        .addFields(
          { name: "Nome", value: summoner.name },
          { name: "Level", value: summoner.summonerLevel.toString() },
          { name: 'PUUID', value: summoner.puuid.toString() }
        )

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  }
};
