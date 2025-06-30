import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "antd";
import "./QRCode.css";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const popupRef = useRef(null);
  const width = Math.min(window.innerWidth * 0.9, 400);
  const height = Math.min(window.innerHeight * 0.9, 400);
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const cameraHost = `http://${window.location.hostname}:4005/camera.html`;

  const handleStartScan = () => {
    setScanResult(null);
    setIsScanning(true);

    const popup = window.open(
      cameraHost,
      "CameraPopup",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );
    popupRef.current = popup;
  };

  const handleStopScan = () => {
    setIsScanning(false);

    // ปิด popup ถ้ายังเปิดอยู่
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.close();
      popupRef.current = null;
    }
  };

  const handleScanAgain = () => {
    setScanResult(null);
    handleStartScan();
  };

  useEffect(() => {
    function handleMessage(event) {
      if (event.data?.type === "qr-scan-result") {
        setScanResult(event.data.data);
        setIsScanning(false);

        // ปิด popup เมื่อได้ผลลัพธ์
        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close();
          popupRef.current = null;
        }
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">QR Code Scanner</h2>
      </div>
      <br />
      <Card className="mainCard">
        <div className="mainFrame">
          {isScanning && !scanResult && (
            <Button onClick={handleStopScan} type="primary">
              Scan อีกครั้ง
            </Button>
          )}
        </div>

        {!isScanning && !scanResult && (
          <Button type="primary" onClick={handleStartScan}>
            เริ่มสแกน QR Code
          </Button>
        )}
        {scanResult && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>ผลลัพธ์: {scanResult}</h1>
            <Button onClick={handleScanAgain} type="primary">
              สแกนอีกครั้ง
            </Button>
          </div>
        )}
      </Card>
    </>
  );
}

export default Scanner;
