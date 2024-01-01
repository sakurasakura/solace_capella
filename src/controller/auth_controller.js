const Account = require("../data/model/account");
const signIn = async (user, msv, pw, message) => {
  const msg = await message.reply("Đang log in...");
  if (msv && pw) {
    const foundUser = await Account.findOne({ user: user }).exec();
    if (foundUser) {
      msg.edit("Login thành công rồi nha.");
    } else {
      const result = await Account.create({
        user: user,
        msv: msv,
        password: pw,
      });
      console.log(result);
      if (result) {
        msg.edit("Login thành công rôi nha.");
      }
    }
  }
};
const signOut = async (user, message) => {
  const msg = await message.reply("Đang log out nè. Chờ tí nha...");
  const foundUser = await Account.findOne({ user: user }).exec();
  if (!foundUser) {
    msg.edit("Cậu chưa log in mà.");
  } else {
    const result = Account.deleteOne({ user: user }).exec();
    if (!result) {
      msg.edit("Có lỗi rồi. Hãy liên lạc với chủ bot nha.");
    } else {
      msg.edit(
        "Cậu đã log out thành công rồi đó.\nNếu muốn tiếp tục sử dụng tớ thì login lại nha."
      );
    }
  }
};
const getAccountInfo = async (user, message) => {
  const foundUser = await Account.findOne({ user: user }).exec();
  if (foundUser) {
    return {
      username: foundUser.msv,
      password: foundUser.password,
    };
  } else {
    message.reply(
      "Tớ không thể lấy dữ liệu từ server nếu cậu không login trước.\nNếu không biết lệnh login như thế nào thì gõ !c help nha."
    );
  }
};
module.exports = { signIn, getAccountInfo, signOut };
