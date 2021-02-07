const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.has(db.fetch(`botlistyetkilisi_${message.guild.id}`))) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
 let başvurulogkanal = message.mentions.channels.first()
if (!başvurulogkanal) return message.channel.send('Lütfen Başvuru Log Kanalını Etiketlermisin?')
   
  db.set(`başvurulogkanalı${message.guild.id}`, başvurulogkanal.id)

 
  message.channel.send(`Başvuru Log Kanalı Başarıyla Ayarlandı; **${başvurulogkanal}**`)
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
kategori:"yetkili"
};

exports.help = {
 name: 'başvurulog-ayarla',
 description: 'kayıt kanalı Olunacak kanalı seçersiniz',
 usage: 'kicklog-kanal <#kanal>'
};