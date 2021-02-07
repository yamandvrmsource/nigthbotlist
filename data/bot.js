const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`discord.gg/codework`, { type:'WATCHING' })
  
  console.log("CodeWork Akıyor!!")
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
client.login(process.env.TOKEN)


//-----------------------KOMUTLAR-----------------------\\

//KULLANICI KAYIT MESAJI\\

client.on("guildMemberAdd", async member => {
  let hgmesajı = db.fetch(`kgirismesajı_${member.guild.id}`)
  client.channels.cache.get(hgmesajı).send(`Hoşgeldin ${member} Kayıt Olmak İçin !kayıt İsim Yaş`);
});

//KULLANICI KAYIT MESAJI SON\\


//KULLANICI KAYIT MESAJI\\

client.on("guildMemberAdd", async member => {
  let yetkilihgmesajı = db.fetch(`yetkilikgirismesajı_${member.guild.id}`)
  client.channels.cache.get(yetkilihgmesajı).send(`Hoşgeldin ${member} Kayıt Olmak İçin Kayıt Kanalına İsmini Yaz Ve Yetkilileri Bekle!`);
});

//KULLANICI KAYIT MESAJI SON\\

  client.on("guildMemberAdd", member => { 
  let kanal = db.fetch(`hgbbkanal_${member.guild.id}`)
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  var kontrol;
if (kurulus < 1296000000) kontrol = ' **__Bu Hesap Güvenilir Değil__** '
if (kurulus > 1296000000) kontrol = ' **__Bu Hesap Güvenilir Gözüküyor__** '
  moment.locale("tr");
  let codework = client.channels.cache.get(kanal);
codework.send(`
<a:RainbowOkGif:755739732666744843> ** Hoşgeldin! ${member} Seninle Birlikte ${member.guild.memberCount} Kişiyiz. **

<a:RainbowOkGif:755739732666744843> ** Sunucuya Hoşgeldin Tagımızı Alarak Kayıt Olabilirsin. **

<a:RainbowOkGif:755739732666744843> ** <@&748076408672354369> seninle ilgilenicektir. **

<a:RainbowOkGif:755739732666744843> ** Hesabın Oluşturulma Tarihi:** ${moment(member.user.createdAt).format(" **YYYY __DD MMMM dddd (hh:mm:ss) __ **")} **

<a:RainbowOkGif:755739732666744843> ** ${kontrol} **

<a:RainbowOkGif:755739732666744843> ** __ Register Odalara Girerek Kayıt Olman Lazım Dostum . __  `)
  
  });
