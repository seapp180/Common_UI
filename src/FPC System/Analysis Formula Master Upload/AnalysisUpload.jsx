import React, { useEffect, useState, useRef } from "react";
import { Layout, Button, Table, Select, Modal,Spin,Tag,Avatar } from "antd";
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
import Imgchemistry from '../../assets/chemistry.png'

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
    HandleCh,
    Search,
    DataSearch,
    showPopUp,
    handlePopUpOk,
    handlePopUpCancel,
    UploadOpen,
    handleDrop,
    handleFileUpload,
    selectedFiles,
    dataFile,
    FileName,
    DisableSave,
    loadingSave,
    ClearFile,
    GetFileFormat,
    BtnExport,
    loadingSearch,
    Clear,
    HandleUnitPopUp,
    HandleProcessPopUp,
    HandleMachinePopUp,
    SL_ProcessPopUp,
    SL_UnitPopUp,
    SL_MCPopUp,
    UnitPopUp,
    ProcessPopUp,
    MCPopUp,
    UploadFile,
  } = fn_AnalysisUpload();

  return (
    <Content>
      {/* <Tag>test</Tag> */}
      <div style={{ display: "flex", alignItems: "center"}}>
    <h1 style={{
      background: '#CA965C',
      borderRadius: '25px',
      paddingLeft: '15px',
      paddingRight: '15px',
      color: '#fff',
      paddingTop: '10px', // เพิ่ม padding เพื่อให้มีพื้นที่มากขึ้น
      paddingBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // เพิ่มเงาให้กับ h1
      width: 'auto', // ปรับให้ความกว้างเป็นอัตโนมัติ
    }}>
      {/* <Avatar 
        src={Imgchemistry} 
        alt="icon" 
        size={40} 
        style={{ 
          marginRight: '10px', 
          borderRadius: '5px',
          // border: '2px solid #fff', // ขอบสีขาวรอบ Avatar
        }} 
      /> */}
      Analysis Formula Master Upload
    </h1>
  </div>
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
            placeholder="Select Unit"
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
            placeholder="Select Process"
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
            placeholder="Select Machine"
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
            placeholder="Select Bath"
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
            placeholder="Select Ch"
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
          
            type="primary"
            icon={loadingSearch ? <LoadingOutlined /> : <SearchOutlined />}
            style={{ background: "#5AA8F5", color: "#fff", marginTop: "5px" }}
            onClick={() => Search()}
          >
            Search{" "}
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            icon={<CloseOutlined />}
            danger
            type="primary" 
            style={{ marginTop: "5px" }}
            onClick={() => Clear()}
          >
            Clear{" "}
          </Button>{" "}
          &nbsp;&nbsp;
          <Button icon={<UploadOutlined />} onClick={() => showPopUp() } style={{marginTop:'5px'}}>
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
          onClick={() => BtnExport()}
        >
          Export Excel
        </Button>
      </div>

      <Table
        columns={columns}
        style={{ marginTop: "5px" }}
        className="tableSerachAnalysis"
        dataSource={DataSearch}
        bordered
        pagination={false}
        scroll={{ x: "max-content", y: 310 }}
      ></Table>
      <Modal
        open={UploadOpen}
        footer={null}
        onCancel={handlePopUpCancel}
        width={"90%"}
      >
        
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div style={{}}>
            <span style={{ fontSize: "14px" }}>Unit</span>
            <Select
              showSearch
              value={SL_UnitPopUp}
              style={{
                width: "200px",
                display: "block",
                marginTop: "5px",
                marginLeft: "5px",
              }}
              placeholder="Select Unit"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={UnitPopUp}
              onChange={HandleUnitPopUp}
            />
          </div>
        
          <div style={{ marginLeft: "30px" }}>
            <span style={{ fontSize: "14px" }}>Process</span>
            <Select
              showSearch
              value={SL_ProcessPopUp}
              style={{
                width: "200px",
                display: "block",
                marginTop: "5px",
                marginLeft: "5px",
              }}
              placeholder="Select Process"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={ProcessPopUp}
              onChange={HandleProcessPopUp}
            />
          </div>

          <div style={{ marginLeft: "30px" }}>
            <span style={{ fontSize: "14px" }}>Machine</span>
            <Select
              showSearch
              value={SL_MCPopUp}
              style={{
                width: "200px",
                display: "block",
                marginTop: "5px",
                marginLeft: "5px",
              }}
              placeholder="Select Machine"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={MCPopUp}
              onChange={HandleMachinePopUp}
            />
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "flex-start" }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="bt_ChooseFile">
            <CloudUploadOutlined
              style={{ fontSize: "30px", color: "#86B6F6" }}
            />
            <br />
            <span style={{ fontWeight: "bold" }}>Drop your files here</span>
            <br />
            or
            <br />
            <Button
              size="small"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Browse files
            </Button>
            <br />
            <span style={{ fontSize: "12px", color: "red" }}>
              **.xlsx or .xls only
            </span>
          </label>
          &nbsp;&nbsp; &nbsp;
          <Button
            icon={<FileOutlined />}
            style={{ marginTop: "auto" }}
            onClick={() => GetFileFormat()}
          >
            Fomat File
          </Button>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <div
            className="File_name"
            style={{
              display: FileName === "" ? "none" : "flex",
            }}
          >
            <FileExcelOutlined style={{ marginRight: "5px", color: "green" }} />
            <span style={{ fontSize: "14px" }}>{FileName}</span>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CloseOutlined
                style={{ marginLeft: "5px", color: "red" }}
                onClick={() => ClearFile()}
              />
            </div>
          </div>
          <Button
            icon={<UploadOutlined />}
            style={{
              marginLeft: "5px",
              marginTop: "0",
              background: "#5AA8F5",
              color: "#fff",
              display: FileName === "" ? "none" : "flex",
            }}
            onClick={() => UploadFile()}
          >
            Upload
          </Button>
        </div>
        <br />
        <div className="divTable">
          <Table
            // columns={columnsUpload}
            style={{ width: "99%" }}
            className="tableSerachAnalysis"
            dataSource={dataFile}
            pagination={false}
            scroll={{ x: "max-content", y: 310 }}
            size="small"
          ></Table>
        </div>
        <br />
        <div
          style={{
            display: dataFile.length <= 0 ? "none" : "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            icon={loadingSave ? <LoadingOutlined /> : <SaveOutlined />}
            disabled={DisableSave}
            style={{ marginLeft: "5px", background: "#399918", color: "#fff" }}
            // onClick={() => Save()}
          >
            Save
          </Button>
          <Button
            icon={<CloseCircleOutlined />}
            style={{ marginLeft: "5px", background: "#DF2E38", color: "#fff" }}
            onClick={() => handlePopUpCancel()}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </Content>
  );
};

export default AnalysisUpload;
