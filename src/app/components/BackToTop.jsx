import React, { useEffect, useState } from "react";
import "../styles/backTopTop/backToTop.scss";
import Link from "next/link";
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div className="service">
      <div className="service-menu">
        <ul>
          <li>
            <Link className="wpfm-menu-link" href="/courses?page=1">
              <span className="icon-service">
                <i className="fa fa-bars" />
              </span>
              <span className="text-service">Danh sách khóa học </span>
            </Link>
          </li>
          <li>
            <Link
              className="wpfm-menu-link"
              href="https://cybersoft.edu.vn/lo-trinh-hoc/"
            >
              <span className="icon-service">
                <i className="fa fa-dice-d6" />
              </span>
              <span className="text-service">Lộ trình học </span>
            </Link>
          </li>
          <li>
            <Link
              className="wpfm-menu-link"
              href="https://cybersoft.edu.vn/lien-he/"
            >
              <span className="icon-service">
                <i className="fa fa-envelope" aria-hidden="true" />
              </span>
              <span className="text-service">Liên hệ tư vấn </span>
            </Link>
          </li>
          <li>
            <Link
              className="wpfm-menu-link"
              href="https://www.youtube.com/channel/UCWc3ASTJcb0FeO2oFfX8IDQ"
              target="_blank"
            >
              <span className="icon-service">
                <i className="fab fa-youtube" />
              </span>
              <span className="text-service">Kênh Youtube </span>
            </Link>
          </li>
          <li>
            <Link
              className="wpfm-menu-link"
              href="https://www.facebook.com/lophocviet/"
              target="_blank"
            >
              <span className="icon-service">
                <i className="fab fa-facebook-f" />
              </span>
              <span className="text-service">Facebook </span>
            </Link>
          </li>
        </ul>
      </div>
      {isVisible && (
        <div className="backToTop">
          <button onClick={scrollToTop} className="btn">
            <i className="fas fa-arrow-up" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BackToTop;
