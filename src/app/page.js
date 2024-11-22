"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { getAllCourseListAction } from "./actions/service/productApi";
import Image from "next/image";
import Link from "next/link";
import "../app/styles/homePage/homePage.scss";
import Parallax from "parallax-js";
import { API_URL, getHeaders } from "./utils/configHeader";
import axios from "axios";
import CountUpBox from "./components/CountUpBox";
const Home = () => {
  const [data, setData] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const getCourseList = async () => {
    try {
      const res = await axios(
        `${API_URL}/QuanLyKhoaHoc/LayDanhSachKhoaHoc`,
        {
          method: "GET",
          headers: getHeaders(),
        },
        { next: { revalidate: 10 } }
      );
      console.log("asdasdas", res.data);
      setData(res.data);
    } catch (error) {
      alert(error.response?.data);
    }
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, // Thời gian animation (ms)
      once: true, // Chỉ chạy một lần khi cuộn vào
    });
  }, []);
  useEffect(() => {
    getCourseList();
  }, []);
  useEffect(() => {
    if (data) {
      const coursePage = data.slice(1, 9);
      setCourseList(coursePage);
    }
  }, [data]);
  useEffect(() => {
    // Chỉ khởi tạo Parallax khi phần tử DOM đã được render
    const text = document.getElementById("text");
    const scene = document.getElementById("scene");
    if (text || scene) {
      const parallaxInstance = new Parallax(text);
      const parallaxInstances = new Parallax(scene);
      return () => {
        parallaxInstance.destroy(); // Dọn dẹp khi component unmount
        parallaxInstances.destroy(); // Dọn dẹp khi component unmount
      };
    }
  }, []); // Chạy một lần khi component mount
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgFruit, setImgFruits] = useState("/icons/typescript.png");
  const [backgroundFruit, setBackgroudFruit] = useState("#2196F3");
  const [discription, setDiscription] = useState(
    "Đào tạo cho mọi đối tượng từ người trái ngành, người mới bắt đầu,sinh viên công nghệ thông tin đến các bạn đã có có nghề lập trình.Đào tạo ra những lập trình viên tài năng, phát huy tố chất, tư duy lập trình, có định hướng để trở thành những lập trình chuyên nghiệp. Giáo trình được may đo và biên soạn dành riêng cho các bạn học lập trình."
  );
  // Danh sách img trái cây
  const fruits = [
    {
      name: "Typescript",
      image: "/icons/typescript.png",
      bg: "#2196F3",
      dicription:
        "TypeScript là một ngôn ngữ lập trình mã nguồn mở được phát triển bởi Microsoft, ra mắt lần đầu vào năm 2012. TypeScript là một siêu ngôn ngữ của JavaScript, có nghĩa là nó mở rộng JavaScript bằng cách thêm các tính năng mới, đặc biệt là hệ thống kiểu tĩnh (static typing). Điều này giúp các nhà phát triển phát hiện lỗi sớm hơn trong quá trình phát triển và cải thiện khả năng bảo trì mã nguồn.",
    },
    {
      name: "React",
      image: "/icons/sciencea.png",
      bg: "#451983",
      dicription:
        "React là một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook, được sử dụng để xây dựng giao diện người dùng (UI) cho các ứng dụng web và di động. Được ra mắt lần đầu vào năm 2013, React cho phép các nhà phát triển tạo ra các thành phần UI tái sử dụng, giúp tăng cường hiệu suất và khả năng bảo trì của ứng dụng.",
    },
    {
      name: "Javascript",
      image: "/icons/javascript.png",
      bg: "#ffcc02",
      dicription:
        "JavaScript là ngôn ngữ lập trình hướng đối tượng và sự kiện, cho phép các nhà phát triển xây dựng các ứng dụng web phong phú và tương tác. Với sự ra đời của các thư viện và framework như jQuery, React, Angular và Vue.js, JavaScript đã trở thành một công cụ mạnh mẽ cho việc phát triển giao diện người dùng phức tạp.",
    },
    {
      name: "VueJs",
      image: "/icons/brands.png",
      bg: "#14906c",
      dicription:
        "Vue.js là một framework JavaScript mã nguồn mở được phát triển bởi Evan You, được ra mắt lần đầu vào năm 2014. Vue.js được thiết kế để xây dựng giao diện người dùng (UI) và ứng dụng web một cách dễ dàng và hiệu quả. Với triết lý tiến dần, Vue cho phép các nhà phát triển tích hợp nó vào các dự án hiện có mà không cần phải thay đổi toàn bộ cấu trúc của ứng dụng.",
    },
    {
      name: "NodeJs",
      image: "/icons/node-js.png",
      bg: "#156a19",
      dicription:
        "Node.js là một môi trường chạy JavaScript mã nguồn mở, được phát triển trên nền tảng V8 JavaScript Engine của Google Chrome. Được ra mắt lần đầu vào năm 2009 bởi Ryan Dahl, Node.js cho phép các nhà phát triển chạy mã JavaScript trên máy chủ, mở ra khả năng xây dựng các ứng dụng web và dịch vụ mạng một cách hiệu quả và linh hoạt.",
    },
  ];
  const handleClick = (index) => {
    setActiveIndex(index); // Cập nhật chỉ số thẻ được click
  };
  return (
    <div className="homePage">
      <section className="banner">
        <div className="containerr">
          <div id="scene">
            <h2 id="text">
              <span data-depth-y="2">V</span>
              <span data-depth-y="-6">L</span>
              <span data-depth-y="5">E</span>
              <span data-depth-y="-8">A</span>
              <span data-depth-y="3">R</span>
              <span data-depth-y="-4">N</span>
              <span data-depth-y="7">I</span>
              <span data-depth-y="-1">N</span>
              <span data-depth-y="5">G</span>
            </h2>
            {/* <div className="layerr" data-depth="-0.5">
              <img src="/icons/ai.png" alt="..." />
            </div> */}
            <div className="layerr" data-depth="0.75">
              <img src="/icons/developerr.png" alt="..." />
            </div>
            {/* <div className="layerr" data-depth="-0.25">
              <img src="/icons/java.png" alt="..." />
            </div>
            <div className="layerr" data-depth="0.5">
              <img src="/icons/document.png" alt="..." />
            </div>
            <div className="layerr" data-depth="-0.35">
              <img src="/icons/java-script.png" alt="..." />
            </div>
            <div className="layerr" data-depth="0.65">
              <img src="/icons/docker.png" alt="..." />
            </div>
            <div className="layerr" data-depth="-0.15">
              <img src="/icons/typescript.png" alt="..." />
            </div>
            <div className="layerr" data-depth="0.35">
              <img src="/icons/python.png" alt="..." />
            </div>
            <div className="layerr" data-depth="-0.25">
              <img src="/icons/science.png" alt="..." />
            </div> */}
          </div>
        </div>
      </section>
      <section className="test-layout">
        <div className="bg" style={{ background: backgroundFruit }}></div>
        <div className="contentTest">
          <div className="textBox">
            <h2 data-aos="fade-right">V-Learning</h2>
            <p data-aos="fade-right" data-aos-delay="300">
              {discription}
            </p>
            <a href="#" data-aos="fade-right" data-aos-delay="500">
              Đọc thêm
            </a>
          </div>
          <div className="imgBox" data-aos="fade-left">
            <img src={imgFruit} alt="..." />
          </div>
        </div>
        <ul className="thumb">
          {fruits.map((fruit, index) => {
            return (
              <li
                key={fruit.name}
                data-text={fruit.name}
                className={`${activeIndex === index ? "active" : ""} check`}
                onClick={() => {
                  handleClick(index);
                  setImgFruits(fruit.image);
                  setBackgroudFruit(fruit.bg);
                  setDiscription(fruit.dicription);
                }}
              >
                <img
                  data-aos="fade-up"
                  data-aos-offset="0"
                  src={fruit.image}
                  alt={fruit.name}
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="saleCourse">
        <h1 data-aos="fade-up">Các khóa học bán chạy nhất của VLearning</h1>
        <div className="container">
          <div className="row">
            {courseList.map((item, index) => {
              return (
                <div
                  data-aos="fade-down-right"
                  data-aos-delay={index + "00"}
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
      </section>
      {/* <div className="row sliderHome">
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
                style={{ width: "auto" }}
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
                style={{ width: "auto" }}
              />
              <Image
                className="sliderSubImg sliderMesImg "
                src="/img/message_slider.6835c478.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ width: "auto" }}
              />
              <Image
                className="sliderSubImg sliderCloudImg"
                src="/img/clouds.15eb556c.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ width: "auto" }}
              />
              <Image
                className="sliderSubImg sliderCloud2Img"
                src="/img/clouds.15eb556c.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ width: "auto" }}
              />
              <Image
                className="sliderSubImg sliderCloud3Img"
                src="/img/clouds.15eb556c.png"
                alt="..."
                width={134}
                height={134}
                crossOrigin="anonymous"
                quality={100}
                style={{ width: "auto" }}
              />
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="infoCoureBox">
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
      </div> */}
      <div className="learnMore">
        <div className="row">
          <div data-aos="zoom-in-right" className="col-lg-6 sloganRighT">
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
                  style={{ width: "auto" }}
                />
                <Image
                  className="sliderSubImg sliderMesImg "
                  src="/img/message_slider.6835c478.png"
                  alt="..."
                  width={134}
                  height={134}
                  crossOrigin="anonymous"
                  quality={100}
                  style={{ width: "auto" }}
                />
                <Image
                  className="sliderSubImg sliderCloudImg"
                  src="/img/clouds.15eb556c.png"
                  alt="..."
                  width={134}
                  height={134}
                  crossOrigin="anonymous"
                  quality={100}
                  style={{ width: "auto" }}
                />
                <Image
                  className="sliderSubImg sliderCloud2Img"
                  src="/img/clouds.15eb556c.png"
                  alt="..."
                  width={134}
                  height={134}
                  crossOrigin="anonymous"
                  quality={100}
                  style={{ width: "auto" }}
                />
                <Image
                  className="sliderSubImg sliderCloud3Img"
                  src="/img/clouds.15eb556c.png"
                  alt="..."
                  width={134}
                  height={134}
                  crossOrigin="anonymous"
                  quality={100}
                  style={{ width: "auto" }}
                />
              </div>
            </div>
          </div>
          <div data-aos="zoom-in-left" className="col-lg-6 viewLearn">
            <div className="titleLearn">
              <h2>HỆ THỐNG HỌC TẬP TRỰC TUYẾN BỔ TRỢ</h2>
              <p>
                Bên cạnh việc học OFFLINE ngay tại trung tâm, bạn còn được truy
                xuất hệ thống bài giảng, bài tập bao gồm hơn 400 video được thu
                chất lượng để phục vụ trong suốt thời gian học.
              </p>
            </div>
            <div className="groupText">
              <div className="group-item">
                <span className="inner-icon">
                  <span className="icon-item">
                    <i className="fa fa-graduation-cap" />
                  </span>
                </span>

                <div className="text-item">
                  <h3>Giáo trình học tập</h3>
                  <p>
                    Lộ trình học từ zero đến đi làm với đầy đủ skill theo nhà
                    tuyển dụng.Thực chiến ngay từ buổi học đầu tiên.Nắm bắt xu
                    thế và cập nhật liên tục theo công nghệ mới nhất hiện nay.
                  </p>
                </div>
              </div>
              <div className="group-item">
                <span className="inner-icon">
                  <span className="icon-item">
                    <i className="fa fa-users" />
                  </span>
                </span>

                <div className="text-item">
                  <h3>Đội ngũ giảng viên/Mentor</h3>
                  <p>
                    Khả năng truyền đạt, phân tích để học viên nắm tư duy và
                    luyện tập tốt.Chia sẻ kinh nghiệm làm việc tại công ty đến
                    học viên.
                  </p>
                </div>
              </div>
              <div className="group-item no-after">
                <span className="inner-icon">
                  <span className="icon-item">
                    <i className="fa fa-cogs" />
                  </span>
                </span>

                <div className="text-item">
                  <h3>Hỗ trợ học tập</h3>
                  <p>
                    Nhóm hỗ trợ học tập liên tục ngoài giờ.Review code, chuẩn
                    hóa code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="boxNumberContainer">
        <div className="row">
          <div className="col-lg-3 p-4 col-md-6">
            <CountUpBox
              number={9000}
              title="Học viên"
              imgSrc="/img/003-students.e1a7c67b.png"
            />
          </div>
          <div className="col-lg-3 p-4 col-md-6">
            <CountUpBox
              number={1000}
              title="Khóa học"
              imgSrc="/img/001-timetable.0e009173.png"
            />
          </div>
          <div className="col-lg-3 p-4 col-md-6">
            <CountUpBox
              number={33200}
              title="Giờ học"
              imgSrc="/img/002-hourglass.548810be.png"
            />
          </div>
          <div className="col-lg-3 p-4 col-md-6">
            <CountUpBox
              number={400}
              title="Giảng viên"
              imgSrc="/img/004-teacher.5bbd6eec.png"
            />
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
                <img
                  data-aos="fade-right"
                  src="/img/avatarReview.2f5a1f3c.png"
                  alt="..."
                />
              </div>
            </div>
            <div className="col-md-6 quoteRight">
              <blockquote data-aos="fade-left" className="textQoute">
                <q>
                  Chương trình giảng dạy được biên soạn dành riêng cho các bạn
                  Lập trình từ trái ngành hoặc đã có kiến thức theo cường độ
                  cao, luôn được tinh chỉnh và tối ưu hóa theo thời gian bởi các
                  thành viên sáng lập và giảng viên dày kinh nghiệm.Thực sự rất
                  hay và hấp dẫn
                </q>
              </blockquote>
              <p data-aos="fade-left" data-aos-delay="300">
                Tiva Dev
              </p>
              <span data-aos="fade-left" data-aos-delay="500">
                Học viên xuất sắc
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
