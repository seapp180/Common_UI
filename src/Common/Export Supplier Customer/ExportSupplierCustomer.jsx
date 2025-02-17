import React from "react";
import { Layout, Button, Table, Select, Modal, DatePicker, Input, Card } from "antd";
import {
  SearchOutlined,
  CloudUploadOutlined,
  FileOutlined,
  FileExcelOutlined,
  CloseOutlined,
  SaveOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { fn_Export_Supplier_Customer } from "./fn_Export_Supplier_Customer";
import "./ExportSupplierCustomer.css";
import ImgExcel from "../../assets/excel.png";
import ImgExport from "../../assets/exportFile.png";
import "../../StyleCommon.css";

const { Content } = Layout;
const { Option } = Select;

const ExportSupplierCustomer = () => {
  const {
    Sl_for,
    setSl_for,
    Add_Date,
    setAdd_Date,
    To_Date,
    setTo_Date,
    ID_Code,
    setID_Code,
    Name,
    setName,
    handleReset,
    btn_Export
  } = fn_Export_Supplier_Customer();
  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">Export Supplier/Customer (Audit)</h2>
      </div>
      <Card style={{ margin: '20px 30px', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginLeft: '20px' }}>
            For : &nbsp;
            <Select
              value={Sl_for}
              onChange={(value) => setSl_for(value)}
              style={{ width: 200 }}
            >
              <Option value="Supplier">Supplier</Option>
              <Option value="Customer">Customer</Option>
            </Select>
            <br />
            <br />
            Add Date: &nbsp; <DatePicker format="DD/MM/YYYY" style={{ width: '158px' }} value={Add_Date} onChange={(dateString) => setAdd_Date(dateString)} />&nbsp;
            To : &nbsp; <DatePicker format="DD/MM/YYYY" style={{ width: '158px' }} value={To_Date} onChange={(dateString) => setTo_Date(dateString)} />
            <br />
            <br />
            Supplier/Customer Code : <Input style={{ width: '355px' }} value={ID_Code} onChange={(e) => setID_Code(e.target.value)} />
            <br />
            <br />
            Supplier/Customer Name : <Input style={{ width: '350px' }} value={Name} onChange={(e) => setName(e.target.value)} />
            <br />
            <br />
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '140px' }}>
              <Button
                icon={
                  <img
                    src={ImgExcel}
                    alt="Export Icon"
                    style={{ width: 20, height: 20 }}
                  />
                }
                style={{ borderRadius: '5px' }}
                onClick={btn_Export}
              >
                Export
              </Button>
              &nbsp;
              <Button
                type="primary"
                danger
                icon={<CloseOutlined />}
                style={{ borderRadius: '5px' }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={ImgExport}
              alt="Export Icon"
              style={{ width: 300, height: 300, borderRadius: '15px' }}
            />
          </div>
        </div>
      </Card>
    </Content>
  );
};

export default ExportSupplierCustomer;