"use client";

import { useState } from "react";

export default function ClientImageComponent({ src, alt, fallbackSrc, style }) {
  const [imageSrc, setImageSrc] = useState(src);

  const handleImageError = () => {
    setImageSrc(fallbackSrc); // Thay thế hình ảnh lỗi bằng fallbackSrc
  };

  return (
    <img
      className="imgNet"
      src={imageSrc}
      alt={alt}
      style={{ width: style, height: style }}
      onError={handleImageError} // Xử lý khi hình ảnh bị lỗi
    />
  );
}
