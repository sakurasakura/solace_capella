const getDataFromAPI = require("../provider/schedule_provider");
const {
  isToday,
  isTomorrow,
  parse,
  eachDayOfInterval,
  isSameDay,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  format,
  startOfWeek,
  lastDayOfWeek,
  getDay,
  nextMonday,
  nextSunday,
} = require("date-fns");
const Lesson = require("../model/lesson");
const getAllSchedule = async (user, message) => {
  data = await getDataFromAPI(user, message);
  const result = [];
  data.forEach((element) => {
    const className = element.name;
    const teacher = element.teacher;
    element.time.forEach((time) => {
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
const getTodaySchedule = async (user, message) => {
  const data = await getAllSchedule(user, message);
  const filteredData = data.filter((e) =>
    isToday(parse(e.date, "dd/MM/yyyy", new Date()))
  );
  var str = "";
  filteredData.forEach((element) => {
    str += element.toString();
  });
  return filteredData;
};
const getTomorrowSchedule = async (user, message) => {
  const data = await getAllSchedule(user, message);
  const filteredData = data.filter((e) =>
    isTomorrow(parse(e.date, "dd/MM/yyyy", new Date()))
  );
  var str = "";
  filteredData.forEach((element) => {
    str += element.toString();
  });
  return filteredData;
};
const getThisWeekSchedule = async (user, message) => {
  var result = "Lịch học tuần này:\n";
  const data = await getAllSchedule(user, message);
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const lastDate = lastDayOfWeek(startDate, { weekStartsOn: 1 });
  const dateList = eachDayOfInterval({
    start: startDate,
    end: lastDate,
  });
  dateList.forEach((date) => {
    result += getSpecificDayScheduleFromData(data, date);
  });
  if (result.length === 0) {
    return "Không có lịch học trong tuần này";
  }
  return result;
};
const getNextWeekSchedule = async (user, message) => {
  var result = "Lịch học tuần sau:\n";
  const data = await getAllSchedule(user, message);
  const startDate = nextMonday(new Date());
  const lastDate = nextSunday(new Date());
  const dateList = eachDayOfInterval({
    start: startDate,
    end: lastDate,
  });
  dateList.forEach((date) => {
    result += getSpecificDayScheduleFromData(data, date);
  });
  if (result.length === 0) {
    return "Không có lịch học trong tuần sau";
  }
  return result;
};
const getSpecificDaySchedule = async (user, message, date) => {
  const data = await getAllSchedule(user, message);
  const filteredData = data.filter((e) =>
    isSameDay(parse(e.date, "dd/MM/yyyy", new Date()), date)
  );
  if (!filteredData) {
    return "";
  }
  var str = getDayOfWeekString(date) + "\n";
  filteredData.forEach((element) => {
    str += element.toString();
  });
  return filteredData;
};
const getSpecificDayScheduleFromData = (data, date) => {
  const filteredData = data.filter((e) =>
    isSameDay(parse(e.date, "dd/MM/yyyy", new Date()), date)
  );
  if (!filteredData || filteredData.length === 0) {
    return "";
  }
  var str = `⭐ ${getDayOfWeekString(date)}\n`;
  filteredData.forEach((element) => {
    str += element.toString();
  });
  return str;
};
const getDayOfWeekString = (date) => {
  const day = getDay(date);
  switch (day) {
    case 0:
      return `Chủ nhật, ${format(date, "dd/MM/yyyy")}`;
    case 1:
      return `Thứ hai, ${format(date, "dd/MM/yyyy")}`;
    case 2:
      return `Thứ ba, ${format(date, "dd/MM/yyyy")}`;
    case 3:
      return `Thứ tư, ${format(date, "dd/MM/yyyy")}`;
    case 4:
      return `Thứ năm, ${format(date, "dd/MM/yyyy")}`;
    case 5:
      return `Thứ sáu, ${format(date, "dd/MM/yyyy")}`;
    case 6:
      return `Thứ 7, ${format(date, "dd/MM/yyyy")}`;
    default:
      break;
  }
};
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
module.exports = {
  getAllSchedule,
  getTomorrowSchedule,
  getTodaySchedule,
  getThisWeekSchedule,
  getNextWeekSchedule,
};
