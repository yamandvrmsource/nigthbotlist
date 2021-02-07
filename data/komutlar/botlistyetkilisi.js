const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let botlistyetkilisi = message.mentions.roles.first()
  if (!botlistyetkilisi) return message.channel.send('Lütfen Abone Yetkili rolünü etiketlermisin?')
   
  db.set(`botlistyetkilisi_${message.guild.id}`, botlistyetkilisi.id)
  message.channel.send(`Abone Yetkili Rolü Başarıyla Ayarlandı; **${botlistyetkilisi}**`)
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 3,
  kategori:"yetkili"
};

exports.help = {
 name: 'botlistyetkilisi-ayarla',
 description: 'kayıt Olunca Verilecek rolü ayarlarsınız',
 usage: 'kayıt-rol <@rol>'
};