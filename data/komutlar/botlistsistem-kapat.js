const Discord = require('discord.js');
const db = require('quick.db') 
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')

  if(!db.fetch(`başvurukanalı${message.guild.id}`)) return message.channel.send('Görünüşe Göre Botlist Sistemi Zaten Kapalı Görünüyor :).')
   

   message.reply('Botlist Sistemi Ayarları Sıfırlanıp Başarı İle Kapatılmıştır.')
db.delete(`onaylıbot${message.guild.id}`)
db.delete(`redlibot${message.guild.id}`)
db.delete(`beklemedekibot${message.guild.id}`)
db.delete(`botistatistik${message.guild.id}`)
db.delete(`başvurukanalı${message.guild.id}`)
db.delete(`başvurulogkanalı${message.guild.id}`)
db.delete(`botlistyetkilisi_${message.guild.id}`)


}; 


exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: ['botlistkapat'], 
permLevel: 0
}

exports.help = {
 name: 'botlistsistem-kapat', 
description: 'kayıt sistemini kapatır',
 usage: 'kayıt-kapat' 
};