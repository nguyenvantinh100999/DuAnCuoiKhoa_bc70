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
  const [isVisible, setIsVisible] = useState(false);
  const [showMenuMobile, setShowMenuMobile] = useState(false);
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
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    // Thêm listener cho sự kiện scroll với passive: true
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const functionLogOut = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  return (
    <div className={`header ${isVisible ? "visible" : ""}`}>
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
          <div className="menuMobie">
            <i
              className="fas fa-sort-down iconMenuMobie"
              onClick={() => setShowMenuMobile((prev) => !prev)}
            />
            <ul className={`menuHeaderMobie ${showMenuMobile ? "active" : ""}`}>
              <li>
                <SearchForm />
              </li>
              <li className="courseCateMobie">
                <Link href="/trangchu">Danh mục</Link>
                <ul className="courseCateListMobie">
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
                <Link href="/blog">Blog</Link>
              </li>
              <li className="eventHeaderMobie courseCateMobie">
                <Link href="/sukien">Sự kiện</Link>
              </li>
              <li>
                <Link href="/info">Thông tin</Link>
              </li>
              <li>
                <Link
                  href="/trangchu"
                  onClick={() => {
                    functionLogOut();
                  }}
                >
                  Đăng xuất
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
