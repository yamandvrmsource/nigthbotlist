const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  if(!message.member.roles.cache.has(db.fetch(`botlistyetkilisi_${message.guild.id}`))) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
let kişi = message.mentions.users.first()
if(!args[0]) {
    const botstats = await db.fetch(`botistatistik${message.author.id}.${message.guild.id}`)
    const onaylananbot = await db.fetch(`onaylıbot${message.author.id}.${message.guild.id}`)
    const reddedilenbot = await db.fetch(`redlibot${message.author.id}.${message.guild.id}`)
    const beklemedekibotlar = await db.fetch(`beklemedekibot${message.author.id}.${message.guild.id}`)
    const codework1 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**${message.author} Genel İstatistik**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam \`${botstats ? botstats : '0'}\` Bot Başvurmuş.**
    **Toplam \`${onaylananbot ? onaylananbot : '0'}\` Bot Onaylanmış.**
    **Toplam \`${reddedilenbot ? reddedilenbot : '0'}\` Bot Reddedilmiş.**
    **Toplam \`${beklemedekibotlar ? beklemedekibotlar : '0'}\` Bot Beklemede.**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(codework1)}
  if(kişi) {
    const onaylananbot = await db.fetch(`onaylıbot${message.author.id}.${message.guild.id}`)
    const reddedilenbot = await db.fetch(`redlibot${message.author.id}.${message.guild.id}`)
    const codework2 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**${message.author} Etiketlenen Kullanıcı İstatistik**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam \`${onaylananbot ? onaylananbot : '0'}\` Bot Onaylamış.**
    **Toplam \`${reddedilenbot ? reddedilenbot : '0'}\` Bot Reddetmiş.**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(codework2)}
}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["bot-istatistik","bot-stats","botstats"],
 permLevel: 0,
};
exports.help = {
 name: 'botistatistik'
};