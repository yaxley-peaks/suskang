//@ts-check
/*
      .....           .....
   ,ad8PPPP88b,     ,d88PPPP8ba,
  d8P"      "Y8b, ,d8P"      "Y8b
 dP'           "8a8"           `Yd
 8(              "              )8
 I8                             8I
  Yb,                         ,dP
   "8a,         yax         ,a8"
     "8a,                 ,a8"
       "Yba             adP"   
         `Y8a         a8P'
           `88,     ,88'
             "8b   d8"
              "8b d8"
               `888'
                 "
*/
const discord = require("discord.js");
const { unames, targets } = require('./list.json');
const fs = require("fs").promises;

const sokangId = "513808991147655168";
var flag = false;
/** @type {discord.GuildMember} */
var self;
const guildId = "689964611004399673" //orion server
const URLRegex = /^(ftp|http|https):\/\/[^ "]+$/;
/** @type {discord.GuildEmoji}*/
let suskang;
const client = new discord.Client();

client.once('ready', async () => {
    /**@private */
    let _selfGuild = await client.guilds.fetch(guildId);
    self = _selfGuild.me;
    suskang = _selfGuild.emojis.cache.find(e => e.name === "suskang");
    await client.user.setActivity("ew new logo", { type: "WATCHING" });
    console.log(self.permissions.toArray());
    console.log("sus");
});

client.on('message', async (msg) => {
    if (self.hasPermission(['SEND_MESSAGES', 'ADD_REACTIONS'])) {
        handleClockEvent(msg.channel, targets, msg.author.id);
        if (msg.author.id == sokangId) {
            try {
                sendLRandomly(msg.channel);
                await msg.react(suskang);
            } catch {
                console.log("suskang not found");
            }
        }
    }
});
client.on('messageUpdate', async (msg) => {
    if (msg.author.bot) return;
    if (URLRegex.test(msg.content)) return;
    await msg.channel.send(`lol <@${msg.author.id}> is a retard who cant even spell`);
});
client.login(process.env.SECRET);




// ================================================================================
/**
 * Sends L randomly
 * @param {discord.TextChannel | discord.DMChannel | discord.NewsChannel} channel
 */
function sendLRandomly(channel) {
    if (Date.now() % 100 == 0) {
        channel.send("LLLLLLLLLLLLLLLLLLL");
    }
}

/**
 * Does stuff occasionally
 * 
 * @param {discord.TextChannel | discord.DMChannel | discord.NewsChannel} channel
 * @param {Iterable<any>} targets
 * @param {string} author
 */
async function handleClockEvent(channel, targets, author) {
    if (Date.now() % 77 == 0) {
        if (self.hasPermission(['CHANGE_NICKNAME']))
            self.setNickname(unames[Math.floor(Math.random() * unames.length)]);
        if (self.hasPermission('SEND_MESSAGES'))
            ping(channel, targets, author);
    }
}


/** 
 * @param {discord.TextChannel | discord.DMChannel | discord.NewsChannel} channel
 * @param {Iterable<any>} targets
 * @param {string} author
 */
function ping(channel, targets, author) {
    if (author == self.id) //itself
        return;
    let curs = [...new Set(targets)]
    let cur = curs[Math.floor(Math.random() * curs.length)];
    channel.send(`<@${cur}> hah get pinged`);
}

/**@deprecated */
async function buildMemberList() {
    const member = await client.guilds.fetch(guildId);
    console.log("got server");
    const list = await member.members.fetch()
    console.log("getting members");
    console.log(list);
}

/**
 * @param {string} data data to be read
 * @param {any} file file to write to
 * @returns {Promise<string>} 
 */
async function writeRead(data, file) {
    await fs.truncate(file);
    await fs.writeFile(file, data);
    let info = (await fs.readFile(file)).toString('utf-8');
    let jinfo = JSON.parse(info);
    // targets = jinfo.targets;
    return "hello";
}
