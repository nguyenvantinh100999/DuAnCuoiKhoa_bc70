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
  Row,
  Col,
  Select,
} from "antd";
const { Header, Sider, Content } = Layout;
import { getHeaders, TOKEN_CYBERSOFT } from "@/app/utils/configHeader";
import axios from "axios";
import Search from "antd/es/input/Search";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../../../styles/modal/modalProfile.scss";
import { Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { USER_LOGIN } from "@/app/utils/setting";
const page = () => {
  const [loading, setLoading] = useState(false);
  const [dataCourse, setDataCourse] = useState([]);
  const [dataCourseCategory, setDataCourseCategory] = useState([]);
  const [dataCourseFilter, setDataCourseFilter] = useState([]);
  const [user, setUser] = useState(null);
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

  //--------Thêm khóa học--------------------
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // Quản lý danh sách tệp
  const handleFileChange = (info) => {
    setFileList(info.fileList); // Cập nhật danh sách tệp
  };
  const onFinish = async (values) => {
    try {
      console.log("value", values);

      let form = new FormData();
      //nafy laf vieets nawgsn gon
      Object.keys(values).forEach((key) => {
        if (key === "hinhAnh" && values[key]?.fileList?.length > 0) {
          form.append("hinhAnh", values[key].fileList[0].originFileObj);
        } else {
          form.append(key, values[key]);
        }
      });
      form.append("taiKhoanNguoiTao", user.taiKhoan);
      form.append("ngayTao", new Date().toLocaleDateString("en-GB"));
      console.log("form", form);
      //nay la viet chii tiet
      // form.append("maKhoaHoc",values.maKhoaHoc)
      // form.append("tenKhoaHoc",values.tenkhoahoc)
      //tiep tucj file thong tin
      //Gọi API thêm khóa học
      const response = await axios.post(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh",
        form,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // // Sau khi thêm khóa học thành công, gọi API tải lên hình ảnh
      // if (response.status === 200) {
      //   const frm = new FormData();
      //   frm.append("file", fileList[0]?.originFileObj); // Lấy tệp đầu tiên trong danh sách
      //   frm.append("tenKhoaHoc", values.tenKhoaHoc);

      //   const uploadResponse = await axios.post(
      //     "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
      //     frm
      //   );

      //   if (uploadResponse.status === 200) {
      //     message.success("Thêm khóa học thành công!");
      //     form.resetFields();
      //     setFileList([]); // Đặt lại danh sách tệp
      //   }
      // }
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
      console.error(error);
    }
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
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Mã Khóa Học"
                    name="maKhoaHoc"
                    rules={[
                      { required: true, message: "Vui lòng nhập mã khóa học!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Bí Danh"
                    name="biDanh"
                    rules={[
                      { required: true, message: "Vui lòng nhập bí danh!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Tên Khóa Học"
                    name="tenKhoaHoc"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên khóa học!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Mô Tả"
                    name="moTa"
                    rules={[
                      { required: true, message: "Vui lòng nhập mô tả!" },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Hình Ảnh"
                    name="hinhAnh"
                    rules={[
                      { required: true, message: "Vui lòng tải lên hình ảnh!" },
                    ]}
                  >
                    <Upload
                      beforeUpload={() => false} // Ngăn không cho tự động tải lên
                      onChange={handleFileChange}
                      fileList={fileList} // Sử dụng fileList để quản lý danh sách tệp
                      showUploadList={false}
                    >
                      <Button>Chọn Hình Ảnh</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Mã Nhóm"
                    name="maNhom"
                    rules={[
                      { required: true, message: "Vui lòng chọn mã nhóm!" },
                    ]}
                  >
                    <Select placeholder="Chọn mã nhóm">
                      <Select.Option value="GP01">GP01</Select.Option>
                      <Select.Option value="GP02">GP02</Select.Option>
                      <Select.Option value="GP03">GP03</Select.Option>
                      <Select.Option value="GP04">GP04</Select.Option>
                      <Select.Option value="GP05">GP05</Select.Option>
                      <Select.Option value="GP06">GP06</Select.Option>
                      <Select.Option value="GP07">GP07</Select.Option>
                      <Select.Option value="GP08">GP08</Select.Option>
                      <Select.Option value="GP09">GP09</Select.Option>
                      <Select.Option value="GP10">GP10</Select.Option>
                      <Select.Option value="GP11">GP11</Select.Option>
                      <Select.Option value="GP12">GP12</Select.Option>
                      <Select.Option value="GP13">GP13</Select.Option>
                      <Select.Option value="GP14">GP14</Select.Option>
                      <Select.Option value="GP15">GP15</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Mã Danh Mục Khóa Học"
                    name="maDanhMucKhoaHoc"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn mã danh mục khóa học!",
                      },
                    ]}
                  >
                    <Select placeholder="Chọn mã danh mục">
                      {dataCourseCategory.map((category) => (
                        <Select.Option
                          key={category.maDanhMuc}
                          value={category.maDanhMuc}
                        >
                          {category.tenDanhMuc}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Đánh Giá"
                    name="danhGia"
                    rules={[
                      { required: true, message: "Vui lòng nhập đánh giá!" },
                    ]}
                  >
                    <Input type="number" min={0} max={5} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Lượt Xem"
                    name="luotXem"
                    rules={[
                      { required: true, message: "Vui lòng nhập lượt xem!" },
                    ]}
                  >
                    <Input type="number" min={0} />
                  </Form.Item>
                </Col>
              </Row>

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
