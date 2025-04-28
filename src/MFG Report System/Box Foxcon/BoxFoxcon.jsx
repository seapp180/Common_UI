import React, { useState } from "react";
import { Layout, Button, Table, Modal, Input, Space, Select } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  PrinterOutlined,
  ScanOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
import "../Box Foxcon/BoxFoxcon.css";
// import { fn_Box_Search } from "./fn_Box_Search";
// import ImgExcel from "../../assets/excel.png";
import { fn_BoxFoxcon } from "./fn_BoxFoxcon";
function BoxFoxcon() {
  const {
    showModal,
    handleOk,
    handleCancel,
    isModalOpen,
    columns,
    handleUser,
    PackBy,
    setPackBy,
    ProductNew,
    setProductNew,
    BoxNo,
    BoxQty,
    BoxDate,
    setBoxDate,
    Packlabel,
    setPacklabel,
    FistName,
    Surname,
    Reset,
    GetProductKey,
    fcPackBy,
    fcProduct,
    GetPackLabel,
    dis_product,
    dis_packlabel,
    fcPacklabel,
    ProductSeacrh,
    LotSearch,
    setLotSearch,
    packDateFrom,
    setPackDateFrom,
    packDateTo,
    setPackDateTo,
    BoxSearch,
    setBoxSearch,
    DataPackLabel,
    GenBoxNo,
    dis_genbox,
    dis_print,
    Search,
    DataSearch,
    DataSource,
    selectProduct,
    handleProduct,
    sts_page,
    SaveBox,
    handleDeleteSelected,
    selectedRows,
    GetLink,
    handleShipTo,
    selectShipTo,
    setselectShipTo,
    DataShipTo,
    handleLinkShipTo,
    setBoxQty
  } = fn_BoxFoxcon();
  // const PathSmartFac = () => {
  //   window.location.href = import.meta.env.VITE_TEST_PATH // เปลี่ยนหน้าไปยัง URL ที่กำหนด
  // };
  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">Box Capacity (Foxconn) </h2>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <table>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Product :</span>
              </div>
            </td>
            <td>
              <div>
                {/* <Input
                  value={ProductSeacrh}
                  onChange={(e) => setProductSeacrh(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Input Product."
                /> */}

                <Select
                  showSearch
                  value={selectProduct}
                  // onChange={(index, e) => handleProduct(e, "SearchItem")}
                  onSearch={(value, e) => {
                    handleProduct({ label: value });
                  }}
                  onChange={(index, e) => handleProduct(e)}
                  style={{
                    width: "200px",
                    textAlign: "left",
                  }}
                  placeholder="Item"
                  optionFilterProp="children"
                  filterOption={
                    (input, option) => (option?.label ?? "").toLowerCase()
                    // .includes(input.toLowerCase())
                  }
                  options={ProductSeacrh}
                />
              </div>
            </td>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Lot No :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  value={LotSearch}
                  onChange={(e) => setLotSearch(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Lot No  :"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Packing Date :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  showSearch
                  type="date"
                  value={packDateFrom}
                  onChange={(e) => setPackDateFrom(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  //  placeholder="Select ITem"
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     handleProduct("SearchItem");
                  //   }
                  // }}
                />
              </div>
            </td>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>To :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  type="date"
                  value={packDateTo}
                  onChange={(e) => setPackDateTo(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Box No :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  value={BoxSearch}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Box No :"
                  onChange={(e) => setBoxSearch(e.target.value)}
                />
              </div>
            </td>
            <td></td>
          </tr>
          <br></br>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}></span>
              </div>
            </td>
            <td>
              <div>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  style={{
                    background: "#5AA8F5",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    Search();
                  }}
                >
                  Search
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  style={{
                    background: "#50C878",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  // onClick={() => handleGoToNextPage("NewBoxFoxcon")}
                  onClick={showModal}
                >
                  New
                </Button>
                <Button
                  // icon={<ReloadOutlined />}
                  danger
                  type="primary"
                  style={{ marginLeft: "10px", backgroundColor: "	#A9A9A9" }}
                  onClick={() => Reset("ResetSearch")}
                >
                  Reset
                </Button>
              </div>
            </td>
            <td></td>
          </tr>
        </table>
        <div></div>
      </div>

      <Table
        columns={DataSearch}
        style={{ marginTop: "5px" }}
        className="TBFox"
        dataSource={DataSource}
        bordered
        pagination={true}
        scroll={{ y: 500 }}
        // pagination=
      ></Table>
      <div>
        <Modal
          bo
          width="95%"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          style={{
            top: 20,
            maxHeight: "calc(100vh - 20px)", // ย้ายจาก bodyStyle
            overflow: "hidden", // ย้ายจาก bodyStyle
          }}
        >
          <h3 className="TitleNew_h2">Box Capacity (Foxconn)</h3>

          <div layout="inline" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Pack By :
                </label>
                <Input
                  value={PackBy}
                  ref={fcPackBy}
                  // onChange={(e) => {
                  //   const numericValue = e.target.value.replace(/[^0-9]/g, ""); // กรองเฉพาะตัวเลข
                  //   setPackBy(numericValue);
                  // }}
                  onChange={(e) => setPackBy(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUser(e.target.value);
                    }
                  }}
                  suffix={<ScanOutlined style={{ color: "gray" }} />}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>Name :</label>
                <Input value={FistName} disabled />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Surname :
                </label>
                <Input value={Surname} disabled />
              </div>
              <div>
                <Button
                  type="default"
                  style={{ backgroundColor: "#A9A9A9", color: "white" }}
                  onClick={() => Reset("ResetName")}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          <div layout="inline" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Product :
                </label>
                <Input
                  // ref={fcProduct}
                  // disabled={dis_product}
                  disabled
                  value={ProductNew}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      GetProductKey(e.target.value);
                    }
                  }}
                  onChange={(e) => setProductNew(e.target.value)}
                  suffix={<ScanOutlined style={{ color: "gray" }} />}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Box No. :
                </label>
                <Input value={BoxNo} disabled />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Box Qty :
                </label>
                {/* <Input
                  ref={fcBoxqty}
                  disabled={dis_boxqty}
                  value={BoxQty}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, ""); // อนุญาตเฉพาะตัวเลข
                    const formattedInput = new Intl.NumberFormat().format(
                      input
                    ); // เพิ่มลูกน้ำขั้นตำแหน่ง
                    setBoxQty(formattedInput);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      GetBoxQty(e.target.value);
                    }
                  }}
                /> */}
                <Input
                  // ref={fcBoxqty}
                  // disabled={dis_boxqty}
                  disabled
                  value={BoxQty.toLocaleString()} // แสดงค่าพร้อมลูกน้ำ
                  // onChange={(e) => {
                  //   const input = e.target.value.replace(/[^0-9]/g, ""); // กรองเฉพาะตัวเลข
                  //   setBoxQty(input === "" ? 0 : Number(input)); // เก็บเป็น number
                  // }}
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     GetBoxQty(BoxQty); // ส่งค่าเป็น number
                  //   }
                  // }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Box date :
                </label>
                <Input
                  type="date"
                  value={BoxDate}
                  onChange={(e) => setBoxDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            {/* Pack Label */}
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <label style={{ width: 100 }}>Pack Label :</label>
              <Input
                style={{ width: "700px" }}
                value={Packlabel}
                disabled={dis_packlabel}
                ref={fcPacklabel}
                onChange={(e) => setPacklabel(e.target.value)}
                suffix={<ScanOutlined style={{ color: "gray" }} />}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    GetPackLabel();
                  }
                }}
              />
            </div>

            {/* Ship Code */}
          </div>

          {/* Table Section */}

          <Button
            type="primary"
            danger
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
            className="TableNew"
            style={{ float: "right", marginBottom: "5px" }} // ✅ ดันปุ่มไปขวา
          >
            Delete
          </Button>

          <Table
            dataSource={DataPackLabel}
            columns={columns}
            pagination={false}
            className="TableNew"
            summary={(pageData) => {
              let totalQty = pageData.reduce(
                (sum, record) => sum + record.QTY,
                0
              );
              setBoxQty(totalQty)
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell
                    index={0}
                    colSpan={5}
                    style={{ textAlign: "right" }}
                  >
                    <b>Total</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <b>{totalQty.toLocaleString()}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={2}
                    colSpan={2}
                  ></Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />

          <div style={{ display: "flex", gap: 16, marginBottom: 16 ,marginTop: 16}}>
            {/* Pack Label */}

            {/* Ship Code */}
            <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <label style={{ width: 100 }}>Ship Code :</label>
              <Select
                showSearch
                value={selectShipTo}
                onChange={(value) => {
                  setselectShipTo(value);
                }}
                style={{
                  width: "700px", // ให้เต็มความกว้างของ flex item
                  textAlign: "left",
                }}
                placeholder="Ship Code"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={DataShipTo}
              />
            </div>
          </div>
          {/* Buttons */}
          <Space style={{ marginTop: 0 }}>
            {(sts_page === "" || sts_page === "GEN_SUCCESS") && (
              <Button
                disabled={dis_genbox}
                type="primary"
                onClick={() => GenBoxNo("GEN")}
              >
                Gen Box No.
              </Button>
            )}
            {sts_page === "UPDATE" && (
              <Button disabled={dis_genbox} type="primary" onClick={SaveBox}>
                Save Box No.
              </Button>
            )}

            {sts_page !== "UPDATE" && (
              <Button
                style={{ backgroundColor: "#FF3131", color: "white" }}
                onClick={() => Reset("Cancel")}
              >
                Cancel
              </Button>
            )}
            <Button
              type="primary"
              disabled={dis_print}
              icon={<PrinterOutlined />}
              onClick={handleLinkShipTo}
              style={{ background: "green", borderColor: "green" }}
            >
              Print WH Label
            </Button>

            <Button
              type="primary"
              // disabled={dis_print}
              icon={<LogoutOutlined />}
              onClick={GetLink}
              style={{ background: "#dbac49", borderColor: "#dbac49" }}
            >
              Smart Factory
            </Button>
          </Space>

          {/* Box Details */}

          <Space
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            {/* <Button
              type="primary"
              icon={<PrinterOutlined />}
              style={{ background: "green", borderColor: "green" }}
            >
              Print WH Label
            </Button> */}
            {/* <Button
              type="primary"
              icon={<PrinterOutlined />}
              style={{ background: "goldenrod", borderColor: "goldenrod" }}
            >
              Print Box Label
            </Button> */}
          </Space>
        </Modal>
      </div>
    </Content>
  );
}

export default BoxFoxcon;
