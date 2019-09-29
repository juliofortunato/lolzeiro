const axios = require('axios').default
const { riotAPIToken } = require('../config.json')

module.exports = {
  name: 'free-week',
  description: 'Informações sobre a rotação semanal de campeões grátis',
  async execute (message, args) {
    try {
      const response = await axios.get(
        `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${riotAPIToken}`
      )

      const freeWeekIds = response.data.freeChampionIds

      freeWeekIds.forEach(id => {
        message.channel.send(
          `https://cdn.communitydragon.org/latest/champion/${id}/square.png`
        )
      })
    } catch (error) {
      console.error(error)
    }
  }
}
