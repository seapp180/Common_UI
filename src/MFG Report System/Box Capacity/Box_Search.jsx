import React from "react";
import {
  Layout,
  Button,
  Table,
  Select,
  Modal,
  Input,
  Card,
  Radio,
} from "antd";
import {
  SearchOutlined,
  SaveOutlined,
  PlusOutlined,
  MedicineBoxOutlined,
  ReloadOutlined,
  DeleteOutlined
} from "@ant-design/icons";
const { Content } = Layout;
import "./BoxCapacity.css";
import { fn_Box_Search } from "./fn_Box_Search";
function Box_Search() {
  const {
    columns,
    NewBoxCapacity,
    handleOk,
    handleCancel,
    isModalOpen,
    packingTable,
    ChooseMenu,
    radioselect,
    GenPack,
    LotPacking,
    ddlItem,
    ddlProduct,
    LotFrom,
    LotTo,
    setLotFrom,
    setLotTo,
    PackingDateFrom,
    PackingDateTo,
    setPackingDateFrom,
    setPackingDateTo,
    BoxNoSeacrh,
    setBoxNoSeacrh,
    Search,
    setddlProduct,
    handleProduct,
    DataSearch,
    Clear,
    ItemNew,
    setItemNew,
    ProductShow,
    Fac,
    BoxNo,
    Boxstatus,
    Packdate,
    setPackdate,
    PackQty,
    FullBoxQty,
    setFullBoxQty,
    TotalSheetQty,
    setTotalSheetQty,
    PackBy,
    setPackBy,
    Remark,
    setRemark,
    Seq,
    ddlLot,
    selectddlLot,
    Pack_qtyLot,
    handleLotNo,
    Remain_qty,
    DataPacking,
    SaveLotPacking,
    setPack_qtyLot,
    DataLotPacking,
    DataReceive,
    tableReceive,
    handleDelete,
    openManual,
    PageInsert
  } = fn_Box_Search();

  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">Box Capacity</h2>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <table>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Item :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  showSearch
                  value={ddlProduct.trim() == "" ? "" : ddlProduct}
                  onChange={(e) => setddlProduct(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select ITem"
                  onBlur={() => handleProduct("SearchItem")}
                />
              </div>
            </td>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Product :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  
                  value={ddlItem}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  disabled
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Lot No :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  
                  value={LotFrom}
                  onChange={(e) => setLotFrom(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Lot No From :"
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
                  value={LotTo}
                  onChange={(e) => setLotTo(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Lot No To :"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Packing Date Form :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  type="date"
                  showSearch
                  value={PackingDateFrom}
                  onChange={(e) => setPackingDateFrom(e.target.value)}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Lot No From :"
                />
              </div>
            </td>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>To :</span>
              </div>
            </td>
            <td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  type="date"
                  showSearch
                  value={PackingDateTo}
                  onChange={(e) => setPackingDateTo(e.target.value)}
                  style={{
                    width: "200px",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Lot No To :"
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
                  showSearch
                  value={BoxNoSeacrh}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Box No :"
                  onChange={(e) => setBoxNoSeacrh(e.target.value)}
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
                  // icon={loadingSearch ? <LoadingOutlined /> : <SearchOutlined />}
                  icon={<SearchOutlined />}
                  style={{
                    background: "#5AA8F5",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    Search();
                    // handleProduct("SearchItem");
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
                  onClick={() => NewBoxCapacity("NewBox")}
                >
                  New
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  danger
                  type="primary"
                  style={{ marginLeft: "10px" ,backgroundColor:'	#A9A9A9'}}
                  onClick={() => Clear("SerachBox")}
                >
                  Reset
                </Button>
              </div>
            </td>
            <td></td>
          </tr>
        </table>
      </div>

      <Table
        columns={columns}
        style={{ marginTop: "5px" }}
        className="tableSerachBox"
        dataSource={DataSearch}
        bordered
        pagination={true}
        scroll={{ y: 500 }} 
        // pagination=
      ></Table>
      
      <Modal
        width={"85%"}
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 2, marginRight: "10px" }}>
            <Card className="BoxnoMaintain">
              <h3 className="BoxmainName">Box Maintain</h3>
              <Radio.Group
                onChange={ChooseMenu}
                value={radioselect}
                style={{ padding: "10px" }}
              >
                <Radio style={{ marginLeft: "30px" }} value={"Manual"}>
                  Pack by Box
                </Radio>
                <Radio style={{ marginLeft: "30px" }} value={"Auto"}>
                  Auto Generate Pack
                </Radio>
              </Radio.Group>
              <table>
                <tr>
                  <td style={{ textAlign: "right" }}>Item :</td>
                  <td>
                    <Input
                      value={ItemNew.trim() == "" ? "" : ItemNew}
                      onChange={(e) => setItemNew(e.target.value)}
                      style={{
                        width: "200px",
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                      placeholder="Input Item"
                      onBlur={() => handleProduct("ItemNew")}
                    />
                  </td>
                  {console.log(ProductShow, "ProductShow", ItemNew)}
                  <td style={{ textAlign: "right" }}>Product :</td>
                  <td>
                    <Input
                      value={ProductShow}
                      disabled
                      style={{
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                    />
                  </td>
                </tr>
                {radioselect == "Manual" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Ship Factory :</td>
                    <td>
                      <Input
                        disabled
                        value={Fac.text}
                        style={{
                          width: "200px",
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                  </tr>
                )}
                {radioselect == "Manual" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Box No. :</td>
                    <td>
                      <Input
                        disabled
                        value={BoxNo}
                        style={{
                          width: "200px",
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>Box Status :</td>
                    <td>
                      <Input
                        value={Boxstatus}
                        disabled
                        style={{
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                  </tr>
                )}
                {radioselect == "Auto" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Factory :</td>
                    <td>
                      <Input
                        disabled
                        showSearch
                        style={{
                          width: "200px",
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>Request Total:</td>
                    <td>
                      <Input
                        showSearch
                        disabled
                        style={{
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                  </tr>
                )}
                {radioselect == "Manual" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Packing Date :</td>
                    <td>
                      <Input
                        value={Packdate}
                        onChange={(e) => setPackdate(e.target.value)}
                        type="date"
                        style={{
                          width: "200px",
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>Packing Qty :</td>
                    <td>
                      <Input
                        value={PackQty}
                        on
                        disabled
                        style={{
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                        placeholder=""
                      />
                    </td>
                  </tr>
                )}
                {radioselect == "Auto" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Packing Date :</td>
                    <td>
                      <Input
                        type="date"
                        showSearch
                        style={{
                          width: "200px",
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>Full Box Qty :</td>
                    <td>
                      <Input
                        showSearch
                        disabled
                        style={{
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                        placeholder=""
                      />
                    </td>
                  </tr>
                )}
                {radioselect == "Manual" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Full Box Qty :</td>
                    <td>
                      <Input
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                        value={FullBoxQty}
                        onChange={(e) => setFullBoxQty(e.target.value)}
                        style={{
                          width: "200px",
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                        placeholder="Input Full Box Qty"
                      />
                    </td>
                    <td style={{ textAlign: "right" }}>Total Sheet Qty :</td>
                    <td>
                      <Input
                        value={TotalSheetQty}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        onChange={(e) => setTotalSheetQty(e.target.value)}
                        style={{
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                        placeholder="Input Total Sheet Qty"
                      />
                    </td>
                  </tr>
                )}
                {radioselect == "Auto" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Sheet Qty :</td>
                    <td>
                      <Input
                        showSearch
                        style={{
                          width: "200px",
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                        placeholder="Input Sheet Qty"
                      />
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ textAlign: "right" }}>Packing By :</td>
                  <td>
                    <Input
                      value={PackBy}
                      onChange={(e) => setPackBy(e.target.value)}
                      style={{
                        width: "200px",
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                      placeholder="Input Packing By"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Remark :</td>
                  <td colSpan={3}>
                    <Input
                      fullWidth
                      value={Remark}
                      onChange={(e) => setRemark(e.target.value)}
                      style={{
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                      placeholder="Input Remark"
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    <div style={{ marginLeft: "30px", textAlign: "right" }}>
                      <span style={{ fontSize: "14px" }}></span>
                    </div>
                  </td>
                  <td>
                    <div>
                      {radioselect == "Manual" && (
                        <>
                          <Button
                            icon={<MedicineBoxOutlined />}
                            type="primary"
                            style={{
                              background: "#3498db",
                              color: "#fff",
                              marginLeft: "10px",
                            }}
                            onClick={() => GenPack("ManaulPack")}
                          >
                            Manual
                          </Button>
                          <Button
                            icon={<MedicineBoxOutlined />}
                            type="primary"
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "#f4d03f",
                            }}
                            onClick={() => GenPack("AutoPack")}
                          >
                            Auto Pack
                          </Button>
                        </>
                      )}
                      {radioselect == "Auto" && (
                        <>
                          <Button
                            icon={<MedicineBoxOutlined />}
                            type="primary"
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "#f4d03f",
                            }}
                            onClick={() => GenPack("AutoPack")}
                          >
                            Auto Generate
                          </Button>
                        </>
                      )}
                      <Button
                        icon={<ReloadOutlined />}
                        type="primary"
                        danger
                        style={{ marginLeft: "10px",backgroundColor:'	#A9A9A9' }}
                        onClick={() => Clear("ResetMaintain")}
                      >
                        Reset
                      </Button>

                   
                    </div>
                    
                  </td>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
  <Button
    icon={<DeleteOutlined />}
    type="primary"
    danger
    style={{ marginLeft: "5px",marginTop:'1px' }}
    onClick={handleDelete}
  >
    Delete
  </Button>
</div>
                </tr>
              </table>
            </Card>

            {(openManual || PageInsert =='UPADTE') && (
            
            <Card
              // className="BoxnoMaintain"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "center",
                backgroundColor: "#f6f8ee",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <h3 className="BoxmainName">Manual</h3>
              <br />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    textAlign: "right",
                    width: "51px",
                    marginLeft: "50px",
                  }}
                >
                  Seq :
                </span>
                <Input
                  disabled
                  value={Seq}
                  style={{
                    width: "65px",
                    marginLeft: "10px",
                  }}
                />
                <span
                  style={{
                    textAlign: "right",
                    width: "100px",
                    marginLeft: "74px",
                  }}
                >
                  Lot No :
                </span>
                <Select
                  showSearch
                  value={selectddlLot}
                  // onChange={(e) => setselectddlLot(e)}
                  onChange={(index, e) => handleLotNo(e)}
                  style={{
                    width: "200px",
                    marginLeft: "10px",
                    textAlign: "left",
                  }}
                  placeholder="Select Lot No"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={ddlLot}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    textAlign: "right",
                    width: "100px",
                    marginTop: "10px",
                  }}
                >
                  Remain Qty :
                </span>
                <Input
                  disabled
                  value={Remain_qty}
                  style={{
                    width: "130px",
                    marginLeft: "10px",
                    marginTop: "5px",
                  }}
                />
                <span
                  style={{
                    textAlign: "right",
                    width: "100px",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  Packing Qty :
                </span>
                <Input
                  value={Pack_qtyLot}
                  onChange={(e) => setPack_qtyLot(e.target.value)}
                  style={{
                    width: "200px",
                    marginLeft: "10px",
                    marginTop: "5px",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                <Button
                  icon={<SaveOutlined />}
                  type="primary"
                  style={{
                    background: "#50C878",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                  onClick={() => SaveLotPacking("SaveManual")}
                >
                  Save
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  type="primary"
                  danger
                  style={{ marginLeft: "10px",backgroundColor:'	#A9A9A9' }}
                  onClick={() => Clear("ResetManual")}
                >
                  Reset
                </Button>
              </div>
            </Card>
           
            )}

            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "center",
                backgroundColor: "#f6f8ee",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <h3 className="BoxmainName">Lot Packing</h3>
              <Table
                columns={LotPacking}
                style={{ marginTop: "5px", marginLeft: "10px" }}
                className="tableLot"
                dataSource={DataLotPacking}
                bordered
                pagination={true}
                scroll={{ x: "max-content", y: 350 }}
                // pagination=
              ></Table>
            </Card>
          
          </div>
          <div style={{ flex: 1, marginLeft: "10px" }}>
            <Table
              columns={packingTable}
              dataSource={DataPacking}
              className="tablePacking"
              style={{height:  openManual ? "700px" : "465px"}}
              bordered
              pagination={true}
              scroll={{ x: "max-content", y: 1000 }}
            ></Table>
            {/* <br/> */}
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "center",
                backgroundColor: "#f6f8ee",
                marginTop: "10px",
              }}
            >
              <h3 className="BoxmainName" style={{ width: "200px" }}>
                Waiting For Receive
              </h3>
              <Table
                columns={tableReceive}
                style={{ marginTop: "5px", height: "100%" }}
                className="tableRecieve"
                dataSource={DataReceive}
                bordered
                pagination={true}
                scroll={{ x: "max-content", y: 700 }} // Adjust the height as needed
                // pagination=
              ></Table>
            </Card>
          </div>
          
        </div>
      </Modal>
    </Content>
  );
}

export default Box_Search;
