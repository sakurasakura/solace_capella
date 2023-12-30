const { Client, IntentsBitField: IntentsBitField } = require("discord.js");
require("dotenv").config();
const ScheduleController = require("./controller/schedule_controller");
const AuthController = require("./controller/auth_controller");
const mongoose = require("mongoose");

const connectDB = require("./config/dbConnection");
connectDB();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB.");
});
var http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World\n");
  })
  .listen(1000, "0.0.0.0");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
client.login(process.env.TOKEN);
client.on("ready", (c) => {
  console.log(`${c.user.username} is ready`);
});
client.on("messageCreate", async (message) => {
  var str = message.content;
  // console.log(str);
  switch (str) {
    case "!c today":
      ScheduleController.messageTodaySchedule(message.author.username, message);
      break;
    case "!c timeline":
      ScheduleController.messageTimeLine(message);
      break;
    case "!c tomorrow":
      //console.log(message.author.username);
      await ScheduleController.messageTomorrowSchedule(
        message.author.username,
        message
      );
      break;
    case "!c this week":
      await ScheduleController.messageThisWeekSchedule(
        message.author.username,
        message
      );
      break;
    default:
      break;
  }
  if (str.includes("!c sign in")) {
    const input = str.split(" ");
    // console.log(input);
    try {
      const msv = input[3];
      const password = input[4];
      const user = message.author.username;
      // console.log("Username:", user.username);
      // console.log("msv:", msv);
      // console.log("Password:", password);
      await AuthController.signIn(user, msv, password, message);
    } catch (error) {
      message.reply("Sai format!");
      console.log(error);
    }
  }
});

