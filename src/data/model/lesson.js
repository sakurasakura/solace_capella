const {
  eachDayOfInterval,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  parse,
  format,
} = require("date-fns");
class Lesson {
  constructor(id, className, teacher, room, date, periods) {
    this.id = id;
    this.className = className;
    this.teacher = Lesson.extractStringBeforePattern(teacher);
    this.room = room;
    this.date = date;
    this.periods = periods.map((str) => parseInt(str, 10));
  }

  toString() {
    const formattedString = this.periods.join(", ");
    return `🐍\nMôn: ${this.className}\nGiảng viên: ${this.teacher}\nPhòng: ${this.room}\nTiết: ${formattedString}\n`;
  }
  //get teacher's name
  static extractStringBeforePattern(str){
    const index = str.indexOf("( Mã Meet: ");
    if (index !== -1) {
      return str.substring(0, index - 1);
    }
    return str;
  };
}
module.exports = {
  Lesson,
};
