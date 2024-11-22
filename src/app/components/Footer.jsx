import React from "react";
import "../styles/footer/footer.scss";
const Footer = () => {
  return (
    <div className="footerPages">
      <div className="footerBody">
        <div className="">
          <div className="row textCardTitle">
            <div className="p-2 col-md-4 col-sm-6">
              <a href="#" className="mr-5 textLogo">
                <span className="textE">V</span> learning{" "}
                <i className="far fa-keyboard iconLogo" />
              </a>
              <ul className="menuFooter">
                <li>
                  <i className="fas fa-phone-alt iconFooter" />{" "}
                  <span>1800-123-4567</span>
                </li>
                <li>
                  <i className="fas fa-envelope-open-text iconFooter" />
                  <span>devit@gmail.com</span>
                </li>
                <li>
                  <i className="fas fa-map-marker-alt iconFooter" />
                  <span>Đà Nẵng</span>
                </li>
              </ul>
            </div>
            <div className="p-2 col-md-2 col-sm-3 col-6">
              <h3 className="textFooterTitle">Liên kết</h3>
              <ul className="menuFooter">
                <li>
                  <i className="fas fa-chevron-right" /> Trang chủ
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Dịch vụ
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Nhóm
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Blog
                </li>
              </ul>
            </div>
            <div className="p-2 col-md-2 col-sm-3 col-6">
              <h3 className="textFooterTitle">Khóa học</h3>
              <ul className="menuFooter">
                <li>
                  <i className="fas fa-chevron-right" /> Front End
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Back End
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Full stack
                </li>
                <li>
                  <i className="fas fa-chevron-right" /> Node Js
                </li>
              </ul>
            </div>
            <div className="p-2 col-md-4">
              <h3 className="textFooterTitle">Đăng kí tư vấn</h3>
              <form>
                <input
                  className="formFooter"
                  type="text"
                  placeholder="Họ và tên"
                />
                <input className="formFooter" type="text" placeholder="Email" />
                <input
                  className="formFooter"
                  type="text"
                  placeholder="Số điện thoại"
                />
              </form>
              <button className="custom-btn btnGlobal mt-3">Đăng kí</button>
            </div>
          </div>
        </div>
      </div>
      <div className="extraFooter">
        <div className="textCardTitle">
          <p>Copyright © 2024. All rights reserved.</p>
        </div>
        <div className="divGlobal p-0">
          <i className="fab fa-instagram iconFooter iconSize" />
          <i className="fab fa-facebook-f iconFooter iconSize" />
          <i className="fab fa-twitter iconFooter iconSize" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
