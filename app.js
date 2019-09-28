const Discord = require('discord.js')
const { prefix, discordToken } = require('./config.json')

const client = new Discord.Client()

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (command === 'ping') {
    message.channel.send('Pong.')
  } else if (command === 'beep') {
    message.channel.send('Boop.')
  }
  // other commands..bundleRenderer.renderToString
})

client.login(discordToken)
