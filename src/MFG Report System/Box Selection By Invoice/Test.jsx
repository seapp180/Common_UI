<Content>
      
<div style={{ display: "flex", alignItems: "center" }}>
  <h2 className="TitlePage_h2">Box Selection By Invoice maintain </h2>
</div>
{/* <Card> */}
<div style={{ display: "flex", alignItems: "flex-start" }}>
  <table>
    <tr>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Factory :</span>
        </div>
      </td>
      <td>
        <div>
          <Select
            showSearch
            value={selectFactory}
            onChange={handleFactory}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select Factory"
            optionFilterProp="children"
            filterOption={
              (input, option) => (option?.label ?? "").toLowerCase()
              // .includes(input.toLowerCase())
            }
            options={Factory}
          />
        </div>
      </td>
    </tr>
    {/* <tr>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Invoice No :</span>
        </div>
      </td>
      <td>
        <div>
          <Select
            showSearch
            value={selectInvNo}
            onChange={handleInvoice}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select InvNo"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={InvNo}
          />
        </div>
      </td>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Seq :</span>
        </div>
      </td>
      <td>
        <div>
          <Input
            disabled
            value={Seq}
            style={{
              width: "80px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
          />
        </div>
      </td>
    </tr> */}
<tr>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Product Item :</span>
        </div>
      </td>
      <td>
        <div>
          <Select
            showSearch
            value={selectProductItem}
            onChange={handleProductItem}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select Product Item"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={ProductItem}
          />
        </div>
      </td>
      {/* <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Invoice Date :</span>
        </div>
      </td> */}
      {/* <td>
        <div>
          <Input
            type="date"
            value={Invdate}
            onChange={(e) => setInvdate(e.target.value)}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            //  placeholder="Select ITem"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     handleProduct("SearchItem");
            //   }
            // }}
          />
        </div>
      </td> */}
    </tr>
<tr>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Invoice No From :</span>
        </div>
      </td>
      <td>
        <div>
          <Select
            showSearch
            value={selectInvNo}
            onChange={handleInvoice}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select InvNo"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={InvNo}
          />
        </div>
      </td>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Invoice No. To :</span>
        </div>
      </td>
      <td>
      <div>
          <Select
            showSearch
            value={selectInvNo}
            onChange={handleInvoice}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select InvNo"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={InvNo}
          />
        </div>
      </td>
    </tr>

     <tr>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Invoice Date From :</span>
        </div>
      </td>
      <td>
        <div>
          <Input
               type="date"
            value={selectProductItem}
            onChange={handleProductItem}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select Product Item"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={ProductItem}
          />
        </div>
      </td>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}>Invoice Date To :</span>
        </div>
      </td>
      <td>
        <div>
          <Input
            type="date"
            value={Invdate}
            onChange={(e) => setInvdate(e.target.value)}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            //  placeholder="Select ITem"
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     handleProduct("SearchItem");
            //   }
            // }}
          />
        </div>
      </td>
    </tr>
    <br></br>
    <tr>
      <td>
        <div style={{ marginLeft: "30px", textAlign: "right" }}>
          <span style={{ fontSize: "14px" }}></span>
        </div>
      </td>
      <td>
        <div>
        <Button
            type="primary"
            icon={<SearchOutlined />}
            style={{
              background: "#f4d03f",
              color: "#fff",
              marginLeft: "10px",
            }}
            onClick={() => Reset("ResetHeader")}
          >
            Search 
          </Button>
          <Button
            type="primary"
            icon={<  PlusOutlined/>}
            style={{
              background: "#3498db ",
              color: "#fff",
              marginLeft: "10px",
            }}
            onClick={() => Reset("ResetHeader")}
          >
            New
          </Button>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            style={{
              background: "#FF7043",
              color: "#fff",
              marginLeft: "10px",
            }}
            onClick={() => Reset("ResetHeader")}
          >
            Reset
          </Button>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            style={{
              background: "#388E3C",
              color: "#fff",
              marginLeft: "10px",
            }}

            // onClick={showModal}
          >
            Export
          </Button>
        </div>
      </td>
    </tr>
  </table>
  <div></div>
</div>
{/* </Card> */}

{showGrid == true && (
  // <Card
  //   style={{
  //     marginTop: "10px",
  //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
  //   }}
  // >
  <>
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 className="TitleInv_h2">Select Box no. </h2>
          </div>
          <Table
            columns={TableSelectBox}
            className="TBInv"
            dataSource={DataSelectBox}
            bordered
            pagination={true}
            // scroll={{ y: 500 }}
            // pagination=
          ></Table>
        </div>
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2 className="TitleInv_h2_v2">Box no. Detail </h2>
          </div>
          <Table
            columns={TableBoxNoDetail}
            className="TBInv1"
            dataSource={DataBoxDetail}
            bordered
            pagination={true}
            // scroll={{ y: 500 }}
            // pagination=
          ></Table>
        </div>
      </div>
    </div>
    <br></br>
    <div style={{marginBottom:"20px"}}>
      <Button
        type="primary"
        icon={<SaveOutlined />}
        style={{
          background: "#1976D2",
          color: "#fff",
          marginLeft: "10px",
        }}
        // onClick={() => {
        //   Search();
        // }}
      >
        Save
      </Button>
      <Button
        icon={<ClearOutlined />}
        type="primary"
        style={{
          background: "#9E9E9E",
          color: "#fff",
          marginLeft: "10px",
        }}
        // onClick={() => handleGoToNextPage("NewBoxFoxcon")}
        // onClick={showModal}
      >
        Cancel
      </Button>
    </div> </>
  // </Card>
)}
</Content>

