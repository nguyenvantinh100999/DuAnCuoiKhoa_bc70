"use client"; // Đánh dấu đây là một Client Component

import { usePathname } from "next/navigation";
import HeaderHome from "./HeaderHome";
import Footer from "./Footer";

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const isLoginOrAdmin =
    pathname === "/login" || pathname.startsWith("/admin/");
  return (
    <>
      {/* Kiểm tra xem đường dẫn có phải là '/login' hay không */}
      {!isLoginOrAdmin && <HeaderHome />}
      {children}
      {!isLoginOrAdmin && <Footer />}
    </>
  );
};

export default LayoutWrapper;
