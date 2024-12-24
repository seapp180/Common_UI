// import React, { useEffect, useState, useRef } from "react";
// import {
//   Layout,
//   theme,
//   Input,
//   Card,
//   Col,
//   Row,
//   Typography,
//   Select,
//   DatePicker,
//   Space,
//   Button,
//   Table,
//   Flex,
//   Radio,
//   Checkbox,
//   Upload,
//   message,
//   Avatar,
//   notification,
// } from "antd";
// import { Table as AntTable } from "antd";
// const { Content } = Layout;
// import {
//   SearchOutlined,
//   RedoOutlined,
//   FileExcelOutlined,
// } from "@ant-design/icons";
// import "./QA_ORT_WorkingRecord.css";
// import "../../StyleCommon.css";
// import { fn_QA_ORT_WorkingRecord } from "./fn_QA_ORT_WorkingRecord";
// import moment from "moment";

// function QA_ORT_WorkingRecord() {
//   const {
//     opFactory,
//     opProduct_Type,
//     opInput,
//     opOutput,
//     setSelectedFromIn,
//     selectedDateFromIn,
//     setSelectedFromOut,
//     selectedDateFromOut,
//     setSelectedToIn,
//     selectedDateToIn,
//     setSelectedToOut,
//     selectedDateToOut,
//     drpFactory,
//     setDrpFactory,
//     drpProductType,
//     setDrpProductType,
//     drpInPut,
//     setDrpInPut,
//     drpOutPut,
//     setDrpOutPut,
//     setInputProductName,
//     inputProductName,
//     inputTestItem,
//     setInputTestItem,
//     inputLotNo,
//     setInputLotNo,
//     inputWeekNo,
//     setInputWeekNo,
//     inputSerialNo,
//     setInputSerialNo,
//     Btn_Search,
//     Btn_Cancel,
//     Btn_Excel,
//     dataSource,
//     columns,
//     showTable,
//     loading,
//     opProductName,
//     drpProductName,
//     setDrpProductName,
//     drpItemTest,
//     setDrpItemTest,
//     opItemTest,
//   } = fn_QA_ORT_WorkingRecord();
//   return (
//     <>
//       <div className="desktop-view">
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <h2 className="TitlePage_h2">QA ORT WorkingRecord</h2>
//         </div>
//         <div>
//           {/* 1 */}
//           <Row>
//             <Col span={24}>
//               <Card className="CardStyle" style={{ border: "none" }}>
//                 <Row>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Factory :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <Select
//                       size="middle"
//                       showSearch
//                       style={{
//                         width: "96%",
//                       }}
//                       placeholder="--- Please select ---"
//                       optionFilterProp="label"
//                       filterSort={(optionA, optionB) =>
//                         (optionA?.label ?? "")
//                           .toLowerCase()
//                           .localeCompare((optionB?.label ?? "").toLowerCase())
//                       }
//                       options={opFactory.map((Factory) => ({
//                         value: Factory.value,
//                         label: Factory.label,
//                       }))}
//                       defaultValue="A1"
//                       value={drpFactory}
//                       onChange={(e) => {
//                         if (e) {
//                           setDrpFactory(e);
//                         } else {
//                           setDrpFactory("A1");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">
//                       Product Type :
//                     </Typography>
//                   </Col>
//                   <Col span={3}>
//                     <Select
//                       size="middle"
//                       showSearch
//                       style={{
//                         width: "96%",
//                       }}
//                       placeholder="--- Please select ---"
//                       optionFilterProp="label"
//                       filterSort={(optionA, optionB) =>
//                         (optionA?.label ?? "")
//                           .toLowerCase()
//                           .localeCompare((optionB?.label ?? "").toLowerCase())
//                       }
//                       options={opProduct_Type.map((Product_Type) => ({
//                         value: Product_Type.value,
//                         label: Product_Type.label,
//                       }))}
//                       defaultValue="ALL"
//                       value={drpProductType}
//                       onChange={(e) => {
//                         if (e) {
//                           setDrpProductType(e);
//                         } else {
//                           setDrpProductType("ALL");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">
//                       Product Name :
//                     </Typography>
//                   </Col>
//                   <Col span={3}>
//                     {/* <Input
//                   size="middle"
//                   style={{
//                     width: "96%",
//                   }}
//                   value={
//                     inputProductName === "" ? undefined : inputProductName
//                   }
//                   onChange={(e) => {
//                     if (e.target.value) {
//                       setInputProductName(e.target.value);
//                     } else {
//                       setInputProductName("");
//                     }
//                   }}
//                   allowClear
//                 /> */}
//                     <Select
//                       size="middle"
//                       showSearch
//                       style={{
//                         width: "96%",
//                       }}
//                       placeholder="--- Please select ---"
//                       optionFilterProp="label"
//                       filterSort={(optionA, optionB) =>
//                         (optionA?.label ?? "")
//                           .toLowerCase()
//                           .localeCompare((optionB?.label ?? "").toLowerCase())
//                       }
//                       options={opProductName.map((ProductName) => ({
//                         value: ProductName.value,
//                         label: ProductName.label,
//                       }))}
//                       value={drpProductName || undefined}
//                       onChange={(e) => {
//                         setDrpProductName(e || undefined);
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Test Item :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     {/* <Input
//                       size="middle"
//                       style={{
//                         width: "96%",
//                       }}
//                       value={inputTestItem === "" ? undefined : inputTestItem}
//                       onChange={(e) => {
//                         if (e.target.value) {
//                           setInputTestItem(e.target.value);
//                         } else {
//                           setInputTestItem("");
//                         }
//                       }}
//                       allowClear
//                     /> */}
//                     <Select
//                       size="middle"
//                       showSearch
//                       style={{
//                         width: "96%",
//                       }}
//                       placeholder="--- Please select ---"
//                       optionFilterProp="label"
//                       filterSort={(optionA, optionB) =>
//                         (optionA?.label ?? "")
//                           .toLowerCase()
//                           .localeCompare((optionB?.label ?? "").toLowerCase())
//                       }
//                       options={opItemTest.map((ItemTest) => ({
//                         value: ItemTest.value,
//                         label: ItemTest.label,
//                       }))}
//                       value={drpItemTest || undefined}
//                       onChange={(e) => {
//                         setDrpItemTest(e || undefined);
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={4} className="ColStyleBtn">
//                     <Button
//                       type="primary"
//                       className="Btn_Search"
//                       icon={<SearchOutlined className="Icon_Size" />}
//                       onClick={Btn_Search}
//                       loading={loading}
//                     >
//                       Search
//                     </Button>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>

