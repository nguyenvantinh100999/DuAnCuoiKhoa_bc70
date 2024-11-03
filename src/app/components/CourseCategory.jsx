import React from "react";
import { getCourseCategoriesAction } from "../actions/service/productApi";
import Link from "next/link";

const CourseCategory = async () => {
  const data = await getCourseCategoriesAction();
  console.log(data);
  return (
    <ul className="courseCateList">
      {data?.map((item) => {
        return (
          <li key={item.maDanhMuc}>
            <Link href={`/category/${item.maDanhMuc}`}>{item.tenDanhMuc}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CourseCategory;
