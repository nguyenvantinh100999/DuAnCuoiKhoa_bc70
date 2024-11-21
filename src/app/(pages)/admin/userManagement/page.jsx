"use client";
import React, { useRef, useEffect, useState } from "react";
import { deburr } from "lodash";
import { Layout, Menu, Space, Table, Button, Input, Select } from "antd";
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
  const [buttonEdit, setButtonEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [taiKhoanClick, setTaiKhoanClick] = useState("");
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
    formUser.setValues({
      taiKhoan: user?.taiKhoan || "", // Đảm bảo không phải là undefined
      hoTen: user?.hoTen || "",
      soDT: user?.soDt || "",
      email: user?.email || "",
      maLoaiNguoiDung: user?.maLoaiNguoiDung || "",
      maNhom: user?.maNhom || "GP01",
    });
    setShowModalAdd(true);
    setButtonEdit(true);
  };
  //----Đăng xuất người dùng admin--------
  const handleLogoutAmin = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  //----chỉnh sửa người dùng--------

  const handleEdit = (record) => {
    formUser.setValues({
      taiKhoan: record.taiKhoan || "", // Đảm bảo không phải là undefined
      hoTen: record.hoTen || "",
      soDT: record.soDt || "",
      email: record.email || "",
      maLoaiNguoiDung: record.maLoaiNguoiDung || "",
      maNhom: record.maNhom || "GP01",
    });
    setShowModalAdd(true);
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

  //-------Thêm và chỉnh sữa người dùng người dùng----------------
  const formUser = useFormik({
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

    onSubmit: async (data, { resetForm }) => {
      let url =
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung";
      let method = "POST";
      if (buttonEdit) {
        url =
          "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung";
        method = "PUT";
      }
      try {
        const res = await axios({
          url,
          method,
          headers: headers,
          data,
        });
        showSuccessNotification(
          buttonEdit ? "Cập nhật thành công" : "Thêm người dùng thành công"
        );
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
  //------------lấy danh sách khóa học chưa ghi danh----------------
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
      console.log("asdasd", options);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khóa học:", error);
    } finally {
      setLoading(false);
    }
  };
  const options = courses?.map((item) => {
    return { value: item.maKhoaHoc, label: item.tenKhoaHoc };
  });
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
      setSelectedValue([]);
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
  //---------------Filter Table------------------------
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearchFilter = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleResetFilter = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          id="inputSearchFilterform"
          name="inputSearchFilterform"
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearchFilter(selectedKeys, confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearchFilter(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleResetFilter(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
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
      ...getColumnSearchProps("hoTen"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      ...getColumnSearchProps("soDt"),
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
              setTaiKhoanClick(record.taiKhoan);
            }}
          >
            Ghi danh
          </Button>
          <Button
            style={{ marginRight: "5px", backgroundColor: "#ffd700" }}
            onClick={() => {
              handleEdit(record);
              setButtonEdit(true);
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
  return (
    <div className="userTemplate" style={{ maxHeight: "100vh" }}>
      <Layout>
        <Header>
          <button
            onClick={() => {
              setShowModalAdd(true);
              setButtonEdit(false);
              formUser.resetForm();
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
        show={showModalAdd}
        onHide={() => setShowModalAdd(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {buttonEdit ? "Cập nhật thông tin nguời dùng" : "Thêm người dùng"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="formAddUser" onSubmit={formUser.handleSubmit}>
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user-edit"></i>
              </span>
              <input
                required
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                onChange={formUser.handleChange}
                value={formUser.values.taiKhoan || ""}
                onBlur={formUser.handleBlur}
              />
              <label htmlFor="taiKhoan">Tài khoản</label>
            </div>
            {formUser.touched.taiKhoan && (
              <p className="text-danger ">{formUser.errors.taiKhoan}</p>
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
                onChange={formUser.handleChange}
                value={formUser.values.hoTen || ""}
                onBlur={formUser.handleBlur}
              />
              <label htmlFor="hoTen">Họ Tên</label>
            </div>
            {formUser.touched.hoTen && (
              <p className="text-danger ">{formUser.errors.hoTen}</p>
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
                onChange={formUser.handleChange}
                value={formUser.values.matKhau || ""}
                onBlur={formUser.handleBlur}
              />
              <label htmlFor="matKhau">Mật khẩu</label>
            </div>
            {formUser.touched.matKhau && (
              <p className="text-danger ">{formUser.errors.matKhau}</p>
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
                onChange={formUser.handleChange}
                value={formUser.values.email || ""}
                onBlur={formUser.handleBlur}
              />
              <label htmlFor="email">Email</label>
            </div>
            {formUser.touched.email && (
              <p className="text-danger ">{formUser.errors.email}</p>
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
                onChange={formUser.handleChange}
                value={formUser.values.soDT || ""}
                onBlur={formUser.handleBlur}
              />
              <label htmlFor="soDT">Số Điện Thoại</label>
            </div>
            {formUser.touched.soDT && (
              <p className="text-danger ">{formUser.errors.soDT}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user-edit"></i>
              </span>
              <select
                name="maLoaiNguoiDung"
                id="maLoaiNguoiDung"
                value={formUser.values.maLoaiNguoiDung || ""}
                onChange={formUser.handleChange}
              >
                <option>Loại người dùng</option>
                <option value="GV">Giáo vụ</option>
                <option value="HV">Học viên</option>
              </select>
            </div>
            <Modal.Footer>
              <button type="submit" className="btn btn-primary">
                {buttonEdit ? "Lưu thông tin" : "Thêm người dùng"}
              </button>
              <button
                className="btn btn-secondary"
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
            <div className="row justify-content-between align-items-center">
              <h5 className="text-left col-3" id="URM-title">
                Chọn khóa học
              </h5>
              <Select
                className="col-7"
                showSearch
                placeholder="Chọn Khóa học"
                value={selectedValue}
                onChange={(value) => setSelectedValue(value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={options}
              />
              <button
                className="btn btn-success col"
                onClick={() => {
                  registerCourse(taiKhoanClick, selectedValue);
                }}
              >
                Ghi Danh
              </button>
            </div>
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