//           {/* 2 */}
//           <Row>
//             <Col span={24}>
//               <Card className="CardStyle" style={{ border: "none" }}>
//                 <Row>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Lot No. :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <Input
//                       size="middle"
//                       style={{
//                         width: "96%",
//                       }}
//                       value={inputLotNo === "" ? undefined : inputLotNo}
//                       onChange={(e) => {
//                         if (e.target.value) {
//                           setInputLotNo(e.target.value);
//                         } else {
//                           setInputLotNo("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Week No. :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <Input
//                       size="middle"
//                       style={{
//                         width: "96%",
//                       }}
//                       value={inputWeekNo === "" ? undefined : inputWeekNo}
//                       onChange={(e) => {
//                         if (e.target.value) {
//                           setInputWeekNo(e.target.value);
//                         } else {
//                           setInputWeekNo("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Serial No. :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <Input
//                       size="middle"
//                       style={{
//                         width: "96%",
//                       }}
//                       value={inputSerialNo === "" ? undefined : inputSerialNo}
//                       onChange={(e) => {
//                         if (e.target.value) {
//                           setInputSerialNo(e.target.value);
//                         } else {
//                           setInputSerialNo("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={5} className="ColStyle"></Col>

//                   <Col span={4} className="ColStyleBtn">
//                     <Button
//                       type="primary"
//                       className="Btn_Cancel"
//                       icon={<RedoOutlined className="Icon_Size" />}
//                       onClick={Btn_Cancel}
//                     >
//                       Cancel
//                     </Button>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>

//           {/* 3 */}
//           <Row>
//             <Col span={24}>
//               <Card className="CardStyle" style={{ border: "none" }}>
//                 <Row>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Input :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <Select
//                       size="middle"
//                       showSearch
//                       style={{
//                         width: "96%",
//                       }}
//                       placeholder="--- Please select ---"
//                       optionFilterProp="label"
//                       filterSort={(optionA, optionB) =>
//                         (optionA?.label ?? "")
//                           .toLowerCase()
//                           .localeCompare((optionB?.label ?? "").toLowerCase())
//                       }
//                       options={opInput.map((input) => ({
//                         value: input.value,
//                         label: input.label,
//                       }))}
//                       value={drpInPut === "" ? undefined : drpInPut}
//                       onChange={(e) => {
//                         if (e) {
//                           setDrpInPut(e);
//                         } else {
//                           setDrpInPut("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Date Form :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <DatePicker
//                       placeholder="dd-mm-yyyy"
//                       format="DD-MM-YYYY"
//                       size="middle"
//                       style={{
//                         width: "96%",
//                       }}
//                       value={
//                         selectedDateFromIn === ""
//                           ? undefined
//                           : moment(selectedDateFromIn, "YYYY-MM-DD")
//                       }
//                       onChange={(date) => {
//                         if (date) {
//                           setSelectedFromIn(date.format("YYYYMMDD"));
//                         } else {
//                           setSelectedFromIn("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Date To :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <DatePicker
//                       placeholder="dd-mm-yyyy"
//                       format="DD-MM-YYYY"
//                       size="middle"
//                       style={{
//                         width: "96%",
//                       }}
//                       value={
//                         selectedDateToIn === ""
//                           ? undefined
//                           : moment(selectedDateToIn, "YYYY-MM-DD")
//                       }
//                       onChange={(date) => {
//                         if (date) {
//                           setSelectedToIn(date.format("YYYYMMDD"));
//                         } else {
//                           setSelectedToIn("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={5} className="ColStyle"></Col>

//                   <Col span={4} className="ColStyleBtn">
//                     <Button
//                       type="primary"
//                       className="Btn_Export"
//                       disabled={!showTable}
//                       icon={<FileExcelOutlined className="Icon_Size" />}
//                       onClick={Btn_Excel}
//                     >
//                       Export
//                     </Button>
//                   </Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>

//           {/* 4 */}
//           <Row>
//             <Col span={24}>
//               <Card className="CardStyle" style={{ border: "none" }}>
//                 <Row>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Output :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <Select
//                       size="middle"
//                       showSearch
//                       style={{
//                         width: "96%",
//                       }}
//                       placeholder="--- Please select ---"
//                       optionFilterProp="label"
//                       filterSort={(optionA, optionB) =>
//                         (optionA?.label ?? "")
//                           .toLowerCase()
//                           .localeCompare((optionB?.label ?? "").toLowerCase())
//                       }
//                       options={opOutput.map((output) => ({
//                         value: output.value,
//                         label: output.label,
//                       }))}
//                       value={drpOutPut === "" ? undefined : drpOutPut}
//                       onChange={(e) => {
//                         if (e) {
//                           setDrpOutPut(e);
//                         } else {
//                           setDrpOutPut("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Date Form :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <DatePicker
//                       placeholder="dd-mm-yyyy"
//                       format="DD-MM-YYYY"
//                       size="middle"
//                       style={{
//                         width: "96%",
//                       }}
//                       value={
//                         selectedDateFromOut === ""
//                           ? undefined
//                           : moment(selectedDateFromOut, "YYYY-MM-DD")
//                       }
//                       onChange={(date) => {
//                         if (date) {
//                           setSelectedFromOut(date.format("YYYYMMDD"));
//                         } else {
//                           setSelectedFromOut("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={2} className="ColStyle">
//                     <Typography className="FontStyle">Date To :</Typography>
//                   </Col>
//                   <Col span={3}>
//                     <DatePicker
//                       placeholder="dd-mm-yyyy"
//                       format="DD-MM-YYYY"
//                       size="middle"
//                       style={{
//                         width: "96%",
//                       }}
//                       value={
//                         selectedDateToOut === ""
//                           ? undefined
//                           : moment(selectedDateToOut, "YYYY-MM-DD")
//                       }
//                       onChange={(date) => {
//                         if (date) {
//                           setSelectedToOut(date.format("YYYYMMDD"));
//                         } else {
//                           setSelectedToOut("");
//                         }
//                       }}
//                       allowClear
//                     />
//                   </Col>
//                   <Col span={5} className="ColStyle"></Col>

