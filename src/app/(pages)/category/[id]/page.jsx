import React from "react";
import "../../../styles/category/category.scss";
import Link from "next/link";
import { getCourseListByCategoryAction } from "@/app/actions/service/productApi";
import Image from "next/image";
const Category = async (props) => {
  const { id } = props.params;
  const data = await getCourseListByCategoryAction(id);

  return (
    <div className="CourseCategories">
      <div className="titleCourse">
        <h3>Khóa học theo danh mục</h3>
        <p>Hãy chọn khóa học mong muốn !!!</p>
      </div>
      <div className="listCourseCategory">
        <div className="courseCateName">
          <button className="courseCategoryBtn">
            <i className="fas fa-desktop" />
            <span className="ml-2 listCourseTitle">
              {data[1].danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </span>
          </button>
        </div>
        <div className="mt-3">
          <div className="row">
            {data.map((item) => {
              return (
                <div
                  key={item.maKhoaHoc}
                  className="col-xl-3 col-lg-4 col-md-6 mt-4 cardGlobalRes"
                >
                  <div className="cardGlobal" href="/chitiet/111111111111">
                    <Image
                      width={250}
                      height={250}
                      crossOrigin="anonymous"
                      quality={100}
                      className=""
                      src={item.hinhAnh}
                      alt="..."
                      style={{ height: "auto" }}
                    />
                    <span className="stikerCard">{item.tenKhoaHoc}</span>
                    <div className="cardBodyGlobal">
                      <h6>
                        {item.moTa.length > 50
                          ? item.moTa.substring(0, 50) + "..."
                          : item.moTa}
                      </h6>
                      <div className="cardIcon">
                        <span>
                          <i className="far fa-clock iconOclock" />8 giờ
                        </span>
                        <span>
                          <i className="far fa-calendar-alt iconCalendar" />4
                          tuần
                        </span>
                        <span>
                          <i className="fas fa-signal iconLevel" />
                          Tất cả
                        </span>
                      </div>
                    </div>
                    <div className="cardFooter">
                      <div className="titleMaker">
                        <div className="imgCardFooter">
                          <img src="/img/avatar2.bb9626e2.png" alt="..." />
                        </div>
                        <span className="ml-2 colorCardTitle">Elon Musk</span>
                      </div>
                      <div className="cardFooter-price">
                        <p>
                          800.000<sup>đ</sup>
                        </p>
                        <p>
                          400.000<sup>đ</sup>
                          <i className="fas fa-tag iconTag" />
                        </p>
                      </div>
                    </div>
                    <div className="subCard">
                      <div className="subCardHead">
                        <img src="/img/emoji.6d1b7051.png" alt="..." />
                        <span className="ml-1 colorCardTitle">
                          Elun Musk Ricard
                        </span>
                      </div>
                      <h6>
                        BOOTCAMP - LẬP TRÌNH FULL STACK TỪ ZERO ĐẾN CÓ VIỆC
                      </h6>
                      <p className="colorCardTitle">
                        Đã có hơn 6200 bạn đăng kí học và có việc làm thông qua
                        chương trình đào tạo Bootcamp Lập trình Front End chuyên
                        nghiệp. Khóa học 100% thực hành cường độ cao theo dự án
                        thực tế và kết nối doanh nghiệp hỗ trợ tìm việc ngay sau
                        khi học...
                      </p>
                      <div className="cardIcon">
                        <span>
                          <i className="far fa-clock iconOclock" />8 giờ
                        </span>
                        <span>
                          <i className="far fa-calendar-alt iconCalendar" />4
                          tuần
                        </span>
                        <span>
                          <i className="fas fa-signal iconLevel" />
                          Tất cả
                        </span>
                      </div>

                      <Link
                        className="btnGlobal btnSubCard"
                        href={`/detail/${item.maKhoaHoc}`}
                      >
                        xem chi tiết
                      </Link>
                    </div>
                    <div className="cardSale">
                      <span>Yêu thích</span>
                    </div>
                    <Link
                      href={`/detail/${item.maKhoaHoc}`}
                      className="viewDetail"
                    >
                      Xem chi tiết
                      <i className="fas fa-chevron-right"></i>{" "}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
