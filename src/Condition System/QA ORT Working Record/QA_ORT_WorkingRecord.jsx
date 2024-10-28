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
} from "antd";
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
  } = fn_QA_ORT_WorkingRecord();
  return (
    <div>
      {/* <Content>
        <h1>QA ORT WorkingRecord</h1>
        <Row>
            <Col span={2}></Col>
        </Row>
        <div style={{ marginLeft: "30px", marginBottom: "5px" }}>
          <span style={{ fontSize: "18px" }}>Factory</span>{" "}
        </div>
      </Content> */}
      <Row>
        <Col span={4}>
          <Typography>Factory</Typography>
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
        <Col span={4}>
          <Typography>Product Type</Typography>
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
        <Col span={4}>
          <Typography>Input</Typography>
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
        <Col span={4}>
          <Typography>Date Form</Typography>
          <DatePicker
            placeholder="yyyy-mm-dd"
            size="middle"
            style={{
              width: "96%",
            }}
            value={
              selectedDateFromIn === null
                ? undefined
                : moment(selectedDateFromIn, "YYYY-MM-DD")
            }
            onChange={(date) => {
              if (date) {
                setSelectedFromIn(date.format("YYYYMMDD"));
              } else {
                setSelectedFromIn(null);
              }
            }}
            allowClear
          />
        </Col>
        <Col span={4}>
          <Typography>Date To</Typography>
          <DatePicker
            placeholder="yyyy-mm-dd"
            size="middle"
            style={{
              width: "96%",
            }}
            value={
              selectedDateToIn === null
                ? undefined
                : moment(selectedDateToIn, "YYYY-MM-DD")
            }
            onChange={(date) => {
              if (date) {
                setSelectedToIn(date.format("YYYYMMDD"));
              } else {
                setSelectedToIn(null);
              }
            }}
            allowClear
          />
        </Col>
        <Col span={4} className="Center">
          <Typography className="Color_Fading">-</Typography>
          <Button
            type="primary"
            className="Btn_Search"
            icon={<SearchOutlined className="Icon_Size" />}
            onClick={Btn_Search}
          >
            Search
          </Button>
        </Col>
      </Row>
      <Row className="Row_Main">
        <Col span={4}>
          <Typography>Output</Typography>
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
        <Col span={4}>
          <Typography>Date Form</Typography>
          <DatePicker
            placeholder="yyyy-mm-dd"
            size="middle"
            style={{
              width: "96%",
            }}
            value={
              selectedDateFromOut === null
                ? undefined
                : moment(selectedDateFromOut, "YYYY-MM-DD")
            }
            onChange={(date) => {
              if (date) {
                setSelectedFromOut(date.format("YYYYMMDD"));
              } else {
                setSelectedFromOut(null);
              }
            }}
            allowClear
          />
        </Col>
        <Col span={4}>
          <Typography>Date To</Typography>
          <DatePicker
            placeholder="yyyy-mm-dd"
            size="middle"
            style={{
              width: "96%",
            }}
            value={
              selectedDateToOut === null
                ? undefined
                : moment(selectedDateToOut, "YYYY-MM-DD")
            }
            onChange={(date) => {
              if (date) {
                setSelectedToOut(date.format("YYYYMMDD"));
              } else {
                setSelectedToOut(null);
              }
            }}
            allowClear
          />
        </Col>
        <Col span={4}>
          <Typography>Product Name</Typography>
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
        <Col span={4}>
          <Typography>Test Item</Typography>
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
        <Col span={4}>
          <Typography>Lot No.</Typography>
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
        <Col span={4}>
          <Typography>Week No.</Typography>
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
        <Col span={4}>
          <Typography>Serial No.</Typography>
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
        <Col span={8}></Col>
        <Col span={4} className="Center">
          <Typography className="Color_Fading">-</Typography>
          <Button
            type="primary"
            className="Btn_Export"
            icon={<FileExcelOutlined className="Icon_Size" />}
          >
            Export
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default QA_ORT_WorkingRecord;
