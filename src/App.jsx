import React, { useState } from "react";
import { Layout, theme } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import RDESMasterUpload from "./RDESMasterUpload/RDESMasterUpload";
import Shipmentschedulemaintain from "./Shipment schedule maintain/Shipmentschedulemaintain";
import QA_ORT_WorkingRecord from "./QA ORT Working Record/QA_ORT_WorkingRecord";
import axios from "axios";
import "./Common/StyleCommon.css";
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
      <Layout>
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      </Layout>
      <Layout>
        <Layout>
          <Content className="ContentAPP">
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route
                  path="/CommonSystem/ConditionSystem/RDESMasterUpload"
                  element={<RDESMasterUpload />}
                />
                <Route
                  path="/CommonSystem/ConditionSystem/Shipmentschedulemaintain"
                  element={<Shipmentschedulemaintain />}
                />
                <Route
                  path="/CommonSystem/ConditionSystem/QA_ORT_WorkingRecord"
                  element={<QA_ORT_WorkingRecord />}
                />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
