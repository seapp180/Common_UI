import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import "./QRCode.css";

function Scanner() {
  const [scanResult, setScanResult] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
      fps: 60,
      qrbox: 300,
    });

    html5QrcodeScanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        html5QrcodeScanner.clear();
        setIsScanning(false);
      },
      (errorMessage) => {
        console.warn("QR Code scan error:", errorMessage);
      }
    );

    setScanner(html5QrcodeScanner);
  };

  useEffect(() => {
    if (isScanning && !scanResult) {
      startScanner();
    }

    return () => {
      if (scanner) {
        scanner.clear().catch((e) => console.warn("Clear scanner error:", e));
      }
    };
  }, [isScanning]);

  const handleStartScan = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  const handleScanAgain = () => {
    setScanResult(null);
    setIsScanning(true);
  };

  return (
    <>
     <div style={{ display: "flex", alignItems: "center" }}>
        <h2 className="TitlePage_h2">QR Code Scanner</h2>
      </div>
      <div className="body">
        <Card className="mainCard">
          {!isScanning && !scanResult && (
            <Button type="primary" onClick={handleStartScan}>
              เริ่มสแกน QR Code
            </Button>
          )}

          {isScanning && !scanResult && (
            <div id="qr-reader" style={{ width: "100%" }}></div>
          )}

          {scanResult && (
            <div>
              <p>
                <strong>ผลลัพธ์:</strong> {scanResult}
              </p>
              <Button onClick={handleScanAgain} type="primary" >
                สแกนอีกครั้ง
              </Button>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

export default Scanner;
