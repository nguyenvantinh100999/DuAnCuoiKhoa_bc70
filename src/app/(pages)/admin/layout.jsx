import React from "react";
import "../../styles/admin/admin.scss";
import Link from "next/link";
const AdminTemplate = ({ children }) => {
  return (
    <div className="adminTemplate">
      <div className="menuAdmin">
        <nav id="sidebar" className="align-middle">
          <div className="sidebar-header pt-4">
            <Link
              href="/"
              type="button"
              id="sidebarCollapse"
              className="btn btn-light mx-2"
            >
              <span>
                <i className="fa fa-home" />
              </span>
            </Link>
          </div>
          <ul className="list-unstyled components py-5 ">
            <li>
              <Link href="/admin/userManagement">
                <i className="fa fa-user" />
                Quản lý người dùng
              </Link>
            </li>
            <li>
              <Link href="/admin/courseManagement">
                <i className="fa fa-briefcase" />
                Quản lý khóa học
              </Link>
            </li>
          </ul>
        </nav>

        <div className="adminManage">{children}</div>
      </div>
    </div>
  );
};

export default AdminTemplate;
