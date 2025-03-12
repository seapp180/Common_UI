import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

function scantest() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 }
    );

    scanner.render((result) => {
      alert("QR Code: " + result);
      scanner.clear();
    }, (err) => {
      console.log(err);
    });

    return () => scanner.clear();
  }, []);

  return (
    <div style={{marginTop: "300px"}}>
      <h2>HTML5 QR Code Scanner</h2>
      <div id="qr-reader"></div>
    </div>
  );
}

export default scantest;
