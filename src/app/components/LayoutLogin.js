// //---------------Filter Table------------------------
// const [searchText, setSearchText] = useState("");
// const [searchedColumn, setSearchedColumn] = useState("");
// const searchInput = useRef(null);
// const handleSearchFilter = (selectedKeys, confirm, dataIndex) => {
//   confirm();
//   setSearchText(selectedKeys[0]);
//   setSearchedColumn(dataIndex);
// };
// const handleResetFilter = (clearFilters) => {
//   clearFilters();
//   setSearchText("");
// };
// const getColumnSearchProps = (dataIndex) => ({
//   filterDropdown: ({
//     setSelectedKeys,
//     selectedKeys,
//     confirm,
//     clearFilters,
//     close,
//   }) => (
//     <div
//       style={{
//         padding: 8,
//       }}
//       onKeyDown={(e) => e.stopPropagation()}
//     >
//       <Input
//         ref={searchInput}
//         id="inputSearchFilterform"
//         name="inputSearchFilterform"
//         placeholder={`Search ${dataIndex}`}
//         value={selectedKeys[0]}
//         onChange={(e) =>
//           setSelectedKeys(e.target.value ? [e.target.value] : [])
//         }
//         onPressEnter={() =>
//           handleSearchFilter(selectedKeys, confirm, dataIndex)
//         }
//         style={{
//           marginBottom: 8,
//           display: "block",
//         }}
//       />
//       <Space>
//         <Button
//           type="primary"
//           onClick={() => handleSearchFilter(selectedKeys, confirm, dataIndex)}
//           icon={<SearchOutlined />}
//           size="small"
//           style={{
//             width: 90,
//           }}
//         >
//           Search
//         </Button>
//         <Button
//           onClick={() => clearFilters && handleResetFilter(clearFilters)}
//           size="small"
//           style={{
//             width: 90,
//           }}
//         >
//           Reset
//         </Button>
//         <Button
//           type="link"
//           size="small"
//           onClick={() => {
//             confirm({
//               closeDropdown: false,
//             });
//             setSearchText(selectedKeys[0]);
//             setSearchedColumn(dataIndex);
//           }}
//         >
//           Filter
//         </Button>
//         <Button
//           type="link"
//           size="small"
//           onClick={() => {
//             close();
//           }}
//         >
//           close
//         </Button>
//       </Space>
//     </div>
//   ),
//   filterIcon: (filtered) => (
//     <SearchOutlined
//       style={{
//         color: filtered ? "#1677ff" : undefined,
//       }}
//     />
//   ),
//   onFilter: (value, record) =>
//     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//   onFilterDropdownOpenChange: (visible) => {
//     if (visible) {
//       setTimeout(() => searchInput.current?.select(), 100);
//     }
//   },
//   render: (text) =>
//     searchedColumn === dataIndex ? (
//       <Highlighter
//         highlightStyle={{
//           backgroundColor: "#ffc069",
//           padding: 0,
//         }}
//         searchWords={[searchText]}
//         autoEscape
//         textToHighlight={text ? text.toString() : ""}
//       />
//     ) : (
//       text
//     ),
// });
// const columModalfirt = [
//   {
//     title: "STT",
//     dataIndex: "stt",
//     key: "stt",
//   },
//   {
//     title: "Tên khóa học",
//     dataIndex: "tenKhoaHoc",
//     key: "tenKhoaHoc",
//     ...getColumnSearchProps("tenKhoaHoc"),
//   },
//   {
//     title: "chờ xác nhận",
//     render: (record) => (
//       <>
//         <button
//           className="btn btn-success"
//           // onClick={() => {
//           //   registerCourse(record.taiKhoan, record.maKhoaHoc);
//           // }}
//         >
//           Ghi danh
//         </button>
//       </>
//     ),
//   },
// ];

// -----------
{
  /* <Modal.Body>
//         <div className="border-bottom border-secondary">
//           <div className="row">
//             <h5 className="text-left my-1 col-3" id="URM-title">
//               Chọn khóa học
//             </h5>
//             <form className="form-group col-6">
//               <div className="input-group float-left">
//                 <input
//                   data-toggle="dropdown"
//                   placeholder="Chọn khóa học"
//                   type="text"
//                   className="form-control input-dropdown"
//                   aria-label="Text input with segmented dropdown button"
//                   value={inputValue}
//                   aria-expanded="false"
//                   onChange={handleInputChange}
//                   onFocus={() => setDropdownVisible(true)}
//                 />
//                 <button
//                   data-reference="parent"
//                   data-boundary="window"
//                   type="button"
//                   className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
//                   data-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{ display: "none" }}
//                 />
//                 <div className="input-group-append">
//                   {isDropdownVisible && (
//                     <ul
//                       className="dropdown-menu set-height show"
//                       style={{
//                         width: "35vw",
//                         height: "50vh",
//                         overflowY: "scroll",
//                       }}
//                     >
//                       {courses.map((course) => (
//                         <li
//                           key={course.maKhoaHoc}
//                           onClick={() => handleCourseSelect(course)}
//                           className="dropdown-item"
//                         >
//                           {course.tenKhoaHoc} {/* Hiển thị tên khóa học */
  // }
  // {
  /* </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </form>
            <div className="col-3">
              <button className="btn btn-primary float-right" id="btnThem">
                Ghi danh
              </button>
            </div>
          </div>
        </div> */
}
{
  /* </Modal.Body> */
}

