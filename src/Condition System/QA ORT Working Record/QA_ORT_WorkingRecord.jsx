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
import { fn_QA_ORT_WorkingRecord } from "./fn_QA_ORT_WorkingRecord";
import moment from "moment";

function QA_ORT_WorkingRecord() {
  const {
    opFactory,
    opProduct_Type,
    opInput,
    opOutput,
    setSelectedFromIn,
    selectedDateFromIn,
    setSelectedFromOut,
    selectedDateFromOut,
    setSelectedToIn,
    selectedDateToIn,
    setSelectedToOut,
    selectedDateToOut,
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
  } = fn_QA_ORT_WorkingRecord();
  return (
    <div>
      <Row>
        <Col span={8}>
          <Card className="CardStyle" style={{ border: "none" }}>
            <Row>
              <Col span={12}>
                <Typography className="FontStyle">
                  Factory <span style={{ color: "red" }}>*</span>
                </Typography>
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
                  value={drpFactory === "" ? undefined : drpFactory}
                  onChange={(e) => {
                    if (e) {
                      setDrpFactory(e);
                    } else {
                      setDrpFactory("");
                    }
                  }}
                  allowClear
                />
              </Col>
              <Col span={12}>
                <Typography className="FontStyle">
                  Product Type <span style={{ color: "red" }}>*</span>
                </Typography>
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
                  value={drpProductType === "" ? undefined : drpProductType}
                  onChange={(e) => {
                    if (e) {
                      setDrpProductType(e);
                    } else {
                      setDrpProductType("");
                    }
                  }}
                  allowClear
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card className="CardStyleIn">
            <Row>
              <Col span={8}>
                <Typography className="FontStyle">Input</Typography>
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
                  options={opInput.map((input) => ({
                    value: input.value,
                    label: input.label,
                  }))}
                  value={drpInPut === "" ? undefined : drpInPut}
                  onChange={(e) => {
                    if (e) {
                      setDrpInPut(e);
                    } else {
                      setDrpInPut("");
                    }
                  }}
                  allowClear
                />
              </Col>
              <Col span={8}>
                <Typography className="FontStyle">Date Form</Typography>
                <DatePicker
                  placeholder="dd-mm-yyyy"
                  format="DD-MM-YYYY"
                  size="middle"
                  style={{
                    width: "96%",
                  }}
                  value={
                    selectedDateFromIn === ""
                      ? undefined
                      : moment(selectedDateFromIn, "YYYY-MM-DD")
                  }
                  onChange={(date) => {
                    if (date) {
                      setSelectedFromIn(date.format("YYYYMMDD"));
                    } else {
                      setSelectedFromIn("");
                    }
                  }}
                  allowClear
                />
              </Col>
              <Col span={8}>
                <Typography className="FontStyle">Date To</Typography>
                <DatePicker
                  placeholder="dd-mm-yyyy"
                  format="DD-MM-YYYY"
                  size="middle"
                  style={{
                    width: "96%",
                  }}
                  value={
                    selectedDateToIn === ""
                      ? undefined
                      : moment(selectedDateToIn, "YYYY-MM-DD")
                  }
                  onChange={(date) => {
                    if (date) {
                      setSelectedToIn(date.format("YYYYMMDD"));
                    } else {
                      setSelectedToIn("");
                    }
                  }}
                  allowClear
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={4} className="Center">
          <Typography className="Color_Fading">-</Typography>
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
      </Row>
      <Row className="Row_Main">
        <Col span={8}>
          <Card className="CardStyle" style={{ border: "none" }}>
            <Row>
              <Col span={12}>
                <Typography className="FontStyle">Product Name</Typography>
                <Input
                  size="middle"
                  style={{
                    width: "96%",
                  }}
                  value={inputProductName === "" ? undefined : inputProductName}
                  onChange={(e) => {
                    if (e.target.value) {
                      setInputProductName(e.target.value);
                    } else {
                      setInputProductName(null);
                    }
                  }}
                  allowClear
                />
              </Col>
              <Col span={12}>
                <Typography className="FontStyle">Test Item</Typography>
                <Input
                  size="middle"
                  style={{
                    width: "96%",
                  }}
                  value={inputTestItem === "" ? undefined : inputTestItem}
                  onChange={(e) => {
                    if (e.target.value) {
                      setInputTestItem(e.target.value);
                    } else {
                      setInputTestItem(null);
                    }
                  }}
                  allowClear
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={12}>
          <Card className="CardStyleOut">
            <Row>
              <Col span={8}>
                <Typography className="FontStyle">Output</Typography>
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
                  options={opOutput.map((output) => ({
                    value: output.value,
                    label: output.label,
                  }))}
                  value={drpOutPut === "" ? undefined : drpOutPut}
                  onChange={(e) => {
                    if (e) {
                      setDrpOutPut(e);
                    } else {
                      setDrpOutPut("");
                    }
                  }}
                  allowClear
                />
              </Col>
              <Col span={8}>
                <Typography className="FontStyle">Date Form</Typography>
                <DatePicker
                  placeholder="dd-mm-yyyy"
                  format="DD-MM-YYYY"
                  size="middle"
                  style={{
                    width: "96%",
                  }}
                  value={
                    selectedDateFromOut === ""
                      ? undefined
                      : moment(selectedDateFromOut, "YYYY-MM-DD")
                  }
                  onChange={(date) => {
                    if (date) {
                      setSelectedFromOut(date.format("YYYYMMDD"));
                    } else {
                      setSelectedFromOut("");
                    }
                  }}
                  allowClear
                />
              </Col>
              <Col span={8}>
                <Typography className="FontStyle">Date To</Typography>
                <DatePicker
                  placeholder="dd-mm-yyyy"
                  format="DD-MM-YYYY"
                  size="middle"
                  style={{
                    width: "96%",
                  }}
                  value={
                    selectedDateToOut === ""
                      ? undefined
                      : moment(selectedDateToOut, "YYYY-MM-DD")
                  }
                  onChange={(date) => {
                    if (date) {
                      setSelectedToOut(date.format("YYYYMMDD"));
                    } else {
                      setSelectedToOut("");
                    }
                  }}
                  allowClear
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={4} className="Center">
          <Typography className="Color_Fading">-</Typography>
          <Button
            type="primary"
            className="Btn_Cancel"
            icon={<RedoOutlined className="Icon_Size" />}
            onClick={Btn_Cancel}
          >
            Cancel
          </Button>
        </Col>
      </Row>
      <Row className="Row_Main">
        <Col span={12}>
          <Card className="CardStyle" style={{ border: "none" }}>
            <Row>
              <Col span={8}>
                <Typography className="FontStyle">Lot No.</Typography>
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
                      setInputLotNo(null);
                    }
                  }}
                  allowClear
                />
              </Col>
              <Col span={8}>
                <Typography className="FontStyle">Week No.</Typography>
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
                      setInputWeekNo(null);
                    }
                  }}
                  allowClear
                />
              </Col>
              <Col span={8}>
                <Typography className="FontStyle">Serial No.</Typography>
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
                      setInputSerialNo(null);
                    }
                  }}
                  allowClear
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8}></Col>
        <Col span={4} className="Center">
          <Typography className="Color_Fading">-</Typography>
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
              width: "100%", // กำหนดความกว้างให้ AntTable
              boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 8px",
              padding: "0px",
            }}
            pagination={true}
            scroll={{
              x: "max-content",
              y: 55 * 6,
            }}
            size="small"
            bordered
          />
        )}
      </div>
    </div>
  );
}

