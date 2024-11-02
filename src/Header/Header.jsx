import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Avatar } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import axios from "axios";

import ImgReport from "../assets/report.png";
import ImgHome from "../assets/3d-house.png";
import ImgDash from "../assets/dashboard.png";
import Imgsubmit from "../assets/submit.png";
import Imgrecord from "../assets/folder.png";
import Imgtime from "../assets/time.png";
import Imgchemistry from "../assets/chemistry.png";

import "../StyleCommon.css";
const { Header } = Layout;
const CustomHeader = () => {
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
        console.log(link, loginID, systemID);
        window.location.href = link;
      });
  };

  return (
    <Header className="Header">
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
      >
        <div className="demo-logo" />
        {PageHeader}
      </div>
      <Avatar
        src={ImgHome}
        shape="square"
        style={{
          width: "40px",
          height: "40px",
          marginRight: "10px",
          cursor: "pointer",
        }}
        onClick={Gohome}
      />
    </Header>
  );
};

export default CustomHeader;