//-------------------------------
{
  /* <Modal.Body>
        <div className="border-bottom border-secondary">
          <div className="row">
            <h5 className="text-left my-1 col-3" id="URM-title">
              Chọn khóa học
            </h5>
            <form className="form-group col-6 mb-2">
              <div className="input-group float-left">
                <input
                  data-toggle="dropdown"
                  placeholder="Chọn khóa học"
                  type="text"
                  className="form-control input-dropdown"
                  aria-label="Text input with segmented dropdown button"
                  value={inputValue}
                  aria-expanded="false"
                  onChange={handleInputChange}
                  onFocus={() => setDropdownVisible(true)}
                />
                <button
                  data-reference="parent"
                  data-boundary="window"
                  type="button"
                  className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  style={{ display: "none" }}
                />
                <div className="input-group-append">
                  {isDropdownVisible && (
                    <ul
                      className="dropdown-menu set-height show"
                      style={{
                        width: "35vw",
                        height: "50vh",
                        overflowY: "scroll",
                      }}
                    >
                      {courses.map((course) => (
                        <li
                          key={course.maKhoaHoc}
                          onClick={() => handleCourseSelect(course)}
                          className="dropdown-item"
                        >
                          {course.tenKhoaHoc} {/* Hiển thị tên khóa học */
}
{
  /* </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </form>
            <div className="col-3">
              <button className="btn btn-primary float-right" id="btnThem">
                Ghi danh
              </button>
            </div>
          </div>
        </div> */
}
{
  /* </Modal.Body> */
}

//---------------form thêm khóa học----------------------------
{
  /* <form className="d-flex flex-wrap" role="form">
              <div className="form-group col-6 mb-2  px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="maKhoaHoc"
                    id="tknv"
                    className="form-control input-sm"
                    placeholder="Mã khóa học"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-address-book" />
                    </span>
                  </div>
                  <input
                    type="name"
                    name="tenKhoaHoc"
                    id="name"
                    className="form-control input-sm"
                    placeholder="Tên khóa học"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-briefcase" />
                    </span>
                  </div>
                  <select className="form-control" name="maDanhMucKhoaHoc">
                    <option value>Danh mục khóa học</option>
                    {dataCourseCategory.map((item, index) => {
                      return (
                        <option key={index} value={item.maDanhMuc}>
                          {item.tenDanhMuc}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-calendar" />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="ngayTao"
                    id="datepicker"
                    className="form-control"
                    placeholder="Ngày tạo"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-user" />
                    </span>
                  </div>
                  <input
                    type="number"
                    name="danhGia"
                    id="tknv"
                    className="form-control input-sm"
                    placeholder="Đánh giá"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-address-book" />
                    </span>
                  </div>
                  <input
                    type="number"
                    name="luotXem"
                    id="name"
                    className="form-control input-sm"
                    placeholder="Lượt xem"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0">
                      <i className="fa fa-briefcase" />
                    </span>
                  </div>
                  <select className="form-control" name="taiKhoanNguoiTao">
                    <option value>Người tạo</option>
                  </select>
                </div>
                <span className="sp-thongbao" id="tbChucVu" />
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div>
                  <input
                    name="hinhAnh"
                    accept="image/png,image/jpg,image/jpeg"
                    type="file"
                    id="hinhAnh"
                  />
                </div>
              </div>
              <div className="form-group col-6 mb-2 px-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text h-100 rounded-0 ">
                      <i className="fa fa-address-book" />
                    </span>
                  </div>
                  <select className="form-control" name="maNhom">
                    <option value>Mã nhóm</option>
                    <option value="GP01">GP01</option>
                    <option value="GP02">GP02</option>
                    <option value="GP03">GP03</option>
                    <option value="GP04">GP04</option>
                    <option value="GP05">GP05</option>
                    <option value="GP06">GP06</option>
                    <option value="GP07">GP07</option>
                    <option value="GP08">GP08</option>
                    <option value="GP09">GP09</option>
                    <option value="GP10">GP10</option>
                    <option value="GP11">GP11</option>
                    <option value="GP12">GP12</option>
                    <option value="GP13">GP13</option>
                    <option value="GP14">GP14</option>
                    <option value="GP15">GP15</option>
                  </select>
                </div>
              </div>
              <div className="col-12 container text-justify">
                <h5 className="card-header mb-2">Mô tả khóa học</h5>
                <div className="row">
                  <span className="col-3">
                    <img
                      src="/img/logo512.png"
                      className="img-fluid rounded"
                      height={200}
                      width={200}
                    />
                  </span>
                  <textarea
                    type="text"
                    name="moTa"
                    className="form-control input-sm w-75 col-9"
                    placeholder="Nhập mô tả"
                  />
                </div>
              </div>
              <div className="modal-footer col-12" id="modal-footer">
                <button id="btnThem" type="submit" className="btn btn-success">
                  Thêm khóa học
                </button>
                <button
                  id="btnDong"
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={() => {
                    setShowModalAddCourse(false);
                  }}
                >
                  Đóng
                </button>
              </div>
            </form> */
}
