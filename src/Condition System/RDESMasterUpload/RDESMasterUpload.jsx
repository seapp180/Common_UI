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
  SaveOutlined ,
  UploadOutlined,
  CloseCircleOutlined 
} from "@ant-design/icons";
import { fn_RDESMasterUpload } from "./fn_RDESMasterUpload";
import "./RDESMasterUpload.css";
const { Content } = Layout;
import ImgExcel from "../../assets/excel.png";

const Page2 = () => {
  const {
    SL_Product,handleChange,columns,Product,DataSearch,GetFileFormat,Bt_Search,
    showPopUp,handlePopUpOk,handlePopUpCancel,UploadOpen,handleFileUpload,FileName
    ,handleDrop,ClearFile,UploadFile,dataFile,columnsUpload,Save
    ,DisableSave,loadingSearch,loadingSave,BtnExport
  } = fn_RDESMasterUpload();

  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">RDES master upload</h2>
      </div>
      
     
      <div style={{ marginLeft: "30px", marginBottom: "5px" }}>
        <span style={{ fontSize: "18px" }}>Product</span>{" "}
      </div>
      <div style={{ marginLeft: "40px" }}>
        <Select
          showSearch
          value={SL_Product}
          style={{ width: "200px" }}
          placeholder="Select a product"
          optionFilterProp="children"
          onChange={handleChange}
          size="large"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={Product}
        />{" "}
        &nbsp;&nbsp; &nbsp;&nbsp;
        <Button
        icon={loadingSearch ? <LoadingOutlined /> : <SearchOutlined />}
          style={{ background: "#5AA8F5", color: "#fff" }}
          size="large"
          onClick={() => Bt_Search()}
        >
          Search
        </Button>
        &nbsp;&nbsp; &nbsp;&nbsp;
        <Button
          icon={<UploadOutlined />}
          size="large"
          onClick={() => showPopUp()}
        >
          {" "}
          Upload File
        </Button>
      </div>
      <br />

     
      <div style={{ display: "flex", justifyContent: "flex-end" ,marginBottom:'5px'}}>
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
      
      <div className="divTable">
        <Table
          columns={columns}
          
          className="tableSummary"
          dataSource={DataSearch}
          pagination={false}
          scroll={{ x: 'max-content',y:310 }}
        ></Table>
      </div>
      <Modal
        open={UploadOpen}
        footer={null}
        onCancel={handlePopUpCancel}
        width={"90%"}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}
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
            <Button size="small"  onClick={() =>document.getElementById('fileInput').click()}>Browse files</Button>
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
              display: FileName === '' ? 'none' : 'flex',
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
              <CloseOutlined style={{ marginLeft: "5px", color: "red" }}  onClick={() => ClearFile()} />
            </div>
          </div>
          <Button
            icon={<UploadOutlined />}
            style={{
              marginLeft: "5px",
              marginTop: "0",
              background: "#5AA8F5",
              color: "#fff",
              display: FileName === '' ? 'none' : 'flex',
            }}
            onClick={() => UploadFile()}
          >
            Upload
          </Button>
        </div>
        <br />
        <div className="divTable">
          <Table
            columns={columnsUpload}
            style={{ width: "99%" }}
            className="tableSummary"
            dataSource={dataFile}
            pagination={false}
            scroll={{ x: 'max-content',y:310 }}
            size="small"
          ></Table>
        </div>
        <br />
        <div
          style={{
            display: dataFile.length <=0 ? 'none' : 'flex',
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
          
          icon={loadingSave ? <LoadingOutlined /> : <SaveOutlined />}
            disabled={DisableSave}
            style={{ marginLeft: "5px", background: "#399918", color: "#fff" }}
            onClick={() => Save()}
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

export default Page2;
