const messageHelper = (message) => {
  const str =
    "Các lệnh tớ có thể nhận:\n🐥c! sign in ma_sinh_vien mat_khau\n🐥c!sign out\n\n🐥c! today\n🐥!c tomorrow\n🐥!c this week\n🐥!c next week\n🐥!c timeline\n\n🐥!c random choice_1 or choice_2 or choice_n\n";
  message.reply(str);
};
const messageRandom = async (message, content) => {
  const reply = await message.reply("Tung xúc xắc...🎲\n");
  const choicesString = content.trim().substring(9);
  const array = choicesString.split("or");
  var choices = [];
  for (let index = 0; index < array.length; index++) {
    choices[index] = array[index].trim();
  }
  const randomNumber = Math.floor(Math.random() * (choices.length + 1));
  const result = choices[randomNumber];
  reply.edit(`🎲 ${result.charAt(0).toUpperCase() + result.slice(1)} nha!`);
};
module.exports = { messageHelper, messageRandom };
