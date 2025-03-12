import React, { useState } from "react";
import { Layout, Button, Table, Select, Modal, Input, Card, Radio } from "antd";
import {
  SearchOutlined,
  SaveOutlined,
  PlusOutlined,
  MedicineBoxOutlined,
  ReloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
import "../Box Foxcon/BoxFoxcon.css";
// import { fn_Box_Search } from "./fn_Box_Search";
// import ImgExcel from "../../assets/excel.png";
import { fn_BoxFoxcon } from "./fn_BoxFoxcon";
function BoxFoxcon() {
  const { handleGoToNextPage ,item, setItem} = fn_BoxFoxcon();
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
                <Input
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Input Product."
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
                  // value={LotTo}
                  // onChange={(e) => setLotTo(e.target.value)}
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
                  // value={ddlProduct.trim() == "" ? "" : ddlProduct}
                  // onChange={(e) => setddlProduct(e.target.value.toUpperCase())}
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
                  // value={ddlItem}
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
                  // value={BoxNoSeacrh}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Box No :"
                  // onChange={(e) => setBoxNoSeacrh(e.target.value)}
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
                  // onClick={() => {
                  //   Search();
                  // }}
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
                  onClick={() => handleGoToNextPage("NewBoxFoxcon")}
                >
                  New
                </Button>
                <Button
                  // icon={<ReloadOutlined />}
                  danger
                  type="primary"
                  style={{ marginLeft: "10px", backgroundColor: "	#A9A9A9" }}
                  // onClick={() => Clear("SerachBox")}
                >
                  Reset
                </Button>
              </div>
            </td>
            <td></td>
          </tr>
        </table>
        <div>
   
  </div>
      </div>

      <Table
        // columns={columns}
        style={{ marginTop: "5px" }}
        className="TBFox"
        // dataSource={DataSearch}
        bordered
        pagination={true}
        scroll={{ y: 500 }}
        // pagination=
      ></Table>
    </Content>
    
  );
}

export default BoxFoxcon;
