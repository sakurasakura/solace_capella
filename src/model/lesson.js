const {
  eachDayOfInterval,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  isToday,
  isTomorrow,
  parse,
  format,
} = require("date-fns");
class Lesson {
  constructor(id, className, teacher, room, date, periods) {
    this.id = id;
    this.className = className;
    this.teacher = extractStringBeforePattern(teacher);
    this.room = room;
    this.date = date;
    this.periods = periods.map((str) => parseInt(str, 10));
  }

  toString() {
    const formattedString = this.periods.join(", ");
    return `🐍\nMôn: ${this.className}\nGiảng viên: ${this.teacher}\nPhòng: ${this.room}\nTiết: ${formattedString}\n`;
  }
}
//get teacher's name
const extractStringBeforePattern = (str) => {
  const index = str.indexOf("( Mã Meet: ");
  if (index !== -1) {
    return str.substring(0, index - 1);
  }
  return str;
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
const getSchedule = (data) => {
  const result = [];
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
const getTodaySchedule = (data) => {
  const schedule = getSchedule(data);
  return schedule.filter((e) =>
    isToday(parse(e.date, "dd/MM/yyyy", new Date()))
  );
};
const getTomorrowSchedule = (data) => {
  const schedule = getSchedule(data);
  return schedule.filter((e) =>
    isTomorrow(parse(e.date, "dd/MM/yyyy", new Date()))
  );
};
module.exports = {
  getTodaySchedule,
  getTomorrowSchedule,
  getDatesList,
  getSchedule,
  Lesson,
};
