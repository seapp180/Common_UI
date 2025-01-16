import React, { useEffect, useState } from "react";
import {
  Layout,
  theme,
  Input,
  Tooltip,
  Button,
  Table,
  Modal,
  Avatar,
} from "antd";
import {
  SearchOutlined,
  CloseOutlined,
  UndoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import ImgExcel from "../../../assets/excel.png";
import { Fn_zPO_Report } from "./Fn_zPO_Report"
import './Reprt.css'

const { Content } = Layout;

const Page2 = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {
    columns,
    columns810,
    columns846,
    columns856,
    columns860,
    Search,
    Search810,
    Search846,
    Search856,
    Search860,
    Reset,
    exportToExcel,
    txtPono,
    settxtPono,
    dataTable,
    setdataTable,
    dataTable810,
    setdataTable810,
    dataTable846,
    setdataTable846,
    dataTable856,
    setdataTable856,
    dataTable860,
    setdataTable860,
    open810,
    setOpen810,
    open846,
    setOpen846,
    open856,
    setOpen856,
    open860,
    setOpen860,
    loading,
    setLoading,
    LoadingModal,
    setLoadingModal,
  } = Fn_zPO_Report();


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
        <h1>zPO Summary Report</h1>
        <p
          style={{
            display: "inline-block",
            marginRight: "8px",
            width: "90px",
            textAlign: "right",
          }}
        >
          FETL PO No.
        </p>
        <Input value={txtPono}
          onChange={(e) => {
            settxtPono(e.target.value);
          }}
          style={{
            width: "250px",
            backgroundColor: "#fff",
            border: "1px solid #d9d9d9",
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              Search(txtPono);
            }
          }}
        />
        <br />
        <p
          style={{
            display: "inline-block",
            marginRight: "16px",
            width: "80px",
            textAlign: "[right]",
          }}
        >
          Supplier
        </p>
        <Input
          value={"APPLE INC. [1007117]"}
          style={{
            width: "350px",
            backgroundColor: "#DDDDDD",
            border: "1px solid #d9d9d9",
          }}
          disabled
        />{" "}
        &nbsp;
        <Button
          type="primary"
          icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
          onClick={() => Search(txtPono)}
        >
          Execute
        </Button>
        &nbsp;
        <Button type="primary" danger icon={<UndoOutlined />} onClick={Reset}>
          Reset
        </Button>
        <br />
        <br />
        <Table
          columns={columns}
          dataSource={dataTable}
          style={{ margin: "auto" }}
          pagination={false}
          scroll={{ x: "max-content" }}
        
          // rowClassName={() => "custom-row-height"} 
          // bordered
          size="small"
          className="tableSearchZpo"
          // width=''
        />
        {/* 860 */}
        <Modal
          centered
          title={
            <p>
              FETL PO No. : {txtPono}{" "}
              <Tooltip title="Export to Excel">
                <Avatar
                  onClick={() => exportToExcel(dataTable860, columns860)}
                  src={ImgExcel}
                  shape="square"
                  style={{ marginLeft: "15px", cursor: "pointer" }}
                />
              </Tooltip>
            </p>
          }
          footer={
            <Button
              onClick={() => {
                setOpen860(false); 
                setLoadingModal(true); 
              }}
            >
              Cancel
            </Button>
          }
          loading={LoadingModal}
          open={open860}
          onCancel={() => {
            setOpen860(false); 
            setLoadingModal(true); 
          }}
          width={'95%'}
        >
          <Table
            columns={columns860}
            dataSource={dataTable860}
            style={{ margin: "auto" }}
            pagination={false}
            scroll={{ x: "max-content" }}
            bordered
             size="small"
             className="custom-bordered-table"
          />
        </Modal>
          {/* 856 */}
        <Modal
          centered
          title={
            <p>
              FETL PO No. : {txtPono}{" "}
              <Tooltip title="Export to Excel">
                <Avatar
                  onClick={() => exportToExcel(dataTable856, columns856)}
                  src={ImgExcel}
                  shape="square"
                  style={{ marginLeft: "15px", cursor: "pointer" }}

                />
              </Tooltip>
            </p>
          }
          footer={
            <Button
              onClick={() => {
                setOpen856(false); 
                setLoadingModal(true); 
              }}
            >
              Cancel
            </Button>
          }
          loading={LoadingModal}
          open={open856}
          onCancel={() => {
            setOpen856(false); 
            setLoadingModal(true); 
          }}
          width={'95%'}
        >
          <Table
            columns={columns856}
            dataSource={dataTable856}
            style={{ margin: "auto" }}
            pagination={false}
            scroll={{ x: "max-content" }}
            bordered
            className="custom-bordered-table"
            size="small"
          />
        </Modal>
        {/* 846 */}
        <Modal
          centered
          title={
            <p>
              FETL PO No. : {txtPono}{" "}
              <Tooltip title="Export to Excel">
                <Avatar
                  onClick={() => exportToExcel(dataTable846, columns846)}
                  src={ImgExcel}
                  shape="square"
                  style={{ marginLeft: "15px", cursor: "pointer" }}
                />
              </Tooltip>
            </p>
          }
          footer={
            <Button
              onClick={() => {
                setOpen846(false); 
                setLoadingModal(true); 
              }}
            >
              Cancel
            </Button>
          }
          loading={LoadingModal}
          open={open846}
          onCancel={() => {
            setOpen846(false); 
            setLoadingModal(true); 
          }}
          width={'95%'}
        >
          <Table
            columns={columns846}
            dataSource={dataTable846}
            style={{ margin: "auto" }}
            pagination={false}
            scroll={{ x: "max-content" }}
            bordered
             size="small"
               className="custom-bordered-table"
          />
        </Modal>
        {/* 810 */}
        <Modal
          centered
          title={
            <p>
              FETL PO No. : {txtPono}{" "}
              <Tooltip title="Export to Excel">
                <Avatar
                  onClick={() => exportToExcel(dataTable810, columns810)}
                  src={ImgExcel}
                  shape="square"
                  style={{ marginLeft: "15px", cursor: "pointer" }}
                />
              </Tooltip>
            </p>
          }
          footer={
            <Button
              onClick={() => {
                setOpen810(false); 
                setLoadingModal(true); 
              }}
            >
              Cancel
            </Button>
          }
          loading={LoadingModal}
          open={open810}
          onCancel={() => {
            setOpen810(false); 
            setLoadingModal(true); 
          }}
          width={'95%'}
        >
          <Table
            columns={columns810}
            dataSource={dataTable810}
            style={{ margin: "auto" }}
            pagination={false}
            scroll={{ x: "max-content" }}
            bordered
             size="small"
                className="custom-bordered-table"
          />
        </Modal>
      </div>
    </Content>
  );
};

export default Page2;
