
const Discord = require("discord.js");
const config = require("dotenv").config();
const fs = require("fs");

const { google } = require("googleapis");
const auth = require("./credentials-load");
const client = new Discord.Client();
const sheets = google.sheets({ version: "v4", auth });
var spreadsheetId = "1MU0JltvmKgHPUApnPzPct94fpLXLhEAF74Z8PMt2bVk"//"1fKFnj8ehv3J84fIOuqsI56_Rl-2P6NGuEfc8gZD3o_8" 15P14oaCnCs1o3cC3mmDXp6h0z-hEmyra0qknYJ-UQR0
var channelId = "539231042440265728";//539231042440265728  696844952533073950
var channelDef;
var guild = "539102696385544232";
const prefix = "?";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag} `);
    client.channels.fetch(channelId)
        .then(channel => channelDef = channel)
        .catch(console.error);
    client.user.setActivity(`Send ${prefix}help`);
});


client.on('guildMemberAdd', member => {
    if (member.guild.id === `539102696385544232`) {
        member.roles.add("539104026818510849");
    } else if (member.guild.id === `699498339393208453`) {
        member.roles.add("699815965549920378");
        member.roles.add("700081700297900032");
    }

});
client.on('messageDelete', message => {
    if (!message.author.bot) {
        var msg = message.content;
        if (msg.length == 0) msg = "unable to retreive message.";
        if (msg.length > 1000) msg = msg.substring(0, 1000) + "...";
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#ff470f')
            .setDescription(`**Message sent by ${message.author} deleted in ${message.channel}**`)
            .setAuthor(message.author.tag, message.author.avatarURL())
            .addField('Message', msg)
            .setTimestamp(new Date())
            .setFooter(`User ID: ${message.author.id}`);
        if (message.attachments.size > 0) exampleEmbed.attachFiles(message.attachments.first().attachment);
        if (message.guild.id === `539102696385544232`) {
            client.channels.fetch(`539244885937618944`)
                .then(channel => channel.send(exampleEmbed))
                .catch(console.error);
        } else if (message.guild.id === `699498339393208453`) {
            client.channels.fetch(`699815237733580933`)
                .then(channel => channel.send(exampleEmbed))
                .catch(console.error);
        } else if (message.guild.id === `645015625156263977`) {
            client.channels.fetch(`696844952533073950`)
                .then(channel => channel.send(exampleEmbed))
                .catch(console.error);
        }
    }
});
client.on('messageUpdate', (oldMessage, newMessage) => {

    if (!oldMessage.author.bot && !newMessage.author.bot) {
        var oldMsg = oldMessage.content;
        if (oldMsg.length == 0) oldMsg = "unable to retreive message.";
        if (oldMsg.length > 1000) oldMsg = oldMsg.substring(0, 1000) + "...";
        var newMsg = newMessage.content;
        if (newMsg.length == 0) newMsg = "unable to retreive message.";
        if (newMsg.length > 1000) newMsg = newMsg.substring(0, 1000) + "...";
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`**Message edited in** ${oldMessage.channel} [jump to message](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`)
            .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
            .addField('Before', oldMsg)
            .addField('After', newMsg)
            .setTimestamp(new Date())
            .setFooter(`User ID: ${oldMessage.author.id}`);
        if (oldMessage.guild.id === `539102696385544232`) {
            client.channels.fetch(`539244885937618944`)
                .then(channel => channel.send(exampleEmbed))
                .catch(console.error);
        } else if (oldMessage.guild.id === `699498339393208453`) {
            client.channels.fetch(`699815237733580933`)
                .then(channel => channel.send(exampleEmbed))
                .catch(console.error);
        } else if (oldMessage.guild.id === `645015625156263977`) {
            client.channels.fetch(`696844952533073950`)
                .then(channel => channel.send(exampleEmbed))
                .catch(console.error);
        }
    }
});

client.on('message', message => {
    if (!message.author.bot) {
        var strMsg = message.content;
        var startChar = strMsg.substring(0, 1);
        if (strMsg.length < 144 && startChar !== "*" && startChar !== `"`) {
            strMsg = strMsg.toLowerCase();
            if (strMsg.includes("uwu")) message.channel.send(`Don't you fucking UwU me!`);
            else if (strMsg.includes("owo")) message.channel.send(`What's this?`);
            else if (strMsg.includes("gloombreaker")) message.channel.send(`Did someone say "THE FAMED BLADE GLOOMBREAKER, CONQUEROR OF DEMONS, SLAYER OF DARKNESS, AND BRINGER OF LIGHT!"?`);
            else if (strMsg.includes("play despacito")) message.channel.send(`<https://www.youtube.com/watch?v=kJQP7kiw5Fk>`);
            else if (strMsg.includes("hello there")) message.channel.send(`General Kenobi`);
            else if (strMsg.includes("i'm back") || strMsg.includes("im back") || strMsg.includes("i am back")) {
                var mem = message.guild.member(client.user);
                mem.setNickname("Dad");
                message.channel.send(`Hi Back, I'm Dad`);
                mem.setNickname("Velbot");
            }
        }
    if (strMsg.startsWith(`${prefix}`)) {
        if (message.guild != null && message.guild.id !== guild) {
            if (message.guild.id === `539102696385544232`) {
                channelId = "539231042440265728";
                spreadsheetId = "1MU0JltvmKgHPUApnPzPct94fpLXLhEAF74Z8PMt2bVk";
            } else if (message.guild.id === `699498339393208453`) {
                channelId = "700593723658076210";
                spreadsheetId = "1MMKCWQzCSa1NRScoIQbbonpbb4r0D5K8sN4MpVdqyAg";
            } else if (message.guild.id === `645015625156263977`) {
                channelId = "696844952533073950";
                spreadsheetId = "15P14oaCnCs1o3cC3mmDXp6h0z-hEmyra0qknYJ-UQR0";
            }
            client.channels.fetch(channelId)
                .then(channel => channelDef = channel)
                .catch(console.error);
        }
        //console.log(message.guild.id);

        if (strMsg === `${prefix}ping`) {
            message.channel.send('Pong.');
        } else if (strMsg === `${prefix}beep`) {
            message.channel.send('Boop.');
        } else if (strMsg === `${prefix}ranks`) {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#f1ba10')
                .setTitle(`**Available ranks**`)
                //.setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
                .addField(`Initiate`, `Levels 1-4`)
                .addField(`Adept`, `Levels 5-8`)
                .addField(`Journeyman`, `Levels 9-12`)
                .addField(`Expert`, `Levels 13-15`)
                .addField(`Master`, `Levels 15-20`)
                .setFooter(`use ${prefix}rank [rank]`);
            message.channel.send(exampleEmbed);
        } else if (strMsg === `${prefix}help`) {
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#f1ba10')
                .setTitle(`**Velbot Help Menu**`)
                .setDescription(`**Prefix: ${prefix}**`)
                //.setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
                .addField(`List ranks`, `${prefix}ranks`)
                .addField(`Join ranks`, `${prefix}rank [rank]`)
                .addField(`Entering Materials`, `${prefix}loot [Name] | [Material name] | [Amount] | [Type] | [attunement] | [Description] | [Tool] | [Time]`)
                .addField(`Get info on an item`, `${prefix}info [item name, or portion of name]`)
                .addField(`Updating gold`, `${prefix}update [number (can be negative)] [reason(optional)]`)
                .addField(`Gold from report`, `${prefix}report`)
                .setFooter(`Velbot provided with love by Veltoc`);
            message.channel.send(exampleEmbed);
        } else if (strMsg === `${prefix}user-info`) {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
        } else if (strMsg === `${prefix}report`) {
            //var returned = run();
            console.log(message.author.username);
            findAndUpdate(message, 50, "Report");
        } else if (strMsg.startsWith(`${prefix}rank`) && message.guild != null) {
            var str = message.content.slice(6).toLowerCase();
            //console.log(str+"|");
            if (str === `initiate`) {
                if (message.member.guild.id === `539102696385544232`) {//nm
                    if (message.member.roles.cache.has("539104058070269959")) {
                        message.member.roles.remove("539104058070269959");
                        message.channel.send(`Removed rank Initiate from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("539104058070269959");
                        message.channel.send(`Added rank Initiate to <@${message.author.id}>`);
                    }
                } else if (message.member.guild.id === `699498339393208453`) {//nmp
                    if (message.member.roles.cache.has("700580884377763870")) {
                        message.member.roles.remove("700580884377763870");
                        message.channel.send(`Removed rank Initiate from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("700580884377763870");
                        message.channel.send(`Added rank Initiate to <@${message.author.id}>`);
                    }
                }
            } else if (str === `adept`) {
                if (message.member.guild.id === `539102696385544232`) {//nm
                    if (message.member.roles.cache.has("539125421191594000")) {
                        message.member.roles.remove("539125421191594000");
                        message.channel.send(`Removed rank Adept from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("539125421191594000");
                        message.channel.send(`Added rank Adept to <@${message.author.id}>`);
                    }
                } else if (message.member.guild.id === `699498339393208453`) {//nmp
                    if (message.member.roles.cache.has("700580868808245259")) {
                        message.member.roles.remove("700580868808245259");
                        message.channel.send(`Removed rank Adept from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("700580868808245259");
                        message.channel.send(`Added rank Adept to <@${message.author.id}>`);
                    }
                }
            } else if (str === `journeyman`) {
                if (message.member.guild.id === `539102696385544232`) {//nm
                    if (message.member.roles.cache.has("539125440556826645")) {
                        message.member.roles.remove("539125440556826645");
                        message.channel.send(`Removed rank Journeyman from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("539125440556826645");
                        message.channel.send(`Added rank Journeyman to <@${message.author.id}>`);
                    }
                } else if (message.member.guild.id === `699498339393208453`) {//nmp
                    if (message.member.roles.cache.has("700580827343355995")) {
                        message.member.roles.remove("700580827343355995");
                        message.channel.send(`Removed rank Journeyman from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("700580827343355995");
                        message.channel.send(`Added rank Journeyman to <@${message.author.id}>`);
                    }
                }
            } else if (str === `expert`) {
                if (message.member.guild.id === `539102696385544232`) {//nm
                    if (message.member.roles.cache.has("539125513659219978")) {
                        message.member.roles.remove("539125513659219978");
                        message.channel.send(`Removed rank Expert from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("539125513659219978");
                        message.channel.send(`Added rank Expert to <@${message.author.id}>`);
                    }
                } else if (message.member.guild.id === `699498339393208453`) {//nmp
                    if (message.member.roles.cache.has("700580788781187134")) {
                        message.member.roles.remove("700580788781187134");
                        message.channel.send(`Removed rank Expert from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("700580788781187134");
                        message.channel.send(`Added rank Expert to <@${message.author.id}>`);
                    }
                }
            } else if (str === `master`) {
                if (message.member.guild.id === `539102696385544232`) {//nm
                    if (message.member.roles.cache.has("539125532982509568")) {
                        message.member.roles.remove("539125532982509568");
                        message.channel.send(`Removed rank Master from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("539125532982509568");
                        message.channel.send(`Added rank Master to <@${message.author.id}>`);
                    }
                } else if (message.member.guild.id === `699498339393208453`) {//nmp
                    if (message.member.roles.cache.has("700580760616435732")) {
                        message.member.roles.remove("700580760616435732");
                        message.channel.send(`Removed rank Master from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("700580760616435732");
                        message.channel.send(`Added rank Master to <@${message.author.id}>`);
                    }
                }
            } else if (str.toLowerCase() === `artistic individual`) {
                if (message.member.guild.id === `539102696385544232`) {//nm
                    if (message.member.roles.cache.has("571816781363150860")) {
                        message.member.roles.remove("571816781363150860");
                        message.channel.send(`Removed rank Artistic Individual from <@${message.author.id}>`);
                    } else {
                        message.member.roles.add("571816781363150860");
                        message.channel.send(`Added rank Artistic Individual to <@${message.author.id}>`);
                    }
                }
            }
        } else if (strMsg.startsWith(`${prefix}update`)) {
            var msg = strMsg.split(" ");
            var changeNum = parseInt(msg[1]);
            var tReason = "";
            if (msg.length > 2) {
                for (var i = 2; i < msg.length; i++) {
                    tReason += msg[i] + " ";
                }
            } else {
                tReason = "update"
            }

            findAndUpdate(message, changeNum, tReason);
        } else if (strMsg.startsWith(`${prefix}loot`)) {
            //var returned = run();
            //console.log(message.author.username);
            addLoot(message);
        } else if (strMsg.startsWith(`${prefix}info`)) {
            GetInfo(message);
        } else if (strMsg.startsWith(`${prefix}say`)) {
            var str = message.content.slice(5);
            var list = str.split(" |");
            client.channels.fetch(list[0])
                .then(channel => channel.send(list[1]))
                .catch(console.error);
        } else if (strMsg ===`${prefix}bits`) {
            var bitsEmbed = new Discord.MessageEmbed()
                .setColor('#f1ba10')
                .setTitle(`**Bits**`)
                .addField(`${prefix}papa`, `${prefix}owlvon`)
                .addField(`${prefix}sabhir`, `${prefix}cleric`)
                .addField(`${prefix}zuten`, `${prefix}fool`)
                .addField(`${prefix}yeet`, `${prefix}acdc`)
                .setFooter(`Velbot is never going to give you up`);
            message.channel.send(bitsEmbed);
        } else if (strMsg === `${prefix}papa`) {
            message.channel.send(`I can't believe Papa has done this.`);
        } else if (strMsg === `${prefix}owlvon`) {
            message.channel.send(`<https://www.youtube.com/watch?v=xtIV4cRP8LQ>`);
        } else if (strMsg === `${prefix}sabhir`) {
            message.channel.send(`<https://www.youtube.com/watch?v=PVTXLACzaYc>`);
        } else if (strMsg === `${prefix}cleric`) {
            message.channel.send(`<https://www.youtube.com/watch?v=NV-picSBYRM>`);
        } else if (strMsg === `${prefix}zuten`) {
            message.channel.send(`<https://www.youtube.com/watch?v=sOnE8j-ikXQ>`);
        } else if (strMsg === `${prefix}fool`) {
            message.channel.send(`<https://www.youtube.com/watch?v=n3GOL_KHxX4>`);
        } else if (strMsg === `${prefix}yeet`) {
            message.channel.send(`<https://www.youtube.com/watch?v=p1GjT_-rhRw>`);
        } else if (strMsg === `${prefix}acdc`) {
            message.channel.send(`If it meets, it beats.`);
        }
        }
    }
});


//client.login(Token);//BOT_TOKEN is the Client Secret

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret

function findAndUpdate(message, amount, reason) {

    const range = "Player Tracker!A2:A32";
    var check = false;
    sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    }, (err, result) => {
        if (err) {
            // Handle error
            console.log(err);
        } else {

            var i = 0;
            for (i = 0; i < result.data.values.length; i++) {
                //console.log(result.data.values[i][0]);
                if (result.data.values[i][0] === message.author.username) {
                    update(message, i + 2, amount, reason);
                    check = true;
                    break;
                }
            }
            if (!check) {
                check = false;
                message.channel.send(`Unable to find user, Please make sure your discord name is **exact** for everything before the #`);
            }

        }
    });
}
function update(message, num, amount, reason) {
    //replace a range of values (3x3 grid, starting at H8)
    const range = `Player Tracker!L${num}:L${num}`;
    sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    }, (err, result) => {
        //console.log(result.data.values);
        var v = 0;
        if (result.data.values !== undefined) {
            v = parseInt(result.data.values[0][0]);
        }
        v += amount;

        let values = [
            [
                v
            ],
            // Additional rows ...
        ];
        const resource = {
            values,
        };
        var valueInputOption = 'USER_ENTERED';
        sheets.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        }, (err2, res) => {
            if (err) {
                // Handle error
                console.log(err);
            } else {
                //console.log('%d cells updated.', res.updatedCells);
                const range = `Player Tracker!D${num}:D${num}`;
                sheets.spreadsheets.values.get({
                    spreadsheetId,
                    range,
                }, (err, name) => {
                    //console.log(name);
                    if (amount < 0) {
                        channelDef.send(`Took ${-amount} gold from ${name.data.values[0][0]}\n **Reason:** for ${reason} \n${v - amount}->${v}`);
                    } else {
                        channelDef.send(`Gave ${amount} gold to ${name.data.values[0][0]}\n **Reason:** for ${reason} \n ${v - amount}->${v}`);
                    }
                });

            }
        });
    });

}

