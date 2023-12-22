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
module.exports = { printSchedule, printTimeLine };
