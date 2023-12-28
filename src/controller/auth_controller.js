const Account = require("../data/model/account");
const signIn = async (user, msv, pw, message) => {
  if (msv && pw) {
    const foundUser = await Account.findOne({ user: user }).exec();
    if (foundUser) {
      //du lieu truy cap nhanh da duoc luu
      message.reply("Login thành công.");
    } else {
      //du lieu truy cap nhanh chua duoc luu, thuc hien add
      const result = await Account.create({
        user: user,
        msv: msv,
        password: pw,
      });
      console.log(result);
      if (result) {
        message.reply("Login thành công.");
      }
    }
  }
};
const getAccountInfo = async (user, message) => {
  const foundUser = await Account.findOne({ user: user }).exec();
  if (foundUser) {
    console.log(foundUser);
    return {
      username: foundUser.msv,
      password: foundUser.password,
    };
  } else {
    message.reply("Dữ liệu chưa có. Hãy log in trước");
  }
};
module.exports = { signIn, getAccountInfo };
