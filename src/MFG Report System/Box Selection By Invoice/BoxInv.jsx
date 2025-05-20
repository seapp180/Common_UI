import { Layout, Button, Table, Input, Select, AutoComplete } from "antd";
import {
  ReloadOutlined,
  SaveOutlined,
  ClearOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
import "../Box Selection By Invoice/BoxInv.css";
import { fn_BoxINV } from "./fn_BoxInv";
import { DatePicker } from "antd";
function BoxINV() {
  const {
    TableSelectBox,
    TableBoxNoDetail,
    ProductItem,
    Seq,
    handleFactory,
    handleInvoice,
    handleProductItem,
    DataBoxDetail,
    DataSelectBox,
    selectFactoryNew,
    selectProductItemNew,
    selectInvNew,
    setInvdateNew,
    InvdateNew,
    Save,
    Reset,
    BtnExport,
    selectedRows,
    FactoryNew,
    InvNoNew,
    loadingTb1,
    loadingTb2,
    setselectProductItemNew,
    isSelected,
    setIsSelected,
    CallAnotherAPI,
    onChangePackDate,
  } = fn_BoxINV();
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">Box Selection By Invoice maintain </h2>
      </div>
      {/* <Card> */}
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
                value={selectFactoryNew}
                onChange={(value) => handleFactory(value)}
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
                options={FactoryNew}
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
              <AutoComplete
                value={selectInvNew}
                options={InvNoNew}
                style={{
                  width: "200px",
                  display: "block",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
                placeholder="Select or Input InvNo"
                onChange={(value) => handleInvoice(value)}
                filterOption={(inputValue, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                }
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
              {/* <Select
                showSearch
                value={selectProductItemNew}
                onChange={(value) => handleProductItem(value)}
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
              /> */}
              {/* <AutoComplete
                value={selectProductItemNew}
                options={ProductItem}
                style={{
                  width: "200px",
                  display: "block",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
                placeholder="Select or Input InvNo"
                onChange={(value) => handleProductItem(value)}
                filterOption={(inputValue, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                }
              /> */}
              <AutoComplete
                value={selectProductItemNew}
                options={ProductItem}
                style={{
                  width: "200px",
                  display: "block",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
                placeholder="Select or Input Product"
                onChange={(value) => {
                  setselectProductItemNew(value);
                  if (!isSelected) {
                    // ถ้ายังไม่ select จาก list ให้เรียก API อื่น
                    CallAnotherAPI(value);
                  }
                  setIsSelected(false); // reset สำหรับรอบถัดไป
                }}
                onSelect={(value) => {
                  setIsSelected(true); // กำหนดว่าเป็นการเลือกจาก list
                  handleProductItem(value); // ใช้ API เดิม
                }}
                filterOption={(inputValue, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                }
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
              {/* <Input
                type="date"
                value={InvdateNew}
                onChange={(e) => setInvdateNew(e.target.value)}
                style={{
                  width: "200px",
                  display: "block",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              /> */}
              <DatePicker
                style={{
                  width: "200px",
                  display: "block",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
                value={InvdateNew}
                onChange={onChangePackDate}
                format="DD/MM/YYYY"
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
          <td colSpan={5}>
            <div style={{ marginTop: "5px" }}>
              <Button
                type="primary"
                icon={<ReloadOutlined />}
                style={{
                  background: "#FF7043",
                  color: "#000",
                  marginLeft: "10px",
                }}
                onClick={() => Reset("NEW")}
              >
                Reset
              </Button>
              <Button
                icon={<FileExcelOutlined />}
                type="primary"
                style={{
                  background: "#abebc6 ",
                  color: "#000",
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
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: "5px",
            padding: "10px",
            width: "100%",
            backgroundColor: "#E6E6FA",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "16px",
              width: "100%",
            }}
          >
            <div style={{ width: "50%" }}>
              <p className="TitleInv_h2">Select Box no. </p>
              <Table
                loading={loadingTb2}
                columns={TableSelectBox}
                style={{ width: "100%" }}
                className="TBInv"
                dataSource={DataSelectBox}
                pagination={false}
                scroll={{ x: 700, y: 250 }}
                rowKey={(record) => record.BOX_NO}
                rowClassName={(record) =>
                  record.STATUS === "CLOSE" ? "row-close" : ""
                }
                summary={(pageData) => {
                  const selectedData = pageData.filter((record) =>
                    selectedRows.includes(record.BOX_NO)
                  );
                  if (selectedData.length === 0) {
                    return null;
                  }
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
                          align="right"
                          colSpan={1}
                        >
                          <b>{totalQty.toLocaleString()}</b>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={2} />
                      </Table.Summary.Row>
                    </Table.Summary>
                  );
                }}
              />
            </div>
            <div style={{ width: "49%" }}>
              <p className="TitleInv_h2_v2">Box No. Detail. </p>
              <Table
                loading={loadingTb1}
                columns={TableBoxNoDetail}
                style={{ width: "100%" }}
                className="TBInv1"
                dataSource={DataBoxDetail}
                bordered
                pagination={false}
                scroll={{ x: 700, y: 250 }}
                summary={(pageData) => {
                  let totalQty = pageData.reduce(
                    (sum, record) => sum + record.LOT_QTY,
                    0
                  );
                  return (
                    <Table.Summary fixed="bottom">
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
              />
            </div>
          </div>
          <br />
          <div style={{}}>
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
        </div>
      </div>
    </>
  );
}

export default BoxINV;