function addLoot(message) {
    var str = message.content.slice(6);
    var list = str.split("|");
    const range = "Materials & Recipes!A2:I2";
    const insertDataOption = "INSERT_ROWS";
    const valueInputOption = "RAW";

    let values = [
        [
            list[0], list[1], list[2], list[3], list[4], "", list[5], list[6], list[7]
        ],
        // Additional rows ...
    ];
    const resource = {
        values,
    };
    var check = false;
    sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption,
        insertDataOption,
        resource,
    }, (err, result) => {
        channelDef.send(`**Item: ${list[0]}**\n**Material:** ${list[1]} **Amount:** ${list[2]} \n**Type:** ${list[3]}\n**Attunment:** ${list[4]}\n**Tool:** ${list[6]} **Time:** ${list[7]}\n**Description: **${list[5]}`)

    });

}

function GetInfo(message) {
    const range = "Materials & Recipes!A2:A250";
    var str = message.content.slice(6).toLowerCase();
    sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    }, (err, result) => {
        if (err) {
            // Handle error
            console.log(err);
        } else {

            var i = 0;
            for (i = 0; i < result.data.values.length; i++) {
                //console.log(result.data.values[i][0]);
                if (result.data.values[i][0].toLowerCase().includes(str)) {
                    const range = `Materials & Recipes!A${i + 2}:I${i + 2}`;
                    sheets.spreadsheets.values.get({
                        spreadsheetId,
                        range,
                    }, (err, name) => {
                        if (err) {
                            // Handle error
                            console.log(err);
                        } else {
                            message.channel.send(`**Item: ${name.data.values[0][0]}**\n**Material:** ${name.data.values[0][1]} **Amount:** ${name.data.values[0][2]} \n**Type:** ${name.data.values[0][3]}\n**Attunment:** ${name.data.values[0][4]}\n**Tool:** ${name.data.values[0][7]} **Time:** ${name.data.values[0][8]}\n**Description: **${name.data.values[0][6]}\n __________________________________________________________`)
                        }
                    });
                }
            }
        }
    });
}
