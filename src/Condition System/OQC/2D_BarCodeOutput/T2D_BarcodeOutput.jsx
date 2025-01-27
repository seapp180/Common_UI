import axios from "axios";
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
} from "@ant-design/icons";
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
const { Content } = Layout;
import ImgExcel from "../../../assets/excel.png";
import "./T2D_BarcodeOutput.css";
import { fn_T2D_BarcodeOutput } from "./fn_T2D_BarcodeOutput";
function T2D_BarcodeOutput() {
  const {
    txtPOS,
    txtProduct,
    txtLotNo,
    txtOperatorCode,
    txtState,
    txtLotSize,
    txtReject,
    txtSampleSize,
    txtBarcodetype,
    txtAperture,
    txtRemark,
    setTxtPOS,
    setTxtProduct,
    setTxtLotNo,
    setTxtOperatorCode,
    setTxtState,
    setTxtLotSize,
    setTxtReject,
    setTxtSampleSize,
    setTxtBarcodetype,
    setTxtAperture,
    setTxtRemark,
    handleChangePOS,
    handleChangeOperator,
    handleChangeSampleSize,
  } = fn_T2D_BarcodeOutput();
  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center", height: "70px" }}>
        <h2 className="T2DBarcodeTitlePage_h2">2D Barcode output</h2>
      </div>
      <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
        <h2 className="T2DBarcodeTodayOutput">Today Output (Lot) : </h2>
        <h2 className="T2DBarcodeShiftOutput">Shift Output (Lot) : </h2>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          width: "900px",
          // background: "white",
        }}
      >
        <table>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>POS :</span>
              </div>
            </td>
            <td colSpan={3}>
              <div>
                <Input
                  showSearch
                  value={txtPOS}
                  onChange={(e) => setTxtPOS(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleChangePOS();
                    }
                  }}
                  // onBlur={(e) => {
                  //   console.log(e.target.value, "e.target.value");
                  //   if (e.target.value.trim() !== "") {
                  //     handleChangePOS();
                  //   }
                  // }}
                  id="txtFPOS"
                  style={{
                    width: "590px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Select ITem"
                  // onBlur={() => handleProduct("SearchItem")}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div
                style={{
                  marginLeft: "30px",
                  textAlign: "right",
                  width: "200px",
                }}
              >
                <span style={{ fontSize: "14px" }}>Product :</span>
              </div>
            </td>
            {/* {console.log(txtProduct, "txtProduct", txtLotNo, "txtLotNo")} */}
            <td style={{ width: "300px" }}>
              <div>
                <Input
                  showSearch
                  value={txtProduct}
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
            <td style={{ width: "60px" }}>
              <span style={{ fontSize: "14px" }}>Lot No :</span>
            </td>
            <td>
              <div>
                <Input
                  showSearch
                  value={txtLotNo}
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
              <div
                style={{
                  marginLeft: "30px",
                  textAlign: "right",
                  width: "200px",
                }}
              >
                <span style={{ fontSize: "14px" }}>Operator Code :</span>
              </div>
            </td>
            <td style={{ width: "300px" }}>
              <div>
                <Input
                  showSearch
                  id="txtFOperatorCode"
                  value={txtOperatorCode}
                  onChange={(e) => setTxtOperatorCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleChangeOperator();
                    }
                  }}
                  // onBlur={handleChangeOperator}
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                />
              </div>
            </td>
            <td style={{ width: "60px" }}>
              <span style={{ fontSize: "14px" }}>Stage :</span>
            </td>
            <td>
              <div>
                <Select
                  id="txtFState"
                  defaultValue="----Select----"
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  value={txtState}
                  onChange={(value) => {
                    setTxtState(value);
                    document.getElementById("txtFLotSize").focus();
                  }}
                  options={[
                    { value: "----Select----", label: "----Select----" },
                    { value: "FA", label: "FA" },
                    { value: "NPM", label: "NPM" },
                    { value: "MP", label: "MP" },
                  ]}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div
                style={{
                  marginLeft: "30px",
                  textAlign: "right",
                  width: "200px",
                }}
              >
                <span style={{ fontSize: "14px" }}>Lot Size :</span>
              </div>
            </td>
            <td style={{ width: "300px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              >
                <Input
                  id="txtFLotSize"
                  value={txtLotSize}
                  type="number"
                  onChange={(e) => setTxtLotSize(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      document.getElementById("txtFReject").focus();
                    }
                  }}
                  showSearch
                  style={{
                    width: "100px",
                    marginRight: "10px",
                  }}
                />
                <span style={{ fontSize: "14px" }}>pcs</span>
              </div>
            </td>
            <td style={{ width: "60px" }}>
              <span style={{ fontSize: "14px" }}>Reject :</span>
            </td>
            <td style={{ width: "300px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
              >
                <Input
                  showSearch
                  type="number"
                  value={txtReject}
                  onChange={(e) => setTxtReject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      document.getElementById("txtFSampleSize").focus();
                    }
                  }}
                  id="txtFReject"
                  style={{
                    width: "100px",
                    marginRight: "10px",
                  }}
                />
                <span style={{ fontSize: "14px" }}>pcs</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div
                style={{
                  marginLeft: "30px",
                  textAlign: "right",
                  width: "200px",
                }}
              >
                <span style={{ fontSize: "14px", textAlign: "right" }}>
                  Sampling size :
                </span>
              </div>
            </td>
            <td>
              <div>
                <Select
                  defaultValue="----Select----"
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  id="txtFSampleSize"
                  value={txtSampleSize}
                  onChange={(value) => {
                    setTxtSampleSize(value);
                    handleChangeSampleSize(value);
                  }}
                  options={[
                    { value: "----Select----", label: "----Select----" },
                    { value: "5", label: "5" },
                    { value: "32", label: "32" },
                  ]}
                />
              </div>
            </td>
            <td style={{ width: "120px" }}>
              <span style={{ fontSize: "14px", textAlign: "right" }}>
                Barcode type :
              </span>
            </td>
            <td>
              <div>
                <Select
                  id="txtFBarcodetype"
                  defaultValue="----Select----"
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  value={txtBarcodetype}
                  onChange={(value) => {
                    setTxtBarcodetype(value);
                    document.getElementById("txtFAperture").focus();
                  }}
                  options={[
                    { value: "----Select----", label: "----Select----" },
                    { value: "SUS", label: "SUS" },
                    { value: "PAPER", label: "PAPER" },
                    { value: "Ink jet", label: "Ink jet" },
                  ]}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div
                style={{
                  marginLeft: "30px",
                  textAlign: "right",
                  width: "200px",
                }}
              >
                <span style={{ fontSize: "14px", textAlign: "right" }}>
                  Aperture :
                </span>
              </div>
            </td>
            <td>
              <div>
                <Select
                  defaultValue="----Select----"
                  style={{
                    width: "200px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  id="txtFAperture"
                  value={txtAperture}
                  onChange={(value) => {
                    setTxtAperture(value);

                    document.getElementById("txtFRemark").focus();
                  }}
                  options={[
                    { value: "----Select----", label: "----Select----" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                  ]}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div style={{ marginLeft: "30px", textAlign: "right" }}>
                <span style={{ fontSize: "14px" }}>Remark :</span>
              </div>
            </td>
            <td colSpan={3}>
              <div>
                <Input
                  showSearch
                  id="txtFRemark"
                  value={txtRemark}
                  onChange={(e) => setTxtRemark(e.target.value)}
                  // value={ddlProduct.trim() == "" ? "" : ddlProduct}
                  // onChange={(e) => setddlProduct(e.target.value)}
                  style={{
                    width: "590px",
                    display: "block",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  placeholder="Remark"
                  // onBlur={() => handleProduct("SearchItem")}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <div style={{
                  marginLeft: "250px",
                  borderRadius: "15px",
                  display: "inline-flex",
                  alignItems: "center",
                  width: "600px",
                  marginTop: "20px",
                  height: "50px",
                  color: "white",
                  justifyContent: "center",
                }}>
                <Button>Save</Button>
                &nbsp;
                <Button>Cancel</Button>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              <div
                style={{
                  marginLeft: "180px",
                  borderRadius: "15px",
                  display: "inline-flex",
                  alignItems: "center",
                  width: "600px",
                  marginTop: "20px",
                  height: "50px",
                  background: "black",
                  color: "white",
                  justifyContent: "center",
                }}
              >
                test
              </div>
            </td>
          </tr>
        </table>
      </div>
    </Content>
  );
}

export default T2D_BarcodeOutput;
