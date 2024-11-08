import { API_URL, getHeaders } from "@/app/utils/configHeader";
import axios from "axios";

export const getAllCourseListAction = async () => {
  const res = await axios(
    `${API_URL}/QuanLyKhoaHoc/LayDanhSachKhoaHoc`,
    {
      method: "GET", // phương thức HTTP
      headers: getHeaders(),
    },
    { next: { revalidate: 10 } }
  );
  return res.data;
};
export const getCourseCategoriesAction = async () => {
  const res = await axios(
    `${API_URL}/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,
    {
      method: "GET", // phương thức HTTP
      headers: getHeaders(),
    },
    { next: { revalidate: 10 } }
  );
  return res.data;
};

export const getCourseListByCategoryAction = async (id) => {
  try {
    const res = await axios(
      `${API_URL}/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${id}`,
      {
        method: "GET",
        headers: getHeaders(),
      },
      { next: { revalidate: 10 } }
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khóa học:", error);
    // Bạn có thể xử lý lỗi theo cách khác ở đây, ví dụ như trả về một giá trị mặc định
    throw error; // Hoặc ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

export const getCourseDetailInfoById = async (id) => {
  try {
    const res = await axios(
      `${API_URL}/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`,
      {
        method: "GET",
        headers: getHeaders(),
      },
      { next: { revalidate: 10 } }
    );
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khóa học:", error);
    // Bạn có thể xử lý lỗi theo cách khác ở đây, ví dụ như trả về một giá trị mặc định
    throw error; // Hoặc ném lại lỗi để xử lý ở nơi gọi hàm
  }
};

export const getCourseListByPaginationAction = async (
  page = 1,
  pageSize = 12
) => {
  try {
    const response = await axios(
      `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: getHeaders(),
      },
      { next: { revalidate: 10 } }
    );
    return {
      courses: response.data.items,
      currentPage: Number(page),
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      courses: [],
      currentPage: 1,
      totalPages: 0,
    };
  }
};

export const getCourseListInfoByKeyWord = async (keyword) => {
  try {
    const res = await axios(
      `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${keyword}`,
      {
        method: "GET",
        headers: getHeaders(),
      },
      { next: { revalidate: 10 } }
    );
    return res.data;
  } catch (error) {
    alert(error.response.data || error);
    // Bạn có thể xử lý lỗi theo cách khác ở đây, ví dụ như trả về một giá trị mặc định
    throw error; // Hoặc ném lại lỗi để xử lý ở nơi gọi hàm
  }
};
