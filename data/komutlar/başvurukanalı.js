const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.has(db.fetch(`botlistyetkilisi_${message.guild.id}`))) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
 let başvurukanal = message.mentions.channels.first()
if (!başvurukanal) return message.channel.send('Lütfen Başvurulacak Kanalı Etiketlermisin?')
   
  db.set(`başvurukanalı${message.guild.id}`, başvurukanal.id)

 
  message.channel.send(`Başvuru Kanalı Başarıyla Ayarlandı; **${başvurukanal}**`)
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
kategori:"yetkili"
};

exports.help = {
 name: 'başvurukanalı-ayarla',
 description: 'kayıt kanalı Olunacak kanalı seçersiniz',
 usage: 'kicklog-kanal <#kanal>'
};