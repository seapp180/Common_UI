import React from "react";
import { Layout, Button, Table, Modal, Input, Select } from "antd";
import {
  PlusOutlined,
  ReloadOutlined,
  SaveOutlined,
  ClearOutlined,
  SearchOutlined,
  FileExcelOutlined,
  HighlightTwoTone,
} from "@ant-design/icons";
const { Content } = Layout;
import "../Box Selection By Invoice/BoxInv.css";
import { fn_BoxINV } from "./fn_BoxInv";
function BoxINV() {
  const {
    TableSelectBox,
    TableBoxNoDetail,
    Factory,
    selectFactory,
    InvNo,
    selectInvNoFrom,
    ProductItem,
    selectProductItem,
    Seq,
    handleFactory,
    handleInvoice,
    handleProductItem,
    DataBoxDetail,
    DataSelectBox,
    showGrid,
    DataSeachBox,
    InvdateFrom,
    setInvdateFrom,
    Search,
    TableSearch,
    showModal,
    isModalOpen,
    handleOk,
    handleCancel,
    selectFactoryNew,
    selectProductItemNew,
    selectInvNoTo,
    selectInvNew,
    setInvdateNew,
    InvdateNew,
    Save,
    status,
    Reset,
    BtnExport,
    selectedRows
  } = fn_BoxINV();
  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">Box Selection By Invoice maintain </h2>
      </div>
      {/* <Card> */}
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
                  onChange={(value) => handleFactory(value, "Search")}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select Factory"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase()
                  }
                  options={Factory}
                />
              </div>
            </td>
          </tr>

          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Invoice No From :</span>
              </div>
            </td>
            <td>
              <div>
                <Select
                  showSearch
                  value={selectInvNoFrom}
                  onChange={(value) => handleInvoice(value, "From")}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select InvNo"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={InvNo}
                />
              </div>
            </td>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Invoice No. To :</span>
              </div>
            </td>
            <td>
              <div>
                <Select
                  showSearch
                  value={selectInvNoTo}
                  onChange={(value) => handleInvoice(value, "To")}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select InvNo"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={InvNo}
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
                  onChange={(value) => handleProductItem(value, "Search")}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select Product Item"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
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
            <td>
              <div>
                <Input
                  type="date"
                  value={InvdateFrom}
                  onChange={(e) => setInvdateFrom(e.target.value)}
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
                    background: "#f4d03f",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  onClick={Search}
                >
                  Search
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{
                    background: "#3498db ",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  onClick={showModal}
                >
                  New
                </Button>
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  style={{
                    background: "#FF7043",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  onClick={() => Reset("SEARCH")}
                >
                  Reset
                </Button>
              </div>
            </td>
          </tr>
        </table>
        <div></div>
      </div>
      {/* </Card> */}

      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        ></div>
        <Table
          columns={TableSearch}
          className="TBInv1"
          dataSource={DataSeachBox}
          bordered
          pagination={true}
          scroll={{ y: 500 }}
        ></Table>
      </div>
      <div>
        <Modal
          width="100%"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          style={{
            top: 20,
            maxHeight: "calc(100vh - 20px)",
            overflow: "hidden", // ย้ายจาก bodyStyle
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              border: "0px solid red",
              borderRadius: "5px",
              padding: "10px",
              backgroundColor: "#EFE6D9",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h3 className="TitleNew_h3">New Selection Invoice </h3>

            <table>
              <tr></tr>
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
                      value={selectFactoryNew}
                      disabled={status === "EDIT"}
                      onChange={(value) => handleFactory(value, "New")}
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
                <td>
                  <div style={{ marginLeft: "30px", textAlign: "right" }}>
                    <span style={{ fontSize: "14px" }}>Invoice No :</span>
                  </div>
                </td>
                <td>
                  <div>
                    <Select
                      showSearch
                      value={selectInvNew}
                      disabled={status === "EDIT"}
                      onChange={(value) => handleInvoice(value, "New")}
                      style={{
                        width: "200px",
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                      placeholder="Select InvNo"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={InvNo}
                    />
                  </div>
                </td>

                <td>
                  <div style={{ marginLeft: "30px", textAlign: "right" }}>
                    <span style={{ fontSize: "14px" }}>Product Item :</span>
                  </div>
                </td>
                <td>
                  <div>
                    <Select
                      showSearch
                      value={selectProductItemNew}
                      disabled={status === "EDIT"}
                      onChange={(value) => handleProductItem(value, "New")}
                      style={{
                        width: "200px",
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                      placeholder="Select Product Item"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
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
                <td>
                  <div>
                    <Input
                      type="date"
                      value={InvdateNew}
                      onChange={(e) => setInvdateNew(e.target.value)}
                      style={{
                        width: "200px",
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
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
                      readOnly
                      value={Seq}
                      style={{
                        width: "80px",
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                        backgroundColor: "#C7C7BB",
                        color: "black",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr style={{ marginTop: "5px" }}>
                <td></td>
                <td>
                  <div style={{ marginTop: "5px" }}>
                    {status == "NEW" && (
                      <Button
                        type="primary"
                        icon={<ReloadOutlined />}
                        style={{
                          background: "#FF7043",
                          color: "#fff",
                          marginLeft: "10px",
                        }}
                        onClick={() => Reset("NEW")}
                      >
                        Reset
                      </Button>
                    )}
                    <Button
                      icon={<FileExcelOutlined />}
                      type="primary"
                      style={{
                        background: "#388E3C",
                        color: "#fff",
                        marginLeft: "10px",
                      }}
                      onClick={BtnExport}
                    >
                      Export
                    </Button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div>
            {showGrid == true && (
              <>
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
                      {/* <Table
                        columns={TableSelectBox}
                        className="TBInv"
                        dataSource={DataSelectBox}
                        pagination={true}
                        scroll={{ y: 300 }}
                        rowKey={(record) => record.BOX_NO}
                        summary={(pageData) => {
                          let totalQty = pageData.reduce(
                            (sum, record) => sum + record.QTY,
                            0
                          );
                          return (
                            <Table.Summary fixed="bottom">
                     
                              <Table.Summary.Row>
                                <Table.Summary.Cell
                                  index={0}
                                  colSpan={3}
                                  className="custom-summary-cell"
                                  align="right"
                                >
                                  <b style={{ margin: 0 }}>Total</b>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={1}
                                  className="custom-summary-cell"
                                  align="center"
                                  colSpan={1}
                                >
                                  <b>{totalQty.toLocaleString()}</b>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                            </Table.Summary>
                          );
                        }}
                      /> */}
                      <div>
                      <Table
                        columns={TableSelectBox}
                        className="TBInv"
                        dataSource={DataSelectBox}
                        pagination={false}
                        scroll={{ y: 300 }}
                        rowKey={(record) => record.BOX_NO}
                        summary={(pageData) => {
                          // กรองเฉพาะรายการที่ถูกติ๊กเลือก
                          const selectedData = pageData.filter((record) =>
                            selectedRows.includes(record.BOX_NO)
                          );

                          // ถ้าไม่มีรายการที่ถูกเลือก จะไม่แสดง Summary
                          if (selectedData.length === 0) {
                            return null;
                          }

                          // คำนวณยอดรวมเฉพาะแถวที่ถูกเลือก
                          let totalQty = selectedData.reduce(
                            (sum, record) => sum + record.QTY,
                            0
                          );

                          return (
                            <Table.Summary fixed="bottom">
                              <Table.Summary.Row>
                                <Table.Summary.Cell
                                  index={0}
                                  colSpan={3}
                                  className="custom-summary-cell"
                                  align="right"
                                >
                                  <b>Total</b>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell
                                  index={1}
                                  className="custom-summary-cell"
                                  align="center"
                                  colSpan={1}
                                >
                                  <b>{totalQty.toLocaleString()}</b>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell colSpan={2} />
                              </Table.Summary.Row>
                            </Table.Summary>
                          );
                        }}
                      /></div>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h2 className="TitleInv_h2_v2">Box no. Detail </h2>
                      </div>
                      <div style={{ width: "100%" }}>
                        <Table
                          columns={TableBoxNoDetail}
                          className="TBInv1"
                          dataSource={DataBoxDetail}
                          bordered
                          pagination={false}
                          scroll={{ y: 300 }}
                          summary={(pageData) => {
                            let totalQty = pageData.reduce(
                              (sum, record) => sum + record.LOT_QTY,
                              0
                            );
                            return (
                              <Table.Summary fixed="bottom">
                                {" "}
                                {/* ใช้ fixed="bottom" เพื่อทำให้แถว Total ติดอยู่ด้านล่าง */}
                                <Table.Summary.Row>
                                  <Table.Summary.Cell
                                    index={0}
                                    colSpan={6}
                                    className="custom-summary-cell"
                                    align="right"
                                  >
                                    <b style={{ margin: 0 }}>Total</b>
                                  </Table.Summary.Cell>
                                  <Table.Summary.Cell
                                    index={1}
                                    className="custom-summary-cell"
                                    align="center"
                                    colSpan={1}
                                  >
                                    <b>{totalQty.toLocaleString()}</b>
                                  </Table.Summary.Cell>
                                </Table.Summary.Row>
                              </Table.Summary>
                            );
                          }}
                        ></Table>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    style={{
                      background: "#1976D2",
                      color: "#fff",
                      marginLeft: "10px",
                    }}
                    onClick={Save}
                  >
                    Save
                  </Button>
                  <Button
                    icon={<ClearOutlined />}
                    type="primary"
                    style={{
                      background: "#9E9E9E",
                      color: "#fff",
                      marginLeft: "10px",
                    }}
                    onClick={() => Reset("Cancel")}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </Content>
  );
}

export default BoxINV;
