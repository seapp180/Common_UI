import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import { Layout, Button, Input, Modal, notification } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

function Scantest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strEmpcode, setStrEmpcode] = useState("");
  const [strName, setStrName] = useState("");
  const [strContent, setStrContent] = useState("");
  const [selectBox, setSelectBox] = useState("");

  const scannerRef = useRef(null);

  function fnFocus(txtField) {
    setTimeout(() => {
      document.getElementById(txtField)?.focus();
    }, 100);
  }
  async function SaveData() {
    if (strEmpcode === "" || strName === "" || strContent === "") {
      notification.error({
        message: "Please fill in the information",
        description: "Please fill in the information",
        placement: "bottomRight",
        duration: 2,
      });
      return;
    }
    const data = {
      strEmpcode: strEmpcode,
      strName: strName,
      strContent: strContent,
    };
    const res = await axios.post("/api/Oqc_barcode/InsertQrcodeTest", data);
    if (res.data.message === "success") {
      notification.success({
        message: "Save Success",
        description: "Save Success",
        placement: "bottomRight",
        duration: 2,
      });
    } else {
      notification.error({
        message: "Save Error",
        description: "Save Error",
        placement: "bottomRight",
        duration: 2,
      });
    }
  }
  function oNcancel () {
    setStrEmpcode("");
    setStrName("");
    setStrContent("");
    fnFocus("txtEmpcode");
  }
  useEffect(() => {
    if (isModalOpen) {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("qr-reader");
      }

      const scanner = scannerRef.current;

      scanner
        .start(
          { facingMode: "environment" },
          {
            fps: 60,
            qrbox: 250,
            formatsToSupport: ["QR_CODE", "CODE_128", "CODE_39", "EAN_13", "EAN_8", "UPC_A", "UPC_E", "ITF"],
          },
          (decodedText) => {
            console.log("Scanned Result:", decodedText);

            if (selectBox === "Empcode") {
              setStrEmpcode(decodedText);
              fnFocus("txtName");
            } else if (selectBox === "Name") {
              setStrName(decodedText);
              fnFocus("txtContent");
            } else if (selectBox === "Content") {
              setStrContent(decodedText);
            }

            setTimeout(() => {
              if (scanner.getState() === 2) {
                scanner.stop().then(() => setIsModalOpen(false));
              }
            }, 300);
          },
          (errorMessage) => {
            console.log("Scanning Error:", errorMessage);
          }
        )
        .catch((err) => console.log("Start Error:", err));

      return () => {
        if (scanner.getState() === 2) {
          scanner.stop().catch((err) => console.log("Stop Error:", err));
        }
      };
    }
  }, [isModalOpen, selectBox]);

  return (
    <Content>
      <div style={{ display: "flex", alignItems: "center", height: "70px" }}>
        <h2
          style={{
            background: "#CA965C",
            borderRadius: "25px",
            color: "white",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginLeft: "15px",
          }}
        >
          New Scan Qrcode
        </h2>
      </div>
      <table style={{ marginLeft: "10%", marginTop: "3%" }}>
        <tr>
          <td style={{ width: "100px", textAlign: "right" }}>
            <span>Empcode :</span>
          </td>
          <td style={{ width: "600px", display: "flex" }}>
            <Input
              style={{ width: "80%" }}
              id="txtEmpcode"
              value={strEmpcode}
              onChange={(e) => setStrEmpcode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fnFocus("txtName");
                }
              }}
            />
            <Button
              icon={<QrcodeOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setIsModalOpen(true);
                setSelectBox("Empcode");
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>
            <span>Name :</span>
          </td>
          <td style={{ width: "600px", display: "flex" }}>
            <Input
              style={{ width: "80%" }}
              id="txtName"
              value={strName}
              onChange={(e) => setStrName(e.target.value)}
            />
            <Button
              icon={<QrcodeOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setIsModalOpen(true);
                setSelectBox("Name");
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "right" }}>
            <span>Content :</span>
          </td>
          <td style={{ width: "600px", display: "flex" }}>
            <Input
              style={{ width: "80%" }}
              id="txtContent"
              value={strContent}
              onChange={(e) => setStrContent(e.target.value)}
            />
            <Button
              icon={<QrcodeOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setIsModalOpen(true);
                setSelectBox("Content");
              }}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <Button
              style={{ marginLeft: "100px", marginTop: "10px", width: "400px" }}
              type="primary"
              onClick={SaveData}
            >
              Save
            </Button>
            <Button
              style={{
                width: "110px",
                marginLeft: "10px",
                backgroundColor: "red",
              }}
              type="primary"
              onClick={oNcancel}
            >
              cancel
            </Button>
          </td>
        </tr>
      </table>
      <Modal
        title="Scan QR Code"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div id="qr-reader"></div>
      </Modal>
    </Content>
  );
}

export default Scantest;
