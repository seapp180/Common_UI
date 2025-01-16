import React from "react";
import {
  Layout,
  theme,
  Input,
  Button,
  Table,
  Avatar,
  Card,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
import {
  SearchOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import ImgInProcess from "../../../assets/time-management.png";
import ImgComplete from "../../../assets/completed-task.png";
import ImgAllPo from "../../../assets/result.png";
import { fn_Summary } from "./fn_Summary";
import "./Summary.css";
const { Content } = Layout;

const Page2 = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const {
    StyleonMouseEnter,
    StyleonMouseLeave,
    Reset,
    ClickStatus_PO,
    Search,
    setLoading,
    setStatus,
    setSL_Status,
    settxt_PONo,
    setDateFrom,
    setDateTo,
    setDataTable,
    setCountPO,
    loading,
    Status,
    SL_Status,
    txt_PONo,
    DateTo,
    DateFrom,
    DataTable,
    CountPO,
    columns,
  } = fn_Summary();

  return (
    <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
      <div
        style={{
          padding: 24,
          // textAlign: 'center',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <h1>APPLE INC. PO Summary (zEDI)</h1>
        <h3 style={{ marginLeft: "15px" }}>Overall status</h3>
        <div
          style={{
            display: "flex", // ใช้ Flexbox เพื่อจัดเรียง
            gap: "16px", // เพิ่มช่องว่างระหว่าง Card
          }}
        >
          {/* all po */}
          <Card
            style={{
              width: 400,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              padding: "15px",
              background: "#3FA2F6",
              border: 0,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              StyleonMouseEnter(e);
              e.currentTarget.style.backgroundColor = "#3FA2F6";
            }}
            onMouseLeave={(e) => {
              StyleonMouseLeave(e);
              e.currentTarget.style.backgroundColor = "#3FA2F6";
            }}
            onClick={() => ClickStatus_PO("All")}
          >
            <Row align="middle">
              <Col>
                <Avatar
                  src={ImgAllPo}
                  shape="square"
                  style={{
                    marginRight: "15px",
                    cursor: "pointer",
                    height: "90px",
                    width: "90px",
                  }}
                />
              </Col>
              <Col>
                <span
                  style={{
                    fontSize: "22px", // ขนาดฟอนต์
                    fontWeight: "bold", // หนักของฟอนต์
                  }}
                >
                  {CountPO.Type_All} <br /> PO All
                </span>
              </Col>
            </Row>
          </Card>
          {/* >PO Outstanding */}
          <Card
            style={{
              width: 400,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              padding: "15px",
              background: "#FFD35A",
              border: 0,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              StyleonMouseEnter(e);
              e.currentTarget.style.backgroundColor = "#FFD35A";
            }}
            onMouseLeave={(e) => {
              StyleonMouseLeave(e);
              e.currentTarget.style.backgroundColor = "#FFD35A";
            }}
            onClick={() => ClickStatus_PO("Outstanding")}
          >
            <Row align="middle">
              <Col>
                <Avatar
                  src={ImgInProcess}
                  shape="square"
                  style={{
                    marginRight: "15px",
                    cursor: "pointer",
                    height: "90px",
                    width: "90px",
                  }}
                />
              </Col>
              <Col>
                <span
                  style={{
                    fontSize: "22px", // ขนาดฟอนต์
                    fontWeight: "bold", // หนักของฟอนต์
                  }}
                >
                  {CountPO.Type_Outstanding}
                  <br />
                  PO Outstanding
                </span>
              </Col>
            </Row>
          </Card>
          {/* Po completed */}
          <Card
            style={{
              width: 400,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              padding: "15px",
              background: "#0D7C66",
              border: 0,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              StyleonMouseEnter(e);
              //
              e.currentTarget.style.backgroundColor = "#0D7C66";
            }}
            onMouseLeave={(e) => {
              StyleonMouseLeave(e);
              e.currentTarget.style.backgroundColor = "#0D7C66";
            }}
            onClick={() => ClickStatus_PO("Completed")}
          >
            <Row align="middle">
              <Col>
                <Avatar
                  src={ImgComplete}
                  shape="square"
                  style={{
                    marginRight: "15px",
                    cursor: "pointer",
                    height: "90px",
                    width: "90px",
                  }}
                />
              </Col>
              <Col>
                <span
                  style={{
                    fontSize: "22px", // ขนาดฟอนต์
                    fontWeight: "bold", // หนักของฟอนต์
                  }}
                >
                  {CountPO.Type_Complete}
                  <br /> PO Completed
                </span>
              </Col>
            </Row>
          </Card>
        </div>
        <br />
      </div>

      <div
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginTop: "40px",
        }}
      >
        <Select
          style={{ width: 400 }}
          placeholder="Status :"
          value={SL_Status}
          onChange={(value) => {
            setSL_Status(value);
          }}
        >
          {Status.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.text}
            </Option>
          ))}
        </Select>{" "}
        &nbsp;
        <Input
          placeholder="FETL PO No. :"
          style={{ width: "200px" }}
          value={txt_PONo}
          onChange={(e) => {
            settxt_PONo(e.target.value);
          }}
        />{" "}
        &nbsp;
        <DatePicker
          style={{ marginTop: "10px", width: "200px" }}
          placeholder="FETL PO Date From :"
          value={DateFrom ? moment(DateFrom, "DD/MM/YYYY") : null}
          onChange={(date, dateString) => {
            setDateFrom(dateString);
          }}
          format="DD/MM/YYYY"
        />{" "}
        &nbsp;
        <DatePicker
          style={{ marginTop: "10px", width: "200px" }}
          placeholder="FETL PO Date To :"
          value={DateTo ? moment(DateTo, "DD/MM/YYYY") : null}
          onChange={(date, dateString) => {
            setDateTo(dateString);
          }}
          format="DD/MM/YYYY"
        />
        &nbsp;{" "}
        <Button
          type="primary"
          icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
          onClick={() => Search()}
        >
          Execute
        </Button>
        &nbsp;
        <Button
          type="primary"
          danger
          icon={<UndoOutlined />}
          onClick={() => Reset()}
        >
          Reset
        </Button>
        <br />
        <br />
        <Table
          columns={columns}
          dataSource={DataTable}
          style={{ margin: "auto" }}
          pagination={false}
          size="small"
          className="tableSummary"
        />
      </div>
    </Content>
  );
};

export default Page2;
