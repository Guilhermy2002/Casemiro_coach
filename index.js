require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client({intents: ["MESSAGE_CREATE"]});
const PREFIX = "!";
const token = process.env.DISCORD_BOT_SECRET
const fetch = require('node-fetch')
const { loadCommands } = require('./utils/loadcommands.js');
const meme = require('./commands/memes.js')
const fs = require('fs');
const cron = require('cron')


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.login(token);


client.on("ready", () => {
  console.log(`Online`);
  client.user.setActivity('REDDIT', { type: 'WATCHING' });

});

client.on("guildCreate", guild=> {
  console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População:${guild.memberCount} membros!`);
  client.user.setActivity(`Estou em ${client.guilds.size} servidores.`);
});

client.on("guildDelete", guild=> {
  console.log(`O bot foi deletado do servidor: ${guild.name} (id: ${guild.id}). `);
  client.user.setActivity(`Serving ${client.guilds.size} servers.`);
});

client.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(!message.content.startsWith(PREFIX)) return;

  let args = message.content.slice(PREFIX.length).split(" ");
  let command = args.shift().toLowerCase();

  if(command === "ping"){
    console.log(message.channel.id)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latencia: ${m.createdTimestamp - message.createdTimestamp}ms.`);
  }

  const messageArray = message.content.split(/\s+/);
  const cmd = messageArray[0];
  const args1 = messageArray.slice(1);



  
});

function sendMeme() {
  meme.run(client);
}

let job1 = new cron.CronJob('00 00 10 * * 1-5', sendMeme); // fires from Monday to Friday, every hour from 8 am to 16

// To make a job start, use job.start()
job1.start();
