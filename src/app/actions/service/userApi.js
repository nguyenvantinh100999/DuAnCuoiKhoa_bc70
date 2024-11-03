import { API_URL, getHeaders, TOKEN_CYBERSOFT } from "@/app/utils/configHeader";
import { TOKEN, USER_LOGIN } from "@/app/utils/setting";
import axios from "axios";

let token = "";

if (typeof window !== "undefined") {
  token = localStorage.getItem("accessToken");
  console.log("token", token);
}
let user = [];
if (typeof window !== "undefined") {
  user = localStorage.getItem(USER_LOGIN);
  console.log("user", user);
}
const headers = {
  TokenCybersoft: TOKEN_CYBERSOFT,
  Authorization: token ? `Bearer ${token}` : "",
  "Content-Type": "application/json",
};
export const getProfileAction = async () => {
  try {
    const res = await axios(
      "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      {
        method: "POST",
        headers: headers,
      }
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error; // Ném lại lỗi để xử lý ở nơi gọi
  }
};

export const registerCourseAction = async (maKhoaHoc) => {
  try {
    const res = await axios(
      "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc",
      {
        method: "POST",
        headers: headers,
        data: {
          maKhoaHoc: maKhoaHoc,
          taiKhoan: user.taiKhoan,
        },
      }
    );
    alert("đăng ký thành công");
    console.log(res.data);
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      console.error("Error request:", error.request);
    } else {
      console.error("Error message:", error.message);
    }
    throw error; // Ném lại lỗi để xử lý ở nơi gọi
  }
};
export const getListUser = async (maKhoaHoc) => {
  try {
    const res = await axios(
      "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
      {
        method: "GET",
        headers: headers,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