//                   <Col span={4} className="ColStyleBtn"></Col>
//                 </Row>
//               </Card>
//             </Col>
//           </Row>
//         </div>
//         <div
//           style={{
//             marginTop: "2%",
//             padding: "0px",
//             maxWidth: "100%",
//             overflow: "auto",
//           }}
//         >
//           {showTable && dataSource.length > 0 && (
//             <AntTable
//               columns={columns}
//               dataSource={dataSource}
//               className="tabledata"
//               style={{
//                 width: "100%",
//                 boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 8px",
//                 padding: "0px",
//               }}
//               // pagination={false}
//               pagination={{
//                 pageSize: 200,
//                 position: ["bottomCenter"],
//                 showSizeChanger: true,
//                 showTotal: (total, range) =>
//                   `${range[0]}-${range[1]} of ${total} items`,
//                 showSizeChanger: false,
//               }}
//               scroll={{
//                 x: "max-content",
//                 y: 55 * 5.5,
//               }}
//               size="small"
//               bordered
//             />
//           )}
//         </div>
//       </div>
//       <div className="tablet-view">
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <h2 className="TitlePage_h2">QA ORT WorkingRecord</h2>
//         </div>
//         {/* 1 */}
//         <Row>
//           <Col span={24}>
//             <Card className="CardStyle" style={{ border: "none" }}>
//               <Row>
//                 <Col span={3} className="ColStyle">
//                   <Typography className="FontStyle">Factory :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Select
//                     size="middle"
//                     showSearch
//                     style={{
//                       width: "96%",
//                     }}
//                     placeholder="--- Please select ---"
//                     optionFilterProp="label"
//                     filterSort={(optionA, optionB) =>
//                       (optionA?.label ?? "")
//                         .toLowerCase()
//                         .localeCompare((optionB?.label ?? "").toLowerCase())
//                     }
//                     options={opFactory.map((factory) => ({
//                       value: factory.value,
//                       label: factory.label,
//                     }))}
//                     defaultValue="A1"
//                     value={drpFactory}
//                     onChange={(e) => {
//                       if (e) {
//                         setDrpFactory(e);
//                       } else {
//                         setDrpFactory("A1");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//                 <Col span={4} className="ColStyle">
//                   <Typography className="FontStyle">Product Type :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Select
//                     size="middle"
//                     showSearch
//                     style={{
//                       width: "96%",
//                     }}
//                     placeholder="--- Please select ---"
//                     optionFilterProp="label"
//                     filterSort={(optionA, optionB) =>
//                       (optionA?.label ?? "")
//                         .toLowerCase()
//                         .localeCompare((optionB?.label ?? "").toLowerCase())
//                     }
//                     options={opProduct_Type.map((product_type) => ({
//                       value: product_type.value,
//                       label: product_type.label,
//                     }))}
//                     defaultValue="ALL"
//                     value={drpProductType}
//                     onChange={(e) => {
//                       if (e) {
//                         setDrpProductType(e);
//                       } else {
//                         setDrpProductType("ALL");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//                 <Col span={4} className="ColStyle">
//                   <Typography className="FontStyle">Product Name :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Input
//                     size="middle"
//                     style={{
//                       width: "96%",
//                     }}
//                     value={
//                       inputProductName === "" ? undefined : inputProductName
//                     }
//                     onChange={(e) => {
//                       if (e.target.value) {
//                         setInputProductName(e.target.value);
//                       } else {
//                         setInputProductName("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         </Row>

//         {/* 2 */}
//         <Row>
//           <Col span={24}>
//             <Card className="CardStyle" style={{ border: "none" }}>
//               <Row>
//                 <Col span={3} className="ColStyle">
//                   <Typography className="FontStyle">Test Item :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Input
//                     size="middle"
//                     style={{
//                       width: "96%",
//                     }}
//                     value={inputTestItem === "" ? undefined : inputTestItem}
//                     onChange={(e) => {
//                       if (e.target.value) {
//                         setInputTestItem(e.target.value);
//                       } else {
//                         setInputTestItem("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//                 <Col span={4} className="ColStyle">
//                   <Typography className="FontStyle">Lot No. :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Input
//                     size="middle"

//                     style={{
//                       width: "96%",
//                     }}
//                     value={inputLotNo === "" ? undefined : inputLotNo}
//                     onChange={(e) => {
//                       if (e.target.value) {
//                         setInputLotNo(e.target.value);
//                       } else {
//                         setInputLotNo("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//                 <Col span={4} className="ColStyle">
//                   <Typography className="FontStyle">Week No. :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Input
//                     size="middle"
//                     style={{
//                       width: "96%",
//                     }}
//                     value={inputWeekNo === "" ? undefined : inputWeekNo}
//                     onChange={(e) => {
//                       if (e.target.value) {
//                         setInputWeekNo(e.target.value);
//                       } else {
//                         setInputWeekNo("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         </Row>

//         {/* 3 */}
//         <Row>
//           <Col span={24}>
//             <Card className="CardStyle" style={{ border: "none" }}>
//               <Row>
//                 <Col span={3} className="ColStyle">
//                   <Typography className="FontStyle">Serial No. :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Input
//                     size="middle"
//                     style={{
//                       width: "96%",
//                     }}
//                     value={inputSerialNo === "" ? undefined : inputSerialNo}
//                     onChange={(e) => {
//                       if (e.target.value) {
//                         setInputSerialNo(e.target.value);
//                       } else {
//                         setInputSerialNo("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         </Row>