export default QA_ORT_WorkingRecord;

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
// } from "antd";
// import { Table as AntTable } from "antd";
// const { Content } = Layout;
// import {
//   SearchOutlined,
//   RedoOutlined,
//   FileExcelOutlined,
// } from "@ant-design/icons";
// import "./QA_ORT_WorkingRecord.css";
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
//   } = fn_QA_ORT_WorkingRecord();
//   console.log("dataSource", dataSource);
//   return (
//     <div>
//       <Row>
//         <Col span={4}>
//           <Typography className="FontStyle">Factory</Typography>
//           <Select
//             size="middle"
//             showSearch
//             style={{
//               width: "96%",
//             }}
//             placeholder="--- select ---"
//             optionFilterProp="label"
//             filterSort={(optionA, optionB) =>
//               (optionA?.label ?? "")
//                 .toLowerCase()
//                 .localeCompare((optionB?.label ?? "").toLowerCase())
//             }
//             options={opFactory.map((factory) => ({
//               value: factory.value,
//               label: factory.label,
//             }))}
//             value={drpFactory === "" ? undefined : drpFactory}
//             onChange={(e) => {
//               if (e) {
//                 setDrpFactory(e);
//               } else {
//                 setDrpFactory("");
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Product Type</Typography>
//           <Select
//             size="middle"
//             showSearch
//             style={{
//               width: "96%",
//             }}
//             placeholder="--- select ---"
//             optionFilterProp="label"
//             filterSort={(optionA, optionB) =>
//               (optionA?.label ?? "")
//                 .toLowerCase()
//                 .localeCompare((optionB?.label ?? "").toLowerCase())
//             }
//             options={opProduct_Type.map((product_type) => ({
//               value: product_type.value,
//               label: product_type.label,
//             }))}
//             value={drpProductType === "" ? undefined : drpProductType}
//             onChange={(e) => {
//               if (e) {
//                 setDrpProductType(e);
//               } else {
//                 setDrpProductType("");
//               }
//             }}
//             allowClear
//           />
//         </Col>

