const { Client, IntentsBitField: IntentsBitField } = require("discord.js");
require("dotenv").config();
const ScheduleController = require("./controller/schedule_controller");
const AuthController = require("./controller/auth_controller");
const ChoresController = require("./controller/chores_controller");

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
  switch (str) {
    case "!c help":
      ChoresController.messageHelper(message);
      break;
    case "!c today":
      ScheduleController.messageTodaySchedule(message.author.username, message);
      break;
    case "!c timeline":
      ScheduleController.messageTimeLine(message);
      break;
    case "!c tomorrow":
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
    case "!c next week":
      await ScheduleController.messageNextWeekSchedule(
        message.author.username,
        message
      );
      break;
    case "!c sign out":
      await AuthController.signOut(message.author.username, message);
      break;
    default:
      break;
  }
  if (str.includes("!c sign in")) {
    await AuthController.signIn(message,str);
  }
  if (str.includes("!c random")) {
    ChoresController.messageRandom(message,str);
  }
});
