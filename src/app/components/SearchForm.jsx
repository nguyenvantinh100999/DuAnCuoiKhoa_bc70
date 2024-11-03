"use client";

import { useRouter } from "next/navigation";

const SearchForm = () => {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form
    const keyword = event.target.search.value; // Lấy giá trị từ ô input
    router.push(`/search?keyword=${keyword}`); // Chuyển hướng đến trang tìm kiếm
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        name="search"
        className="searchForm form-control"
        placeholder="Tìm kiếm"
      />
    </form>
  );
};

export default SearchForm;