//         {/* 4 */}
//         <Row>
//           <Col span={24}>
//             <Card className="CardStyle" style={{ border: "none" }}>
//               <Row>
//                 <Col span={3} className="ColStyle">
//                   <Typography className="FontStyle">Input :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Select
//                     size="middle"
//                     showSearch
//                     style={{
//                       width: "96%",
//                     }}
//                     placeholder="--- Please select ---"
//                     optionFilterProp="label"
//                     filterSort={(optionA, optionB) =>
//                       (optionA?.label ?? "")
//                         .toLowerCase()
//                         .localeCompare((optionB?.label ?? "").toLowerCase())
//                     }
//                     options={opInput.map((input) => ({
//                       value: input.value,
//                       label: input.label,
//                     }))}
//                     value={drpInPut === "" ? undefined : drpInPut}
//                     onChange={(e) => {
//                       if (e) {
//                         setDrpInPut(e);
//                       } else {
//                         setDrpInPut("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//                 <Col span={4} className="ColStyle">
//                   <Typography className="FontStyle">Date Form :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <DatePicker
//                     placeholder="dd-mm-yyyy"
//                     format="DD-MM-YYYY"
//                     size="middle"
//                     style={{
//                       width: "96%",
//                     }}
//                     value={
//                       selectedDateFromIn === ""
//                         ? undefined
//                         : moment(selectedDateFromIn, "YYYY-MM-DD")
//                     }
//                     onChange={(date) => {
//                       if (date) {
//                         setSelectedFromIn(date.format("YYYYMMDD"));
//                       } else {
//                         setSelectedFromIn("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//                 <Col span={4} className="ColStyle">
//                   <Typography className="FontStyle">Date To :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <DatePicker
//                     placeholder="dd-mm-yyyy"
//                     format="DD-MM-YYYY"
//                     size="middle"
//                     style={{
//                       width: "96%",
//                     }}
//                     value={
//                       selectedDateToIn === ""
//                         ? undefined
//                         : moment(selectedDateToIn, "YYYY-MM-DD")
//                     }
//                     onChange={(date) => {
//                       if (date) {
//                         setSelectedToIn(date.format("YYYYMMDD"));
//                       } else {
//                         setSelectedToIn("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         </Row>

//         {/* 5 */}
//         <Row>
//           <Col span={24}>
//             <Card className="CardStyle" style={{ border: "none" }}>
//               <Row>
//                 <Col span={3} className="ColStyle">
//                   <Typography className="FontStyle">Output :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <Select
//                     size="middle"
//                     showSearch
//                     style={{
//                       width: "96%",
//                     }}
//                     placeholder="--- Please select ---"
//                     optionFilterProp="label"
//                     filterSort={(optionA, optionB) =>
//                       (optionA?.label ?? "")
//                         .toLowerCase()
//                         .localeCompare((optionB?.label ?? "").toLowerCase())
//                     }
//                     options={opOutput.map((output) => ({
//                       value: output.value,
//                       label: output.label,
//                     }))}
//                     value={drpOutPut === "" ? undefined : drpOutPut}
//                     onChange={(e) => {
//                       if (e) {
//                         setDrpOutPut(e);
//                       } else {
//                         setDrpOutPut("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//                 <Col span={4} className="ColStyle">
//                   <Typography className="FontStyle">Date Form :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <DatePicker
//                     placeholder="dd-mm-yyyy"
//                     format="DD-MM-YYYY"
//                     size="middle"
//                     style={{
//                       width: "96%",
//                     }}
//                     value={
//                       selectedDateFromOut === ""
//                         ? undefined
//                         : moment(selectedDateFromOut, "YYYY-MM-DD")
//                     }
//                     onChange={(date) => {
//                       if (date) {
//                         setSelectedFromOut(date.format("YYYYMMDD"));
//                       } else {
//                         setSelectedFromOut("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//                 <Col span={4} className="ColStyle">
//                   <Typography className="FontStyle">Date To :</Typography>
//                 </Col>
//                 <Col span={4}>
//                   <DatePicker
//                     placeholder="dd-mm-yyyy"
//                     format="DD-MM-YYYY"
//                     size="middle"
//                     style={{
//                       width: "96%",
//                     }}
//                     value={
//                       selectedDateToOut === ""
//                         ? undefined
//                         : moment(selectedDateToOut, "YYYY-MM-DD")
//                     }
//                     onChange={(date) => {
//                       if (date) {
//                         setSelectedToOut(date.format("YYYYMMDD"));
//                       } else {
//                         setSelectedToOut("");
//                       }
//                     }}
//                     allowClear
//                   />
//                 </Col>
//               </Row>
//             </Card>
//           </Col>
//         </Row>
//         <Row style={{ height: "20px" }}></Row>
//         {/* 6 */}
//         <Row>
//           <Col span={24}>
//             <Card className="CardStyle" style={{ border: "none" }}>
//               <Row>
//                 <Col span={5}></Col>
//                 <Col span={4} className="ColStyleBtn">
//                   <Button
//                     type="primary"
//                     className="Btn_Search"
//                     style={{ width: "100%" }}
//                     icon={<SearchOutlined className="Icon_Size" />}
//                     onClick={Btn_Search}
//                     loading={loading}
//                   >
//                     Search
//                   </Button>
//                 </Col>
//                 <Col span={1}></Col>
//                 <Col span={4} className="ColStyleBtn">
//                   <Button
//                     type="primary"
//                     className="Btn_Cancel"
//                     style={{ width: "100%" }}
//                     icon={<RedoOutlined className="Icon_Size" />}
//                     onClick={Btn_Cancel}
//                   >
//                     Cancel
//                   </Button>
//                 </Col>
//                 <Col span={1}></Col>
//                 <Col span={4} className="ColStyleBtn">
//                   <Button
//                     type="primary"
//                     style={{ width: "100%" }}
//                     className="Btn_Export"
//                     disabled={!showTable}
//                     icon={<FileExcelOutlined className="Icon_Size" />}
//                     onClick={Btn_Excel}
//                   >
//                     Export
//                   </Button>
//                 </Col>
//                 <Col span={5}></Col>
//               </Row>
//             </Card>
//           </Col>
//         </Row>

