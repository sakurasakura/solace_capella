const testData = require("./data/test_data");
const {
  getSchedule,
  getTodaySchedule,
  getTomorrowSchedule,
} = require("./model/lesson");
const {
  printSchedule,
  printTimeLine,
} = require("./controller/schedule_controller");
//console.log("Here is sample data:");
//console.log(testData);
const result = getSchedule(testData);
//console.log(result);

const todaySchedule = getTodaySchedule(testData);
//console.log(todaySchedule);
const { Client, IntentsBitField: IntentsBitField } = require("discord.js");
require("dotenv").config();

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
client.on("messageCreate", (message) => {
  //console.log(message);
  switch (message.content) {
    case "!c today":
      console.log(printSchedule(todaySchedule));
      message.reply(printSchedule(todaySchedule));
      break;
    case "!c timeline":
      message.reply(printTimeLine());
      break;
    case "!c tomorrow":
      message.reply(printSchedule(getTomorrowSchedule(testData)));
      break;
    default:
      break;
  }
});
