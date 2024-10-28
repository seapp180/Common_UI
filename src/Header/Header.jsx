import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Avatar } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";

import ImgReport from '../assets/report.png'
import ImgHome from '../assets/3d-house.png'
import ImgDash from '../assets/dashboard.png'
import Imgsubmit from '../assets/submit.png'
import Imgrecord from '../assets/folder.png'
import Imgtime from '../assets/time.png'
const { Header } = Layout;
const CustomHeader = () => {

  const [PageHeader, setPageHeader] = useState('');
  const url = window.location.href;
  const params = new URLSearchParams(window.location.search);
  const partweb = url.split('/').pop().split('?')[0];
  const loginID  = params.get("loginID");
  const systemID  = params.get("systemID");
  console.log(systemID,'systemID')
  useEffect(() => {
    if (partweb === 'RDESMasterUpload') {
      setPageHeader(
        <span style={stylePageHeader()}>
          <Avatar src={Imgsubmit} shape="square" />&nbsp;RDES master upload
        </span>
      );

    } else if (partweb === 'Shipmentschedulemaintain') {
      setPageHeader(
        <span style={stylePageHeader()}>
          <Avatar src={Imgtime} shape="square" />&nbsp;Shipment schedule maintain
        </span>
      );
    } else if (partweb === 'QA_ORT_WorkingRecord') {
      setPageHeader(
        <span style={stylePageHeader()}>
          <Avatar src={Imgrecord} shape="square" />&nbsp;QA ORT WorkingRecord
        </span>
      );
    } else {

      setPageHeader(
        <span style={stylePageHeader()}>
          <Avatar src={ImgHome} shape="square" />&nbsp;Condition System
        </span>
      );
    }
  }, []);

  const Gohome = () => {
    console.log('link0',loginID,systemID)
    axios.post("/api/Common/GetURL_Home", {
      loginID:loginID,
      systemID:systemID
    }).then((res) => {
        let link =res.data[0].URL
        console.log(link,loginID,systemID)
        window.location.href = link;

    });
  }

  const stylePageHeader = () => {
    return {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '16px',
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#000000',
      fontFamily: 'Varela Round, sans-serif', // แก้ไขตรงนี้
    };
  };


  return (
<Header
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // จัดวางแบบชิดซ้ายและขวา
    padding: '0 16px', // เพิ่ม padding ซ้าย-ขวา
    background: '#C6DBF2'
  }}
>
  <div style={{ display: 'flex', alignItems: 'center',marginLeft:'20px' }}>
    <div className="demo-logo" />
    {PageHeader}
  </div>
  <Avatar src={ImgHome} shape="square"  style={{ width: '40px', height: '40px', marginRight: '10px',cursor:'pointer'}}  onClick={Gohome}/>
</Header>

  );
};

export default CustomHeader;
