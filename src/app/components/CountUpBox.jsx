// components/CountUpBox.js
import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const CountUpBox = ({ number, title, imgSrc }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Ngắt kết nối sau khi đã thấy
        }
      },
      { threshold: 0.1 } // Bắt đầu khi 10% phần tử xuất hiện
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  return (
    <div className="boxNumber" ref={ref}>
      <div>
        <img src={imgSrc} className="imgIcon" alt={title} />
      </div>
      <div className="textNumber">
        {isVisible ? <CountUp end={number} duration={2.5} /> : "0"}
      </div>
      <p className="textNumberTitle">{title}</p>
    </div>
  );
};

export default CountUpBox;
