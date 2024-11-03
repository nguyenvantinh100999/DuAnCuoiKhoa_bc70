// "use client";
import React from "react";
import "../../styles/course/course.scss";
// import { useEffect, useState } from "react";
import axios from "axios";
import { getHeaders } from "@/app/utils/configHeader";
import Link from "next/link";
import {
  fetchCourses,
  getCourseListByPaginationAction,
} from "@/app/actions/service/productApi";
import CoursesPage from "../courses/page";
// Hàm getServerSideProps để lấy dữ liệu trên server

const page = async ({ courses, currentPage, totalPages }) => {
  //   const [courses, setCourses] = React.useState(initialCourses);
  //   const [currentPage, setCurrentPage] = React.useState(1);
  //   const [totalPages, setTotalPages] = React.useState(initialTotalPages);
  //   const [loading, setLoading] = React.useState(false);

  //   const handlePageChange = async (newPage) => {
  //     if (newPage >= 1 && newPage <= totalPages) {
  //       setCurrentPage(newPage);
  //       setLoading(true);
  //       const data = await fetchCourses(newPage);
  //       setCourses(data.items);
  //       setTotalPages(data.totalPages);
  //       setLoading(false);
  //     }
  //   };
  //   const [courses, setCourses] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [totalPages, setTotalPages] = useState(1);
  //   const pageSize = 12;
  //   const fetchCourses = async () => {
  //     // const { data } = await axios(
  //     //   `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?page=${currentPage}&pageSize=12`,
  //     //   {
  //     //     method: "GET",
  //     //     headers: getHeaders(),
  //     //   }
  //     // );
  //     const { data } = await getCourseListByPaginationAction(
  //       currentPage,
  //       pageSize
  //     );
  //     console.log(data);
  //     setCourses(data.items); // Lấy danh sách khóa học
  //     setTotalPages(data.totalPages); // Tổng số trang
  //   };
  //   useEffect(() => {
  //     fetchCourses();
  //   }, []);
  //   useEffect(() => {
  //     fetchCourses();
  //   }, [currentPage]);
  return (
    <div className="coursePage">
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
          <div className="col-xl-3 col-lg-4 col-md-6 mt-4 cardGlobalRes cardEffect">
            <Link className="cardGlobal" href="/chitiet/">
              <img
                src="https://elearningnew.cybersoft.edu.vn/hinhanh/javascriptt_gp01.png"
                alt="..."
              />
              <span className="stikerCard">Javascriptt</span>
              <div className="cardBodyGlobal">
                <h6>Lập trình hiện đang là xu hướng trên toàn thế giới...</h6>
                <div className="titleMaker">
                  <div className="imgCardFooter">
                    <img src="/img/avatar2.bb9626e2.png" alt="..." />
                  </div>
                  <span className="ml-2 colorCardTitle">Elon Musk</span>
                </div>
              </div>
              <div className="cardFooter">
                <div>
                  <p>
                    800.000<sup>đ</sup>
                  </p>
                  <p>
                    400.000<sup>đ</sup>
                  </p>
                </div>
                <div>
                  <i className="fas fa-star mr-1 textStar" />
                  <span className="textStar">4.9</span>
                  <span className="colorCardTitle">(7840)</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <CoursesPage />
      {/* <div className="container">
        <div>
          <h1>Course List</h1>
          <div className="course-list">
            {courses.map((course) => (
              <div key={course.maKhoaHoc} className="course-card">
                <img src={course.hinhAnh} alt={course.tenKhoaHoc} />
                <h2>{course.tenKhoaHoc}</h2>
                <p>{course.moTa}</p>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                (window.location.href = `/?page=${currentPage - 1}`)
              }
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                (window.location.href = `/?page=${currentPage + 1}`)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div> */}
      {/* <div className="container">
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.maKhoaHoc} className="course-card">
              <img
                src={course.hinhAnh}
                alt={course.tenKhoaHoc}
                className="course-image"
              />
              <h3>{course.tenKhoaHoc}</h3>
              <p>{course.moTa}</p>
              <p>Giảng viên: {course.nguoiTao.hoTen}</p>
              <p>Giá: {course.giaKhoaHoc}đ</p>
              <p>Đánh giá: {course.danhGia}/5</p>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt; Trước
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={currentPage === page + 1 ? "active" : ""}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Sau &gt;
        </button>
      </div> */}
    </div>
  );
};
// export async function getServerSideProps(context) {
//   const page = context.query.page || 1; // Get the page number from query parameters
//   const pageSize = 10; // Number of items per page

//   const { courses, currentPage, totalPages } = await fetchCourses(
//     page,
//     pageSize
//   );

//   return {
//     props: {
//       courses,
//       currentPage,
//       totalPages,
//     },
//   };
// }
export default page;
