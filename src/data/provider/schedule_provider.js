const axios = require("axios");
const AuthController = require("../../controller/auth_controller");
const getDataFromAPI = async (user, message) => {
  var jsonLoginBody = await AuthController.getAccountInfo(user, message);
  const urlLogin = "https://dangkitinchi-ictu.vercel.app/api/login";
  const urlSchedule = "https://dangkitinchi-ictu.vercel.app/api/schedule";
  try {
    const res = await axios.post(urlLogin, jsonLoginBody, {
      withCredentials: true,
    });
    const cookies = res.headers["set-cookie"];
    const res2 = await axios.get(urlSchedule, {
      headers: {
        Cookie: cookies,
      },
    });
    return res2.data["data"];
  } catch (error) {
    console.error("Error: ", error);
  }
};
module.exports = getDataFromAPI;
