const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if(!message.member.roles.cache.has(db.fetch(`botlistyetkilisi_${message.guild.id}`))) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
let user = message.mentions.users.first()
if (!user.bot) return message.channel.send(`Lütfen Bir Bot Etiketle!`)
    let onaylananbot = await db.fetch(`onaylıbot${user.id}.${message.guild.id}`)
    let codework2 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`${user}**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Durumu \`${onaylananbot ? 'Onaylanmış' : 'Reddedilmiş' }\` **
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(`${message.author}`, codework2)
}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["bot-sorgula","bot-sorgulat","botsorgulat"],
 permLevel: 0,
};
exports.help = {
 name: 'botsorgula'
};