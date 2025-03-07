import React, { useEffect, useState, useRef } from "react";
import { Layout, Button, Table, Select, Modal, Spin, Tag, Avatar,Input  } from "antd";
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
  PlusOutlined
} from "@ant-design/icons";
import { fn_AnalysisUpload } from "./fn_AnalysisUpload";
import "./AnalysisUpload.css";
import ImgExcel from "../../assets/excel.png";
import "../../StyleCommon.css";
import Imgchemistry from "../../assets/chemistry.png";
import { tr } from "date-fns/locale";

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
    columnsUpload,
    openedit,
    handleOk,
    confirmLoading,
    handleCancel,
    Unit2,
    Target,
    LCL,
    UCL,
    LSL,
    USL,
    Formula,
    Refer1,
    Refer2,
    Input_value,
    Seq,
    Replenisher,
    Refer1_1,
    Refer2_1,
    setUnit,
    setMachine,
    setCh,
    setBath,
    setProcess,
    setUnit2,
    setTarget,
    setLCL,
    setUCL,
    setLSL,
    setUSL,
    setFormula,
    setRefer1,
    setRefer2,
    setRefer1_1,
    setRefer2_1,
    setInput_value,
    setSeq,
    setReplenisher,
    Insert
  } = fn_AnalysisUpload();

  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">Analysis Formula Master Upload</h2>
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
            options={Unit.Search}
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
            options={Process.Search}
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
            options={Machine.Search}
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
            options={Bath.Search}
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
            options={Ch.Search}
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
          <Button
            type="primary"
            icon={loadingSearch ? <LoadingOutlined /> : <PlusOutlined />}
            style={{ background: "#4fdf74", color: "#fff", marginTop: "5px" }}
            onClick={() => Insert()}
          >
            Insert{" "}
          </Button>{" "}
          &nbsp;&nbsp;
          <Button
            icon={<UploadOutlined />}
            onClick={() => showPopUp()}
            style={{ marginTop: "10px" }}
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
        pagination={{
          pageSize: 100,
          position: ["bottomCenter"],
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: false,
        }}
        scroll={{ x: "max-content", y: 350 }}
      ></Table>
      <Modal
        open={UploadOpen}
        footer={null}
        onCancel={handlePopUpCancel}
        width={"95%"}
        getContainer={false}
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
              options={Unit.PopUp}
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
              options={Process.PopUp}
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
              options={Machine.PopUp}
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
            columns={columnsUpload}
            style={{ width: "99%" }}
            className="tableSerachAnalysis"
            dataSource={dataFile}
            pagination={false}
            scroll={{ x: "max-content", y: 310 }}
            size="small"
            bordered
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
      <Modal
        title="Analysis Formula Master maintain"
  
        open={openedit}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
        okText="Save"
        okButtonProps={{ style: { backgroundColor: '#e84e40' } }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <table
     
            className="TableEdit"
          >
            <tbody>
              <tr >
                <td className="Edit_form">Unit :</td>
                <td>
                  <Input disabled={Unit.disabled}  value={Unit.Edit} />
                </td>
                <td></td>
                <td className="Edit_form">Process :</td>
                <td>
                  <Input disabled={Process.disabled}  value={Process.Edit} />
                </td>
              </tr>
              <tr>
                <td className="Edit_form">Machine :</td>
                <td>
                  <Input disabled={Machine.disabled} value={Machine.Edit} />
                </td>
                <td></td>
                <td className="Edit_form">Bath :</td>
                <td>
                  <Input disabled={Bath.disabled} value={Bath.Edit} />
                </td>
              </tr>
              <tr >
                <td className="Edit_form">Chemical :</td>
                <td  >
                  <Input disabled={Ch.disabled} value={Ch.Edit} />
                </td>
                
              </tr>
              <tr >
                <td className="Edit_form">Unit :</td>
                <td>
                  <Input  
                  value={Unit2} 
                  onChange={(e) => {
                    setUnit2(e.target.value);
                  }}

                  />
                </td>
                <td></td>
                <td className="Edit_form">Target :</td>
                <td>
                  <Input value={Target} 
                    onChange={(e) => {
                      setTarget(e.target.value);
                    }}
                    />
                </td>
              </tr>
              <tr>
                <td className="Edit_form">LCL :</td>
                <td>
                  <Input value={LCL} 
                     onChange={(e) => {
                      setLCL(e.target.value);
                    }}
                  />
                </td>
                <td></td>
                <td className="Edit_form">UCL :</td>
                <td>
                  <Input value={UCL}   
                  onChange={(e) => {
                      setUCL(e.target.value);
                    }} />
                </td>
              </tr>
              <tr>
                <td className="Edit_form">LSL :</td>
                <td>
                  <Input value={LSL} 
                     onChange={(e) => {
                      setLSL(e.target.value);
                    }} />
                </td>
                <td></td>
                <td className="Edit_form">USL :</td>
                <td>
                  <Input value={USL} 
                   onChange={(e) => {
                    setUSL(e.target.value);
                  }}  />
                </td>
              </tr>
              <tr>
                <td className="Edit_form">Formula :</td>
                <td colSpan={4}>
                  <Input value={Formula} 
                    onChange={(e) => {
                      setFormula(e.target.value);
                    }} 
                     />
                </td>
              </tr>
              <tr>
                <td className="Edit_form">Refer 1 :</td>
                <td>
                  <Input value={Refer1} 
                  onChange={(e) => {
                    setRefer1(e.target.value);
                  }} 
                  />
                </td>
                <td></td>
                <td className="Edit_form">Refer 2 :</td>
                <td>
                  <Input value={Refer2} 
                   onChange={(e) => {
                    setRefer2(e.target.value);
                  }}
                  />
                </td>
              </tr>
              <tr>
                <td className="Edit_form"> Input :</td>
                <td>
                  <Input value={Input_value}
                    onChange={(e) => {
                      setInput_value(e.target.value);
                    }}
                  />
                </td>
                <td></td>
                <td className="Edit_form">Seq :</td>
                <td>
                  <Input value={Seq} 
                   onChange={(e) => {
                    setSeq(e.target.value);
                  }}
                  />
                </td>
              </tr>
              <tr>
                <td className="Edit_form">Replenisher :</td>
                <td colSpan={4}>
                  <Input value={Replenisher} 
                    onChange={(e) => {
                      setReplenisher(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="Edit_form">Refer 1 :</td>
                <td>
                  <Input value={Refer1_1} 
                  onChange={(e) => {
                    setRefer1_1(e.target.value);
                  }}
                  />
                </td>
                <td></td>
                <td className="Edit_form">Refer 2 :</td>
                <td>
                  <Input value={Refer2_1} 
                  onChange={(e) => {
                    setRefer2_1(e.target.value);
                  }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </Content>
  );
};

export default AnalysisUpload;
