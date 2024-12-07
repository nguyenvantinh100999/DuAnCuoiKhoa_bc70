import React from "react";
import "../../styles/search/search.scss";
import Link from "next/link";
import { getCourseListInfoByKeyWord } from "@/app/actions/service/productApi";
import ClientImageComponent from "@/app/components/ClientImageComponent";

const Search = async (props) => {
  const keyword = props.searchParams.keyword || "";

  const data = await getCourseListInfoByKeyWord(keyword);
  const handleImageError = (e) => {
    e.target.src = "/img/back-end-trung-cap_gp01.png"; // Thay bằng ảnh mặc định của bạn
  };
  return (
    <div className="searchPageContainer">
      <div className="titleCourse">
        <h3>Tìm kiếm</h3>
        <p>Kết quả tìm kiếm khóa học!!!</p>
      </div>
      <div className="searchPage">
        <div className="row">
          <div className="col-xl-2 col-lg-3 col-md-4 ">
            <div className="navFilter">
              <h6>
                <i className="fas fa-book-open" />
                Lọc
              </h6>
              <div className="filterContainer">
                <div className="filterItem">
                  <h6>Khóa học</h6>
                  <ul>
                    <li>
                      <label className="BoxSearch">
                        Tất cả
                        <input type="checkbox" className="form-control" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        Front End
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        Back End
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        HTML / CSS
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="filterItem">
                  <h6>Cấp độ</h6>
                  <ul>
                    <li>
                      <label className="BoxSearch">
                        Tất cả
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        Mới bắt đầu
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        Trung cấp
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        Cao cấp
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="filterItem">
                  <h6>Đánh giá</h6>
                  <ul>
                    <li>
                      <label className="BoxSearch">
                        <i className="fas fa-star" />
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                    <li>
                      <label className="BoxSearch">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <input type="checkbox" />
                        <span className="checkMark">
                          <i className="fas fa-check" />
                        </span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-10 col-lg-9 col-md-8">
            <h6>Hiển thị {data.length} kết quả</h6>
            <div className="mt-3 courseSearchResult">
              <div className="myCourseItem">
                {data.map((item) => {
                  return (
                    <div className="row mt-3" key={item.maKhoaHoc}>
                      <div className="col-xl-3 col-lg-4">
                        <ClientImageComponent
                          src={item.hinhAnh}
                          alt={item.moTa}
                          fallbackSrc="/img/back-end-trung-cap_gp01.png"
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
                            <i className="far fa-calendar iconCalendar" /> 23
                            giờ
                          </span>
                          <span className="textCardTitle">
                            <i className="fas fa-signal iconLevel " /> All level
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
                      <div className="col-xl-2 col-lg-2 mt-2 cancelNet">
                        <Link
                          className="btnGlobal"
                          href={`/detail/${
                            item.maKhoaHoc
                          }?tenKhoaHoc=${encodeURIComponent(item.tenKhoaHoc)}`}
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