//         <div
//           style={{
//             marginTop: "2%",
//             padding: "0px",
//             maxWidth: "100%",
//             overflow: "auto",
//           }}
//         >
//           {showTable && dataSource.length > 0 && (
//             <AntTable
//               columns={columns}
//               dataSource={dataSource}
//               className="tabledata"
//               style={{
//                 width: "100%",
//                 boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 8px",
//                 padding: "0px",
//               }}
//               // pagination={false}
//               pagination={{
//                 pageSize: 200,
//                 position: ["bottomCenter"],
//                 showSizeChanger: true,
//                 showTotal: (total, range) =>
//                   `${range[0]}-${range[1]} of ${total} items`,
//                 showSizeChanger: false,
//               }}
//               scroll={{
//                 x: "max-content",
//                 y: 55 * 9,
//               }}
//               size="small"
//               bordered
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default QA_ORT_WorkingRecord;

import React, { useEffect, useState, useRef } from "react";
import {
  Layout,
  theme,
  Input,
  Card,
  Col,
  Row,
  Typography,
  Select,
  DatePicker,
  Space,
  Button,
  Table,
  Flex,
  Radio,
  Checkbox,
  Upload,
  message,
  Avatar,
  notification,
} from "antd";
import { Table as AntTable } from "antd";
const { Content } = Layout;
import {
  SearchOutlined,
  RedoOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import "./QA_ORT_WorkingRecord.css";
import "../../StyleCommon.css";
import { fn_QA_ORT_WorkingRecord } from "./fn_QA_ORT_WorkingRecord";
import moment from "moment";

function QA_ORT_WorkingRecord() {
  const {
    opFactory,
    opProduct_Type,
    opInput,
    opOutput,
    setSelectedFromIn,
    setSelectedFromIn1,
    setSelectedFromIn2,
    selectedDateFromIn,
    selectedDateFromIn1,
    selectedDateFromIn2,
    setSelectedFromOut,
    setSelectedFromOut1,
    setSelectedFromOut2,
    selectedDateFromOut,
    selectedDateFromOut1,
    selectedDateFromOut2,
    setSelectedToIn,
    setSelectedToIn1,
    setSelectedToIn2,
    selectedDateToIn,
    selectedDateToIn1,
    selectedDateToIn2,
    setSelectedToOut,
    setSelectedToOut1,
    setSelectedToOut2,
    selectedDateToOut,
    selectedDateToOut1,
    selectedDateToOut2,
    drpFactory,
    setDrpFactory,
    drpProductType,
    setDrpProductType,
    drpInPut,
    setDrpInPut,
    drpOutPut,
    setDrpOutPut,
    setInputProductName,
    inputProductName,
    inputTestItem,
    setInputTestItem,
    inputLotNo,
    setInputLotNo,
    inputWeekNo,
    setInputWeekNo,
    inputSerialNo,
    setInputSerialNo,
    Btn_Search,
    Btn_Cancel,
    Btn_Excel,
    dataSource,
    columns,
    showTable,
    loading,
    opProductName,
    drpProductName,
    setDrpProductName,
    drpItemTest,
    setDrpItemTest,
    opItemTest,
  } = fn_QA_ORT_WorkingRecord();
  return (
    <>
      <div className="desktop-view">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 className="TitlePage_h2">QA ORT WorkingRecord</h2>
        </div>
        <div>
          {/* 1 */}
          <Row>
            <Col span={24}>
              <Card className="CardStyle" style={{ border: "none" }}>
                <Row>
                  <Col span={3} className="ColStyle">
                    <Typography className="FontStyle">Factory :</Typography>
                  </Col>
                  <Col span={3}>
                    <Select
                      size="middle"
                      showSearch
                      style={{
                        width: "96%",
                      }}
                      placeholder="--- Please select ---"
                      optionFilterProp="label"
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={opFactory.map((Factory) => ({
                        value: Factory.value,
                        label: Factory.label,
                      }))}
                      defaultValue="A1"
                      value={drpFactory}
                      onChange={(e) => {
                        if (e) {
                          setDrpFactory(e);
                        } else {
                          setDrpFactory("A1");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">
                      Product Type :
                    </Typography>
                  </Col>
                  <Col span={3}>
                    <Select
                      size="middle"
                      showSearch
                      style={{
                        width: "96%",
                      }}
                      placeholder="--- Please select ---"
                      optionFilterProp="label"
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={opProduct_Type.map((Product_Type) => ({
                        value: Product_Type.value,
                        label: Product_Type.label,
                      }))}
                      defaultValue="ALL"
                      value={drpProductType}
                      onChange={(e) => {
                        if (e) {
                          setDrpProductType(e);
                        } else {
                          setDrpProductType("ALL");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">
                      Product Name :
                    </Typography>
                  </Col>
                  <Col span={3}>
                    <Select
                      size="middle"
                      showSearch
                      style={{
                        width: "96%",
                      }}
                      placeholder="--- Please select ---"
                      optionFilterProp="label"
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={opProductName.map((ProductName) => ({
                        value: ProductName.value,
                        label: ProductName.label,
                      }))}
                      value={drpProductName || undefined}
                      onChange={(e) => {
                        setDrpProductName(e || undefined);
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">Test Item :</Typography>
                  </Col>
                  <Col span={3}>
                    <Select
                      size="middle"
                      showSearch
                      style={{
                        width: "100%",
                      }}
                      placeholder="--- Please select ---"
                      optionFilterProp="label"
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={opItemTest.map((ItemTest) => ({
                        value: ItemTest.value,
                        label: ItemTest.label,
                      }))}
                      value={drpItemTest || undefined}
                      onChange={(e) => {
                        setDrpItemTest(e || undefined);
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={3} className="ColStyleBtn"></Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* 2 */}
          <Row>
            <Col span={24}>
              <Card className="CardStyle" style={{ border: "none" }}>
                <Row>
                  <Col span={3} className="ColStyle">
                    <Typography className="FontStyle">Lot No. :</Typography>
                  </Col>
                  <Col span={3}>
                    <Input
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={inputLotNo === "" ? undefined : inputLotNo}
                      onChange={(e) => {
                        if (e.target.value) {
                          setInputLotNo(e.target.value);
                        } else {
                          setInputLotNo("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">Week No. :</Typography>
                  </Col>
                  <Col span={3}>
                    <Input
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={inputWeekNo === "" ? undefined : inputWeekNo}
                      onChange={(e) => {
                        if (e.target.value) {
                          setInputWeekNo(e.target.value);
                        } else {
                          setInputWeekNo("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">Serial No. :</Typography>
                  </Col>
                  <Col span={3}>
                    <Input
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={inputSerialNo === "" ? undefined : inputSerialNo}
                      onChange={(e) => {
                        if (e.target.value) {
                          setInputSerialNo(e.target.value);
                        } else {
                          setInputSerialNo("");
                        }
                      }}
                      allowClear
                    />
                  </Col>

                  <Col span={5} className="ColStyle"></Col>

                  <Col span={3} className="ColStyle"></Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* 3 */}
          <Row>
            <Col span={24}>
              <Card className="CardStyle" style={{ border: "none" }}>
                <Row>
                  <Col span={3} className="ColStyle">
                    <Typography className="FontStyle">
                      Input 1 date from :
                    </Typography>
                  </Col>

                  <Col span={3}>
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateFromIn1 === ""
                          ? undefined
                          : moment(selectedDateFromIn1, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedFromIn1(date.format("YYYYMMDD"));
                        } else {
                          setSelectedFromIn1("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">Date To :</Typography>
                  </Col>
                  <Col span={3}>
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateToIn1 === ""
                          ? undefined
                          : moment(selectedDateToIn1, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedToIn1(date.format("YYYYMMDD"));
                        } else {
                          setSelectedToIn1("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={5} className="ColStyle"></Col>
                  <Col span={8} className="ColStyle"></Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {/* 3.5 */}
          <Row>
            <Col span={24}>
              <Card className="CardStyle" style={{ border: "none" }}>
                <Row>
                  <Col span={3} className="ColStyle">
                    <Typography className="FontStyle">
                      Output 1 date from :
                    </Typography>
                  </Col>
                  <Col span={3}>
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateFromOut1 === ""
                          ? undefined
                          : moment(selectedDateFromOut1, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedFromOut1(date.format("YYYYMMDD"));
                        } else {
                          setSelectedFromOut1("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">Date To :</Typography>
                  </Col>
                  <Col span={3}>
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateToOut1 === ""
                          ? undefined
                          : moment(selectedDateToOut1, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedToOut1(date.format("YYYYMMDD"));
                        } else {
                          setSelectedToOut1("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={7} className="ColStyle"></Col>
                  <Col span={3} className="ColStyleBtn">
                    <Button
                      type="primary"
                      className="Btn_Search"
                      icon={<SearchOutlined className="Icon_Size" />}
                      onClick={Btn_Search}
                      loading={loading}
                    >
                      Search
                    </Button>
                  </Col>
                  <Col span={3} className="ColStyleBtn"></Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {/* 4.5 */}
          <Row>
            <Col span={24}>
              <Card className="CardStyle" style={{ border: "none" }}>
                <Row>
                  <Col span={3} className="ColStyle">
                    <Typography className="FontStyle">
                      {" "}
                      Input 2 date from :
                    </Typography>
                  </Col>

                  <Col span={3}>
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateFromIn2 === ""
                          ? undefined
                          : moment(selectedDateFromIn2, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedFromIn2(date.format("YYYYMMDD"));
                        } else {
                          setSelectedFromIn2("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">Date To :</Typography>
                  </Col>
                  <Col span={3}>
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateToIn2 === ""
                          ? undefined
                          : moment(selectedDateToIn2, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedToIn2(date.format("YYYYMMDD"));
                        } else {
                          setSelectedToIn2("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={7} className="ColStyle"></Col>
                  <Col span={3} className="ColStyleBtn">
                    <Button
                      type="primary"
                      className="Btn_Cancel"
                      icon={<RedoOutlined className="Icon_Size" />}
                      onClick={Btn_Cancel}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col span={3} className="ColStyleBtn"></Col>
                </Row>
              </Card>
            </Col>
          </Row>

          {/* 4 */}
          <Row>
            <Col span={24}>
              <Card className="CardStyle" style={{ border: "none" }}>
                <Row>
                  <Col span={3} className="ColStyle">
                    <Typography className="FontStyle">
                      Output 2 date from :
                    </Typography>
                  </Col>

                  <Col span={3}>
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateFromOut2 === ""
                          ? undefined
                          : moment(selectedDateFromOut2, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedFromOut2(date.format("YYYYMMDD"));
                        } else {
                          setSelectedFromOut2("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={2} className="ColStyle">
                    <Typography className="FontStyle">Date To :</Typography>
                  </Col>
                  <Col span={3}>
                    <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateToOut2 === ""
                          ? undefined
                          : moment(selectedDateToOut2, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedToOut2(date.format("YYYYMMDD"));
                        } else {
                          setSelectedToOut2("");
                        }
                      }}
                      allowClear
                    />
                  </Col>
                  <Col span={7} className="ColStyle"></Col>
                  <Col span={3} className="ColStyleBtn">
                    <Button
                      type="primary"
                      className="Btn_Export"
                      disabled={!showTable}
                      icon={<FileExcelOutlined className="Icon_Size" />}
                      onClick={Btn_Excel}
                    >
                      Export
                    </Button>
                  </Col>
                  <Col span={3} className="ColStyleBtn"></Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <div
          style={{
            marginTop: "2%",
            padding: "0px",
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          {showTable && dataSource.length > 0 && (
            <AntTable
              columns={columns}
              dataSource={dataSource}
              className="tabledata"
              style={{
                width: "100%",
                boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 8px",
                padding: "0px",
              }}
              // pagination={false}
              pagination={{
                pageSize: 200,
                position: ["bottomCenter"],
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                showSizeChanger: false,
              }}
              scroll={{
                x: "max-content",
                y: 40 * 5.5,
              }}
              size="small"
              bordered
            />
          )}
        </div>
      </div>
      {/* แก้ไข */}
      <div className="tablet-view">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 className="TitlePage_h2">QA ORT WorkingRecord</h2>
        </div>
        {/* 1 */}
        <Row>
          <Col span={24}>
            <Card className="CardStyle" style={{ border: "none" }}>
              <Row>
                <Col span={3} className="ColStyle">
                  <Typography className="FontStyle">Factory :</Typography>
                </Col>
                <Col span={4}>
                  <Select
                    size="middle"
                    showSearch
                    style={{
                      width: "96%",
                    }}
                    placeholder="--- Please select ---"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={opFactory.map((factory) => ({
                      value: factory.value,
                      label: factory.label,
                    }))}
                    defaultValue="A1"
                    value={drpFactory}
                    onChange={(e) => {
                      if (e) {
                        setDrpFactory(e);
                      } else {
                        setDrpFactory("A1");
                      }
                    }}
                    allowClear
                  />
                </Col>
                <Col span={4} className="ColStyle">
                  <Typography className="FontStyle">Product Type :</Typography>
                </Col>
                <Col span={4}>
                  <Select
                    size="middle"
                    showSearch
                    style={{
                      width: "96%",
                    }}
                    placeholder="--- Please select ---"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={opProduct_Type.map((product_type) => ({
                      value: product_type.value,
                      label: product_type.label,
                    }))}
                    defaultValue="ALL"
                    value={drpProductType}
                    onChange={(e) => {
                      if (e) {
                        setDrpProductType(e);
                      } else {
                        setDrpProductType("ALL");
                      }
                    }}
                    allowClear
                  />
                </Col>
                <Col span={4} className="ColStyle">
                  <Typography className="FontStyle">Product Name :</Typography>
                </Col>
                <Col span={4}>
                  <Select
                    size="middle"
                    showSearch
                    style={{
                      width: "96%",
                    }}
                    placeholder="--- select ---"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={opProductName.map((ProductName) => ({
                      value: ProductName.value,
                      label: ProductName.label,
                    }))}
                    value={drpProductName || undefined}
                    onChange={(e) => {
                      setDrpProductName(e || undefined);
                    }}
                    allowClear
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* 2 */}
        <Row>
          <Col span={24}>
            <Card className="CardStyle" style={{ border: "none" }}>
              <Row>
                <Col span={3} className="ColStyle">
                  <Typography className="FontStyle">Test Item :</Typography>
                </Col>
                <Col span={4}>
                  <Select
                    size="middle"
                    showSearch
                    style={{
                      width: "96%",
                    }}
                    placeholder="--- select ---"
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={opItemTest.map((ItemTest) => ({
                      value: ItemTest.value,
                      label: ItemTest.label,
                    }))}
                    value={drpItemTest || undefined}
                    onChange={(e) => {
                      setDrpItemTest(e || undefined);
                    }}
                    allowClear
                  />
                </Col>
                <Col span={4} className="ColStyle">
                  <Typography className="FontStyle">Lot No. :</Typography>
                </Col>
                <Col span={4}>
                  <Input
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={inputLotNo === "" ? undefined : inputLotNo}
                    onChange={(e) => {
                      if (e.target.value) {
                        setInputLotNo(e.target.value);
                      } else {
                        setInputLotNo("");
                      }
                    }}
                    allowClear
                  />
                </Col>
                <Col span={4} className="ColStyle">
                  <Typography className="FontStyle">Week No. :</Typography>
                </Col>
                <Col span={4}>
                  <Input
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={inputWeekNo === "" ? undefined : inputWeekNo}
                    onChange={(e) => {
                      if (e.target.value) {
                        setInputWeekNo(e.target.value);
                      } else {
                        setInputWeekNo("");
                      }
                    }}
                    allowClear
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* 3 */}
        <Row>
          <Col span={24}>
            <Card className="CardStyle" style={{ border: "none" }}>
              <Row>
                <Col span={3} className="ColStyle">
                  <Typography className="FontStyle">Serial No. :</Typography>
                </Col>
                <Col span={4}>
                  <Input
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={inputSerialNo === "" ? undefined : inputSerialNo}
                    onChange={(e) => {
                      if (e.target.value) {
                        setInputSerialNo(e.target.value);
                      } else {
                        setInputSerialNo("");
                      }
                    }}
                    allowClear
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* 4 */}
        <Row>
          <Col span={24}>
            <Card className="CardStyle" style={{ border: "none" }}>
              <Row>
                <Col span={11} className="ColStyle">
                  <Typography className="FontStyle">
                    Input 1 date from :
                  </Typography>
                </Col>

                <Col span={4}>
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    format="DD-MM-YYYY"
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={
                      selectedDateFromIn1 === ""
                        ? undefined
                        : moment(selectedDateFromIn1, "YYYY-MM-DD")
                    }
                    onChange={(date) => {
                      if (date) {
                        setSelectedFromIn1(date.format("YYYYMMDD"));
                      } else {
                        setSelectedFromIn1("");
                      }
                    }}
                    allowClear
                  />
                </Col>
                <Col span={4} className="ColStyle">
                  <Typography className="FontStyle">Date To :</Typography>
                </Col>
                <Col span={4}>
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    format="DD-MM-YYYY"
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={
                      selectedDateToIn1 === ""
                        ? undefined
                        : moment(selectedDateToIn1, "YYYY-MM-DD")
                    }
                    onChange={(date) => {
                      if (date) {
                        setSelectedToIn1(date.format("YYYYMMDD"));
                      } else {
                        setSelectedToIn1("");
                      }
                    }}
                    allowClear
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* 5 */}
        <Row>
          <Col span={24}>
            <Card className="CardStyle" style={{ border: "none" }}>
              <Row>
                <Col span={11} className="ColStyle">
                  <Typography className="FontStyle">
                    Output 1 date from :
                  </Typography>
                </Col>

                <Col span={4}>
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    format="DD-MM-YYYY"
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={
                      selectedDateFromOut1 === ""
                        ? undefined
                        : moment(selectedDateFromOut1, "YYYY-MM-DD")
                    }
                    onChange={(date) => {
                      if (date) {
                        setSelectedFromOut1(date.format("YYYYMMDD"));
                      } else {
                        setSelectedFromOut1("");
                      }
                    }}
                    allowClear
                  />
                </Col>
                <Col span={4} className="ColStyle">
                  <Typography className="FontStyle">Date To :</Typography>
                </Col>
                <Col span={4}>
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    format="DD-MM-YYYY"
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={
                      selectedDateToOut1 === ""
                        ? undefined
                        : moment(selectedDateToOut1, "YYYY-MM-DD")
                    }
                    onChange={(date) => {
                      if (date) {
                        setSelectedToOut1(date.format("YYYYMMDD"));
                      } else {
                        setSelectedToOut1("");
                      }
                    }}
                    allowClear
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* 4.5 */}
        <Row>
          <Col span={24}>
            <Card className="CardStyle" style={{ border: "none" }}>
              <Row>
                <Col span={11} className="ColStyle">
                  <Typography className="FontStyle">
                    Input 2 date from :
                  </Typography>
                </Col>

                <Col span={4}>
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    format="DD-MM-YYYY"
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={
                      selectedDateFromIn2 === ""
                        ? undefined
                        : moment(selectedDateFromIn2, "YYYY-MM-DD")
                    }
                    onChange={(date) => {
                      if (date) {
                        setSelectedFromIn2(date.format("YYYYMMDD"));
                      } else {
                        setSelectedFromIn2("");
                      }
                    }}
                    allowClear
                  />
                </Col>
                <Col span={4} className="ColStyle">
                  <Typography className="FontStyle">Date To :</Typography>
                </Col>
                <Col span={4}>
                  <DatePicker
                    placeholder="dd-mm-yyyy"
                    format="DD-MM-YYYY"
                    size="middle"
                    style={{
                      width: "96%",
                    }}
                    value={
                      selectedDateToIn2 === ""
                        ? undefined
                        : moment(selectedDateToIn2, "YYYY-MM-DD")
                    }
                    onChange={(date) => {
                      if (date) {
                        setSelectedToIn2(date.format("YYYYMMDD"));
                      } else {
                        setSelectedToIn2("");
                      }
                    }}
                    allowClear
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {/* 5.5 */}
        <Row>
          <Col span={24}>
            <Card className="CardStyle" style={{ border: "none" }}>
              <Row>
                <Col span={11} className="ColStyle">
                  <Typography className="FontStyle">
                    Output 2 date from :
                  </Typography>
                </Col>

                <Col span={4}>
                <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateFromOut2 === ""
                          ? undefined
                          : moment(selectedDateFromOut2, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedFromOut2(date.format("YYYYMMDD"));
                        } else {
                          setSelectedFromOut2("");
                        }
                      }}
                      allowClear
                    />
                </Col>
                <Col span={4} className="ColStyle">
                  <Typography className="FontStyle">Date To :</Typography>
                </Col>
                <Col span={4}>
                <DatePicker
                      placeholder="dd-mm-yyyy"
                      format="DD-MM-YYYY"
                      size="middle"
                      style={{
                        width: "96%",
                      }}
                      value={
                        selectedDateToOut2 === ""
                          ? undefined
                          : moment(selectedDateToOut2, "YYYY-MM-DD")
                      }
                      onChange={(date) => {
                        if (date) {
                          setSelectedToOut2(date.format("YYYYMMDD"));
                        } else {
                          setSelectedToOut2("");
                        }
                      }}
                      allowClear
                    />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row style={{ height: "20px" }}></Row>
        {/* 6 */}
        <Row>
          <Col span={24}>
            <Card className="CardStyle" style={{ border: "none" }}>
              <Row>
                <Col span={5}></Col>
                <Col span={4} className="ColStyleBtn">
                  <Button
                    type="primary"
                    className="Btn_Search"
                    style={{ width: "100%" }}
                    icon={<SearchOutlined className="Icon_Size" />}
                    onClick={Btn_Search}
                    loading={loading}
                  >
                    Search
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col span={4} className="ColStyleBtn">
                  <Button
                    type="primary"
                    className="Btn_Cancel"
                    style={{ width: "100%" }}
                    icon={<RedoOutlined className="Icon_Size" />}
                    onClick={Btn_Cancel}
                  >
                    Cancel
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col span={4} className="ColStyleBtn">
                  <Button
                    type="primary"
                    style={{ width: "100%" }}
                    className="Btn_Export"
                    disabled={!showTable}
                    icon={<FileExcelOutlined className="Icon_Size" />}
                    onClick={Btn_Excel}
                  >
                    Export
                  </Button>
                </Col>
                <Col span={5}></Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div
          style={{
            marginTop: "2%",
            padding: "0px",
            maxWidth: "100%",
            overflow: "auto",
          }}
        >
          {showTable && dataSource.length > 0 && (
            <AntTable
              columns={columns}
              dataSource={dataSource}
              className="tabledata"
              style={{
                width: "100%",
                boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 8px",
                padding: "0px",
              }}
              // pagination={false}
              pagination={{
                pageSize: 200,
                position: ["bottomCenter"],
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                showSizeChanger: false,
              }}
              scroll={{
                x: "max-content",
                y: 55 * 9,
              }}
              size="small"
              bordered
            />
          )}
        </div>
      </div>
    </>
  );
}

export default QA_ORT_WorkingRecord;
