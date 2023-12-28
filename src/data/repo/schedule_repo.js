const getDataFromAPI = require("../provider/schedule_provider");
const { isToday, isTomorrow, parse } = require("date-fns");

const getAllSchedule = async (user, message) => {
  data = await getDataFromAPI(user, message);
  console.log("data in getAll");
  console.log(data);
  const result = [];
  // console.log(data);
  data.forEach((element) => {
    const className = element.name;
    const teacher = element.teacher;
    element.time.forEach((time) => {
      //get dates in time interval
      const datesList = getDatesList(
        time.startTime,
        time.endTime,
        time.dayOfWeek
      );
      datesList.forEach((date) => {
        result.push(
          new Lesson(null, className, teacher, time.room, date, time.period)
        );
      });
    });
  });
  return result;
};
const getTodaySchedule = async () => {};
const getTomorrowSchedule = async (user, message) => {
  const data = await getAllSchedule(user, message);
  console.log("in get");
  console.log(data);
  const filteredData = data.filter((e) =>
    isTomorrow(parse(e.date, "dd/MM/yyyy", new Date()))
  );
  var str = "";
  filteredData.forEach((element) => {
    str += element.toString();
  });
  return filteredData;
};
//get a list of days in week of interval
const getDatesList = (startDate, endDate, dayOfWeek) => {
  const result = [];
  const dayList = eachDayOfInterval({
    start: parse(startDate, "dd/MM/yyyy", new Date()),
    end: parse(endDate, "dd/MM/yyyy", new Date()),
  });
  switch (dayOfWeek) {
    case "Thứ 2":
      dayList.forEach((day) => {
        if (isMonday(day)) {
          result.push(format(day, "dd/MM/yyyy"));
        }
      });
      return result;
    case "Thứ 3":
      dayList.forEach((day) => {
        if (isTuesday(day)) {
          result.push(format(day, "dd/MM/yyyy"));
        }
      });
      return result;
    case "Thứ 4":
      dayList.forEach((day) => {
        if (isWednesday(day)) {
          result.push(format(day, "dd/MM/yyyy"));
        }
      });
      return result;
    case "Thứ 5":
      dayList.forEach((day) => {
        if (isThursday(day)) {
          result.push(format(day, "dd/MM/yyyy"));
        }
      });
      return result;
    case "Thứ 6":
      dayList.forEach((day) => {
        if (isFriday(day)) {
          result.push(format(day, "dd/MM/yyyy"));
        }
      });
      return result;
    case "Thứ 7":
      dayList.forEach((day) => {
        if (isSaturday(day)) {
          result.push(format(day, "dd/MM/yyyy"));
        }
      });
      return result;
    case "Chủ nhật":
      dayList.forEach((day) => {
        if (isSunday(day)) {
          result.push(format(day, "dd/MM/yyyy"));
        }
      });
      return result;
    default:
      break;
  }
};
module.exports = { getAllSchedule, getTomorrowSchedule };
