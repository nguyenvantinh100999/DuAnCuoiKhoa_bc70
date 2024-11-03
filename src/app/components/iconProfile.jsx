"use client";
import React, { useEffect, useState } from "react";
import { TOKEN } from "../utils/setting";
import Link from "next/link";
import { useRouter } from "next/navigation";

const IconProfile = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      setIsLogin(true);
    }
    renderIconProfile();
  }, []);
  const functionLogOut = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessToken");
    // router.push("/");
    window.location.reload();
  };
  const renderIconProfile = () => {
    if (!!isLogin) {
      return (
        <div className="headerAvatar">
          <div className="infoHeader">
            <Link href={"/profile"}>
              <img src="/img/unnamed.jpg" className="avatar" alt="logo" />
            </Link>
            <span className="logout">
              <Link
                href="/"
                onClick={() => {
                  functionLogOut();
                }}
              >
                <i className="fas fa-power-off" />
              </Link>
            </span>
          </div>
        </div>
      );
    }
    return (
      <Link href={"/login"} className="btnGlobal btn btn-success">
        Đăng Nhập
      </Link>
    );
  };

  return renderIconProfile();
};

export default IconProfile;
