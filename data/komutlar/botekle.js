const Discord = require('discord.js');
const db = require('quick.db')


exports.run =  async (client, message, args) => {
  
  const codeworkbotlist = await db.fetch(`başvurukanalı${message.guild.id}`)
  if(codeworkbotlist == null) return message.channel.send('Başvuru Kanalı Ayarlanmamış!');
  if(message.channel.id !== codeworkbotlist) return message.channel.send(`Bu Komutu Sadece <#${codeworkbotlist}> Kanalında Kullanabilirsiniz!`);

  let member = message.member
	let botid = args[0]
	let prefix = args[1]
  let onaylımı = args[2]
  let logkanalı = await db.fetch(`başvurulogkanalı${member.guild.id}`);
  let logkanal = member.guild.channels.cache.find(name => logkanalı);
  if (!botid) return message.channel.send(`Botunun ID Yazmalısın.`)
  if (!prefix) return message.channel.send(`Botun Prefixini Yazmalısın.`)
  if (!onaylımı) return message.channel.send(`Botun Top.gg de Eklimi? Sadece Evet/Hayır Yaz.`)

  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`[Perm 0](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=0) [Perm 8](https://discordapp.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=8)`, true)
  .setTitle("Sıraya Bot Eklendi!")
  .addField("Bot Sahibi", message.author)
  .addField("Başvurulan Bot", `<@${botid}>`)
  .addField("Bot Prefix", prefix)
  .addField("Bot Top.gg Eklimi?", onaylımı)
  logkanal.send(embed)
  db.add(`botistatistik${message.author.id}.${message.guild.id}`, 1)
  db.add(`beklemedekibot${message.author.id}.${message.guild.id}`, 1)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-ekle'],
  permLevel: 0
};

exports.help = {
  name: 'botekle', 
  description: "Sunucuya bot eklemenizi sağlar.",
  usage: 'botekle <botid> <prefix>'
};