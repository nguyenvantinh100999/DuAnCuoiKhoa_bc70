"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "../../styles/profile/profile.scss";
import "../../styles/modal/modalProfile.scss";
import { TOKEN_CYBERSOFT } from "@/app/utils/configHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { USER_LOGIN } from "@/app/utils/setting";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import { useFormik } from "formik";
import Link from "next/link";
const page = () => {
  const [profile, setProfile] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState("");

  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(USER_LOGIN));
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push("/login");
    }
  }, [router]);

  const data = (id) => {
    return {
      maKhoaHoc: id,
      taiKhoan: user?.taiKhoan,
    };
  };
  const headers = {
    TokenCybersoft: TOKEN_CYBERSOFT,
    Authorization: `Bearer ${user?.accessToken}`,
    "Content-Type": "application/json",
  };
  const getProfileAction = async () => {
    if (!user) return; //kiểm tra user có tồn tại hay không
    try {
      const res = await axios(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        {
          method: "POST",
          headers: headers,
        }
      );
      setProfile(res.data);
    } catch (error) {
      alert("vui lòng đăng nhập");
      router.push("/login");
    }
  };
  const handleDeleteCousre = async (maKhoaHoc) => {
    try {
      const response = await axios.post(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh",
        data(maKhoaHoc),
        {
          headers: headers,
        }
      );
      alert("Hủy khóa học thành công!");
      getProfileAction();
    } catch (error) {
      alert(error.response.data);
    }
  };
  useEffect(() => {
    getProfileAction();
  }, [user]);
  const formEditProfile = useFormik({
    initialValues: {
      taiKhoan: profile.taiKhoan || "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: profile.maNhom || "",
      email: "",
      maLoaiNguoiDung: profile.maLoaiNguoiDung || "",
    },
    validationSchema: Yup.object().shape({
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
        alert("Cập nhật thành công");
        console.log("Cập nhật thành công", res.data);
        getProfileAction();
        resetForm();
      } catch (error) {
        alert(error.response.data);
        console.error("đăng ký thất bại", error.response.data);
      }
    },
  });
  useEffect(() => {
    if (profile) {
      formEditProfile.setValues({
        taiKhoan: profile.taiKhoan,
        matKhau: "",
        hoTen: "",
        soDT: "",
        maNhom: profile.maNhom,
        email: "",
        maLoaiNguoiDung: profile.maLoaiNguoiDung,
      });
    }
  }, [profile]);
  return (
    <section className="infoPage">
      <div className="titleCourse">
        <h3>Thông tin cá nhân</h3>
        <p>Thông tin học viên</p>
      </div>
      <div className="infoPageContent">
        <div className="row ">
          <div className="col-lg-3 col-md-4">
            <div className="infoLeft">
              <img
                src="https://cdn.dribbble.com/users/2364329/screenshots/6676961/02.jpg?compress=1&resize=800x600"
                alt="..."
              />
              <h6>Robert Nguyễn</h6>
              <p>Lập trình viên Front-end</p>
              <button className="btnInfo">Hồ sơ cá nhân</button>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="infoRight">
              <div className="tab">
                <button
                  className={`infoProfile ${active} me-1`}
                  onClick={() => {
                    setActive("");
                  }}
                >
                  Thông tin cá nhân
                </button>
                <button
                  className={`infoCourse ${active}`}
                  onClick={() => {
                    setActive("active");
                  }}
                >
                  Xem Khóa học
                </button>
              </div>
              <div id="infoPersonal" className="tabContent active">
                <section className={`userInfo ${active}`}>
                  <div className="userInfoTop">
                    <div className="row">
                      <div className="col-md-7">
                        <div>
                          <p>
                            Email: <span className="ml-2">{profile.email}</span>
                          </p>
                          <p>
                            Họ và tên:
                            <span className="ml-2">{profile.hoTen}</span>
                          </p>
                          <p>
                            Số điện thoại:
                            <span className="ml-2">{profile.soDT}</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <p>
                          Tài khoản:
                          <span className="ml-2">{profile.taiKhoan}</span>
                        </p>
                        <p>
                          Nhóm: <span className="ml-2">{profile.maNhom}</span>
                        </p>
                        <p>
                          Đối tượng:
                          <span className="ml-2">
                            {profile.maLoaiNguoiDung}
                          </span>
                        </p>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setShowModal(true);
                          }}
                          className="btnGlobal"
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="userInfoBot">
                    <h4>Kĩ năng của tôi</h4>
                    <div className="row">
                      <div className="skillAll col-xl-8 col-lg-6">
                        <div className="mySkill skillBtnHtml">
                          <button className="skillBtnCustom">html</button>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                        <div className="mySkill skillBtnCss ">
                          <button className="skillBtnCustom skillBtnHtml">
                            css
                          </button>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "75%" }}
                            />
                          </div>
                        </div>
                        <div className="mySkill skillBtnJs">
                          <button className="skillBtnCustom ">js</button>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "50%" }}
                            />
                          </div>
                        </div>
                        <div className="mySkill skillBtnReact">
                          <button className="skillBtnCustom skillBtnHtml">
                            react
                          </button>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-striped progress-bar-animated"
                              role="progressbar"
                              aria-valuenow={75}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: "80%" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6">
                        <div className="timeStudy">
                          <div className="timeStudyItem">
                            <i className="fas fa-user-clock mr-2" />
                            <div>
                              <h6>Giờ học</h6>
                              <p>80</p>
                            </div>
                          </div>
                          <div className="timeStudyItem">
                            <i className="fas fa-layer-group mr-2" />
                            <div>
                              <h6>Điểm tổng</h6>
                              <p>80</p>
                            </div>
                          </div>
                          <div className="timeStudyItem">
                            <i className="fas fa-swatchbook mr-2" />
                            <div>
                              <h6>Buổi học</h6>
                              <p>40</p>
                            </div>
                          </div>
                          <div className="timeStudyItem">
                            <i className="fas fa-signal mr-2" />
                            <div>
                              <h6>Cấp độ</h6>
                              <p>Trung cấp</p>
                            </div>
                          </div>
                          <div className="timeStudyItem">
                            <i className="fas fa-graduation-cap mr-2" />
                            <div>
                              <h6>Học lực</h6>
                              <p>Khá</p>
                            </div>
                          </div>
                          <div className="timeStudyItem">
                            <i className="fas fa-book mr-2" />
                            <div>
                              <h6>Bài tập</h6>
                              <p>100</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div id="infoCourse" className="tabContent">
                <section className={`myCourseInfo ${active}`}>
                  <div className="findCourseNet">
                    <h6>Khóa học của tôi</h6>
                    <form>
                      <input
                        type="text"
                        className="searchForm"
                        placeholder="Tìm kiếm..."
                      />
                    </form>
                  </div>
                  <div className="myCourseItem">
                    {profile.chiTietKhoaHocGhiDanh?.map((item) => {
                      return (
                        <div className="row" key={item.maKhoaHoc}>
                          <div className="col-xl-3 col-lg-4">
                            <img
                              className="imgNet"
                              src={item.hinhAnh}
                              alt="..."
                            />
                          </div>
                          <div className="col-xl-7 col-lg-6 cardNetContent">
                            <h6>{item.tenKhoaHoc}</h6>
                            <p className="colorCardTitle">{item.moTa}</p>
                            <div className="iconNetCard">
                              <span className="textCardTitle">
                                <i className="far fa-clock iconOclock" /> 8 giờ
                              </span>
                              <span className="textCardTitle">
                                <i className="far fa-calendar iconCalendar" />
                                23 giờ
                              </span>
                              <span className="textCardTitle">
                                <i className="fas fa-signal iconLevel " /> All
                                level
                              </span>
                            </div>
                            <p className="iconStarNet">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                            </p>
                            <div>
                              <img
                                className="imgNetFooter"
                                src="/img/instrutor10.89946c43.jpg"
                                alt="..."
                              />
                              <span className="ml-2">Nguyễn Nam</span>
                            </div>
                          </div>
                          <div className="col-xl-2 col-lg-2 cancelNet">
                            <Link href={`/detail/${item.maKhoaHoc}`}>
                              Xem chi tiết
                              <i className="fas fa-chevron-right"></i>
                            </Link>
                            <button
                              className="btnGlobal"
                              onClick={() => {
                                handleDeleteCousre(item.maKhoaHoc);
                              }}
                            >
                              Hủy khóa học
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
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
                  name="hoTen"
                  id="hoTen"
                  onChange={formEditProfile.handleChange}
                  value={formEditProfile.values.hoTen}
                  onBlur={formEditProfile.handleBlur}
                />
                <label htmlFor="hoTen">Họ Tên</label>
              </div>
              {formEditProfile.errors.hoTen && (
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
                  value={formEditProfile.values.matKhau}
                  onBlur={formEditProfile.handleBlur}
                />
                <label htmlFor="matKhau">Mật khẩu</label>
              </div>
              {formEditProfile.errors.matKhau && (
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
                  value={formEditProfile.values.email}
                  onBlur={formEditProfile.handleBlur}
                />
                <label htmlFor="email">Email</label>
              </div>
              {formEditProfile.errors.email && (
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
                  value={formEditProfile.values.soDT}
                  onBlur={formEditProfile.handleBlur}
                />
                <label htmlFor="soDT">Số Điện Thoại</label>
              </div>
              {formEditProfile.errors.soDT && (
                <p className="text-danger ">{formEditProfile.errors.soDT}</p>
              )}
              <Modal.Footer>
                <Button type="submit" variant="primary">
                  Lưu thông tin
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowModal(false);
                    formEditProfile.resetForm();
                  }}
                >
                  Đóng
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
};

export default page;
