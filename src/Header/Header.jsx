import React from "react";
import { Layout, Avatar } from "antd";
import ImgHome from "../assets/3d-house.png";
import { fn_Header } from "./fn_Header";
import "../StyleCommon.css";
const { Header } = Layout;
const CustomHeader = () => {
  const { PageHeader, Gohome,System } = fn_Header();
  return (
    <Header className={System === 'PoSummary' || System === 'zPO' ? 'Header-zPO' : 'Header'}>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "0px" }}>
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
