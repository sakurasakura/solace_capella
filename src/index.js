const testData = require("./data/test_data");
const {
  Lesson,
  getDatesList,
  getSchedule,
  getTodaySchedule,
  getTomorrowSchedule,
} = require("./model/lesson");

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
const printSchedule = (data) => {
  var str = "";
  data.forEach((element) => {
    console.log(element.toString());
    str += element.toString();
  });
  return str;
};
const printTimeLine = () => {
  return "Tiết 1: 6.45 -> 7.35\nTiết 2: 7.40 -> 8.30\nTiết 3: 8.40 -> 9.30\nTiết 4: 9.40 -> 10.30\nTiết 5: 10.35 -> 11.25\nTiết 6: 13.30 -> 13.50\nTiết 7: 13.55 -> 14.45\nTiết 8: 14.55 -> 15.45\nTiết 9: 15.55 -> 16.45\nTiết 10: 16.50 -> 17.40\n";
};
