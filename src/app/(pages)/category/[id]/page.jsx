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
                  <div className="card">
                    <div className="imgBx">
                      <img src={item.hinhAnh} alt="" />
                      <ul key={item.maKhoaHoc}>
                        <li>
                          <i className="fa fa-heart" />
                          <span>Thêm vào yêu thích</span>
                        </li>
                        <li>
                          <i className="fa fa-cart-plus" />
                          <span>Mua khóa học</span>
                        </li>
                        <li>
                          <Link
                            href={`/detail/${
                              item.maKhoaHoc
                            }?tenKhoaHoc=${encodeURIComponent(
                              item.tenKhoaHoc
                            )}`}
                          >
                            <i className="fa fa-eye" />
                            <span>Xem chi tiết</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="content">
                      <div className="productName">
                        <h3>{item.tenKhoaHoc}</h3>
                      </div>
                      <div className="price_rating">
                        <h2>
                          500.000<sup>đ</sup>
                        </h2>
                        <div className="rating">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                        </div>
                      </div>
                    </div>
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
