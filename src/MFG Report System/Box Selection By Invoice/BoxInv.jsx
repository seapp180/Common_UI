import React, { useState } from "react";
import { Layout, Button, Table, Modal, Input, Space, Select, Card } from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  ClearOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
import "../Box Selection By Invoice/BoxInv.css";
import { fn_BoxINV } from "./fn_BoxINV";
function BoxINV() {
  const {
    TableSelectBox,
    TableBoxNoDetail,
    Factory,
    setFactory,
    selectFactory,
    setselectFactory,
    InvNo,
    setInvNo,
    selectInvNo,
    setselectInvNo,
    ProductItem,
    setProductItem,
    selectProductItem,
    setselectProductItem,
    Seq,
    Invdate,
    setInvdate,
    handleFactory,
    handleInvoice,
    handleProductItem,
    DataBoxDetail
  } = fn_BoxINV();
  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">Box Selection By Invoice maintain </h2>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <table>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Factory :</span>
              </div>
            </td>
            <td>
              <div>
                <Select
                  showSearch
                  value={selectFactory}
                  onChange={handleFactory}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select Factory"
                  optionFilterProp="children"
                  filterOption={
                    (input, option) => (option?.label ?? "").toLowerCase()
                    // .includes(input.toLowerCase())
                  }
                  options={Factory}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Invoice No :</span>
              </div>
            </td>
            <td>
              <div>
              <Select
                  showSearch
                  value={selectInvNo}
                  onChange={handleInvoice}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select InvNo"
                  optionFilterProp="children"
                  filterOption={
                    (input, option) => (option?.label ?? "").toLowerCase()
                    .includes(input.toLowerCase())
                  }
                  options={InvNo}
                />
              </div>
            </td>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Seq :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  disabled
                  value={Seq}
                  style={{
                    width: "80px",
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
                <span style={{ fontSize: "14px" }}>Product Item :</span>
              </div>
            </td>
            <td>
              <div>
              <Select
                  showSearch
                  value={selectProductItem}
                  onChange={handleProductItem}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select Product Item"
                  optionFilterProp="children"
                  filterOption={
                    (input, option) => (option?.label ?? "").toLowerCase()
                    .includes(input.toLowerCase())
                  }
                  options={ProductItem}
                />
              </div>
            </td>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Invoice Date :</span>
              </div>
            </td>
            {console.log(Invdate,"Invdate")}
            <td>
              <div>
                <Input
                  type="date"
                  value={Invdate}
                  onChange={(e) => setInvdate(e.target.value)}
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
                  icon={<ReloadOutlined />}
                  style={{
                    background: "#ec7063",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  // onClick={() => {
                  //   Search();
                  // }}
                >
                  Reset
                </Button>
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  style={{
                    background: "#28b463 ",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  // onClick={() => handleGoToNextPage("NewBoxFoxcon")}
                  // onClick={showModal}
                >
                  Export
                </Button>
              </div>
            </td>
          </tr>
        </table>
        <div></div>
      </div>
      <Card
        style={{
          marginTop: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="TitleInv_h2">Select Box no. </h2>
              </div>
              <Table
                columns={TableSelectBox}
                className="TBInv"
                // dataSource={DataSource}
                bordered
                pagination={true}
                // scroll={{ y: 500 }}
                // pagination=
              ></Table>
            </div>
          </div>
          <div
            style={{
              flex: 1,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="TitleInv_h2">Box no. Detail </h2>
              </div>
              <Table
                columns={TableBoxNoDetail}
                className="TBInv1"
                dataSource={DataBoxDetail}
                bordered
                pagination={true}
                // scroll={{ y: 500 }}
                // pagination=
              ></Table>
            </div>
          </div>
        </div>
        <br></br>
        <div>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            style={{
              background: " #3498db ",
              color: "#fff",
              marginLeft: "10px",
            }}
            // onClick={() => {
            //   Search();
            // }}
          >
            Save
          </Button>
          <Button
            icon={<ClearOutlined />}
            type="primary"
            style={{
              background: "#abb2b9",
              color: "#fff",
              marginLeft: "10px",
            }}
            // onClick={() => handleGoToNextPage("NewBoxFoxcon")}
            // onClick={showModal}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </Content>
  );
}

export default BoxINV;