//     <Content>
// <div style={{ display: "flex", alignItems: "center" }}>
// <h2 className="TitlePage_h2">Box Selection By Invoice maintain </h2>
// </div>
// {/* <Card> */}
// <div style={{ display: "flex", alignItems: "flex-start" }}>
// <table>
//   <tr>
//     <td>
//       <div style={{ marginLeft: "30px", textAlign: "right" }}>
//         <span style={{ fontSize: "14px" }}>Factory :</span>
//       </div>
//     </td>
//     <td>
//       <div>
//         <Select
//           showSearch
//           value={selectFactory}
//           onChange={handleFactory}
//           style={{
//             width: "200px",
//             display: "block",
//             marginTop: "5px",
//             marginLeft: "5px",
//           }}
//           placeholder="Select Factory"
//           optionFilterProp="children"
//           filterOption={
//             (input, option) => (option?.label ?? "").toLowerCase()
//             // .includes(input.toLowerCase())
//           }
//           options={Factory}
//         />
//       </div>
//     </td>
 
//   </tr>

//   <tr>
//     <td>
//       <div style={{ marginLeft: "30px", textAlign: "right" }}>
//         <span style={{ fontSize: "14px" }}>Invoice No. From :</span>
//       </div>
//     </td>
//     <td>
//       <div>
//         <Select
//           showSearch
//           value={selectInvNoFrom}
//           onChange={(value) => handleInvoice(value, "From")}
//           style={{
//             width: "200px",
//             display: "block",
//             marginTop: "5px",
//             marginLeft: "5px",
//           }}
//           placeholder="Select InvNo"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             (option?.label ?? "")
//               .toLowerCase()
//               .includes(input.toLowerCase())
//           }
//           options={InvNo}
//         />
//       </div>
//     </td>
//     <td>
//       <div style={{ marginLeft: "30px", textAlign: "right" }}>
//         <span style={{ fontSize: "14px" }}>Invoice No. To :</span>
//       </div>
//     </td>
//     <td>
//       <div>
//         <Select
//           showSearch
//           value={selectInvNoTo}
//           onChange={(value) => handleInvoice(value, "To")}
//           style={{
//             width: "200px",
//             display: "block",
//             marginTop: "5px",
//             marginLeft: "5px",
//           }}
//           placeholder="Select InvNo"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             (option?.label ?? "")
//               .toLowerCase()
//               .includes(input.toLowerCase())
//           }
//           options={InvNo}
//         />
//       </div>
//     </td>
//   </tr>

//   <tr>
//     <td>
//       <div style={{ marginLeft: "30px", textAlign: "right" }}>
//         <span style={{ fontSize: "14px" }}>Invoice Date From :</span>
//       </div>
//     </td>
//     <td>
//       <div>
//         <Input
//           type="date"
//           value={InvdateFrom}
//           onChange={(e) => setInvdateFrom(e.target.value)}
//           style={{
//             width: "200px",
//             display: "block",
//             marginTop: "5px",
//             marginLeft: "5px",
//           }}
//         />
//       </div>
//     </td>
//     <td>
//       <div style={{ marginLeft: "30px", textAlign: "right" }}>
//         <span style={{ fontSize: "14px" }}>Invoice Date To :</span>
//       </div>
//     </td>
//     <td>
//       <div>
//         <Input
//           type="date"
//           value={InvdateTo}
//           onChange={(e) => setInvdateTo(e.target.value)}
//           style={{
//             width: "200px",
//             display: "block",
//             marginTop: "5px",
//             marginLeft: "5px",
//           }}
//           //  placeholder="Select ITem"
//           // onKeyDown={(e) => {
//           //   if (e.key === "Enter") {
//           //     handleProduct("SearchItem");
//           //   }
//           // }}
//         />
//       </div>
//     </td>
//   </tr>
//   <tr>
//     <td>
//       <div style={{ marginLeft: "30px", textAlign: "right" }}>
//         <span style={{ fontSize: "14px" }}>Product Item :</span>
//       </div>
//     </td>
//     <td>
//       <div>
//         <Select
//           showSearch
//           value={selectProductItem}
//           onChange={handleProductItem}
//           style={{
//             width: "200px",
//             display: "block",
//             marginTop: "5px",
//             marginLeft: "5px",
//           }}
//           placeholder="Select Product Item"
//           optionFilterProp="children"
//           filterOption={(input, option) =>
//             (option?.label ?? "")
//               .toLowerCase()
//               .includes(input.toLowerCase())
//           }
//           options={ProductItem}
//         />
//       </div>
//     </td>
//   </tr>
//   <tr>
//     <td>
//       <div style={{ marginLeft: "30px", textAlign: "right" }}>
//         <span style={{ fontSize: "14px" }}>Box No. :</span>
//       </div>
//     </td>
//     <td>
//       <div>
//         <Input
//           value={BoxSearch}
//           onChange={(e) => setBoxSearch(e.target.value)} // อัปเดตค่าใน state
//           style={{
//             width: "200px",
//             display: "block",
//             marginTop: "5px",
//             marginLeft: "5px",
//           }}
//           placeholder="Input Box No."
//         />
//       </div>
//     </td>
//   </tr>

