const { Client, IntentsBitField: IntentsBitField } = require("discord.js");
require("dotenv").config();
const ScheduleController = require("./controller/schedule_controller");
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
  switch (message.content) {
    case "!c today":
      ScheduleController.messageTodaySchedule(message);
      break;
    case "!c timeline":
      ScheduleController.messageTimeLine(message);
      break;
    case "!c tomorrow":
      await ScheduleController.messageTomorrowSchedule(message);
      break;
    default:
      break;
  }
});
