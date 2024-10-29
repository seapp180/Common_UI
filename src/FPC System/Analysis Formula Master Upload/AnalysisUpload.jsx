import React, { useEffect, useState, useRef } from "react";
import { Layout, Button, Table, Select, Modal } from "antd";
import axios from "axios";
import {
  SearchOutlined,
  LoadingOutlined,
  CloudUploadOutlined,
  FileOutlined,
  FileExcelOutlined,
  CloseOutlined,
  SaveOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { fn_AnalysisUpload } from "./fn_AnalysisUpload";
import "./AnalysisUpload.css";
import ImgExcel from "../../assets/excel.png";

//
const { Content } = Layout;

const AnalysisUpload = () => {
  const {     
    columns,
    Unit,
    Process,
    Machine,
    Bath,
    Ch,
    SL_Bath,
    SL_Ch,
    SL_Machine,
    SL_Process,
    SL_Unit,
    HandleUnit,
    handleMachine,
    handleProcess,
    HandleBath,
    HandleCh
  } = fn_AnalysisUpload();

  return (
    <Content>
      <h1>Analysis Formula Master Upload</h1>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ marginLeft: "30px" }}>
          <span style={{ fontSize: "14px" }}>Unit</span>
          <Select
            showSearch
            value={SL_Unit}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select a Unit"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Unit}
            onChange={HandleUnit}
          />
        </div>

        <div style={{ marginLeft: "30px" }}>
          <span style={{ fontSize: "14px" }}>Process</span>
          <Select
            showSearch
            value={SL_Process}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select a Process"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Process}
            onChange={handleProcess}
          />
        </div>

        <div style={{ marginLeft: "30px" }}>
          <span style={{ fontSize: "14px" }}>Machine</span>
          <Select
            showSearch
            value={SL_Machine}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select a Machine"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Machine}
            onChange={handleMachine}
          />
        </div>
      </div>

      <div
        style={{ display: "flex", alignItems: "flex-start", marginTop: "5px" }}
      >
        <div style={{ marginLeft: "30px" }}>
          <span style={{ fontSize: "14px" }}>Bath</span>
          <Select
            showSearch
            value={SL_Bath}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select a Bath"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Bath}
            onChange={HandleBath}
          />
        </div>

        <div style={{ marginLeft: "30px" }}>
          <span style={{ fontSize: "14px" }}>Ch</span>
          <Select
            showSearch
            value={SL_Ch}
            style={{
              width: "200px",
              display: "block",
              marginTop: "5px",
              marginLeft: "5px",
            }}
            placeholder="Select a Ch"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Ch}
            onChange={HandleCh}
          />
        </div>
        <div style={{ marginLeft: "30px" }}>
          <br />
          <Button
            icon={<SearchOutlined />}
            // icon={loadingSearch ? <LoadingOutlined /> : <SearchOutlined />}
            style={{ background: "#343131", color: "#fff", marginTop: "5px" }}
            //   onClick={() => Bt_Search()}
          >
            Search{" "}
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            icon={<UploadOutlined />}
            //   onClick={() => showPopUp()}
          >
            {" "}
            Upload File
          </Button>
        </div>
      </div>
      <br></br>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          icon={
            <img
              src={ImgExcel}
              alt="Excel Icon"
              style={{ width: 20, height: 20 }}
            />
          }
          //   onClick={() => showPopUp()}
        >
          Export Excel
        </Button>
      </div>

      <Table
        columns={columns}
        style={{ marginTop: "5px" }}
        className="tableSummary"
        //   dataSource={DataSearch}
        pagination={false}
        scroll={{ x: "max-content", y: 310 }}
      ></Table>
    </Content>
  );
};

export default AnalysisUpload;
