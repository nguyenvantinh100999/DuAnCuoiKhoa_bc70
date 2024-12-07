"use client";
import React, { useRef, useEffect, useState } from "react";
import { deburr } from "lodash";
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
import Dropdown from "react-bootstrap/Dropdown";
import { useRouter } from "next/navigation";
import { USER_LOGIN } from "@/app/utils/setting";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ClientImageComponent from "@/app/components/ClientImageComponent";
const page = () => {
  const [loading, setLoading] = useState(false);
  const [dataCourse, setDataCourse] = useState([]);
  const [dataCourseCategory, setDataCourseCategory] = useState([]);
  const [dataCourseFilter, setDataCourseFilter] = useState([]);
  const [user, setUser] = useState(null);
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [ShowModalEditProfile, setShowModalEditProfile] = useState(false);
  const [showModalAddCourse, setShowModalAddCourse] = useState(false);
  const [showModalEditCourse, setShowModalEditCourse] = useState(false);
  const [userCourse, setUserCourse] = useState([]);
  const [userCourseRegister, setUserCourseRegister] = useState([]);
  const [userCourseNotRegister, setUserCourseNotRegister] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false); // State cho modal thông báo
  const [notificationMessage, setNotificationMessage] = useState(""); // Thông điệp thông báo
  const [isSuccess, setIsSuccess] = useState(false); // Kiểm tra loại thông báo (thành công hay thất bại)
  const router = useRouter();
  const [buttonEdit, setButtonEdit] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [khoaHocClick, setKhoaHocClick] = useState("");
  const [imageUrl, setImageUrl] = React.useState(null); // State để lưu trữ URL hình ảnh
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
      const normalizedValue = deburr(value.trim());
      if (normalizedValue) {
        const res = await axios(
          `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${normalizedValue}`,
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
    setShowModalEditProfile(true);
  };
  //----Đăng xuất người dùng admin--------
  const handleLogoutAmin = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessToken");
    window.location.reload();
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
        resetForm();
      } catch (error) {
        const errorMessage = error.response?.data || "Đã xảy ra lỗi";
        showErrorNotification(errorMessage);
      }
    },
  });
  //--------Thêm và cập nhật khóa học khóa học--------------------
  const [formAdd] = Form.useForm();
  const [fileList, setFileList] = useState([]); // Quản lý danh sách tệp
  const handleFileChange = (info) => {
    setFileList(info.fileList); // Cập nhật danh sách tệp
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj; // Lấy tệp hình ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Cập nhật URL hình ảnh
      };
      reader.readAsDataURL(file); // Đọc tệp hình ảnh
    } else {
      setImageUrl(null); // Nếu không có tệp nào, đặt URL về null
    }
  };
  const onFinish = async (values) => {
    let url =
      "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh";
    if (buttonEdit) {
      url =
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload";
    }
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
      const response = await axios.post(url, form, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      });
      showSuccessNotification(
        buttonEdit ? "Chỉnh sửa thành công" : "Thêm Khóa học thành công"
      );
      getListCourse();
      formAdd.resetFields();
      setShowModalAddCourse(false);
      setFileList([]);
      setImageUrl(null);
      console.log(
        buttonEdit ? "Chỉnh sửa thành công" : "Thêm Khóa học thành công",
        response.data
      );
    } catch (error) {
      // Log chi tiết lỗi
      const errorMessage = error.response?.data || "Đã xảy ra lỗi";
      showErrorNotification(errorMessage);
      setFileList([]);
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
  const options = userCourseNotRegister?.map((item) => {
    return { value: item.taiKhoan, label: item.hoTen };
  });
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
  //------------bí danh----------------
  const handleNameChange = (e) => {
    const value = e.target.value;
    // Chuyển đổi tên khóa học thành bí danh
    const alias = value
      .normalize("NFD") // Loại bỏ dấu
      .replace(/[\u0300-\u036f]/g, "") // Xóa các ký tự dấu
      .trim()
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu "-"
      .toLowerCase(); // Chuyển thành chữ thường

    // Cập nhật giá trị bí danh trong form
    formAdd.setFieldsValue({ biDanh: alias });
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
    onFilter: (value, record) => {
      if (dataIndex === "nguoiTao") {
        return record.nguoiTao.hoTen
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
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
            className="btn btn-success me-2"
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
      ...getColumnSearchProps("maKhoaHoc"),
    },
    {
      title: "tên KH",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      ...getColumnSearchProps("tenKhoaHoc"),
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text) => (
        <ClientImageComponent
          src={text}
          alt={"course"}
          style={(50, 50)}
          fallbackSrc="/img/back-end-trung-cap_gp01.png"
        />
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
      ...getColumnSearchProps("nguoiTao"),
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
              setKhoaHocClick(record.maKhoaHoc);
            }}
          >
            Ghi danh
          </Button>
          <Button
            style={{ marginRight: "5px", backgroundColor: "#ffd700" }}
            onClick={() => {
              const updatedRecord = {
                ...record,
                maDanhMucKhoaHoc: record.danhMucKhoaHoc.maDanhMucKhoahoc,
              };
              console.log("Selected Course Record:", record);
              formAdd.setFieldsValue(updatedRecord); // Điền dữ liệu vào form
              setShowModalAddCourse(true); // Mở modal
              setImageUrl(record.hinhAnh);
              setButtonEdit(true);
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
        <Header>
          <button
            onClick={() => {
              setShowModalAddCourse(true);
              setButtonEdit(false);
              formAdd.resetFields();
              setImageUrl(null);
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
          <div className="iconProfile">
            <p>
              Xin chào <span>{user?.hoTen},</span>
            </p>
            <img src="/img/emoji.6d1b7051.png" alt="iconProfile" />
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
          </div>
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
            pageSize: 5,
            showSizeChanger: false,
            showQuickJumper: false,
          }}
        />
      </Layout>
      <Modal
        size="lg"
        className="modalProfile"
        show={showModalAddCourse}
        onHide={() => setShowModalAddCourse(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {buttonEdit ? "Chỉnh sửa khóa học" : "Thêm Khóa học"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{ width: "100%" }}
            form={formAdd}
            layout="vertical"
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Mã Khóa Học"
                  name="maKhoaHoc"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã khóa học!" },
                  ]}
                >
                  {buttonEdit ? <Input disabled /> : <Input />}
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
                  <Input disabled />
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
                  <Input onChange={handleNameChange} />
                </Form.Item>
              </Col>
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
            <Row gutter={16}>
              <Col span={6}>
                {imageUrl && ( // Hiển thị hình ảnh nếu có URL
                  <img
                    src={imageUrl}
                    alt="Hình Ảnh Khóa Học"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                )}
              </Col>
              <Col span={6}></Col>
              <Col span={12}>
                <Form.Item
                  label="Mô Tả"
                  name="moTa"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: 10 }}
              >
                {buttonEdit ? "Lưu thông tin" : "Thêm khóa học"}
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        size="xl"
        className="modalGhiDanh"
        show={showModalRegister}
        onHide={() => setShowModalRegister(false)}
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
                placeholder="Chọn tài khoản"
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
                className="btn btn-success col w-100"
                onClick={() => {
                  registerCourse(selectedValue, khoaHocClick);
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
                Học viên chờ xác thực
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
                Học viên đã ghi danh
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
        className="modalProfile"
        show={ShowModalEditProfile}
        onHide={() => setShowModalEditProfile(false)}
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
              <button type="submit" className="btn btn-primary">
                Lưu thông tin
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowModalEditProfile(false);
                }}
              >
                Đóng
              </button>
            </Modal.Footer>
          </form>
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
