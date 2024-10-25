import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Avatar } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
import ImgReport from '../assets/report.png'
import ImgHome from '../assets/3d-house.png'
import ImgDash from '../assets/dashboard.png'
import Imgsubmit from '../assets/submit.png'
import Imgrecord from '../assets/folder.png'
import Imgtime from '../assets/time.png'

const CustomHeader = ({ collapsed, toggleCollapsed }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [PageHeader, setPageHeader] = useState('');
  const url = window.location.href;
  const partweb = url.split('/').pop().split('?')[0];
  console.log('url: ', url, 'partweb :', partweb, '--', partweb.length)
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
        background: '#C6DBF2'


      }}
    >
      <div className="demo-logo" />
      {PageHeader}
    </Header>
  );
};

export default CustomHeader;
