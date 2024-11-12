"use client";
import React, { useRef, useEffect, useState } from "react";
import { deburr } from "lodash";
import { Layout, Menu, Space, Table, Button, Input, Avatar } from "antd";
import Highlighter from "react-highlight-words";
const { Header, Sider, Content } = Layout;
import { getHeaders, TOKEN_CYBERSOFT } from "@/app/utils/configHeader";
import axios from "axios";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import * as Yup from "yup";
import "../../../styles/modal/modalProfile.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup, Modal, ModalFooter } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { USER_LOGIN } from "@/app/utils/setting";
const page = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataUserFilter, setDataUserFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalGhiDanh, setShowModalGhiDanh] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]); // State để lưu danh sách khóa học
  const [inputValue, setInputValue] = useState(""); // State để lưu giá trị input
  const [isDropdownVisible, setDropdownVisible] = useState(false); // State để kiểm soát hiển thị dropdown
  const [courseRegistered, setCourseRegistered] = useState([]);
  const [courseNotRegistered, setCourseNotRegistered] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false); // State cho modal thông báo
  const [notificationMessage, setNotificationMessage] = useState(""); // Thông điệp thông báo
  const [isSuccess, setIsSuccess] = useState(false); // Kiểm tra loại thông báo (thành công hay thất bại)
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(USER_LOGIN));
    if (storedUser && storedUser.maLoaiNguoiDung === "GV") {
      setUser(storedUser);
    } else {
      router.push("/not-found");
    }
  }, [router]);
  const headers = {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: `Bearer ${user?.accessToken}`,
    "Content-Type": "application/json",
  };
  //--------modal thông báo------------------------
  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setIsSuccess(true);
    setShowNotificationModal(true);
    setTimeout(() => {
      setShowNotificationModal(false);
    }, 1500);
  };

  const showErrorNotification = (message) => {
    setNotificationMessage(message);
    setIsSuccess(false);
    setShowNotificationModal(true);
    setTimeout(() => {
      setShowNotificationModal(false);
    }, 1500);
  };
  //----------lấy danh sách người dùng-----------------
  const getListUser = async () => {
    setLoading(true);
    try {
      const res = await axios(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        {
          method: "GET",
          headers: getHeaders(),
        }
      );
      //Thêm thuộc tính stt vào mỗi object trong res.data
      const dataWithSTT = res.data.map((item, index) => ({
        ...item,
        stt: index + 1,
      }));
      setDataUser(dataWithSTT);
      return res.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  //------------tìm kiếm người dùng
  const handleSearchUser = async (value) => {
    setLoading(true);
    try {
      const normalizedValue = deburr(value.trim());
      console.log("Normalized Value:", normalizedValue); //
      if (normalizedValue) {
        const res = await axios(
          `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${normalizedValue}`,
          {
            method: "GET",
            headers: getHeaders(),
          }
        );
        console.log("API Response:", res.data); // Kiểm tra dữ liệu trả về từ API
        const dataWithSTT = res.data.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setDataUserFilter(dataWithSTT);
      } else {
        // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách
        setDataUserFilter(dataUser);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  //----chỉnh sửa người dùng admin--------
  const handleEditAmin = () => {
    formEditProfile.setValues({
      taiKhoan: user?.taiKhoan || "", // Đảm bảo không phải là undefined
      hoTen: user?.hoTen || "",
      soDT: user?.soDt || "",
      email: user?.email || "",
      maLoaiNguoiDung: user?.maLoaiNguoiDung || "",
      maNhom: user?.maNhom || "GP01",
    });
    setShowModal(true);
  };
  //----Đăng xuất người dùng admin--------
  const handleLogoutAmin = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  //----chỉnh sửa người dùng--------
  const handleEdit = (record) => {
    formEditProfile.setValues({
      taiKhoan: record.taiKhoan || "", // Đảm bảo không phải là undefined
      hoTen: record.hoTen || "",
      soDT: record.soDt || "",
      email: record.email || "",
      maLoaiNguoiDung: record.maLoaiNguoiDung || "",
      maNhom: record.maNhom || "GP01",
    });
    setShowModal(true);
  };
  //----xóa người dùng--------
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa người dùng này không?"
    );

    // Nếu người dùng nhấn "Cancel", không làm gì cả
    if (!confirmDelete) {
      return;
    }
    try {
      const res = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );
      showSuccessNotification("Xóa người dùng thành công");
      getListUser();
      console.log("Xóa người dùng thành công", res.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Đã xảy ra lỗi";
      showErrorNotification(errorMessage);
    }
  };
  useEffect(() => {
    getListUser();
  }, []);
  const handleRegisterClick = (taiKhoan) => {
    // Hiển thị modal và gọi các hàm khác
    setShowModalGhiDanh(true);
    fetchCourses(taiKhoan);
    getCouresregistered(taiKhoan);
    getCouresNotregistered(taiKhoan);
  };

  //-----------cập nhật thông tin người dùng-------------------
  const formEditProfile = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: "GP01",
      email: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(8, "ít nhất 8 ký tự"),
      email: Yup.string()
        .required("email không được bỏ trống")
        .email("email không hợp lệ !(VD:admin@gmail.com)"),
      soDT: Yup.string()
        .required("phone không được bỏ trống")
        .matches(
          /^(0[1-9]{1}[0-9]{8}|(84|0)(9[0-9]|8[1-9]|7[0-9]|6[2-9]|5[0-9]|4[0-9]|3[2-9]|2[0-9]|1[0-9])[0-9]{7})$/,
          "phone không hợp lệ (VD: 0909090909)"
        ),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios(
          "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
          {
            method: "PUT",
            headers: headers,
            data: values,
          }
        );
        showSuccessNotification("Cập nhật thành công");

        getListUser();
        resetForm();
      } catch (error) {
        const errorMessage = error.response?.data || "Đã xảy ra lỗi";
        showErrorNotification(errorMessage);
      }
    },
  });
  //-------đăng ký người dùng----------------
  const formAddUser = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: "GP01",
      email: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống"),
      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(8, "ít nhất 8 ký tự"),
      email: Yup.string()
        .required("email không được bỏ trống")
        .email("email không hợp lệ !"),
      soDT: Yup.string()
        .required("phone không được bỏ trống")
        .matches(
          /^(0[1-9]{1}[0-9]{8}|(84|0)(9[0-9]|8[1-9]|7[0-9]|6[2-9]|5[0-9]|4[0-9]|3[2-9]|2[0-9]|1[0-9])[0-9]{7})$/,
          "phone không hợp lệ (VD: 0909090909)"
        ),
      maLoaiNguoiDung: Yup.string().required("Vui lòng chọn loại người dùng"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios(
          "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
          {
            method: "POST",
            headers: headers,
            data: values,
          }
        );
        showSuccessNotification("Thêm thành công");

        getListUser();
        resetForm();
      } catch (error) {
        const errorMessage = error.response?.data || "Đã xảy ra lỗi";
        showErrorNotification(errorMessage);
      }
    },
  });
  //---------------ghi danh bằng cách chọn khóa học----------------
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Cập nhật giá trị input
    fetchCourses(); // Gọi API để lấy danh sách khóa học
  };

  const handleCourseSelect = (course) => {
    setInputValue(course.tenKhoaHoc); // Cập nhật giá trị input với tên khóa học đã chọn
    setDropdownVisible(false); // Ẩn dropdown
  };
  //------------lấy danh sách học viên đã ghi danh khóa học----------------
  const fetchCourses = async (taiKhoan) => {
    setLoading(true);
    try {
      const response = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${taiKhoan}`,
        {
          method: "POST",
          headers: headers,
        }
      );
      const dataWithSTT = response.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        taiKhoan: taiKhoan,
      }));
      setCourses(dataWithSTT); // Lưu danh sách khóa học vào state
      setDropdownVisible(true); // Hiển thị dropdown
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
    } finally {
      setLoading(false);
    }
  };

  //------------lấy danh sách học viên chờ xét duyệt khóa học----------------
  const getCouresregistered = async (taiKhoan) => {
    setLoading(true);
    try {
      const response = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
        {
          method: "POST",
          headers: headers,
          data: { taiKhoan: taiKhoan },
        }
      );
      const dataWithSTT = response.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        taiKhoan: taiKhoan,
      }));
      setCourseRegistered(dataWithSTT);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
    } finally {
      setLoading(false);
    }
  };
  //------------lấy danh sách người dùng chưa ghi danh khóa học----------------
  const getCouresNotregistered = async (taiKhoan) => {
    setLoading(true);
    try {
      const response = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
        {
          method: "POST",
          headers: headers,
          data: { taiKhoan: taiKhoan },
        }
      );
      const dataWithSTT = response.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        taiKhoan: taiKhoan,
      }));
      setCourseNotRegistered(dataWithSTT);
      console.log(courseNotRegistered);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
    } finally {
      setLoading(false);
    }
  };
  //----------ghi danh người dùng vào khóa học------------------
  const registerCourse = async (taiKhoan, maKhoaHoc) => {
    try {
      const response = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/GhiDanhKhoaHoc`,
        {
          method: "POST",
          headers: headers,
          data: { taiKhoan: taiKhoan, maKhoaHoc: maKhoaHoc },
        }
      );
      showSuccessNotification("Ghi danh thành công");
      fetchCourses(taiKhoan);
      getCouresregistered(taiKhoan);
      getCouresNotregistered(taiKhoan);
      console.log(response.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Đã xảy ra lỗi";
      showErrorNotification(errorMessage);
    }
  };

  //----------hủy ghi danh người dùng vào khóa học------------------
  const deleteRegisterCourse = async (taiKhoan, maKhoaHoc) => {
    try {
      const response = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh`,
        {
          method: "POST",
          headers: headers,
          data: { taiKhoan: taiKhoan, maKhoaHoc: maKhoaHoc },
        }
      );
      showSuccessNotification("Hủy ghi danh thành công");
      fetchCourses(taiKhoan);
      getCouresregistered(taiKhoan);
      getCouresNotregistered(taiKhoan);
      console.log(response.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Đã xảy ra lỗi";
      showErrorNotification(errorMessage);
    }
  };
  // Data cho table
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "ND",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Chức năng",
      key: "action",
      render: (record, value) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: "5px" }}
            onClick={() => {
              handleRegisterClick(record.taiKhoan);
            }}
          >
            Ghi danh
          </Button>
          <Button
            style={{ marginRight: "5px", backgroundColor: "#ffd700" }}
            onClick={() => {
              handleEdit(record);
            }}
          >
            Sửa
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              handleDelete(record.taiKhoan);
            }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const columCouresRegisted = [
    {
      title: "STT",
      dataIndex: "stt",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
    },
    {
      title: "chờ xác nhận",
      render: (record) => (
        <>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteRegisterCourse(record.taiKhoan, record.maKhoaHoc);
            }}
          >
            Xóa
          </button>
        </>
      ),
    },
  ];
  const columCouresNotRegisted = [
    {
      title: "STT",
      dataIndex: "stt",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
    },
    {
      title: "chờ xác nhận",
      render: (record) => (
        <>
          <button
            className="btn btn-success"
            onClick={() => {
              registerCourse(record.taiKhoan, record.maKhoaHoc);
            }}
          >
            Xác thực
          </button>

          <button
            className="btn btn-danger"
            onClick={() => {
              deleteRegisterCourse(record.taiKhoan, record.maKhoaHoc);
            }}
          >
            Xóa
          </button>
        </>
      ),
    },
  ];

  const columModalfirt = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên khóa học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "chờ xác nhận",
      render: (record) => (
        <>
          <button
            className="btn btn-success"
            onClick={() => {
              registerCourse(record.taiKhoan, record.maKhoaHoc);
            }}
          >
            Ghi danh
          </button>
        </>
      ),
    },
  ];
  return (
    <div className="userTemplate" style={{ maxHeight: "100vh" }}>
      <Layout>
        <Header>
          <button
            onClick={() => {
              setShowModalAdd(true);
            }}
            className="btn btn-primary btnGlobal"
          >
            Thêm người dùng
          </button>
          <Search
            className="searchAdmin"
            placeholder="Nhập tài khoản cần tìm"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onChange={(e) => {
              handleSearchUser(e.target.value);
            }}
            style={{ width: 400 }}
          />
          <div className="iconProfile">
            <p>
              Xin chào <span>{user?.hoTen},</span>
            </p>
            <img src="/img/emoji.6d1b7051.png" alt="iconProfile" />
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Chỉnh sửa
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  handleEditAmin(true);
                }}
              >
                Cập nhật thông tin
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleLogoutAmin();
                }}
              >
                Đăng Xuất
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Header>
        <Table
          columns={columns}
          rowKey={"stt"}
          dataSource={dataUserFilter.length > 0 ? dataUserFilter : dataUser}
          loading={loading}
          pagination={{
            total:
              dataUserFilter.length > 0
                ? dataUserFilter.length
                : dataUser.length,
            pageSize: 7,
            showSizeChanger: false,
            showQuickJumper: false,
          }}
        />
      </Layout>
      <Modal
        className="modalProfile"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin cá nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="formEditProdile"
            onSubmit={formEditProfile.handleSubmit}
          >
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user-edit"></i>
              </span>
              <input
                required
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                onChange={formEditProfile.handleChange}
                value={formEditProfile.values.taiKhoan || ""}
                onBlur={formEditProfile.handleBlur}
              />
              <label htmlFor="taiKhoan">Tài khoản</label>
            </div>
            {formEditProfile.touched.taiKhoan && (
              <p className="text-danger ">{formEditProfile.errors.taiKhoan}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user-edit"></i>
              </span>
              <input
                required
                type="text"
                name="hoTen"
                id="hoTen"
                onChange={formEditProfile.handleChange}
                value={formEditProfile.values.hoTen || ""}
                onBlur={formEditProfile.handleBlur}
              />
              <label htmlFor="hoTen">Họ Tên</label>
            </div>
            {formEditProfile.touched.hoTen && (
              <p className="text-danger ">{formEditProfile.errors.hoTen}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-lock"></i>
              </span>
              <input
                required
                type="password"
                name="matKhau"
                id="matKhau"
                onChange={formEditProfile.handleChange}
                value={formEditProfile.values.matKhau || ""}
                onBlur={formEditProfile.handleBlur}
              />
              <label htmlFor="matKhau">Mật khẩu</label>
            </div>
            {formEditProfile.touched.matKhau && (
              <p className="text-danger ">{formEditProfile.errors.matKhau}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                required
                type="email"
                name="email"
                id="email"
                onChange={formEditProfile.handleChange}
                value={formEditProfile.values.email || ""}
                onBlur={formEditProfile.handleBlur}
              />
              <label htmlFor="email">Email</label>
            </div>
            {formEditProfile.touched.email && (
              <p className="text-danger ">{formEditProfile.errors.email}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-phone"></i>
              </span>
              <input
                required
                type="text"
                name="soDT"
                id="soDT"
                onChange={formEditProfile.handleChange}
                value={formEditProfile.values.soDT || ""}
                onBlur={formEditProfile.handleBlur}
              />
              <label htmlFor="soDT">Số Điện Thoại</label>
            </div>
            {formEditProfile.touched.soDT && (
              <p className="text-danger ">{formEditProfile.errors.soDT}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user-edit"></i>
              </span>
              <select
                name="maLoaiNguoiDung"
                id="maLoaiNguoiDung"
                value={formEditProfile.values.maLoaiNguoiDung || ""}
                onChange={formEditProfile.handleChange}
              >
                <option value="GV">Giáo vụ</option>
                <option value="HV">Học viên</option>
              </select>
            </div>
            <Modal.Footer>
              <button type="submit" variant="primary">
                Lưu thông tin
              </button>
              <button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Đóng
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        className="modalProfile"
        show={showModalAdd}
        onHide={() => setShowModalAdd(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="formAddUser" onSubmit={formAddUser.handleSubmit}>
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user-edit"></i>
              </span>
              <input
                required
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                onChange={formAddUser.handleChange}
                value={formAddUser.values.taiKhoan || ""}
                onBlur={formAddUser.handleBlur}
              />
              <label htmlFor="taiKhoan">Tài khoản</label>
            </div>
            {formAddUser.touched.taiKhoan && (
              <p className="text-danger ">{formAddUser.errors.taiKhoan}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user-edit"></i>
              </span>
              <input
                required
                type="text"
                name="hoTen"
                id="hoTen"
                onChange={formAddUser.handleChange}
                value={formAddUser.values.hoTen || ""}
                onBlur={formAddUser.handleBlur}
              />
              <label htmlFor="hoTen">Họ Tên</label>
            </div>
            {formAddUser.touched.hoTen && (
              <p className="text-danger ">{formAddUser.errors.hoTen}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-lock"></i>
              </span>
              <input
                required
                type="password"
                name="matKhau"
                id="matKhau"
                onChange={formAddUser.handleChange}
                value={formAddUser.values.matKhau || ""}
                onBlur={formAddUser.handleBlur}
              />
              <label htmlFor="matKhau">Mật khẩu</label>
            </div>
            {formAddUser.touched.matKhau && (
              <p className="text-danger ">{formAddUser.errors.matKhau}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                required
                type="email"
                name="email"
                id="email"
                onChange={formAddUser.handleChange}
                value={formAddUser.values.email || ""}
                onBlur={formAddUser.handleBlur}
              />
              <label htmlFor="email">Email</label>
            </div>
            {formAddUser.touched.email && (
              <p className="text-danger ">{formAddUser.errors.email}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-phone"></i>
              </span>
              <input
                required
                type="text"
                name="soDT"
                id="soDT"
                onChange={formAddUser.handleChange}
                value={formAddUser.values.soDT || ""}
                onBlur={formAddUser.handleBlur}
              />
              <label htmlFor="soDT">Số Điện Thoại</label>
            </div>
            {formAddUser.touched.soDT && (
              <p className="text-danger ">{formAddUser.errors.soDT}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user-edit"></i>
              </span>
              <select
                name="maLoaiNguoiDung"
                id="maLoaiNguoiDung"
                value={formAddUser.values.maLoaiNguoiDung || ""}
                onChange={formAddUser.handleChange}
              >
                <option>Loại người dùng</option>
                <option value="GV">Giáo vụ</option>
                <option value="HV">Học viên</option>
              </select>
            </div>
            <Modal.Footer>
              <button type="submit" variant="primary">
                Thêm người dùng
              </button>
              <button
                variant="secondary"
                onClick={() => {
                  setShowModalAdd(false);
                }}
              >
                Đóng
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        size="xl"
        className="modalGhiDanh"
        show={showModalGhiDanh}
        onHide={() => setShowModalGhiDanh(false)}
        style={{ minWidth: "80vw" }}
      >
        <Modal.Body style={{ display: "block" }}>
          <div className="border-bottom border-secondary">
            <div className="row">
              <h5 className="text-left col-6" id="URM-title">
                Chọn khóa muốn học ghi danh
              </h5>
            </div>
            <Table
              columns={columModalfirt}
              rowKey={"stt"}
              dataSource={courses}
              loading={loading}
              pagination={{
                total: courses.length,
                pageSize: 2,
                showSizeChanger: false,
                showQuickJumper: false,
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Body style={{ display: "block" }}>
          <div className="border-bottom border-secondary">
            <div className="row">
              <h5 className="text-left col-6" id="URM-title">
                Khóa học chờ xác thực
              </h5>
            </div>
            <Table
              columns={columCouresNotRegisted}
              rowKey={"stt"}
              dataSource={courseNotRegistered}
              loading={loading}
              pagination={{
                total: courseNotRegistered.length,
                pageSize: 2,
                showSizeChanger: false,
                showQuickJumper: false,
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Body style={{ display: "block" }}>
          <div className="border-bottom border-secondary">
            <div className="row">
              <h5 className="text-left col-6" id="URM-title">
                Khóa học đã ghi danh
              </h5>
            </div>
            <Table
              columns={columCouresRegisted}
              rowKey={"stt"}
              dataSource={courseRegistered}
              loading={loading}
              pagination={{
                total: courseRegistered.length,
                pageSize: 2,
                showSizeChanger: false,
                showQuickJumper: false,
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        className="modalSuccess"
        show={showNotificationModal}
        onHide={() => setShowNotificationModal(false)}
      >
        <Modal.Body className="bg-white text-center">
          <div className={isSuccess ? "successMessage" : "errorMessage"}>
            <i
              className={
                isSuccess
                  ? "fas fa-check-circle text-center text-success d-block"
                  : "fas fa-exclamation-circle text-center text-warning d-block"
              }
              style={{ fontSize: "50px" }}
            ></i>
            <span className="fs-4 ">{notificationMessage}</span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default page;
