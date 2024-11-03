"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import "../styles/headerHome/headerHome.scss";
import SearchForm from "./SearchForm";
import IconProfile from "./iconProfile";
import { API_URL, getHeaders } from "../utils/configHeader";
import axios from "axios";
const HeaderHome = () => {
  const [category, setCategory] = useState([]);
  const getCourseCategoriesAction = async () => {
    const res = await axios(
      `${API_URL}/QuanLyKhoaHoc/LayDanhMucKhoaHoc`,
      {
        method: "GET", // phương thức HTTP
        headers: getHeaders(),
      },
      { next: { revalidate: 10 } }
    );
    setCategory(res.data);
  };
  useEffect(() => {
    getCourseCategoriesAction();
  }, []);
  return (
    <div className="header">
      <div className="container">
        <div className="headerLeft">
          <div className="logo">
            <Link href="/">
              <Image
                src="/img/logo.png"
                alt="logo"
                width={250}
                height={250}
                crossOrigin="anonymous"
                quality={100}
                style={{ height: "auto" }}
              />
            </Link>
          </div>
          <SearchForm />
        </div>
        <div className="headerRight">
          <ul className="menuHeader">
            <li className="courseCate">
              <Link href="/">
                <i className="fas fa-bars mr-1"></i>
                Danh mục
              </Link>
              <ul className="courseCateList">
                {category?.map((item) => {
                  return (
                    <li key={item.maDanhMuc}>
                      <Link href={`/category/${item.maDanhMuc}`}>
                        {item.tenDanhMuc}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <Link href={`/courses/?page=1`}>Khóa học</Link>
            </li>
            <li>
              <Link href="/">Blog</Link>
            </li>
            <li>
              <Link href="/">Sự kiện</Link>
            </li>
            <li>
              <Link href="/info">Thông tin</Link>
            </li>
          </ul>
        </div>
        <div className="showIconHeader">
          <IconProfile />

          <div className="menuMobile"></div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
