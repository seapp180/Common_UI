import React, { useEffect, useState, useRef } from "react";
import {
  Layout,
  theme,
  Input,
  Button,
  // Table,
  Avatar,
  Card,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
const { Content } = Layout;

function QA_ORT_WorkingRecord() {
  return (
    <div>
      <Content>
        <h1>QA ORT WORKING RECORD</h1>
        <Row>
            <Col span={2}></Col>
        </Row>
        {/* <div style={{ marginLeft: "30px", marginBottom: "5px" }}>
          <span style={{ fontSize: "18px" }}>Factory</span>{" "}
        </div> */}
      </Content>
    </div>
  );
}

export default QA_ORT_WorkingRecord;
