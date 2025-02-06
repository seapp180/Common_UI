import React from "react";
import { Layout, Button, Input, Table, Modal } from "antd";
const { Content } = Layout;
import { fn_T2D_BarcodeReport } from "./fn_T2D_BarcodeReport";
import "./T2D_BarcodeReport.css";
import ImgExcel from "../../../assets/excel.png";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
function T2D_BarcodeReport() {
  const {
    txtproduct,
    setTxtproduct,
    txtlotno,
    setTxtlotno,
    txtdatefrom,
    setTxtdatefrom,
    txtdateto,
    setTxtdateto,
    handleSearch,
    handleCancel,
    handleExport,
    data,
    dtDataSearch,
    popUpdata,
    isModalOpen,
    handleCancelModal,
    columns,
    handleexportINModal,
  } = fn_T2D_BarcodeReport();
  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center", height: "70px" }}>
        <h2 className="T2DBarcodeReportTitlePage_h2">2D Barcode Report</h2>
      </div>
      <div style={{ display: "flex" }}>
        <div className="divTextField">
          <span className="lblTextField">Product : </span>
          <Input
            className="InputTextField"
            id="txtproduct2DReport"
            value={txtproduct}
            onChange={(e) => setTxtproduct(e.target.value)}
          />
        </div>
        <div className="divTextField">
          <span className="lblTextField">Lot No. : </span>
          <Input
            className="InputTextField"
            id="txtlotno2DReport"
            value={txtlotno}
            onChange={(e) => setTxtlotno(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="divTextField">
          <span className="lblTextField">Date From : </span>
          <Input
            type="date"
            id="txtdatefrom2DReport"
            className="InputTextField"
            value={txtdatefrom}
            onChange={(e) => setTxtdatefrom(e.target.value)}
          />
        </div>
        <div className="divTextField">
          <span className="lblTextField">Date To : </span>
          <Input
            type="date"
            id="txtdateto2DReport"
            className="InputTextField"
            value={txtdateto}
            onChange={(e) => setTxtdateto(e.target.value)}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <Button
          style={{ marginLeft: "300px" }}
          onClick={handleSearch}
          type="primary"
          icon={<SearchOutlined />}
        >
          Search
        </Button>
        &nbsp;&nbsp;
        <Button onClick={handleCancel} icon={<CloseOutlined /> }className="BtCancelReport">Cancel</Button>
        <Button
          style={{ marginLeft: "auto", marginRight: "10px" }}
          icon={<img src={ImgExcel} alt="icon" style={{ width: '20px', height: '20px' }} />}
          onClick={handleExport}
        >
          Export
        </Button>
      </div>

      <Table
        style={{ marginTop: "10px" }}
        className="tableSummaryReport"
        columns={data}
        dataSource={dtDataSearch}
        pagination={true}
        bordered
        size="small"
      />
      <Modal
        width={1000}
        height={500}
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={[]}
      >
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "95%" }}
        >
          <Button onClick={handleexportINModal}  icon={<img src={ImgExcel} alt="icon" style={{ width: '20px', height: '20px' }} />}>Export</Button>
        </div>
        <Table
          columns={columns}
          dataSource={popUpdata}
          style={{ margin: "auto", width: "90%", marginTop: "10px" }}
          pagination={false}
          bordered
          size="small"
          className="tableSummaryConfirm"
        />
      </Modal>
    </Content>
  );
}

export default T2D_BarcodeReport;
