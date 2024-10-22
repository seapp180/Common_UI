import React, { useState } from 'react';
import { Layout,theme } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import RDESMasterUpload from './RDESMasterUpload/RDESMasterUpload';
import Shipmentschedulemaintain from './Shipment schedule maintain/Shipmentschedulemaintain';
import axios from "axios";

const { Content } = Layout;
const backendUrl = import.meta.env.VITE_SERVICE_URL;
axios.defaults.baseURL = backendUrl;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout >
      <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Layout>
      <Layout >
        <Layout >
          <Content style={{ padding: '90px 15px 30px 15px', minHeight: '100vh',height:'',fontFamily: 'Varela Round, sans-serif',margin: "24px 16px 0", overflow: "initial" }}>
          <div
        style={{
          padding: 24,
          // textAlign: 'center',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        
            <Routes>
              <Route path="/CommonSystem/ConditionSystem/RDESMasterUpload" element={<RDESMasterUpload />} />
              <Route path="/CommonSystem/ConditionSystem/Shipmentschedulemaintain" element={<Shipmentschedulemaintain />} />
            </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
