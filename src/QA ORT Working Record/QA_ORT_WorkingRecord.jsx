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

function QA_ORT_WorkingRecord() {
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
            allowClear
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
          />
        </Col>
        <Col span={4}>
          <Typography>Product Type</Typography>
          <Select
            size="middle"
            showSearch
            allowClear
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
          />
        </Col>
        <Col span={4}>
          <Typography>Input</Typography>
          <Select
            size="middle"
            showSearch
            allowClear
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
          />
        </Col>
        <Col span={4}>
          <Typography>Date Form</Typography>
          <Input
            size="middle"
            style={{
              width: "96%",
            }}
          />
        </Col>
        <Col span={4}>
          <Typography>Date To</Typography>
          <Input
            size="middle"
            style={{
              width: "96%",
            }}
          />
        </Col>
        <Col span={4} className="Center">
          <Typography className="Color_Fading">-</Typography>
          <Button
            type="primary"
            className="Btn_Search"
            icon={<SearchOutlined className="Icon_Size" />}
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
            allowClear
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
          />
        </Col>
        <Col span={4}>
          <Typography>Date Form</Typography>
          <Input
            size="middle"
            style={{
              width: "96%",
            }}
          />
        </Col>
        <Col span={4}>
          <Typography>Date To</Typography>
          <Input
            size="middle"
            style={{
              width: "96%",
            }}
          />
        </Col>
        <Col span={4}>
          <Typography>Product Name</Typography>
          <Input
            size="middle"
            style={{
              width: "96%",
            }}
          />
        </Col>
        <Col span={4}>
          <Typography>Test Item</Typography>
          <Input
            size="middle"
            style={{
              width: "96%",
            }}
          />
        </Col>
        <Col span={4} className="Center">
          <Typography className="Color_Fading">-</Typography>
          <Button
            type="primary"
            className="Btn_Cancel"
            icon={<RedoOutlined className="Icon_Size" />}
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
          />
        </Col>
        <Col span={4}>
          <Typography>Week No.</Typography>
          <Input
            size="middle"
            style={{
              width: "96%",
            }}
          />
        </Col>
        <Col span={4}>
          <Typography>Serial No.</Typography>
          <Input
            size="middle"
            style={{
              width: "96%",
            }}
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
