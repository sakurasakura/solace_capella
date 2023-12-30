const axios = require("axios");
const AuthController = require("../../controller/auth_controller");
const getDataFromAPI = async (user, message) => {
  var jsonLoginBody = await AuthController.getAccountInfo(user, message);
  const urlLogin = "https://dangkitinchi-ictu.vercel.app/api/login";
  const urlSchedule = "https://dangkitinchi-ictu.vercel.app/api/schedule";
  try {
    //login first
    const res = await axios.post(urlLogin, jsonLoginBody, {
      withCredentials: true,
    });
    const cookies = res.headers["set-cookie"];
    //request to get schedule
    const res2 = await axios.get(urlSchedule, {
      headers: {
        Cookie: cookies,
      },
    });
    //console.log(res2.data["data"]);
    return res2.data["data"];
  } catch (error) {
    console.error("Error: ", error);
  }
};
module.exports = getDataFromAPI;
