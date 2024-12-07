"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../../styles/detail/detail.scss";
import Image from "next/image";
import VideoModal from "@/app/components/VideoModal";
import { API_URL, getHeaders, TOKEN_CYBERSOFT } from "@/app/utils/configHeader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Modal, ModalFooter } from "react-bootstrap";
import ClientImageComponent from "@/app/components/ClientImageComponent";
const Detail = (props) => {
  const [prodDetail, setProdDetail] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false); // State cho modal thông báo
  const [notificationMessage, setNotificationMessage] = useState(""); // Thông điệp thông báo
  const [isSuccess, setIsSuccess] = useState(false); // Kiểm tra loại thông báo (thành công hay thất bại)
  const { id } = props.params;
  const router = useRouter();
  // Thời gian đếm ngược (1 ngày 3 giờ 0 phút 0 giây)
  const initialTime = 1 * 24 * 60 * 60 + 3 * 60 * 60; // Tổng số giây
  const [timeLeft, setTimeLeft] = useState(initialTime);
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0; // Dừng lại khi thời gian hết
        }
        return prevTime - 1; // Giảm thời gian còn lại
      });
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(timer); // Dọn dẹp khi component unmount
  }, []);
  // Chuyển đổi giây thành định dạng "1 ngày 3:00:00"
  const formatTimeLeft = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days} ngày ${hours}:${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };
  const arrTime = [
    "10:30",
    "11:00",
    "14:25",
    "15:10",
    "20:00",
    "21:11",
    "17:50",
    "18:20",
    "25:59",
    "29:54",
  ];

  // Khởi tạo state để lưu trữ thời gian
  const [time, setTime] = useState([]);
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  // Sử dụng useEffect để chạy hàm renderTime chỉ một lần khi component được mount
  useEffect(() => {
    const shuffledTimes = shuffleArray([...arrTime]);
    setTime(shuffledTimes);
  }, []); // Mảng phụ thuộc rỗng để chỉ chạy một lần
  const getCourseDetailInfoById = async (id) => {
    try {
      const res = await axios(
        `${API_URL}/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`,
        {
          method: "GET",
          headers: getHeaders(),
        },
        { next: { revalidate: 10 } }
      );
      setProdDetail(res.data);
    } catch (error) {
      alert(error.response?.data);
    }
  };
  useEffect(() => {
    getCourseDetailInfoById(id);
  }, [id]);
  const getCouresCategory = async () => {
    if (prodDetail && prodDetail.danhMucKhoaHoc) {
      const maDanhMuckhoaHoc = prodDetail.danhMucKhoaHoc.maDanhMucKhoahoc;

      try {
        const res = await axios(
          `${API_URL}/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuckhoaHoc}`,
          {
            method: "GET",
            headers: getHeaders(),
          },
          { next: { revalidate: 10 } }
        );
        setRelatedCourses(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khóa học:", error);
        // Bạn có thể xử lý lỗi theo cách khác ở đây, ví dụ như trả về một giá trị mặc định
        throw error; // Hoặc ném lại lỗi để xử lý ở nơi gọi hàm
      }
    }
  };
  useEffect(() => {
    if (prodDetail) {
      // Chỉ gọi getCouresCategory khi prodDetail đã có giá trị
      getCouresCategory();
    }
  }, [prodDetail]);
  const firtFourCourses = relatedCourses.slice(0, 4);
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
  const handleRegister = async () => {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    if (!user) {
      alert("Vui lòng đăng nhập trước khi đăng ký");
      router.push("/login");
      return;
    }

    const data = {
      maKhoahoc: prodDetail.maKhoaHoc,
      taiKhoan: user.taiKhoan,
    };
    try {
      const response = await axios.post(
        "https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc",
        data,
        {
          headers: {
            TokenCybersoft: TOKEN_CYBERSOFT,
            Authorization: `Bearer ${user.accessToken}`, // Nếu bạn sử dụng token
            "Content-Type": "application/json",
          },
        }
      );
      showSuccessNotification("Đăng ký khóa học thành công!");
    } catch (error) {
      const errorMessage = error.response?.data || "Đã xảy ra lỗi";
      showErrorNotification(errorMessage);
    }
  };
  const handleImageError = (e) => {
    e.target.src = "/img/back-end-trung-cap_gp01.png"; // Thay bằng ảnh mặc định của bạn
  };
  return (
    <div className="detailCoures">
      <div className="titleCourse">
        <h3>Thông tin chi tiết khóa học</h3>
        <p>Tiến lên và không chần chừ !!!</p>
      </div>
      <div className="detailCouresContent">
        <div className="row">
          <div className="col-lg-8 col-md-7">
            <h4 className="titleDetailCourse">{prodDetail.tenKhoaHoc}</h4>
            <div className=" row headDetailCourse">
              <div className="col-lg-4">
                <div className="detailCourseIntro">
                  <img src="/img/instrutor5.2e4bd1e6.jpg" alt="..." />
                  <div className="instrutorTitle">
                    <p>Giảng viên</p>
                    <p>Robert Ngô Ngọc</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="detailCourseIntro">
                  <i className="fas fa-graduation-cap" />
                  <div className="instrutorTitle">
                    <p>Lĩnh vực</p>
                    <p>Thiết kế Web</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="detailCourseIntro">
                  <div className="reviewDetail">
                    <span>
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <i className="far fa-star" />
                      3.5
                    </span>
                    <p>100 đánh giá</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="textDiscripts">
              React.js là thư viện JavaScript phổ biến nhất mà bạn có thể sử
              dụng và tìm hiểu ngày nay để xây dựng giao diện người dùng hiện
              đại, phản ứng cho web.Khóa học này dạy bạn về React chuyên sâu, từ
              cơ bản, từng bước đi sâu vào tất cả các kiến ​​thức cơ bản cốt
              lõi, khám phá rất nhiều ví dụ và cũng giới thiệu cho bạn các khái
              niệm nâng cao.Bạn sẽ nhận được tất cả lý thuyết, hàng tấn ví dụ và
              bản trình diễn, bài tập và bài tập cũng như vô số kiến ​​thức quan
              trọng bị hầu hết các nguồn khác bỏ qua - sau cùng, có một lý do
              tại sao khóa học này lại rất lớn! Và trong trường hợp bạn thậm chí
              không biết tại sao bạn lại muốn học React và bạn chỉ ở đây vì một
              số quảng cáo hoặc "thuật toán" - đừng lo lắng: ReactJS là một công
              nghệ quan trọng với tư cách là một nhà phát triển web và trong
              khóa học này, tôi sẽ cũng giải thích TẠI SAO điều đó lại quan
              trọng!
            </p>
            <div className="boxCourseLearn">
              <h6>Những gì bạn sẽ học</h6>
              <div className="row">
                <div className="col-6">
                  <ul>
                    <li>
                      <i className="fas fa-check" />
                      <p>
                        Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân
                        thiện với người dùng và phản ứng nhanh
                      </p>
                    </li>
                    <li>
                      <i className="fas fa-check" />
                      <p>
                        Đăng ký công việc được trả lương cao hoặc làm freelancer
                        trong một trong những lĩnh vực được yêu cầu nhiều nhất
                        mà bạn có thể tìm thấy trong web dev ngay bây giờ
                      </p>
                    </li>
                    <li>
                      <i className="fas fa-check" />
                      <p>
                        Cung cấp trải nghiệm người dùng tuyệt vời bằng cách tận
                        dụng sức mạnh của JavaScript một cách dễ dàng
                      </p>
                    </li>
                    <li>
                      <i className="fas fa-check" />
                      <p>Tìm hiểu tất cả về React Hooks và React Components</p>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul>
                    <li>
                      <i className="fas fa-check" />
                      <p>
                        Thông thạo chuỗi công cụ hỗ trợ React, bao gồm cú pháp
                        Javascript NPM, Webpack, Babel và ES6 / ES2015
                      </p>
                    </li>
                    <li>
                      <i className="fas fa-check" />
                      <p>
                        Nhận ra sức mạnh của việc xây dựng các thành phần có thể
                        kết hợp
                      </p>
                    </li>
                    <li>
                      <i className="fas fa-check" />
                      <p>
                        Hãy là kỹ sư giải thích cách hoạt động của Redux cho mọi
                        người, bởi vì bạn biết rất rõ các nguyên tắc cơ bản
                      </p>
                    </li>
                    <li>
                      <i className="fas fa-check" />
                      <p>
                        Nắm vững các khái niệm cơ bản đằng sau việc cấu trúc các
                        ứng dụng Redux
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="courseContent">
              <h6>Nội dung khóa học</h6>
              <div className="courseDetailItem">
                <div className="courseDetailContent">
                  <div className="sectionCourse">
                    <span>Mục 1: Giới thiệu</span>
                    <VideoModal />
                  </div>
                  <p>Bài học</p>
                  <div className="lessonContainer">
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Các khái niệm về React Component
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[0]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Thiết lập môi trường cho Windows
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[1]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Tạo ứng dụng React - React-Scripts
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[2]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Ghi chú nhanh về dấu ngoặc kép cho string interpolation
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[3]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="courseDetailItem">
                <div className="courseDetailContent">
                  <div className="sectionCourse">
                    <span>Mục 2: Kiến thức căn bản</span>
                    <VideoModal />
                  </div>
                  <p>Bài học</p>
                  <div className="lessonContainer">
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Trang chủ và thành phần thư mục
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[4]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Hướng dẫn khóa học + Liên kết Github
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[5]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Trang chủ thương mại điện tử + thiết lập SASS
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[6]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Tệp CSS và SCSS
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[7]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        React 17: Cập nhật các gói + Phiên bản React mới nhất
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[8]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="courseDetailItem">
                <div className="courseDetailContent">
                  <div className="sectionCourse">
                    <span>Mục 3: Kiến thức chuyên sâu</span>
                    <VideoModal />
                  </div>
                  <p>Bài học</p>
                  <div className="lessonContainer">
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Cập nhật các gói + Phiên bản React mới nhất
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[9]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Trạng thái thư mục vào Redux
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[3]}
                      </span>
                    </div>
                    <div className="lessonContent mt-1">
                      <span>
                        <i className="fas fa-play-circle" />
                        Thành phần Tổng quan về Bộ sưu tập
                      </span>
                      <span>
                        <i className="fas fa-clock" />
                        {time[5]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">
            <div className="sideBarCourseDetail">
              <div className="img-product">
                <img
                  src={prodDetail.hinhAnh}
                  onError={handleImageError}
                  alt={prodDetail.moTa}
                />
              </div>

              <div className="coursePrice">
                <p>
                  <i className="fas fa-bolt" />
                  500.000<sup>đ</sup>
                </p>
                <div className="originalPrice">
                  <p>
                    <span className="discountedPrice">
                      1.000.000<sup>đ</sup>
                    </span>
                    <span className="discountPercentage">50%</span>
                  </p>
                  <span className="countdownTimer">
                    {formatTimeLeft(timeLeft)}
                  </span>
                </div>
              </div>
              <button
                className="btnGlobal btnPreview"
                onClick={() => {
                  handleRegister();
                }}
              >
                Đăng ký
              </button>
              <div className="sideBarDetailContent">
                <ul>
                  <li>
                    <p>
                      Ghi danh:<span> 10 học viên</span>
                    </p>
                    <i className="fas fa-user-graduate " />
                  </li>
                  <li>
                    <p>
                      Thời gian: <span> 18 giờ</span>
                    </p>
                    <i className="far fa-clock far fa-calendar-alt" />
                  </li>
                  <li>
                    <p>
                      Bài học:<span> 10</span>
                    </p>
                    <i className="fas fa-book" />
                  </li>
                  <li>
                    <p>
                      Video:<span> 14</span>
                    </p>
                    <i className="fas fa-photo-video" />
                  </li>
                  <li>
                    <p>
                      Trình độ:<span> Người mới bắt đầu</span>
                    </p>
                    <i className="fas fa-database" />
                  </li>
                </ul>
                <form className="formCoupon">
                  <input type="text" placeholder="Nhập mã" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="coursesRelated">
        <h6>Khóa học liên quan</h6>
        <div className="card-item">
          <div className="cardGlobalRes">
            {firtFourCourses.map((item) => {
              return (
                <div key={item.maKhoaHoc} className="cardGlobal">
                  <div className="imgBx">
                    <ClientImageComponent
                      src={item.hinhAnh}
                      alt={item.moTa}
                      fallbackSrc="/img/back-end-trung-cap_gp01.png"
                    />
                  </div>
                  <div className="content">
                    <h2>{item.tenKhoaHoc}</h2>
                    <p>
                      {item.moTa.length > 100
                        ? item.moTa.substring(0, 100) + "..."
                        : "React.js là thư viện JavaScript phổ biến nhất mà bạn có thể sử dụng và tìm hiểu ngày nay để xây dựng giao diện người dùng hiện đại, phản ứng cho web"}
                    </p>
                    <Link
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

export default Detail;
