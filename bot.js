require('dotenv').config()
const Discord = require('discord.js');
const bot = new Discord.Client()

//This RegEx is used to match trigger words to messages sent to the chat.
//I would recommend using all lower case trigger words and calling .toLowerCase() on the message content to avoid case issues
const reg = new RegExp(/Put|Your|Trigger|Phrases|Here|separated by the OR operator/)

const TOKEN = process.env.TOKEN

bot.login(TOKEN)

bot.on('ready', () => {
    console.info(`logged in as ${bot.user.tag}`)
});

bot.on('message', msg => {
    if (reg.test(msg.content.toLowerCase())){
        //Calculate how many hogs will be sent
        let numHogs = Math.floor((Math.random() * 20)) + 30;

        //Caculate the time period hogs will be sent for
        let time = Math.floor(Math.random() * (120)) + 180;

        //Determine the interval to wait between sending each hog
        let interval = Math.floor(time/numHogs * 1000);

        //Recursively calling sendHogs() ensures setTimeout() works properly
        function sendHogs(num) {
            if (num > 0) {
                msg.channel.send('🐗');
                setTimeout(() => {sendHogs(num - 1)}, interval);
            } else {
                msg.channel.send(`${numHogs} 🐗's ran into ${msg.author}'s yard in ${Math.floor(time/60)} minutes and ${time % 60} seconds while their small kids play.`)
            }
        }

        //Begin sending hogs
        msg.channel.send(`🚨HOGS COMIN!🚨`)
        sendHogs(numHogs)
        
    }
})


  