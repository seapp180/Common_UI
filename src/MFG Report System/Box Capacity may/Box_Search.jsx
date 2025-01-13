import React from "react";
import {
  Layout,
  Button,
  Table,
  Select,
  Modal,
  Spin,
  Tag,
  Avatar,
  Input,
  Card,
  Radio,
} from "antd";
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
  PlusOutlined,
  MedicineBoxOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
const { Content } = Layout;
import "./BoxCapacity.css";
import { fn_Box_Search } from "./fn_Box_Search";
function Box_Search() {
  const {
    columns,
    NewPopup,
    NewBoxCapacity,
    handleOk,
    handleCancel,
    isModalOpen,
    packingTable,
    ChooseMenu,
    radioselect,
    GenPack,
    openManual,
    LotPacking,
    tableReceive,
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
                <span style={{ fontSize: "14px" }}>Ship Factory :</span>
              </div>
            </td>
            <td>
              <div>
                <Select
                  showSearch
                  // value={SL_Unit}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select Ship Factory"
                  // filterOption={(input, option) =>
                  //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  // }
                  // options={Unit.Search}
                  // onChange={HandleUnit}
                />
              </div>
            </td>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Item / Product :</span>
              </div>
            </td>
            <td>
              <div>
                <Select
                  showSearch
                  // value={SL_Process}
                  style={{
                    width: "436px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select Item / Product"
                  optionFilterProp="children"
                  // filterOption={(input, option) =>
                  //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  // }
                  // options={Process.Search}
                  // onChange={handleProcess}
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
                  showSearch
                  // value={SL_Unit}
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
                  showSearch
                  // value={SL_Unit}
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
                  // value={SL_Unit}
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
                  // value={SL_Unit}
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
                  // value={SL_Unit}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Box No :"
                  // filterOption={(input, option) =>
                  //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  // }
                  // options={Unit.Search}
                  // onChange={HandleUnit}
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
                  // onClick={() => Search()}
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
                  onClick={() => NewBoxCapacity()}
                >
                  New
                </Button>
                <Button
                  icon={<CloseOutlined />}
                  danger
                  type="primary"
                  style={{ marginLeft: "10px" }}
                  // onClick={() => Clear()}
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
        // dataSource={DataSearch}
        bordered
        pagination={true}
        scroll={{ x: "max-content", y: 350 }}
        // pagination=
      ></Table>
      <Modal
        width={"80%"}
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
                  <td style={{ textAlign: "right" }}>Item / Product :</td>
                  <td>
                    <Select
                      showSearch
                      style={{
                        width: "300px",
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                      placeholder="Select Input / Product"
                    />
                  </td>
                </tr>
                {radioselect == "Manual" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Ship Factory :</td>
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
                  </tr>
                )}
                {radioselect == "Manual" && (
                  <tr>
                    <td style={{ textAlign: "right" }}>Box No. :</td>
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
                    <td style={{ textAlign: "right" }}>Box Status :</td>
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
                    <td style={{ textAlign: "right" }}>Packing Qty :</td>
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
                    <td style={{ textAlign: "right" }}>Full Box :</td>
                    <td>
                      <Input
                        showSearch
                        style={{
                          width: "200px",
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                        }}
                        placeholder="Full Box"
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
                        placeholder="Full Box"
                      />
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ textAlign: "right" }}>Packing By :</td>
                  <td>
                    <Input
                      showSearch
                      style={{
                        width: "200px",
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                      placeholder="Packing By"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Remark :</td>
                  <td colSpan={3}>
                    <Input
                      fullWidth
                      showSearch
                      style={{
                        display: "block",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                      placeholder="Remark"
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
                      {(radioselect == "Manual" && <>
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
                      </Button></>)}
                      {( radioselect == "Auto" && 
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
                      </Button> </>)} 
                      <Button
                        icon={<ReloadOutlined />}
                        type="primary"
                        danger
                        style={{ marginLeft: "10px" }}
                        onClick={() => GenPack("AutoPack")}
                      >
                        Reset
                      </Button>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </table>
            </Card>
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
                  showSearch
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
                  style={{
                    width: "200px",
                    marginLeft: "10px",
                  }}
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
                  Remind Qty :
                </span>
                <Input
                  disabled
                  showSearch
                  style={{
                    width: "130px",
                    marginLeft: "10px",
                    marginTop: "10px",
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
                  disabled
                  showSearch
                  style={{
                    width: "200px",
                    marginLeft: "10px",
                    marginTop: "10px",
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
                  onClick={() => GenPack("ManualPack")}
                >
                  Save
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  type="primary"
                  danger
                  style={{ marginLeft: "10px" }}
                  onClick={() => GenPack("AutoPack")}
                >
                  Reset
                </Button>
              </div>
            </Card>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                textAlign: "center",
                backgroundColor: "#f6f8ee",
              }}
            >
              <h3 className="BoxmainName">Lot Packing</h3>
              <Table
                columns={LotPacking}
                style={{ marginTop: "5px", marginLeft: "10px" }}
                className="tableLot"
                // dataSource={DataSearch}
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
              className="tablePacking"
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
              <h3 className="BoxmainName" style={{ width: "70px" }}>
                Lot Packing
              </h3>
              <Table
                columns={LotPacking}
                style={{ marginTop: "5px", height: "100%" }}
                className="tableRecieve"
                // dataSource={DataSearch}
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
