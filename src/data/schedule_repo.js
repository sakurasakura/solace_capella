const axios = require("axios");
const AuthController = require("../controller/auth_controller");
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
    //console.log("response:");
    // console.log(res2.data["data"]);
    return res2.data["data"];
  } catch (error) {
    console.error("Error: ", error);
  }
  // return [
  //   {
  //     STT: "1",
  //     name: "Các hệ thống đa phương tiện-2-23 (K19.KTPM.D1.K2.N02)",
  //     code: "DPT222",
  //     time: [
  //       {
  //         startTime: "18/12/2023",
  //         endTime: "21/01/2024",
  //         sessionNumber: "1",
  //         dayOfWeek: "Thứ 4",
  //         period: ["7", "8"],
  //         room: "C2.101 C2",
  //       },
  //       {
  //         startTime: "22/01/2024",
  //         endTime: "28/01/2024",
  //         sessionNumber: "2",
  //         dayOfWeek: "Thứ 5",
  //         period: ["6", "7", "8"],
  //         room: "C5.301 C5",
  //       },
  //       {
  //         startTime: "19/02/2024",
  //         endTime: "17/03/2024",
  //         sessionNumber: "3",
  //         dayOfWeek: "Thứ 3",
  //         period: ["3", "4", "5"],
  //         room: "C5.402 C5",
  //       },
  //     ],
  //     teacher:
  //       "Nguyễn Thị Thanh Nhàn ( Mã Meet: fxi-qwms-ddz link: meet.google.com/fxi-qwms-ddz  )",
  //     number: "60",
  //     numberRegistered: "60",
  //     credit: "2",
  //     tuition: "",
  //     note: "",
  //   },
  //   {
  //     STT: "2",
  //     name: "Công nghệ J2EE-2-23 (K19.KTPM.D1.K2.N02)",
  //     code: "JEE333",
  //     time: [
  //       {
  //         startTime: "18/12/2023",
  //         endTime: "28/01/2024",
  //         sessionNumber: "1",
  //         dayOfWeek: "Thứ 6",
  //         period: ["7", "8", "9", "1"],
  //         room: "C5.303 C5",
  //       },
  //       {
  //         startTime: "19/02/2024",
  //         endTime: "10/03/2024",
  //         sessionNumber: "2",
  //         dayOfWeek: "Thứ 5",
  //         period: ["7", "8", "9", "1"],
  //         room: "C5.301 C5",
  //       },
  //     ],
  //     teacher:
  //       "Tô Hữu Nguyên ( Mã Meet: so-wibf-ymo link: meet.google.com/xso-wibf-ymo  )",
  //     number: "60",
  //     numberRegistered: "61",
  //     credit: "3",
  //     tuition: "",
  //     note: "",
  //   },
  //   {
  //     STT: "3",
  //     name: "Đảm bảo chất lượng phần mềm-2-23 (K19.KTPM.D1.K2.N02)",
  //     code: "SQA421",
  //     time: [
  //       {
  //         startTime: "18/12/2023",
  //         endTime: "21/01/2024",
  //         sessionNumber: "1",
  //         dayOfWeek: "Thứ 4",
  //         period: ["9", "1"],
  //         room: "C2.101 C2",
  //       },
  //       {
  //         startTime: "22/01/2024",
  //         endTime: "28/01/2024",
  //         sessionNumber: "2",
  //         dayOfWeek: "Thứ 4",
  //         period: ["8", "9", "1"],
  //         room: "C2.101 C2",
  //       },
  //       {
  //         startTime: "19/02/2024",
  //         endTime: "17/03/2024",
  //         sessionNumber: "3",
  //         dayOfWeek: "Thứ 4",
  //         period: ["6", "7", "8"],
  //         room: "C5.301 C5",
  //       },
  //     ],
  //     teacher:
  //       "Nguyễn Lan Oanh ( Mã Meet: npn-qrxr-hrd link: meet.google.com/npn-qrxr-hrd  )",
  //     number: "60",
  //     numberRegistered: "61",
  //     credit: "2",
  //     tuition: "",
  //     note: "",
  //   },
  //   {
  //     STT: "4",
  //     name: "Thương mại điện tử-2-23 (K19.KTPM.D1.K2.N02)",
  //     code: "ELC331",
  //     time: [
  //       {
  //         startTime: "18/12/2023",
  //         endTime: "31/12/2023",
  //         sessionNumber: "1",
  //         dayOfWeek: "Thứ 2",
  //         period: ["6", "7", "8", "9"],
  //         room: "C6.607 (LAB MANG) C6 Thực hành các khoa",
  //       },
  //       {
  //         startTime: "01/01/2024",
  //         endTime: "07/01/2024",
  //         sessionNumber: "2",
  //         dayOfWeek: "Chủ nhật",
  //         period: ["6", "7", "8", "9"],
  //         room: "C5.301 C5",
  //       },
  //       {
  //         startTime: "08/01/2024",
  //         endTime: "28/01/2024",
  //         sessionNumber: "3",
  //         dayOfWeek: "Thứ 2",
  //         period: ["6", "7", "8", "9"],
  //         room: "C6.607 (LAB MANG) C6 Thực hành các khoa",
  //       },
  //       {
  //         startTime: "19/02/2024",
  //         endTime: "10/03/2024",
  //         sessionNumber: "4",
  //         dayOfWeek: "Thứ 2",
  //         period: ["2", "3", "4", "5"],
  //         room: "C5.101 C5",
  //       },
  //     ],
  //     teacher: "Nguyễn Thế Vịnh",
  //     number: "60",
  //     numberRegistered: "61",
  //     credit: "3",
  //     tuition: "",
  //     note: "",
  //   },
  //   {
  //     STT: "5",
  //     name: "Vận hành và bảo trì phần mềm-2-23 (K19.KTPM.D1.K2.N02)",
  //     code: "VHV222",
  //     time: [
  //       {
  //         startTime: "18/12/2023",
  //         endTime: "21/01/2024",
  //         sessionNumber: "1",
  //         dayOfWeek: "Thứ 7",
  //         period: ["2", "3", "4"],
  //         room: "C5.404 C5",
  //       },
  //       {
  //         startTime: "22/01/2024",
  //         endTime: "28/01/2024",
  //         sessionNumber: "2",
  //         dayOfWeek: "Thứ 6",
  //         period: ["4", "5"],
  //         room: "C5.302 C5",
  //       },
  //       {
  //         startTime: "19/02/2024",
  //         endTime: "17/03/2024",
  //         sessionNumber: "3",
  //         dayOfWeek: "Thứ 3",
  //         period: ["1", "2"],
  //         room: "C5.402 C5",
  //       },
  //     ],
  //     teacher:
  //       "Phạm Thị Thương ( Mã Meet: tgj-wqzc-pch link: https://meet.google.com/tgj-wqzc-pch  )",
  //     number: "60",
  //     numberRegistered: "61",
  //     credit: "2",
  //     tuition: "",
  //     note: "",
  //   },
  //   {
  //     STT: "6",
  //     name: "XML và ứng dụng-2-23 (K19.KTPM.D1.K2.N02)",
  //     code: "XTA331",
  //     time: [
  //       {
  //         startTime: "18/12/2023",
  //         endTime: "28/01/2024",
  //         sessionNumber: "1",
  //         dayOfWeek: "Thứ 3",
  //         period: ["2", "3", "4", "5"],
  //         room: "C5.301 C5",
  //       },
  //       {
  //         startTime: "19/02/2024",
  //         endTime: "10/03/2024",
  //         sessionNumber: "2",
  //         dayOfWeek: "Thứ 6",
  //         period: ["6", "7", "8", "9"],
  //         room: "C5.502 C5",
  //       },
  //     ],
  //     teacher:
  //       "Nguyễn Thị Dung (CNPM) ( Mã Meet: fue-epjg-oog link: meet.google.com/fue-epjg-oog  )",
  //     number: "60",
  //     numberRegistered: "61",
  //     credit: "3",
  //     tuition: "",
  //     note: "",
  //   },
  // ];
};
module.exports = { getDataFromAPI };
