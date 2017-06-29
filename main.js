/* jshint esversion: 6 */
const chat = require('./chat.js');
const cfg = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
var channel;
var act = new chat.Account();
var messages = [];

client.on('ready', () => {
  //client.channels.get("330053551751692298").send("Test");
});


function chatHandler (ret) {
  //console.log(ret.chats.kvothe_the_arcane);
  let finalMessage = "";
  for (let i in ret.chats.kvothe_the_arcane) {
    let msg = ret.chats.kvothe_the_arcane[i];
    let lastMsg = messages[messages.length-1] || {};

    if (msg.id != lastMsg.id) {
      messages.push(msg);
      //console.log( ("          " + msg.channel).slice(-10) + "    " + msg.from_user + ": " + msg.msg);
      //client.sendMessage(channel, ("          " + msg.channel).slice(-10) + "    " + msg.from_user + ": " + msg.msg);
      //client.channels.get("330053551751692298").send(("          " + msg.channel).slice(-10) + "    " + msg.from_user + ": " + msg.msg);
      finalMessage += ("          " + msg.channel).slice(-10) + "    " + msg.from_user + ": " + msg.msg + "\n";
      if (ret.chats.kvothe_the_arcane.length <= 20) {
        client.channels.get("330053551751692298").send("```\n" + ("00" + new Date(msg.t*100).getHours()).slice(-2) + ("00" + new Date(msg.t*100).getMinutes()).slice(-2) + " " + msg.channel + " " + msg.from_user + ": " + msg.msg + "\n```");
      }
    }
  }
  //inalMessage += "```";
  //client.channels.get("330053551751692298").send(finalMessage);
}

act.update(cfg.hackmud.token).then(_=>setInterval(_=>act.poll({after:"last"}).then(chatHandler, (ret) => {}),2500), (ret) => {
  console.log(ret);
});

client.login(cfg.discord.token);
