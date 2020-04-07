
const Discord = require("discord.js");
const config = require("dotenv").config();
const { prefix } = require('./config.json');
const fs = require("fs");

const { google } = require("googleapis");
const auth = require("./credentials-load");
const client = new Discord.Client();
const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = "1fKFnj8ehv3J84fIOuqsI56_Rl-2P6NGuEfc8gZD3o_8"//"1fKFnj8ehv3J84fIOuqsI56_Rl-2P6NGuEfc8gZD3o_8" 15P14oaCnCs1o3cC3mmDXp6h0z-hEmyra0qknYJ-UQR0
const channelId = "539231042440265728";//539231042440265728  696844952533073950
var channelDef;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag} `);
    client.channels.fetch(channelId)
        .then(channel => channelDef = channel)
        .catch(console.error);
    client.user.setActivity("=help");
});


//client.login('');

client.on('message', message => {
    //const defChannel = message.guild.channels.find("name", "crafting");
    //defChannel.send("he");

    if (message.content === `${prefix}ping`) {
        message.channel.send('Pong.');
    } else if (message.content === `${prefix}beep`) {
        message.channel.send('Boop.');
    } else if (message.content === `${prefix}help`) {
        message.channel.send(`**Velbot Help menu:** \n**Prefix: **${prefix} \n**Entering Materials:** \n    loot [Name] | [Material name] | [Amount] | [Type] | [attunement] | [Description] | [Tool] | [Time] \n\n**Get info on an item:** \n  info [item name, or portion of name]\n\n**Updating scrap: **\n  update [number (can be negative)] [reason(can be blank)] \n\n**Scrap from report:** \n  report \n`);
    } else if (message.content === `${prefix}user-info`) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    } else if (message.content === `${prefix}report`) {
        //var returned = run();
        console.log(message.author.username);
        findAndUpdate(message, 50, "Report");
    } else if (message.content.startsWith(`${prefix}update`)) {
        //var returned = run();
        console.log(message.author.username);
        const msg = message.content.split(" ");
        //console.log(msg[1]);
        var changeNum = parseInt(msg[1]);
        var tReason = "";
        //console.log(changeNum);
        if (msg.length > 2) {
            for (var i = 2; i < msg.length; i++) {
                tReason += msg[i];
            }
        }else {
            tReason = "update"
        }

        findAndUpdate(message, changeNum, tReason);
    } else if (message.content.startsWith(`${prefix}loot`)) {
        //var returned = run();
        //console.log(message.author.username);
        addLoot(message);
    } else if (message.content.startsWith(`${prefix}info`)) {
        GetInfo(message);
    } else if (message.content.startsWith(`${prefix}say`)) {
        var str = message.content.slice(5);
        var list = str.split(" |");
        client.channels.fetch(list[0])
            .then(channel => channel.send(list[1]))
            .catch(console.error);
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
                        channelDef.send(`Took ${-amount} scrap from ${name.data.values[0][0]}\n **Reason:** for ${reason} \n${v - amount}->${v}`);
                    } else {
                        channelDef.send(`Gave ${amount} scrap to ${name.data.values[0][0]}\n **Reason:** for ${reason} \n ${v - amount}->${v}`);
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
                            message.channel.send(`**Item: ${name.data.values[0][0]}**\n**Material:** ${name.data.values[0][1]} **Amount:** ${name.data.values[0][2]} \n**Type:** ${name.data.values[0][3]}\n**Attunment:** ${name.data.values[0][4]}\n**Tool:** ${name.data.values[0][7]} **Time:** ${name.data.values[0][8]}\n**Description: **${name.data.values[0][6]}`)
                        }
                    });
                }
            }
        }
    });
}

