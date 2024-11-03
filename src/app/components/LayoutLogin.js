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
