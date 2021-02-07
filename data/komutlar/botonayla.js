const Discord = require('discord.js');
const db = require('quick.db')
exports.run =  async (client, message, args) => {
  
  if(!message.member.roles.cache.has(db.fetch(`botlistyetkilisi_${message.guild.id}`))) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  let member = message.member
  let kişi = args[1]
	let botisim = message.mentions.users.first()
	let logkanalı = await db.fetch(`başvurulogkanalı${member.guild.id}`);
  let logkanal = member.guild.channels.cache.find(name => logkanalı);
	if (!botisim.bot) return message.channel.send(`Bir Bot Etiketlemelisin!`)
  if (!kişi) return message.channel.send(`Bot Sahibini Etiketle Lütfen!`)
  message.delete()
  const embed = new Discord.MessageEmbed()
  .setTitle("Bot Onaylandı!")
  .addField("Bot Sahibi", `${kişi}`)
  .addField("Bot Adı", `${botisim}`)
  .addField("Onaylayan Yetkili", `${message.author}`)
	logkanal.send(`${kişi}`, embed);
  db.add(`onaylıbot${message.author.id}.${message.guild.id}`, 1)
  db.add(`beklemedekibot${message.author.id}.${message.guild.id}`, -1)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-onayla', 'onayla'],
  permLevel: 0,
};

exports.help = {
  name: 'botonayla', 
  description: "Sunucuya eklenen botu onaylar.",
  usage: 'botonayla <bot ismi>'
};