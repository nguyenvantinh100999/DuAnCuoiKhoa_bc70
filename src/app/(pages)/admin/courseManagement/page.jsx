"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Space,
  Table,
  Button,
  Input,
  Avatar,
  Upload,
  message,
  Form,
} from "antd";
import Highlighter from "react-highlight-words";
const { Header, Sider, Content } = Layout;
import { getHeaders, TOKEN_CYBERSOFT } from "@/app/utils/configHeader";
import axios from "axios";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import * as Yup from "yup";
import "../../../styles/modal/modalProfile.scss";
import { ButtonGroup, Modal, ModalFooter } from "react-bootstrap";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { USER_LOGIN } from "@/app/utils/setting";
const page = () => {
  const [loading, setLoading] = useState(false);
  const [dataCourse, setDataCourse] = useState([]);
  const [dataCourseCategory, setDataCourseCategory] = useState([]);
  const [dataCourseFilter, setDataCourseFilter] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [showModalAddCourse, setShowModalAddCourse] = useState(false);
  const [userCourse, setUserCourse] = useState([]);
  const [userCourseRegister, setUserCourseRegister] = useState([]);
  const [userCourseNotRegister, setUserCourseNotRegister] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false); // State cho modal thông báo
  const [notificationMessage, setNotificationMessage] = useState(""); // Thông điệp thông báo
  const [isSuccess, setIsSuccess] = useState(false); // Kiểm tra loại thông báo (thành công hay thất bại)
  const router = useRouter();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(USER_LOGIN));
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push("/login");
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
  //---------------------lấy danh sách khóa học-----------------------------
  const getListCourse = async () => {
    setLoading(true);
    try {
      const res = await axios(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc",
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
      setDataCourse(dataWithSTT);
      return res.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListCourse();
    getCourseCategory();
  }, []);
  //-----------Tìm kiếm khóa học-----------------
  const handleSearchCourse = async (value) => {
    setLoading(true);
    try {
      if (value) {
        const res = await axios(
          `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${value}`,
          {
            method: "GET",
            headers: getHeaders(),
          }
        );
        const dataWithSTT = res.data.map((item, index) => ({
          ...item,
          stt: index + 1,
        }));
        setDataCourseFilter(dataWithSTT);
      } else {
        // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ danh sách
        setDataCourseFilter(dataCourse);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  //------------------lấy danh mục khóa học---------------
  const getCourseCategory = async () => {
    setLoading(true);
    try {
      const res = await axios(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc",
        {
          method: "GET",
          headers: getHeaders(),
        }
      );
      setDataCourseCategory(res.data);
      return res.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  //---------------------Thêm Khóa học-------------------
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (file) => {
    // Kiểm tra định dạng file (nếu cần)
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Bạn chỉ có thể tải lên hình ảnh!");
      return false; // Ngăn không cho tải lên
    }

    setImageUrl(file); // Lưu file vào state
    return false; // Ngăn không cho Upload tự động tải lên
  };

  const onFinish = async (values) => {
    try {
      let formData = new FormData();
      formData.append("file", imageUrl);
      // Gọi API tải hình ảnh
      const uploadResponse = await axios.post(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            TokenCybersoft: TOKEN_CYBERSOFT,
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );
      if (uploadResponse.status === 200) {
        // Kiểm tra xem server có trả về URL hình ảnh hay không
        const imageUrlResponse = uploadResponse.data; // Giả sử server trả về URL hình ảnh
        const courseData = {
          maKhoaHoc: values.maKhoaHoc,
          biDanh: values.biDanh,
          tenKhoaHoc: values.tenKhoaHoc,
          moTa: values.moTa,
          luotXem: 100,
          danhGia: 5,
          hinhAnh: imageUrlResponse, // URL hình ảnh
          maNhom: values.maNhom,
          ngayTao: new Date().toLocaleDateString("en-GB"), // Định dạng dd/MM/yyyy
          maDanhMucKhoaHoc: values.maDanhMucKhoaHoc,
          taiKhoanNguoiTao: user.taiKhoan,
        };
        const response = await axios.post(
          "http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHoc",

          courseData,
          { headers: headers }
        );
        if (response.status === 200) {
          message.success("Khóa học đã được thêm thành công!");
          form.resetFields();
          setImageUrl(null); // Reset file hình ảnh
        }
      }
    } catch (error) {
      message.error("Thêm khóa học thất bại!");
      alert(error.response?.data || error.message);
    }
    // const courseData = {
    //   ...values,
    //   luotXem: 0,
    //   hinhAnh: imageUrl,
    //   danhGia: 0,
    //   taiKhoanNguoiTao: user.taiKhoan,
    //   ngayTao: new Date().toISOString(), // Hoặc định dạng ngày bạn muốn
    // };
    // try {
    //   const response = await axios.post(
    //     "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHoc",
    //     {
    //       courseData,
    //       headers: headers,
    //     }
    //   );

    //   // Nếu thêm khóa học thành công, gọi API tải hình ảnh
    //   if (response.status === 200) {
    //     const uploadResponse = await axios.post(
    //       "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
    //       formData,
    //       {
    //         headers: headers,
    //       }
    //     );

    //     // Kiểm tra nếu tải hình ảnh thành công
    //     if (uploadResponse.status === 200) {
    //       message.success(
    //         "Khóa học đã được thêm thành công và hình ảnh đã được tải lên!"
    //       );
    //       form.resetFields();
    //       setImageFile(null); // Reset file hình ảnh
    //     }
    //   }
    // }
  };
  //-------------Xóa khóa học-------------------
  const handleDeleteCourse = async (maKhoaHoc) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa khóa học này không?"
    );

    // Nếu người dùng nhấn "Cancel", không làm gì cả
    if (!confirmDelete) {
      return;
    }
    try {
      const res = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`,
        {
          method: "DELETE",
          headers: headers,
          data: { maKhoaHoc: maKhoaHoc },
        }
      );
      showSuccessNotification("Xóa Khóa học thành công");
      getListCourse();
      console.log("Xóa Khóa học thành công", res.data);
    } catch (error) {
      // Log chi tiết lỗi
      const errorMessage = error.response?.data || "Đã xảy ra lỗi";
      showErrorNotification(errorMessage);
    }
  };
  //------------lấy danh sách học viên đã ghi danh khóa học----------------
  const getListUserCourse = async (maKhoaHoc) => {
    setLoading(true);
    try {
      const res = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
        {
          method: "POST",
          headers: headers,
          data: { maKhoaHoc: maKhoaHoc },
        }
      );
      const dataWithSTT = res.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        maKhoaHoc: maKhoaHoc,
      }));
      setUserCourse(dataWithSTT);
    } catch (error) {
      // Log chi tiết lỗi
      console.error("Lấy danh sách thất bại", error.response);
      alert(error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  //------------lấy danh sách học viên chờ xét duyệt khóa học----------------
  const getListUserResgister = async (maKhoaHoc) => {
    setLoading(true);
    try {
      const res = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`,
        {
          method: "POST",
          headers: headers,
          data: { maKhoaHoc: maKhoaHoc },
        }
      );
      const dataWithSTT = res.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        maKhoaHoc: maKhoaHoc,
      }));
      setUserCourseRegister(dataWithSTT);
    } catch (error) {
      // Log chi tiết lỗi
      console.error("Lấy danh sách thất bại", error.response);
      alert(error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  //------------lấy danh sách người dùng chưa ghi danh khóa học----------------
  const getListUserNotResgister = async (maKhoaHoc) => {
    setLoading(true);
    try {
      const res = await axios(
        `https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`,
        {
          method: "POST",
          headers: headers,
          data: { maKhoaHoc: maKhoaHoc },
        }
      );
      const dataWithSTT = res.data.map((item, index) => ({
        ...item,
        stt: index + 1,
        maKhoaHoc: maKhoaHoc,
      }));
      setUserCourseNotRegister(dataWithSTT);
    } catch (error) {
      // Log chi tiết lỗi
      console.error("Lấy danh sách thất bại", error.response);
      alert(error.response?.data);
    } finally {
      setLoading(false);
    }
  };
  //------------hàm gọi lấy danh sách ghi danh-------------------
  const handleClick = (maKhoaHoc) => {
    setShowModalRegister(true);
    getListUserCourse(maKhoaHoc);
    getListUserResgister(maKhoaHoc);
    getListUserNotResgister(maKhoaHoc);
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
      getListUserCourse(maKhoaHoc);
      getListUserResgister(maKhoaHoc);
      getListUserNotResgister(maKhoaHoc);
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
      getListUserCourse(maKhoaHoc);
      getListUserResgister(maKhoaHoc);
      getListUserNotResgister(maKhoaHoc);
      console.log(response.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Đã xảy ra lỗi";
      showErrorNotification(errorMessage);
    }
  };
  const columModalfirt = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Học viên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Chờ xác nhận",
      render: (record) => (
        <button
          className="btn btn-success"
          onClick={() => {
            registerCourse(record.taiKhoan, record.maKhoaHoc);
          }}
        >
          Ghi danh
        </button>
      ),
    },
  ];

  const columModalSecond = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Học viên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Chờ xác nhận",
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
  const columModalThree = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Học viên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Chờ xác nhận",
      render: (record) => (
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteRegisterCourse(record.taiKhoan, record.maKhoaHoc);
          }}
        >
          Xóa
        </button>
      ),
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã KH",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "tên KH",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text) => (
        <img src={text} alt="course" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "luotXem",
      key: "luotXem",
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      render: (record) => record.hoTen,
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
              handleClick(record.maKhoaHoc);
            }}
          >
            Ghi danh
          </Button>
          <Button
            style={{ marginRight: "5px", backgroundColor: "#ffd700" }}
            onClick={() => {
              // handleEdit(record);
            }}
          >
            Sửa
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              handleDeleteCourse(record.maKhoaHoc);
            }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="userTemplate" style={{ maxHeight: "100vh" }}>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              setShowModalAddCourse(true);
            }}
            className="btn btn-primary btnGlobal"
          >
            Thêm Khóa Học
          </button>
          <Search
            placeholder="Nhập khóa học cần tìm"
            allowClear
            enterButton="Tìm kiếm"
            size="large"
            onChange={(e) => {
              handleSearchCourse(e.target.value);
            }}
            style={{ width: 400 }}
          />
        </Header>
        <Table
          columns={columns}
          rowKey={"stt"}
          dataSource={
            dataCourseFilter.length > 0 ? dataCourseFilter : dataCourse
          }
          loading={loading}
          pagination={{
            total:
              dataCourseFilter.length > 0
                ? dataCourseFilter.length
                : dataCourse.length,
            pageSize: 6,
            showSizeChanger: false,
            showQuickJumper: false,
          }}
        />
        <Modal
          size="lg"
          className="modalProfile"
          show={showModalAddCourse}
          onHide={() => setShowModalAddCourse(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm Khóa học</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <form className="d-flex flex-wrap" role="form">
              <div className="form-group col-6 mb-2  px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="maKhoaHoc"
                    id="tknv"
                    className="form-control input-sm"
                    placeholder="Mã khóa học"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-address-book" />
                    </span>
                  </div>
                  <input
                    type="name"
                    name="tenKhoaHoc"
                    id="name"
                    className="form-control input-sm"
                    placeholder="Tên khóa học"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-briefcase" />
                    </span>
                  </div>
                  <select className="form-control" name="maDanhMucKhoaHoc">
                    <option value>Danh mục khóa học</option>
                    {dataCourseCategory.map((item, index) => {
                      return (
                        <option key={index} value={item.maDanhMuc}>
                          {item.tenDanhMuc}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-calendar" />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="ngayTao"
                    id="datepicker"
                    className="form-control"
                    placeholder="Ngày tạo"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-user" />
                    </span>
                  </div>
                  <input
                    type="number"
                    name="danhGia"
                    id="tknv"
                    className="form-control input-sm"
                    placeholder="Đánh giá"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-address-book" />
                    </span>
                  </div>
                  <input
                    type="number"
                    name="luotXem"
                    id="name"
                    className="form-control input-sm"
                    placeholder="Lượt xem"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-briefcase" />
                    </span>
                  </div>
                  <select className="form-control" name="taiKhoanNguoiTao">
                    <option value>Người tạo</option>
                  </select>
                </div>
                <span className="sp-thongbao" id="tbChucVu" />
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div>
                  <input
                    name="hinhAnh"
                    accept="image/png,image/jpg,image/jpeg"
                    type="file"
                    id="hinhAnh"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0 ">
                      <i className="fa fa-address-book" />
                    </span>
                  </div>
                  <select className="form-control" name="maNhom">
                    <option value>Mã nhóm</option>
                    <option value="GP01">GP01</option>
                    <option value="GP02">GP02</option>
                    <option value="GP03">GP03</option>
                    <option value="GP04">GP04</option>
                    <option value="GP05">GP05</option>
                    <option value="GP06">GP06</option>
                    <option value="GP07">GP07</option>
                    <option value="GP08">GP08</option>
                    <option value="GP09">GP09</option>
                    <option value="GP10">GP10</option>
                    <option value="GP11">GP11</option>
                    <option value="GP12">GP12</option>
                    <option value="GP13">GP13</option>
                    <option value="GP14">GP14</option>
                    <option value="GP15">GP15</option>
                  </select>
                </div>
              </div>
              <div className="col-12 container text-justify">
                <h5 className="card-header mb-2">Mô tả khóa học</h5>
                <div className="row">
                  <span className="col-3">
                    <img
                      src="/img/logo512.png"
                      className="img-fluid rounded"
                      height={200}
                      width={200}
                    />
                  </span>
                  <textarea
                    type="text"
                    name="moTa"
                    className="form-control input-sm w-75 col-9"
                    placeholder="Nhập mô tả"
                  />
                </div>
              </div>
              <div className="modal-footer col-12" id="modal-footer">
                <button id="btnThem" type="submit" className="btn btn-success">
                  Thêm khóa học
                </button>
                <button
                  id="btnDong"
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => {
                    setShowModalAddCourse(false);
                  }}
                >
                  Đóng
                </button>
              </div>
            </form> */}
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                name="maKhoaHoc"
                label="Mã Khóa Học"
                rules={[
                  { required: true, message: "Vui lòng nhập mã khóa học!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="biDanh"
                label="Bí Danh"
                rules={[{ required: true, message: "Vui lòng nhập bí danh!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"tenKhoaHoc"}
                id="tenKhoaHoc"
                label="Tên khóa học"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khóa học!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="moTa"
                label="Mô Tả"
                rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="maNhom"
                label="Mã Nhóm"
                rules={[{ required: true, message: "Vui lòng nhập mã nhóm!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="maDanhMucKhoaHoc"
                label="Mã Danh Mục Khóa Học"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã danh mục khóa học!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Hình Ảnh" name={"hinhAnh"}>
                <Upload beforeUpload={handleImageUpload} showUploadList={false}>
                  <Button>Chọn Hình Ảnh</Button>
                </Upload>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Thêm Khóa Học
                </Button>
              </Form.Item>
            </Form>
          </Modal.Body>
        </Modal>
      </Layout>
      <Modal
        size="xl"
        className="modalGhiDanh"
        show={showModalRegister}
        onHide={() => setShowModalRegister(false)}
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
              dataSource={userCourseNotRegister}
              loading={loading}
              pagination={{
                total: userCourseNotRegister.length,
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
              columns={columModalSecond}
              rowKey={"stt"}
              dataSource={userCourseRegister}
              loading={loading}
              pagination={{
                total: userCourseRegister.length,
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
              columns={columModalThree}
              rowKey={"stt"}
              dataSource={userCourse}
              loading={loading}
              pagination={{
                total: userCourse.length,
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
