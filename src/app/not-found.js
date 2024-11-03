import React from "react";
import "../app/styles/not-found/notFound.scss";
import Link from "next/link";
const PageNotFound = () => {
  return (
    <section className="page_404">
      <div className="page404_container">
        <div className="content404">
          <h1 className="text404">404</h1>
        </div>
        <div className="content_box_404">
          <h3>Trang bạn tìm kiếm không tồn tại</h3>
          <Link href="/" className=" btnGlobal btnLink_404">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
