// import LoginLayout from "@/app/layoutLoginRegister";
"use client";
import Link from "next/link";
import * as Yup from "yup";
import React, { useState } from "react";
import "../../styles/login/login.scss";
import { useFormik } from "formik";
import axios from "axios";
import { getHeaders } from "@/app/utils/configHeader";
import { TOKEN, USER_LOGIN } from "@/app/utils/setting";

import { useRouter } from "next/navigation";

const page = () => {
  const [isLoginActive, setIsLoginActive] = useState("");
  const router = useRouter();
  const fromLogin = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await axios(
          "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
          {
            method: "POST",
            headers: getHeaders(),
            data: values,
          }
        );
        const token = res.data.accessToken;
        const userLogin = JSON.stringify(res.data);
        localStorage.setItem(TOKEN, token);
        localStorage.setItem(USER_LOGIN, userLogin);
        router.push("/");
        alert("đăng nhập thành công");
        console.log("đăng nhập thành công", res.data);
      } catch (error) {
        alert("đăng nhập thất bại, tài khoản hoặc mật khẩu không đúng!");
        console.error("đăng nhập thất bại", error.response.data);
      }
    },
  });
  const formRegister = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP01",
      email: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Họ tên không được bỏ trống"),

      matKhau: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(8, "ít nhất 8 ký tự"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống"),
      soDT: Yup.string()
        .required("phone không được bỏ trống")
        .matches(
          /^(0[1-9]{1}[0-9]{8}|(84|0)(9[0-9]|8[1-9]|7[0-9]|6[2-9]|5[0-9]|4[0-9]|3[2-9]|2[0-9]|1[0-9])[0-9]{7})$/,
          "phone không hợp lệ (VD: 0909090909)"
        ),
      email: Yup.string()
        .required("email không được bỏ trống")
        .email("email không hợp lệ !"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios(
          "https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
          {
            method: "POST",
            headers: getHeaders(),
            data: values,
          }
        );
        alert("đăng ký thành công");
        console.log("đăng ký thành công", res.data);
        setIsLoginActive("");
        resetForm();
      } catch (error) {
        alert("đăng ký thất bại");
        console.error("đăng ký thất bại", error.response.dat);
      }
    },
  });
  return (
    <div className="loginForm">
      <div className="wrapper">
        <img src="/img/imgTree.png" alt="..." />
        <h3 className="text-right">Welcome</h3>
        <div className={`form-wrapper login ${isLoginActive}`}>
          <form onSubmit={fromLogin.handleSubmit}>
            <h2>Đăng Nhập</h2>
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user"></i>
              </span>
              <input
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                onChange={fromLogin.handleChange}
                value={fromLogin.values.taiKhoan}
                required
              />
              <label htmlFor="taiKhoan">Tài khoản</label>
            </div>
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                name="matKhau"
                id="matKhau"
                onChange={fromLogin.handleChange}
                value={fromLogin.values.matKhau}
                required
              />
              <label htmlFor="matKhau">Mật khẩu</label>
            </div>
            <div className="forgot-pass">
              <Link href="#">Quên mật khẩu?</Link>
            </div>
            <button type="submit">Đăng nhập</button>
            <div className="sign-link">
              <p>
                Bạn có tài khoản chưa?
                <Link
                  href={"#"}
                  onClick={() => {
                    setIsLoginActive("active");
                  }}
                >
                  Đăng Ký
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className={`form-wrapper register ${isLoginActive}`}>
          <form onSubmit={formRegister.handleSubmit}>
            <h2>Đăng Ký</h2>
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-user"></i>
              </span>
              <input
                required
                type="text"
                name="taiKhoan"
                id="taiKhoan"
                onChange={formRegister.handleChange}
                value={formRegister.values.taiKhoan}
                onBlur={formRegister.handleBlur}
              />
              <label htmlFor="taiKhoan">Tài khoản</label>
            </div>
            {formRegister.errors.taiKhoan && (
              <p className="text-danger ">{formRegister.errors.taiKhoan}</p>
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
                onChange={formRegister.handleChange}
                value={formRegister.values.hoTen}
                onBlur={formRegister.handleBlur}
              />
              <label htmlFor="hoTen">Họ Tên</label>
            </div>
            {formRegister.errors.hoTen && (
              <p className="text-danger ">{formRegister.errors.hoTen}</p>
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
                onChange={formRegister.handleChange}
                value={formRegister.values.matKhau}
                onBlur={formRegister.handleBlur}
              />
              <label htmlFor="matKhau">Mật khẩu</label>
            </div>
            {formRegister.errors.matKhau && (
              <p className="text-danger ">{formRegister.errors.matKhau}</p>
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
                onChange={formRegister.handleChange}
                value={formRegister.values.email}
                onBlur={formRegister.handleBlur}
              />
              <label htmlFor="email">Email</label>
            </div>

            {formRegister.errors.email && (
              <p className="text-danger ">{formRegister.errors.email}</p>
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
                onChange={formRegister.handleChange}
                value={formRegister.values.soDT}
                onBlur={formRegister.handleBlur}
              />
              <label htmlFor="soDT">Số Điện Thoại</label>
            </div>

            {formRegister.errors.soDT && (
              <p className="text-danger ">{formRegister.errors.soDT}</p>
            )}
            <div className="input-box">
              <span className="icon">
                <i className="fa fa-users"></i>
              </span>
              <select
                name="maNhom"
                id="maNhom"
                onChange={formRegister.handleChange}
                value={formRegister.values.maNhom}
              >
                <option value="GP01">GP01</option>
                <option value="GP02">GP02</option>
                <option value="GP03">GP03</option>
              </select>
            </div>
            <button type="submit">Đăng Ký</button>
            <div className="sign-link">
              <p>
                Bạn đã có tài khoản?
                <Link
                  href="#"
                  onClick={() => {
                    setIsLoginActive("");
                    formRegister.resetForm();
                  }}
                >
                  Đăng Nhập
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
