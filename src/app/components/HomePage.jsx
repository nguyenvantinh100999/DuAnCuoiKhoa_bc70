import Image from "next/image";
import React from "react";
import "../styles/homePage/homePage.scss";
import Marquee from "react-fast-marquee";
import Link from "next/link";
const HomePage = () => {
  return (
    <div className="homePage">
      <div className="row sliderHome">
        <div className="col-lg-6 sloganBox">
          <div className="triangleTopRight" />
          <div className="smallBox smallboxLeftTop" />
          <div className="smallBox smallboxRightTop" />
          <div className="smallBox smallboxRightBottom" />
          <div className="smallBox smallboxRightBottom doubleBox" />
          <div className="sloganContainer">
            <div>
              <Image
                className="sliderPlaneImg"
                src="/img/paper_plane.93dfdbf5.png"
                alt="..."
                width={250}
                height={250}
                crossOrigin="anonymous"
                quality={100}
                style={{ height: "auto" }}
              />
            </div>
            <h1>Chào mừng</h1>
            <h1>đến với môi trường </h1>
            <h1>
              V<span>learning</span>
            </h1>
            <button className="btnGlobal btnSlider mt-4">Bắt đâu nào</button>
          </div>
        </div>
        <div className="col-lg-6 sloganRight">
          <div className="sliderRight">
            <div></div>
            <div>
              <Image
                className="sliderMainImg"
                src="/img/slider2.f170197b.png"
                alt="..."
                width={895}
                height={895}
                crossOrigin="anonymous"
                quality={100}
                style={{ height: "auto" }}
              />
              <Image
                className="sliderSubImg sliderCodeImg"
                src="/img/code_slider.8c12bbb4.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ height: "auto" }}
              />
              <Image
                className="sliderSubImg sliderMesImg "
                src="/img/message_slider.6835c478.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ height: "auto" }}
              />
              <Image
                className="sliderSubImg sliderCloudImg"
                src="/img/clouds.15eb556c.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ height: "auto" }}
              />
              <Image
                className="sliderSubImg sliderCloud2Img"
                src="/img/clouds.15eb556c.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ height: "auto" }}
              />
              <Image
                className="sliderSubImg sliderCloud3Img"
                src="/img/clouds.15eb556c.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="infoCoureBox">
        <div className="infoCourseHome">
          <div className="infoItemHome infoLargeItem">
            <div className="infoItemContent">
              <h3>Khóa học</h3>
              <p>
                <span>Học qua dự án thực tế</span>, học đi đôi với hành, không
                lý thuyết lan man, phân tích cội nguồn của vấn đề, xây dựng từ
                các ví dụ nhỏ đến thực thi một dự án lớn ngoài thực tế để học
                viên học xong làm được ngay
              </p>
              <ul>
                <li>
                  <i className="fas fa-check" />
                  <span>Hơn 1000 bài tập và dự án thực tế</span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>Công nghệ cập nhật mới nhất</span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>Hình ảnh, ví dụ, bài giảng sinh động trực quan</span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>Tư duy phân tích, giải quyết vấn đề trong dự án</span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Học tập kinh nghiệm, qui trình làm dự án, các qui chuẩn
                    trong dự án
                  </span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Cơ hội thực tập tại các công ty lớn như FPT, Microsoft
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="infoItemHome infoSmallItemA">
            <div className="infoItemContent">
              <h3>Lộ trình phù hợp</h3>
              <ul>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Lộ trình bài bản từ zero tới chuyên nghiệp, nâng cao
                  </span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Học, luyện tập code, kỹ thuật phân tích, soft skill
                  </span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Huấn luyện để phát triển năng lực và niềm đam mê lập trình
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="infoItemHome infoSmallItemB">
            <div className="infoItemContent">
              <h3>Hệ thống học tập</h3>
              <ul>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Tự động chấm điểm trắc nghiệm và đưa câu hỏi tùy theo mức độ
                    học viên
                  </span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Thống kê lượt xem video, làm bài, điểm số theo chu kỳ
                  </span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Thống kê, so sánh khả năng học của các học viên cùng level
                    để đưa ra mục tiêu học tập
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="infoItemHome infoSmallItemA">
            <div className="infoItemContent">
              <h3>Giảng viên</h3>
              <ul>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Tương tác cùng mentor và giảng viên qua phần thảo luận
                  </span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>Review code và đưa ra các nhận xét góp ý</span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>Chấm điểm tương tác thảo luận giữa các học viên</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="infoItemHome infoSmallItemC">
            <div className="infoItemContent">
              <h3>Chứng nhận</h3>
              <ul>
                <li>
                  <i className="fas fa-check" />
                  <span>Chấm bài và có thể vấn đáp trực tuyến để review</span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Hệ thống của chúng tôi cũng tạo ra cho bạn một CV trực tuyến
                    độc đáo
                  </span>
                </li>
                <li>
                  <i className="fas fa-check" />
                  <span>
                    Kết nối CV của bạn đến với các đối tác của V learning
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="boxNumberContainer mt-5">
        <div className="row">
          <div className="col-lg-3 p-4 col-md-6">
            <div className="boxNumber">
              <div>
                <img
                  src="/img/003-students.e1a7c67b.png"
                  className="imgIcon"
                  alt="..."
                />
              </div>
              <div className="textNumber">
                <span>9000</span>
              </div>
              <p className="textNumberTitle">Học viên</p>
            </div>
          </div>
          <div className="col-lg-3 p-4 col-md-6">
            <div className="boxNumber">
              <div>
                <img
                  src="/img/001-timetable.0e009173.png"
                  className="imgIcon"
                  alt="..."
                />
              </div>
              <div className="textNumber">
                <span>1000</span>
              </div>
              <p className="textNumberTitle">Khóa học</p>
            </div>
          </div>
          <div className="col-lg-3 p-4 col-md-6">
            <div className="boxNumber">
              <div>
                <img
                  src="/img/002-hourglass.548810be.png"
                  className="imgIcon"
                  alt="..."
                />
              </div>
              <div className="textNumber">
                <span>33200</span>
              </div>
              <p className="textNumberTitle">Giờ học</p>
            </div>
          </div>
          <div className="col-lg-3 p-4 col-md-6">
            <div className="boxNumber">
              <div>
                <img
                  src="/img/004-teacher.5bbd6eec.png"
                  className="imgIcon"
                  alt="..."
                />
              </div>
              <div className="textNumber">
                <span>400</span>
              </div>
              <p className="textNumberTitle">Giảng viên</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 instrutorContainer">
        <h6>
          <Link href="/">Giảng viên hàng đầu</Link>
        </h6>
        <input type="checkbox" id="sliderInstrutors" hidden />
        <div className="instrutorItem">
          <div className="row mt-4">
            {/* <Marquee> */}
            <div className="col-lg-2 col-md-3 col-sm-6 col-12">
              <div className="instrutorContent">
                <img src="/img/instrutor5.2e4bd1e6.jpg" alt="..." />
                <h6>Big DadMoon</h6>
                <div className="textReviewRole">
                  <p>Chuyên gia lĩnh vực</p>
                  <p>lập trình</p>
                </div>
                <p className="reviewMentor">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <span className="textStar"> 4.9</span>
                </p>
                <span className="textReviewBot">100 Đánh giá</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-12">
              <div className="instrutorContent">
                <img src="/img/instrutor6.64041dca.jpg" alt="..." />
                <h6>IcarDi MenBor</h6>
                <div className="textReviewRole">
                  <p>Chuyên gia ngôn ngữ</p>
                  <p>Vue Js</p>
                </div>
                <p className="reviewMentor">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <span className="textStar"> 4.9</span>
                </p>
                <span className="textReviewBot">100 Đánh giá</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-12">
              <div className="instrutorContent">
                <img src="/img/instrutor7.edd00a03.jpg" alt="..." />
                <h6>Bladin Slaham</h6>
                <div className="textReviewRole">
                  <p>Chuyên gia hệ thống</p>
                  <p>máy tính</p>
                </div>
                <p className="reviewMentor">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <span className="textStar"> 4.9</span>
                </p>
                <span className="textReviewBot">100 Đánh giá</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-12">
              <div className="instrutorContent">
                <img src="/img/instrutor8.aec2f526.jpg" alt="..." />
                <h6>Chris Andersan</h6>
                <div className="textReviewRole">
                  <p>Chuyên gia lĩnh vực</p>
                  <p>Full Skill</p>
                </div>
                <p className="reviewMentor">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <span className="textStar"> 4.9</span>
                </p>
                <span className="textReviewBot">100 Đánh giá</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-12">
              <div className="instrutorContent">
                <img src="/img/instrutor9.504ea6c5.jpg" alt="..." />
                <h6>VueLo Gadi</h6>
                <div className="textReviewRole">
                  <p>Chuyên gia lĩnh vực</p>
                  <p>Phân tích</p>
                </div>
                <p className="reviewMentor">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <span className="textStar"> 4.9</span>
                </p>
                <span className="textReviewBot">100 Đánh giá</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-12">
              <div className="instrutorContent">
                <img src="/img/instrutor10.89946c43.jpg" alt="..." />
                <h6>Hoàng Nam</h6>
                <div className="textReviewRole">
                  <p>Chuyên gia lĩnh vực</p>
                  <p>PHP</p>
                </div>
                <p className="reviewMentor">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <span className="textStar"> 4.9</span>
                </p>
                <span className="textReviewBot">100 Đánh giá</span>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-12">
              <div className="instrutorContent">
                <img src="/img/instrutor11.0387fe65.jpg" alt="..." />
                <h6>David Ngô Savani</h6>
                <div className="textReviewRole">
                  <p>Chuyên gia lĩnh vực</p>
                  <p>Front End</p>
                </div>
                <p className="reviewMentor">
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <span className="textStar"> 4.9</span>
                </p>
                <span className="textReviewBot">100 Đánh giá</span>
              </div>
            </div>
            {/* </Marquee> */}
          </div>
        </div>
      </div>
      <div className="review mt-5">
        <div className="reviewStudent">
          <div className="triangleTopRight" />
          <div className="smallBox smallboxLeftTop" />
          <div className="smallBox smallboxRightBottom" />
          <div className="smallBox smallboxRightTop" />
          <div className="smallBox smallboxLeftBottom" />
          <div className="row">
            <div className="col-md-6">
              <div className="reviewImg">
                <div className="bgStudentReview" />
                <img src="/img/avatarReview.2f5a1f3c.png" alt="..." />
              </div>
            </div>
            <div className="col-md-6 quoteRight">
              <blockquote className="textQoute">
                <q>
                  Chương trình giảng dạy được biên soạn dành riêng cho các bạn
                  Lập trình từ trái ngành hoặc đã có kiến thức theo cường độ
                  cao, luôn được tinh chỉnh và tối ưu hóa theo thời gian bởi các
                  thành viên sáng lập và giảng viên dày kinh nghiệm.Thực sự rất
                  hay và hấp dẫn
                </q>
              </blockquote>
              <p>Tiva Dev</p>
              <span>Học viên xuất sắc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