//   <br></br>
//   <tr>
//     <td>
//       <div style={{ marginLeft: "30px", textAlign: "right" }}>
//         <span style={{ fontSize: "14px" }}></span>
//       </div>
//     </td>
//     <td>
//       <div>
//         <Button
//           type="primary"
//           icon={<SearchOutlined />}
//           style={{
//             background: "#f4d03f",
//             color: "#fff",
//             marginLeft: "10px",
//           }}
//           onClick={Search}
//         >
//           Search
//         </Button>
//         <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           style={{
//             background: "#3498db ",
//             color: "#fff",
//             marginLeft: "10px",
//           }}
//           onClick={Search}
//         >
//           New
//         </Button>
//         <Button
//           type="primary"
//           icon={<ReloadOutlined />}
//           style={{
//             background: "#FF7043",
//             color: "#fff",
//             marginLeft: "10px",
//           }}
//           onClick={() => Reset("ResetHeader")}
//         >
//           Reset
//         </Button>
//         <Button
//           icon={<PlusOutlined />}
//           type="primary"
//           style={{
//             background: "#388E3C",
//             color: "#fff",
//             marginLeft: "10px",
//           }}

//           // onClick={showModal}
//         >
//           Export
//         </Button>
//       </div>
//     </td>
//   </tr>
// </table>
// <div></div>
// </div>
// {/* </Card> */}

// {showGrid == "KK" && (
// // <Card
// //   style={{
// //     marginTop: "10px",
// //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
// //   }}
// // >
// <>
//   <div
//     style={{
//       display: "flex",
//       width: "100%",
//       gap: "20px",
//     }}
//   >
//     <div
//       style={{
//         flex: 1,
//       }}
//     >
//       <div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <h2 className="TitleInv_h2">Select Box no. </h2>
//         </div>
//         <Table
//           columns={TableSelectBox}
//           className="TBInv"
//           dataSource={DataSelectBox}
//           bordered
//           pagination={true}
//           // scroll={{ y: 500 }}
//           // pagination=
//         ></Table>
//       </div>
//     </div>
//     <div
//       style={{
//         flex: 1,
//       }}
//     >
//       <div>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <h2 className="TitleInv_h2_v2">Box no. Detail </h2>
//         </div>
//         <Table
//           columns={TableBoxNoDetail}
//           className="TBInv1"
//           dataSource={DataBoxDetail}
//           bordered
//           pagination={true}
//           // scroll={{ y: 500 }}
//           // pagination=
//         ></Table>
//       </div>
//     </div>
//   </div>
//   <br></br>
//   <div style={{ marginBottom: "20px" }}>
//     <Button
//       type="primary"
//       icon={<SaveOutlined />}
//       style={{
//         background: "#1976D2",
//         color: "#fff",
//         marginLeft: "10px",
//       }}
//       // onClick={() => {
//       //   Search();
//       // }}
//     >
//       Save
//     </Button>
//     <Button
//       icon={<ClearOutlined />}
//       type="primary"
//       style={{
//         background: "#9E9E9E",
//         color: "#fff",
//         marginLeft: "10px",
//       }}
//       // onClick={() => handleGoToNextPage("NewBoxFoxcon")}
//       // onClick={showModal}
//     >
//       Cancel
//     </Button>
//   </div>{" "}
// </>
// // </Card>
// )}

// <div
// style={{
//   display: "flex",
//   width: "100%",
//   gap: "20px",
// }}
// >
// <div></div>
// <div
//   style={{
//     flex: 1,
//   }}
// >
//   <div>
//     <div style={{ marginTop: "20px", marginRight: "20px" }}></div>
//     <Table
//       columns={TableSearch}
//       className="TBInv1"
//       dataSource={DataSeachBox}
//       pagination={true}
//       scroll={{ y: 500 }}
//       // pagination=
//     ></Table>
//   </div>
// </div>
// </div>
// </Content>