//         <Col span={4}>
//           <Typography className="FontStyle">Input</Typography>
//           <Select
//             size="middle"
//             showSearch
//             style={{
//               width: "96%",
//             }}
//             placeholder="--- select ---"
//             optionFilterProp="label"
//             filterSort={(optionA, optionB) =>
//               (optionA?.label ?? "")
//                 .toLowerCase()
//                 .localeCompare((optionB?.label ?? "").toLowerCase())
//             }
//             options={opInput.map((input) => ({
//               value: input.value,
//               label: input.label,
//             }))}
//             value={drpInPut === "" ? undefined : drpInPut}
//             onChange={(e) => {
//               if (e) {
//                 setDrpInPut(e);
//               } else {
//                 setDrpInPut("");
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Date Form</Typography>
//           <DatePicker
//             placeholder="yyyy-mm-dd"
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={
//               selectedDateFromIn === ""
//                 ? undefined
//                 : moment(selectedDateFromIn, "YYYY-MM-DD")
//             }
//             onChange={(date) => {
//               if (date) {
//                 setSelectedFromIn(date.format("YYYYMMDD"));
//               } else {
//                 setSelectedFromIn("");
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Date To</Typography>
//           <DatePicker
//             placeholder="yyyy-mm-dd"
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={
//               selectedDateToIn === ""
//                 ? undefined
//                 : moment(selectedDateToIn, "YYYY-MM-DD")
//             }
//             onChange={(date) => {
//               if (date) {
//                 setSelectedToIn(date.format("YYYYMMDD"));
//               } else {
//                 setSelectedToIn("");
//               }
//             }}
//             allowClear
//           />
//         </Col>

//         <Col span={4} className="Center">
//           <Typography className="Color_Fading">-</Typography>
//           <Button
//             type="primary"
//             className="Btn_Search"
//             icon={<SearchOutlined className="Icon_Size" />}
//             onClick={Btn_Search}
//           >
//             Search
//           </Button>
//         </Col>
//       </Row>
//       <Row className="Row_Main">
//         <Col span={4}>
//           <Typography className="FontStyle">Output</Typography>
//           <Select
//             size="middle"
//             showSearch
//             style={{
//               width: "96%",
//             }}
//             placeholder="--- select ---"
//             optionFilterProp="label"
//             filterSort={(optionA, optionB) =>
//               (optionA?.label ?? "")
//                 .toLowerCase()
//                 .localeCompare((optionB?.label ?? "").toLowerCase())
//             }
//             options={opOutput.map((output) => ({
//               value: output.value,
//               label: output.label,
//             }))}
//             value={drpOutPut === "" ? undefined : drpOutPut}
//             onChange={(e) => {
//               if (e) {
//                 setDrpOutPut(e);
//               } else {
//                 setDrpOutPut("");
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Date Form</Typography>
//           <DatePicker
//             placeholder="yyyy-mm-dd"
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={
//               selectedDateFromOut === ""
//                 ? undefined
//                 : moment(selectedDateFromOut, "YYYY-MM-DD")
//             }
//             onChange={(date) => {
//               if (date) {
//                 setSelectedFromOut(date.format("YYYYMMDD"));
//               } else {
//                 setSelectedFromOut("");
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Date To</Typography>
//           <DatePicker
//             placeholder="yyyy-mm-dd"
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={
//               selectedDateToOut === ""
//                 ? undefined
//                 : moment(selectedDateToOut, "YYYY-MM-DD")
//             }
//             onChange={(date) => {
//               if (date) {
//                 setSelectedToOut(date.format("YYYYMMDD"));
//               } else {
//                 setSelectedToOut("");
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Product Name</Typography>
//           <Input
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={inputProductName === "" ? undefined : inputProductName}
//             onChange={(e) => {
//               if (e.target.value) {
//                 setInputProductName(e.target.value);
//               } else {
//                 setInputProductName(null);
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Test Item</Typography>
//           <Input
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={inputTestItem === "" ? undefined : inputTestItem}
//             onChange={(e) => {
//               if (e.target.value) {
//                 setInputTestItem(e.target.value);
//               } else {
//                 setInputTestItem(null);
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4} className="Center">
//           <Typography className="Color_Fading">-</Typography>
//           <Button
//             type="primary"
//             className="Btn_Cancel"
//             icon={<RedoOutlined className="Icon_Size" />}
//             onClick={Btn_Cancel}
//           >
//             Cancel
//           </Button>
//         </Col>
//       </Row>
//       <Row className="Row_Main">
//         <Col span={4}>
//           <Typography className="FontStyle">Lot No.</Typography>
//           <Input
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={inputLotNo === "" ? undefined : inputLotNo}
//             onChange={(e) => {
//               if (e.target.value) {
//                 setInputLotNo(e.target.value);
//               } else {
//                 setInputLotNo(null);
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Week No.</Typography>
//           <Input
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={inputWeekNo === "" ? undefined : inputWeekNo}
//             onChange={(e) => {
//               if (e.target.value) {
//                 setInputWeekNo(e.target.value);
//               } else {
//                 setInputWeekNo(null);
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={4}>
//           <Typography className="FontStyle">Serial No.</Typography>
//           <Input
//             size="middle"
//             style={{
//               width: "96%",
//             }}
//             value={inputSerialNo === "" ? undefined : inputSerialNo}
//             onChange={(e) => {
//               if (e.target.value) {
//                 setInputSerialNo(e.target.value);
//               } else {
//                 setInputSerialNo(null);
//               }
//             }}
//             allowClear
//           />
//         </Col>
//         <Col span={8}></Col>
//         <Col span={4} className="Center">
//           <Typography className="Color_Fading">-</Typography>
//           <Button
//             type="primary"
//             className="Btn_Export"
//             icon={<FileExcelOutlined className="Icon_Size" />}
//             onClick={Btn_Excel}
//           >
//             Export
//           </Button>
//         </Col>
//       </Row>

//       <div
//         style={{
//           marginTop: "2%",
//           padding: "0px",
//           maxWidth: "100%",
//           overflow: "auto",
//         }}
//       >
//         <AntTable
//           columns={columns}
//           dataSource={dataSource}
//           className="tabledata"
//           style={{
//             width: "100%", // กำหนดความกว้างให้ AntTable
//             boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 8px",
//             padding: "0px",
//           }}
//           pagination={true}
//           scroll={{
//             x: "max-content",
//             y: 55 * 6,
//           }}
//           size="small"
//           bordered
//         />
//       </div>
//     </div>
//   );
// }

// export default QA_ORT_WorkingRecord;
