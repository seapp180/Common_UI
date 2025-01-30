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
  CheckOutlined,
} from "@ant-design/icons";
import "./T2D_BarCodeConfirm.css";
import { Layout, Button, Select, Input, Tooltip, Table, Modal } from "antd";
import { fn_T2D_BarCodeConfirm } from "./fn_T2D_BarCodeConfirm";
const { Content } = Layout;
function T2D_BarCodeConfirm() {
  const { columns, data, dtDataSearch, isModalOpen, handleCancel, popUpdata,handleConfirm } =
    fn_T2D_BarCodeConfirm();

  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center", height: "70px" }}>
        <h2 className="T2DBarcodeConfirmTitlePage_h2">2D Barcode Confirm</h2>
      </div>
      <Button
        style={{ margin: "10px", marginLeft: "5%" }}
        type="primary"
        icon={<CheckOutlined />}
        onClick={handleConfirm}
      >
        Confirm
      </Button>
      <Table
        columns={data}
        dataSource={dtDataSearch}
        style={{ margin: "auto", width: "90%" }}
        pagination={false}
        bordered
        size="small"
        className="tableSummary"
      />
      <Modal
        // title="Basic Modal"
        width={1000}
        height={500}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
      >
        
        <Table
          columns={columns}
          dataSource={popUpdata}
          style={{ margin: "auto", width: "90%" }}
          pagination={false}
          bordered
          size="small"
          className="tableSummaryConfirm"
        />
      </Modal>
    </Content>
  );
}

export default T2D_BarCodeConfirm;
