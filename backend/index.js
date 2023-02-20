const http = require('http');
const five = require('johnny-five');
const SocketIOServer = require('socket.io').Server;
const Discord = require('discord.js');

const PORT = "4444";
const server = http.createServer();
const io = new SocketIOServer(server, { cors: { origin: '*' } });
const board = new five.Board({ port: "COM3", repl: false });

var discordState = false;

const prefix = "!"
const CHANNEL_ID = 1059475736852955166;
const discordToken = 'DISCORD_TOKEN_YES_HAHA';
const { Client, GatewayIntentBits } = require('discord.js');
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  debug: true,
});

let isLedOn = false;
discordClient.on("ready", () => {
  console.log("online")
  discordClient.user.setActivity('Hello World', { type: "  WATCHING" });
});

discordClient.on("messageCreate", (message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLocaleLowerCase();

  //message array
  const messageArray = message.content.split(" ");
  const arguments = messageArray.slice(1);
  const cmd = messageArray[0];

  //test command
  if (command === 'on') {
    discordState = true;
    console.log("it worked");
    message.channel.send('LED is ON');
  }


  if (command === 'off') {
    discordState = false;
    message.channel.send('LED is OFF');
  }

});

while(discordState) {
  console.log("kjåd");
}
// 00000
// if (board.isReady) {
//   const led = new five.Led(4);
//   console.log("Ojfåopj")
//   if (discordState === true) {
//     console.log(discordState + "yo")
//     led.on()
//     led.blink()
//     io.emit("led", isLedOn);
//   } else if (discordState === false){
//     led.stop()
//     led.off()
//     io.emit("led", isLedOn);
//   }
// }
//
io.on("connection", (socket) => {
  console.log("User connected");
  io.emit("led", isLedOn);
  if (board.isReady) {
    const led = new five.Led(4);
    console.log("Ojfåopj")
    if (discordState === true) {
      console.log(discordState + "yo")
      led.on()
    } else if (discordState === false){
      led.stop()
      led.off()
    }
    
    //
    socket.on("ledOn", () => {
      isLedOn = true;
      led.on();
      io.emit("led", isLedOn);
    });

    socket.on("ledOff", () => {
      isLedOn = false;
      led.stop();
      led.off();
      io.emit("led", isLedOn);
    });
  }
});


discordClient.login(discordToken)
  .then(() => {
    console.log("Discord bot is ready.");
  })
  .catch((err) => {
    console.error(`Error while logging in to Discord: ${err}`);
  });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
