"use client";
import React, { useEffect, useRef, useState } from "react";
import Parallax from "parallax-js";
// import MyComponent from "../components/MyComponent";
import Marquee from "react-fast-marquee";
import "../../styles/home/home.scss";
const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgFruit, setImgFruits] = useState("/images/apple.png");
  const [backgroundFruit, setBackgroudFruit] = useState("#fc4a55");
  // Danh sách img trái cây
  const fruits = [
    { name: "React", image: "/icons/sciencea.png", bg: "#451983" },
    { name: "Javascript", image: "/icons/javascript.png", bg: "#ffcc02" },
    { name: "VueJs", image: "/icons/brands.png", bg: "#14906c" },
    { name: "NodeJs", image: "/icons/node-js.png", bg: "#156a19" },
    { name: "Typescript", image: "/icons/typescript.png", bg: "#2196F3" },
  ];
  const handleClick = (index) => {
    setActiveIndex(index); // Cập nhật chỉ số thẻ được click
  };
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
  //------------
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  useEffect(() => {
    slidesRef.current = Array.from(sliderRef.current.children);
  }, []);
  const handleClickNext = () => {
    if (slidesRef.current.length > 0) {
      const firlSlide = slidesRef.current.shift();
      sliderRef.current.appendChild(firlSlide);
      slidesRef.current.push(firlSlide);
    }
  };
  const handleClickPrev = () => {
    if (slidesRef.current.length > 0) {
      const lastSlide = slidesRef.current.pop();
      sliderRef.current.prepend(lastSlide);
      slidesRef.current.unshift(lastSlide);
    }
  };
  return (
    <div className="test">
      <div className="card-item">
        <div className="card">
          <div className="face face1">
            <img src="/img/instrutor11.0387fe65.jpg" alt="" />
          </div>
          <div className="face face2">
            <div className="content">
              <h2>Lorem ipsum dolor sit</h2>
              <p>
                amet consectetur adipisicing elit. Dignissimos vitae praesentium
                exercitationem suscipit vero enim repellendus! Dolorum error
                consequuntur ipsam non fugit nesciunt exercitationem commodi
                recusandae corrupti, dolore quos porro reprehenderit deleniti
                sapiente suscipit nemo ratione minima, voluptatibus cum dolor
                qui earum itaque? Aut, placeat ab cumque quo fuga sint?
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="containerCard">
        <div className="containerBox">
          <div className="box">
            <div className="imgBx">
              <img src="/img/instrutor11.0387fe65.jpg" alt="" />
            </div>
            <div className="contents">
              <h3>Post Title one</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                magni harum qui et nisi, perspiciatis, soluta sunt nostrum
                aliquam sapiente neque accusantium rerum dolor aut expedita
                officia laborum nam eos.
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgBx">
              <img src="/img/instrutor11.0387fe65.jpg" alt="" />
            </div>
            <div className="contents">
              <h3>Post Title one</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                magni harum qui et nisi, perspiciatis, soluta sunt nostrum
                aliquam sapiente neque accusantium rerum dolor aut expedita
                officia laborum nam eos.
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgBx">
              <img src="/img/instrutor11.0387fe65.jpg" alt="" />
            </div>
            <div className="contents">
              <h3>Post Title one</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                magni harum qui et nisi, perspiciatis, soluta sunt nostrum
                aliquam sapiente neque accusantium rerum dolor aut expedita
                officia laborum nam eos.
              </p>
            </div>
          </div>
          <div className="box">
            <div className="imgBx">
              <img src="/img/instrutor11.0387fe65.jpg" alt="" />
            </div>
            <div className="contents">
              <h3>Post Title one</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                magni harum qui et nisi, perspiciatis, soluta sunt nostrum
                aliquam sapiente neque accusantium rerum dolor aut expedita
                officia laborum nam eos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grid">
        <div className="containerImg">
          <div className="card">
            <div className="imgBx">
              <img src="/img/instrutor11.0387fe65.jpg" alt="" />
              <ul>
                <li>
                  <i className="fa fa-heart" />
                  <span>Add to WishList</span>
                </li>
                <li>
                  <i className="fa fa-cart-plus" />
                  <span>Add to cart</span>
                </li>
                <li>
                  <i className="fa fa-eye" />
                  <span>View detail</span>
                </li>
              </ul>
            </div>
            <div className="content">
              <div className="productName">
                <h3>Rayon a-line dress</h3>
              </div>
              <div className="price_rating">
                <h2>$13.45</h2>
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
          <div className="card">
            <div className="imgBx">
              <img src="/img/instrutor11.0387fe65.jpg" alt="" />
            </div>
            <div className="content">
              <div className="productName">
                <h3>Rayon a-line dress</h3>
              </div>
              <div className="price_rating">
                <h2>$13.45</h2>
                <i className="fa fa-star" />

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
          <div className="card">
            <div className="imgBx">
              <img src="/img/instrutor11.0387fe65.jpg" alt="" />
            </div>
            <div className="content">
              <div className="productName">
                <h3>Rayon a-line dress</h3>
              </div>
              <div className="price_rating">
                <h2>$13.45</h2>
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
          <div className="card">
            <div className="imgBx">
              <img src="/img/instrutor11.0387fe65.jpg" alt="" />
            </div>
            <div className="content">
              <div className="productName">
                <h3>Rayon a-line dress</h3>
              </div>
              <div className="price_rating">
                <h2>$13.45</h2>
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
      </div>
      <section className="test-layout">
        <div className="bg" style={{ background: backgroundFruit }}></div>
        <div className="contentTest">
          <div className="textBox">
            <h2>V-Learning</h2>
            <p>
              Đào tạo cho mọi đối tượng từ người trái ngành, người mới bắt đầu,
              sinh viên công nghệ thông tin đến các bạn đã có có nghề lập trình.
              Đào tạo ra những lập trình viên tài năng, phát huy tố chất, tư duy
              lập trình, có định hướng để trở thành những lập trình chuyên
              nghiệp. Giáo trình được may đo và biên soạn dành riêng cho các bạn
              học lập trình.
            </p>
            <a href="#">Đọc thêm</a>
          </div>
          <div className="imgBox">
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
                }}
              >
                <img src={fruit.image} alt={fruit.name} />
              </li>
            );
          })}
        </ul>
      </section>
      <div className="asda">
        <div className="info">
          <div className="box">
            <div className="imgBx">
              <img src="/img/instrutor9.504ea6c5.jpg" alt="..." />
            </div>
            <div className="content">
              <div>
                <h2>Image Title</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Fugiat ducimus quam, illum eveniet dicta totam alias quia sit
                  saepe in?
                </p>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="imgBx">
              <img src="/img/instrutor9.504ea6c5.jpg" alt="..." />
            </div>
            <div className="content">
              <div>
                <h2>Image Title</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Fugiat ducimus quam, illum eveniet dicta totam alias quia sit
                  saepe in?
                </p>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="imgBx">
              <img src="/img/instrutor9.504ea6c5.jpg" alt="..." />
            </div>
            <div className="content">
              <div>
                <h2>Image Title</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Fugiat ducimus quam, illum eveniet dicta totam alias quia sit
                  saepe in?
                </p>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="imgBx">
              <img src="/img/instrutor9.504ea6c5.jpg" alt="..." />
            </div>
            <div className="content">
              <div>
                <h2>Image Title</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Fugiat ducimus quam, illum eveniet dicta totam alias quia sit
                  saepe in?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="banner">
        <div className="containerr">
          <div id="scene">
            <h2 id="text">
              <span data-depth-y="2">E</span>
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
      <div className="infoTeacher">
        <div className="slider" ref={sliderRef}>
          <div
            className="slides"
            style={{ "--img": "url('/images/pexels-max-fischer-5212361.jpg')" }}
          >
            <div className="content">
              <h2>Nguyễn Văn An</h2>
              <p>
                Thầy Nguyễn Văn An, một chuyên gia trong lĩnh vực phát triển
                web, hiện đang giảng dạy Front-end tại Học viện Công nghệ ABC.
                Với hơn 10 năm kinh nghiệm trong ngành, thầy An đã giúp hàng
                trăm học viên nắm vững các kỹ năng cần thiết để trở thành những
                nhà phát triển Front-end xuất sắc. Thầy nổi tiếng với phương
                pháp giảng dạy thực tế, tập trung vào việc ứng dụng kiến thức
                vào các dự án thực tế, đồng thời luôn cập nhật các xu hướng mới
                nhất trong ngành công nghệ thông tin. Ngoài ra, thầy An còn là
                tác giả của nhiều bài viết và khóa học trực tuyến về Front-end,
                được cộng đồng developer đánh giá cao.
              </p>
            </div>
          </div>
          <div
            className="slides"
            style={{ "--img": "url('/images/pexels-thirdman-7652509.jpg')" }}
          >
            <div className="content">
              <h2>Nguyễn Văn An</h2>
              <p>
                Thầy Nguyễn Văn An, một chuyên gia trong lĩnh vực phát triển
                web, hiện đang giảng dạy Front-end tại Học viện Công nghệ ABC.
                Với hơn 10 năm kinh nghiệm trong ngành, thầy An đã giúp hàng
                trăm học viên nắm vững các kỹ năng cần thiết để trở thành những
                nhà phát triển Front-end xuất sắc. Thầy nổi tiếng với phương
                pháp giảng dạy thực tế, tập trung vào việc ứng dụng kiến thức
                vào các dự án thực tế, đồng thời luôn cập nhật các xu hướng mới
                nhất trong ngành công nghệ thông tin. Ngoài ra, thầy An còn là
                tác giả của nhiều bài viết và khóa học trực tuyến về Front-end,
                được cộng đồng developer đánh giá cao.
              </p>
            </div>
          </div>
          <div
            className="slides"
            style={{ "--img": "url('/images/pexels-rdne-7845465.jpg')" }}
          >
            <div className="content">
              <h2>Nguyễn Văn An</h2>
              <p>
                Thầy Nguyễn Văn An, một chuyên gia trong lĩnh vực phát triển
                web, hiện đang giảng dạy Front-end tại Học viện Công nghệ ABC.
                Với hơn 10 năm kinh nghiệm trong ngành, thầy An đã giúp hàng
                trăm học viên nắm vững các kỹ năng cần thiết để trở thành những
                nhà phát triển Front-end xuất sắc. Thầy nổi tiếng với phương
                pháp giảng dạy thực tế, tập trung vào việc ứng dụng kiến thức
                vào các dự án thực tế, đồng thời luôn cập nhật các xu hướng mới
                nhất trong ngành công nghệ thông tin. Ngoài ra, thầy An còn là
                tác giả của nhiều bài viết và khóa học trực tuyến về Front-end,
                được cộng đồng developer đánh giá cao.
              </p>
            </div>
          </div>
          <div
            className="slides"
            style={{
              "--img": "url('/images/pexels-mikhail-nilov-9159039.jpg')",
            }}
          >
            <div className="content">
              <h2>Nguyễn Văn An</h2>
              <p>
                Thầy Nguyễn Văn An, một chuyên gia trong lĩnh vực phát triển
                web, hiện đang giảng dạy Front-end tại Học viện Công nghệ ABC.
                Với hơn 10 năm kinh nghiệm trong ngành, thầy An đã giúp hàng
                trăm học viên nắm vững các kỹ năng cần thiết để trở thành những
                nhà phát triển Front-end xuất sắc. Thầy nổi tiếng với phương
                pháp giảng dạy thực tế, tập trung vào việc ứng dụng kiến thức
                vào các dự án thực tế, đồng thời luôn cập nhật các xu hướng mới
                nhất trong ngành công nghệ thông tin. Ngoài ra, thầy An còn là
                tác giả của nhiều bài viết và khóa học trực tuyến về Front-end,
                được cộng đồng developer đánh giá cao.
              </p>
            </div>
          </div>
          <div
            className="slides"
            style={{
              "--img":
                "url('/images/pexels-anthonyshkraba-production-8374251.jpg')",
            }}
          >
            <div className="content">
              <h2>Nguyễn Văn An</h2>
              <p>
                Thầy Nguyễn Văn An, một chuyên gia trong lĩnh vực phát triển
                web, hiện đang giảng dạy Front-end tại Học viện Công nghệ ABC.
                Với hơn 10 năm kinh nghiệm trong ngành, thầy An đã giúp hàng
                trăm học viên nắm vững các kỹ năng cần thiết để trở thành những
                nhà phát triển Front-end xuất sắc. Thầy nổi tiếng với phương
                pháp giảng dạy thực tế, tập trung vào việc ứng dụng kiến thức
                vào các dự án thực tế, đồng thời luôn cập nhật các xu hướng mới
                nhất trong ngành công nghệ thông tin. Ngoài ra, thầy An còn là
                tác giả của nhiều bài viết và khóa học trực tuyến về Front-end,
                được cộng đồng developer đánh giá cao.
              </p>
            </div>
          </div>
          <div
            className="slides"
            style={{
              "--img": "url('/images/pexels-max-fischer-5212317 (1).jpg')",
            }}
          >
            <div className="content">
              <h2>Nguyễn Văn An</h2>
              <p>
                Thầy Nguyễn Văn An, một chuyên gia trong lĩnh vực phát triển
                web, hiện đang giảng dạy Front-end tại Học viện Công nghệ ABC.
                Với hơn 10 năm kinh nghiệm trong ngành, thầy An đã giúp hàng
                trăm học viên nắm vững các kỹ năng cần thiết để trở thành những
                nhà phát triển Front-end xuất sắc. Thầy nổi tiếng với phương
                pháp giảng dạy thực tế, tập trung vào việc ứng dụng kiến thức
                vào các dự án thực tế, đồng thời luôn cập nhật các xu hướng mới
                nhất trong ngành công nghệ thông tin. Ngoài ra, thầy An còn là
                tác giả của nhiều bài viết và khóa học trực tuyến về Front-end,
                được cộng đồng developer đánh giá cao.
              </p>
            </div>
          </div>
        </div>
        <div className="buttons">
          <span
            className="prev"
            onClick={() => {
              handleClickPrev();
            }}
          ></span>
          <span
            className="next"
            onClick={() => {
              handleClickNext();
            }}
          ></span>
        </div>
      </div>
      {/* <script>let next = doccument.querySelector('.next')
      let prev = doccument.querySelector('.prev');
      let slider =  doccument.querySelector('.slider');
      next.addEventListenner("click",function(){
        let slides = doccument.querySelectorAll('.slides');
        slider.appendChild(slides[0])
      })
         prev.addEventListenner("click",function(){
        let slides = doccument.querySelectorAll('.slides');
        slider.perpend(slides[slides.length-1])
      })
      </script> */}
    </div>
  );
};

export default Home;
