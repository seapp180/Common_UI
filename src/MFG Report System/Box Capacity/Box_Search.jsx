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
import "./BoxCapacity.css";
import { fn_Box_Search } from "./fn_Box_Search";
import ImgExcel from "../../assets/excel.png";
import { DatePicker } from "antd";
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
    tableReceive,
    handleDelete,
    openManual,
    PageInsert,
    BtnExport,
    DataLotReceive,
    BtnExportReceive,
    RequestTotal,
    setPackQty,
    setRequestTotal,
    ReError,
    setReError,
    LotPacking1,
    DataLotPacking1,
    ItemError,
    setItemError,
    FullError,
    setFullError,
    PackbyError,
    setPackbyError,
    Name_User,
    handleUser,
    selectddlProduct,
    dataProduct,
    setdataProduct,
    selectddlProductNew,
    setselectddlProductNew,
    dataNewProduct,
    ddlNewProduct,
    setProductShow,
    handleDeleteLot,
    checkradio,
    rowSelection,
    CheckStatus,
    dis_show,
    SaveEdit,
    onChangeDateFrom,
    onChangeDateTo,
    onChangePackDate,
    refresh,
    BoxNoSeacrhTo,
    setBoxNoSeacrhTo
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
                {/* <Input
                  showSearch
                  value={ddlProduct.trim() == "" ? "" : ddlProduct}
                  onChange={(e) => setddlProduct(e.target.value.toUpperCase())}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select ITem"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleProduct("SearchItem");
                    }
                  }}
                /> */}
                <Select
                  showSearch
                  value={selectddlProduct}
                  // onChange={(index, e) => handleProduct(e, "SearchItem")}
                  onSearch={(value, e) => {
                    handleProduct({ label: value }, "SearchItem");
                  }}
                  onChange={(index, e) => handleProduct(e, "SearchItem")}
                  style={{
                    width: "200px",
                    textAlign: "left",
                  }}
                  placeholder="Item"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={dataProduct}
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
                {/* <Input
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
                  // placeholder="Lot No From :"
                /> */}
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  value={PackingDateFrom}
                  onChange={onChangeDateFrom}
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
                {/* <Input
                  type="date"
                  showSearch
                  value={PackingDateTo}
                  onChange={(e) => setPackingDateTo(e.target.value)}
                  style={{
                    width: "200px",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  // placeholder="Lot No To :"
                /> */}
                <DatePicker
                  style={{
                    width: "200px",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  format="DD/MM/YYYY"
                  value={PackingDateTo}
                  onChange={onChangeDateTo}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Box No From :</span>
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
                  placeholder="Box No From :"
                  onChange={(e) => setBoxNoSeacrh(e.target.value)}
                />
              </div>
            </td>
                <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Box No To :</span>
              </div>
            </td>
            <td>
              <div>
                <Input
                  showSearch
                  value={BoxNoSeacrhTo}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Box No To :"
                  onChange={(e) => setBoxNoSeacrhTo(e.target.value)}
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
                  onClick={() => NewBoxCapacity("NewBox")}
                >
                  New
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  danger
                  type="primary"
                  style={{ marginLeft: "10px", backgroundColor: "	#A9A9A9" }}
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
        width={"100%"}
        style={{ height: "700px", top: 20 }}
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          <div
            style={{
              overflowX: "hidden",
              // overflowY: "scroll",
              // height: "90vh",
              width: "90vw",
            }}
          >
            <div style={{ flex: 1, marginRight: "10px" }}>
              <Card className="BoxnoMaintain" bodyStyle={{ paddingTop: 10 }}>
                <h3 className="BoxmainName">Box Maintain</h3>
                <Radio.Group
                  onChange={ChooseMenu}
                  value={radioselect}
                  style={{ padding: "10px" }}
                >
                  <Radio
                    style={{ marginLeft: "30px" }}
                    //  disabled={PageInsert === 'UPDATE' ? true : false}
                    value={"Manual"}
                  >
                    Pack by Box
                  </Radio>
                  {checkradio !== "hidden" && (
                    <Radio
                      style={{ marginLeft: "30px" }}
                      value={"Auto"}
                      //  disabled={ PageInsert === 'NewBox' ? false : true}
                    >
                      Auto Generate Pack
                    </Radio>
                  )}
                </Radio.Group>
                <table>
                  <tr>
                    <td style={{ textAlign: "right" }}>Item :</td>
                    <td>
                      {PageInsert == "UPDATE" && (
                        <Input
                          value={selectddlProductNew}
                          style={{
                            width: "200px",
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                          }}
                          disabled
                        />
                      )}
                      {PageInsert == "NewBox" && (
                        <Select
                          showSearch
                          value={selectddlProductNew}
                          onSearch={(value, e) => {
                            handleProduct({ label: value }, "ItemNew");
                          }}
                          onChange={(index, e) => {
                            handleProduct(e, "ItemNew", "SELECT");
                            if (ItemError) {
                              setItemError(false);
                            }
                          }}
                          style={{
                            width: "200px",
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                            borderColor: ItemError ? "red" : "",
                          }}
                          placeholder="Item"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={dataNewProduct}
                        />
                      )}
                      {ItemError && (
                        <span style={{ color: "red" }}>*กรุณากรอก Item</span>
                      )}
                    </td>
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
                          value={Fac.text}
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
                          value={RequestTotal}
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || value === "null") {
                              setReError(true);
                            } else {
                              setReError(false);
                            }
                            setRequestTotal(value);
                          }}
                          style={{
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                            borderColor: ReError ? "red" : "",
                          }}
                          placeholder="กรอกจำนวน Box"
                        />
                        {ReError && (
                          <span style={{ color: "red" }}>
                            *กรุณากรอก Request Total
                          </span>
                        )}
                      </td>
                    </tr>
                  )}
                  {radioselect == "Manual" && (
                    <tr>
                      <td style={{ textAlign: "right" }}>Packing Date :</td>
                      <td>
                        <DatePicker
                          style={{
                            width: "200px",
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                          }}
                          value={Packdate}
                          onChange={onChangePackDate}
                          format="DD/MM/YYYY"
                        />
                      </td>
                      <td style={{ textAlign: "right" }}>Packing Qty :</td>
                      <td>
                        <Input
                          value={String(PackQty).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, "");
                            if (!isNaN(value)) {
                              setPackQty(value);
                            }
                          }}
                          disabled
                          style={{
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                          }}
                          placeholder=""
                        />
                      </td>
                      <Button
                        icon={<ReloadOutlined />}
                        style={{
                          display: "block",
                          marginTop: "5px",
                          marginLeft: "5px",
                          backgroundColor: "#d9d6da",
                        }}
                        onClick={() => refresh(DataLotPacking)}
                      >
                        Reset
                      </Button>
                    </tr>
                  )}
                  {radioselect == "Auto" && (
                    <tr>
                      <td style={{ textAlign: "right" }}>Packing Date :</td>
                      <td>
                        <DatePicker
                          style={{
                            width: "200px",
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                          }}
                          value={Packdate}
                          onChange={(date, dateString) => setPackdate(date)}
                          format="DD/MM/YYYY"
                        />
                      </td>
                      <td style={{ textAlign: "right" }}>Full Box Qty :</td>
                      <td>
                        <Input
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          value={String(FullBoxQty).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, "");
                            if (!isNaN(value)) {
                              setFullBoxQty(value);
                            }
                          }}
                          style={{
                            width: "200px",
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                            borderColor: FullError ? "red" : "",
                          }}
                          placeholder="กรอก Full Box Qty"
                        />
                        {FullError && (
                          <span style={{ color: "red" }}>
                            *กรุณากรอก Full Box Qty
                          </span>
                        )}
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
                          value={String(FullBoxQty).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                          onChange={(e) => {
                            const value = e.target.value.replace(/,/g, "");
                            if (!isNaN(value)) {
                              setFullBoxQty(value);
                            }
                          }}
                          style={{
                            width: "200px",
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                            borderColor: FullError ? "red" : "",
                          }}
                          placeholder="กรอก Full Box Qty"
                        />
                        {FullError && (
                          <span style={{ color: "red" }}>
                            *กรุณากรอก Full Box Qty
                          </span>
                        )}
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
                          placeholder="กรอก Total Sheet Qty"
                        />
                      </td>
                    </tr>
                  )}
                  {radioselect == "Auto" && (
                    <tr>
                      <td style={{ textAlign: "right" }}>Sheet Qty :</td>
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
                            width: "200px",
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                          }}
                          placeholder="กรอก Total Sheet Qty"
                        />
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td style={{ textAlign: "right" }}>Packing By :</td>
                    <td colSpan={3}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Input
                          value={PackBy}
                          // onChange={(e) => setPackBy(e.target.value)}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || value === "null") {
                              setPackbyError(true);
                            } else {
                              setPackbyError(false);
                            }
                            setPackBy(value);
                          }}
                          // onBlur={handleUser}
                          onBlur={(e) => {
                            handleUser(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUser(e.target.value);
                            }
                          }}
                          style={{
                            width: "295px",
                            display: "block",
                            marginTop: "5px",
                            marginLeft: "5px",
                            borderColor: PackbyError ? "red" : "",
                          }}
                          placeholder="กรอก Packing By"
                        />
                        {PackbyError && (
                          <span style={{ color: "red" }}>
                            *กรุณากรอก Packing By
                          </span>
                        )}
                        <Input
                          fullWidth
                          value={Name_User}
                          // onChange={(e) => setAnotherRemark(e.target.value)}
                          style={{
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
                        placeholder="กรอก Remark"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style={{ marginLeft: "30px", textAlign: "right" }}>
                        <span style={{ fontSize: "14px" }}></span>
                      </div>
                    </td>
                    <td colSpan={2}>
                      {/* <div> */}
                      {radioselect == "Manual" && (
                        <>
                          {(CheckStatus == "ACTIVE" || CheckStatus == "") && (
                            <>
                              {PageInsert === "UPDATE" && (
                                <Button
                                  id="genPackButton"
                                  icon={<SaveOutlined />}
                                  type="primary"
                                  style={{
                                    background: "#49db71",
                                    color: "#fff",
                                    marginLeft: "10px",
                                  }}
                                  disabled={dis_show}
                                  onClick={SaveEdit}
                                >
                                  Save Edit
                                </Button>
                              )}
                              <Button
                                id="genPackButton"
                                icon={<MedicineBoxOutlined />}
                                type="primary"
                                style={{
                                  background: "#3498db",
                                  color: "#fff",
                                  marginLeft: "10px",
                                }}
                                disabled={dis_show}
                                onClick={() => GenPack("ManaulPack")}
                              >
                                Manual
                              </Button>
                              <Button
                                id="genPackButton"
                                icon={<MedicineBoxOutlined />}
                                disabled={dis_show}
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
                        </>
                      )}
                      {radioselect == "Auto" && (
                        <>
                          {(CheckStatus == "ACTIVE" || CheckStatus == "") && (
                            <>
                              <Button
                                id="genPackButton"
                                icon={<MedicineBoxOutlined />}
                                type="primary"
                                style={{
                                  marginLeft: "10px",
                                  backgroundColor: "#f4d03f",
                                }}
                                disabled={dis_show}
                                onClick={() => GenPack("AutoGenerate")}
                              >
                                Auto Generate
                              </Button>
                            </>
                          )}
                        </>
                      )}
                      {((CheckStatus === "ACTIVE" && PageInsert === "UPDATE") ||
                        CheckStatus === "") &&
                        radioselect !== "Auto" && (
                          <Button
                            disabled={dis_show}
                            icon={<DeleteOutlined />}
                            type="primary"
                            danger
                            style={{ marginLeft: "10px", marginTop: "1px" }}
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        )}
                      {/* </div> */}
                      {/* {radioselect === "Manual" && ( */}
                      {((CheckStatus === "ACTIVE" && PageInsert !== "UPDATE") ||
                        CheckStatus === "") && (
                        <Button
                          icon={<ReloadOutlined />}
                          type="primary"
                          danger
                          style={{
                            marginLeft: "10px",
                            marginTop: "2px",
                            backgroundColor: "#A9A9A9",
                          }}
                          onClick={() => Clear("ResetMaintain")}
                          //setDataLotPacking1
                          // onClick={() => Clear("AutoReset")}
                        >
                          Reset
                        </Button>
                      )}
                      {/* )} */}
                    </td>

                    {/* {radioselect == "Auto" && (
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {((CheckStatus == "ACTIVE" && PageInsert !== "UPDATE") || CheckStatus == "") && (
                          <Button
                          icon={<ReloadOutlined />}
                          type="primary"
                          danger
                          style={{
                            marginLeft: "10px",
                            marginTop:'2px',
                            backgroundColor: "	#A9A9A9",
                          }}
                         
                        >
                          Reset
                        </Button>
                        )}
                      </div>
                    )} */}
                  </tr>
                </table>
              </Card>
              {(openManual || PageInsert == "UPADTE") && (
                <Card className="CardManual" bodyStyle={{ paddingTop: 10 }}>
                  <h3 className="BoxmainName">Manual</h3>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "100%",
                      alignItems: "center",
                      marginTop: "10px",
                      margin: "0 auto",
                      justifyContent: "center",
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
                        marginLeft: "7px",
                      }}
                    >
                      Lot No :
                    </span>
                    <Select
                      showSearch
                      value={selectddlLot}
                      onChange={(index, e) => handleLotNo(e)}
                      style={{
                        width: "130px",
                        marginLeft: "10px",
                        textAlign: "left",
                      }}
                      placeholder="เลือก Lot No"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={ddlLot}
                    />
                    <span
                      style={{
                        textAlign: "right",
                        width: "100px",
                        marginLeft: "10px",
                      }}
                    >
                      Remain Qty :
                    </span>
                    <Input
                      disabled
                      value={Remain_qty}
                      style={{
                        width: "100px",
                        marginLeft: "10px",
                        marginTop: "5px",
                      }}
                    />
                    <span
                      style={{
                        textAlign: "right",
                        width: "100px",
                      }}
                    >
                      Pack Qty :
                    </span>
                    <Input
                      value={Pack_qtyLot}
                      onChange={(e) => setPack_qtyLot(e.target.value)}
                      style={{
                        width: "150px",
                        marginLeft: "10px",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      marginTop: "5px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      icon={<SaveOutlined />}
                      disabled={dis_show}
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
                      style={{ marginLeft: "10px", backgroundColor: "	#A9A9A9" }}
                      onClick={() => Clear("ResetManual")}
                    >
                      Reset
                    </Button>
                  </div>
                </Card>
              )}

              {/* <Card
                bodyStyle={{ paddingTop: 10 }}
                // style={{
                //   flexDirection: "column",
                //   alignItems: "flex-start",
                //   textAlign: "center",
                //   backgroundColor: "#f6f8ee",
                //   marginTop: "5px",

                // }}
                className="CardLot"
              >
                <h3 className="BoxmainName">Lot Packing</h3>
                {radioselect == "Manual" && (
                  <Table
                    columns={LotPacking}
                    style={{ marginTop: "5px", marginLeft: "10px" }}
                    className="tableLot"
                    dataSource={DataLotPacking}
                    bordered
                    pagination={true}
                    scroll={{ y: 350 }}
                    // pagination=
                  ></Table>
                )}
                {radioselect == "Auto" && (
                  <Table
                    columns={LotPacking1}
                    style={{ marginTop: "5px", marginLeft: "10px" }}
                    className="tableLot"
                    dataSource={DataLotPacking1}
                    bordered
                    pagination={true}
                    scroll={{ y: 350 }}
                    // pagination=
                  ></Table>
                )}
              </Card> */}
              <Card bodyStyle={{ paddingTop: 10 }} className="CardLot">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 className="BoxmainName">Lot Packing</h3>
                  {(CheckStatus == "ACTIVE" || CheckStatus == "") &&
                    radioselect !== "Auto" && (
                      <Button
                        icon={<DeleteOutlined />}
                        type="primary"
                        size="small"
                        danger
                        disabled={dis_show}
                        onClick={handleDeleteLot}
                      >
                        Delete
                      </Button>
                    )}
                </div>
                {radioselect == "Manual" && (
                  <Table
                    columns={LotPacking}
                    style={{
                      marginTop: "5px",
                      marginLeft: "10px",
                      height: "200px",
                    }}
                    className="tableLot"
                    dataSource={DataLotPacking}
                    bordered
                    pagination={false}
                    scroll={{ y: 170 }}
                  ></Table>
                )}
                {radioselect == "Auto" && (
                  <Table
                    columns={LotPacking1}
                    style={{ marginTop: "5px", marginLeft: "10px" }}
                    className="tableLot"
                    dataSource={DataLotPacking1}
                    bordered
                    pagination={true}
                    scroll={{ y: 350 }}
                  ></Table>
                )}
              </Card>
            </div>
          </div>

          <div
            style={{
              marginLeft: "10px",
              width: "700px",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Card
              style={{
                // display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#f6f8ee",
                marginTop: "10px",
                // maxHeight: "350px",
                width: "100%",

                height: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3
                  className="BoxmainName"
                  style={{ width: "200px", marginBottom: "5px" }}
                >
                  For Packing
                </h3>
                <Button
                  icon={
                    <img src={ImgExcel} style={{ width: 20, height: 20 }} />
                  }
                  style={{ marginRight: "10px" }}
                  onClick={() => BtnExport()}
                >
                  Export
                </Button>
              </div>

              <Table
                columns={packingTable}
                dataSource={DataPacking}
                className="tablePacking"
                style={{
                  height: "300px",
                  width: "100%",
                }}
                bordered
                pagination={false}
                scroll={{ y: 200 }}
                summary={(pageData) => {
                  let totalQty = 0;
                  pageData.forEach(({ GOOD_QTY }) => {
                    totalQty += GOOD_QTY;
                  });

                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row
                        style={{ fontSize: "16px" }}
                        className="no-padding"
                      >
                        <Table.Summary.Cell
                          index={0}
                          colSpan={2}
                          align="right"
                          className="no-padding"
                        >
                          Total
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                          index={columns.length - 1}
                          colSpan={1}
                          align="center"
                          className="no-padding"
                        >
                          {totalQty.toLocaleString()}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  );
                }}
              ></Table>
            </Card>
            <Card
              style={{
                // display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#f6f8ee",
                marginTop: "10px",
                width: "100%",
                height: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <h3
                  className="BoxmainName"
                  style={{ width: "200px", marginBottom: "5px" }}
                >
                  Waiting For Receive
                </h3>
                <Button
                  icon={
                    <img src={ImgExcel} style={{ width: 20, height: 20 }} />
                  }
                  style={{ marginRight: "10px" }}
                  onClick={() => BtnExportReceive()}
                >
                  Export
                </Button>
              </div>
              <Table
                columns={tableReceive}
                style={{ marginTop: "5px", height: "150px", width: "100%" }}
                className="tableRecieve"
                dataSource={DataLotReceive}
                bordered
                pagination={false}
                // scroll={{ y: 700 }}
                scroll={{ y: 200 }}
                summary={(pageData) => {
                  let totalQty = 0;
                  pageData.forEach(({ GOOD_QTY }) => {
                    totalQty += GOOD_QTY;
                  });

                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row
                        style={{ fontSize: "16px" }}
                        className="no-padding"
                      >
                        <Table.Summary.Cell
                          index={0}
                          colSpan={2}
                          align="right"
                          className="no-padding"
                        >
                          Total
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                          index={columns.length - 1}
                          colSpan={1}
                          align="center"
                          className="no-padding"
                        >
                          {totalQty.toLocaleString()}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  );
                }}
              ></Table>
            </Card>
          </div>
        </div>
      </Modal>
    </Content>
  );
}

export default Box_Search;
