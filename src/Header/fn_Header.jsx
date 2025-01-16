import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import axios from "axios";
import ImgReport from "../assets/report.png";
import Imgsubmit from "../assets/submit.png";
import Imgtime from "../assets/time.png";
import ImgScanner from "../assets/barcode-scanner.png";
import Imgreport from "../assets/3d-report.png";

function fn_Header() {
  const [PageHeader, setPageHeader] = useState("");
  const url = window.location.href;
  const params = new URLSearchParams(window.location.search);
  const partweb = url.split("/")[4];
  const loginID = params.get("loginID");
  const systemID = params.get("systemID");

  useEffect(() => {
    TitleHeader();
  }, []);

  const TitleHeader = () => {
    if (partweb === "ConditionSystem") {
      setPageHeader(
        <span className="TitleHeader">
          <Avatar src={Imgsubmit} shape="square" />
          &nbsp;Condition System
        </span>
      );
    } else if (partweb === "FPCSystem") {
      setPageHeader(
        <span className="TitleHeader">
          <Avatar src={Imgtime} shape="square" />
          &nbsp;FPC System
        </span>
      );
    }else if (partweb === "MFGReportSystem") {
      setPageHeader(
        <span className="TitleHeader">
          <Avatar src={ImgScanner} shape="square" />
          &nbsp;MFG Report System
        </span>
      );
    } else if (partweb === "UserListReport") {
      setPageHeader(
        <span className="TitleHeader">
          <Avatar src={Imgreport} shape="square" />
          &nbsp;User List Report
        </span>
      );
    } else {
      setPageHeader(
        <span className="TitleHeader">
          <Avatar src={ImgReport} shape="square" />
          &nbsp;Common System
        </span>
      );
    }
    
  };

  const Gohome = () => {
    axios
      .post("/api/Common/GetURL_Home", {
        loginID: loginID,
        systemID: systemID,
      })
      .then((res) => {
        let link = res.data[0].URL;
        window.location.href = link;
      });
  };
  return {
    PageHeader,
    Gohome,
    loginID
  };
}

export { fn_Header };
