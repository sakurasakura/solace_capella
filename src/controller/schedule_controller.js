const ScheduleRepo = require("../data/repo/schedule_repo");
//reply message
const messageSchedule = (user, message) => {
  const data = ScheduleRepo.getTodaySchedule(user, message);
  if (!data || data.length === 0) {
    message.reply("Bạn không có lịch học!");
    return;
  }
  var str = "";
  data.forEach((element) => {
    str += element.toString();
  });
  message.reply(str);
};
// !c today
const messageTodaySchedule = async (user, message) => {
  const msg = await message.reply("Chờ mình tí nhé...");
  const data = await ScheduleRepo.getTodaySchedule(user, message);
  //console.log("in message");
  // console.log(data);
  if (!data || data.length === 0) {
    //message.reply("Hôm nay lịch trống!");
    msg.edit("Hôm nay lịch trống!");
    return;
  }
  var str = "";
  data.forEach((element) => {
    str += element.toString();
  });
  //message.reply(str);
  msg.edit(str);
};
// !c tomorrow
const messageTomorrowSchedule = async (user, message) => {
  const data = await ScheduleRepo.getTomorrowSchedule(user, message);
  // console.log("in message");
  // console.log(data);
  if (!data || data.length === 0) {
    message.reply("Ngày mai lịch trống!");
    return;
  }
  var str = "";
  data.forEach((element) => {
    str += element.toString();
  });
  message.reply(str);
};
// !c this week
const messageThisWeekSchedule = async (user, message) => {
  const str = await ScheduleRepo.getThisWeekSchedule(user, message);
  message.reply(str);
};
// !c timeline
const messageTimeLine = (message) => {
  message.reply(
    "Tiết 1: 6.45 -> 7.35\nTiết 2: 7.40 -> 8.30\nTiết 3: 8.40 -> 9.30\nTiết 4: 9.40 -> 10.30\nTiết 5: 10.35 -> 11.25\nTiết 6: 13.30 -> 13.50\nTiết 7: 13.55 -> 14.45\nTiết 8: 14.55 -> 15.45\nTiết 9: 15.55 -> 16.45\nTiết 10: 16.50 -> 17.40\n"
  );
};
const waitAndSendMessage = async (message) => {
  const msg = await message.reply("Chờ mình tí nhé...");
  msg.edit("");
};
module.exports = {
  messageSchedule,
  messageTimeLine,
  messageTodaySchedule,
  messageTomorrowSchedule,
  messageThisWeekSchedule,
};
