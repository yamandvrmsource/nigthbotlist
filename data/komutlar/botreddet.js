const Discord = require('discord.js');
const db = require('quick.db')


exports.run =  async (client, message, args) => {
  
  if(!message.member.roles.cache.has(db.fetch(`botlistyetkilisi_${message.guild.id}`))) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  let member = message.member
	let botisim = message.mentions.users.first()
  let kişi = args[1]
  let reason = args.slice(2).join(' ');
	let logkanalı = await db.fetch(`başvurulogkanalı${member.guild.id}`);
  let logkanal = member.guild.channels.cache.find(name => logkanalı);
	if (!botisim.bot) return message.channel.send(`Bir Bot Etiketlemelisin!`)
  if (!kişi) return message.channel.send(`Bot Sahibini Etiketle Lütfen!`)
  if (reason.length < 1) return message.reply('Reddetme sebebini yazmalısın.');
  
  message.delete()
  const embed = new Discord.MessageEmbed()
  .setTitle("Bot Reddedildi!")
  .addField("Bot Sahibi", `${kişi}`)
  .addField("Reddedilen Bot", `${botisim}`)
  .addField("Reddedilme Sebebi", `${reason}`)
  .addField("Reddeden Yetkili", `${message.author}`)
	logkanal.send(`${kişi}`, embed);
  db.add(`redlibot${message.author.id}.${message.guild.id}`, 1)
  db.add(`beklemedekibot${message.author.id}.${message.guild.id}`, -1)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-reddet', 'reddet'],
  permLevel: 0,
};

exports.help = {
  name: 'botreddet', 
  description: "Sunucuya eklenen botu reddeder.",
  usage: 'botreddet <bot ismi> - <sebep>'
};