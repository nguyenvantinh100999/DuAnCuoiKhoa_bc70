import { getCourseListByPaginationAction } from "@/app/actions/service/productApi";
import "../../styles/courses/courses.scss";
import Link from "next/link";
import Image from "next/image";
import ClientImageComponent from "@/app/components/ClientImageComponent";
const CoursesPage = async ({ searchParams }) => {
  const page = searchParams.page || 1; // Lấy số trang từ tham số truy vấn
  const pageSize = 12; // Số mục mỗi trang

  const { courses, currentPage, totalPages } =
    await getCourseListByPaginationAction(page, pageSize);

  return (
    <div className="coursesPage">
      <div className="titleCourse">
        <h3>Khóa học</h3>
        <p>Bắt đầu hành trình nào!!!</p>
      </div>
      <div className="coursesContainer">
        <div className="row">
          <div className="col-md-2 col-sm-4 coursesBoxItem">
            <div className="coursesBox bgStyle1">
              <h6>Chương trình học</h6>
              <i className="fas fa-laptop" />
              <p>300</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 coursesBoxItem">
            <div className="coursesBox bgStyle2">
              <h6>Nhà sáng tạo</h6>
              <i className="fas fa-camera" />
              <p>10000</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 coursesBoxItem">
            <div className="coursesBox bgStyle3">
              <h6>Nhà thiết kế</h6>
              <i className="fas fa-briefcase" />
              <p>400</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 coursesBoxItem">
            <div className="coursesBox bgStyle4">
              <h6>Bài giảng</h6>
              <i className="fas fa-book" />
              <p>3000</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 coursesBoxItem">
            <div className="coursesBox bgStyle5">
              <h6>Video</h6>
              <i className="fas fa-play-circle" />
              <p>40000</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-4 coursesBoxItem">
            <div className="coursesBox bgStyle6">
              <h6>Lĩnh vực</h6>
              <i className="fas fa-dice-d20" />
              <p>200</p>
            </div>
          </div>
        </div>
      </div>
      <div className="courseListPage">
        <h6>
          <i className="fas fa-bookmark" />
          Danh sách khóa học
        </h6>
        <div className="row">
          {courses.map((item) => {
            return (
              <div
                key={item.maKhoaHoc}
                className="col-xl-3 col-lg-4 col-md-6 mt-4 cardGlobalRes"
              >
                <div className="cardGlobal" href="/chitiet/111111111111">
                  <div className="imgBx">
                    <ClientImageComponent
                      src={item.hinhAnh}
                      alt={item.moTa}
                      fallbackSrc="/img/back-end-trung-cap_gp01.png"
                    />
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
                          }?tenKhoaHoc=${encodeURIComponent(item.tenKhoaHoc)}`}
                        >
                          <i className="fa fa-eye" />
                          <span>Xem chi tiết</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <span className="stikerCard">
                    {item.tenKhoaHoc.length > 30
                      ? item.tenKhoaHoc.substring(0, 30) + "..."
                      : item.tenKhoaHoc}
                  </span>
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
                        <i className="far fa-calendar-alt iconCalendar" />4 tuần
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
      <div className="paginationPages">
        <ul>
          <li className="page-item">
            {" "}
            <Link
              className={`pageLinkPages ${currentPage === 1 ? "disabled" : ""}`}
              href={`/courses/?page=${currentPage - 1}`}
            >
              <i className="fas fa-chevron-left"></i> Trước
            </Link>
          </li>

          {[...Array(totalPages).keys()].map((page) => (
            <li className="page-item">
              <Link
                key={page + 1}
                className={
                  currentPage === page + 1
                    ? "active pageLinkPages"
                    : "pageLinkPages"
                }
                href={`/courses/?page=${page + 1}`}
              >
                {page + 1}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className={`pageLinkPages ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              href={`/courses/?page=${currentPage + 1}`}
            >
              Sau <i className="fas fa-chevron-right"></i>
            </Link>
          </li>
        </ul>

        {/* <span>
          Trang {currentPage} của {totalPages}
        </span> */}
      </div>
    </div>
  );
};

export default CoursesPage;
