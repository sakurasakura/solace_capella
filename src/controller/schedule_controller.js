const ScheduleRepo = require("../data/schedule_repo");
const transformer = require("../model/lesson");
const { isToday, isTomorrow, parse } = require("date-fns");
const getSchedule = async () => {
  const data = await ScheduleRepo.getDataFromAPI();
  // console.log("get schedule - controller");
  // console.log(data);
  return transformer.getSchedule(ScheduleRepo.getDataFromAPI());
};
const getTodaySchedule = () => {
  const schedule = getSchedule();
  return schedule.filter((e) =>
    isToday(parse(e.date, "dd/MM/yyyy", new Date()))
  );
};
const getTomorrowSchedule = async () => {
  const schedule = await getSchedule();
  // console.log("get tmr schedule - controller");
  // console.log(schedule);
  return schedule.filter((e) =>
    isTomorrow(parse(e.date, "dd/MM/yyyy", new Date()))
  );
};
//reply message
const messageSchedule = (message) => {
  const data = getSchedule();
  var str = "";
  data.forEach((element) => {
    //console.log(element.toString());
    str += element.toString();
  });
  message.reply(str);
};
// !c today
const messageTodaySchedule = (message) => {
  const data = getTodaySchedule();
  var str = "";
  data.forEach((element) => {
    //console.log(element.toString());
    str += element.toString();
  });
  message.reply(str);
};
// !c tomorrow
const messageTomorrowSchedule = async (user, message) => {
  const data = await ScheduleRepo.getDataFromAPI(user, message);
  //console.log("Data1: " + JSON.stringify(data) + "\n");
  const data2 = transformer.getSchedule(data);
  //console.log("Data2: " + JSON.stringify(data2));
  const data3 = data2.filter((e) =>
    isTomorrow(parse(e.date, "dd/MM/yyyy", new Date()))
  );
  //console.log("Data3" + data3);
  var str = "";
  data3.forEach((element) => {
    // console.log(element.toString());
    str += element.toString();
  });
  message.reply(str);
};
// !c timeline
const messageTimeLine = (message) => {
  message.reply(
    "Tiết 1: 6.45 -> 7.35\nTiết 2: 7.40 -> 8.30\nTiết 3: 8.40 -> 9.30\nTiết 4: 9.40 -> 10.30\nTiết 5: 10.35 -> 11.25\nTiết 6: 13.30 -> 13.50\nTiết 7: 13.55 -> 14.45\nTiết 8: 14.55 -> 15.45\nTiết 9: 15.55 -> 16.45\nTiết 10: 16.50 -> 17.40\n"
  );
};
module.exports = {
  messageSchedule,
  messageTimeLine,
  messageTodaySchedule,
  messageTomorrowSchedule,
};
