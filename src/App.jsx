import React, { useState } from "react";
import { Layout, theme } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./Common/StyleCommon.css";

//import File
import Header from "./Common/Header/Header";
import RDESMasterUpload from "./Condition System/RDESMasterUpload/RDESMasterUpload";
import Shipmentschedulemaintain from "./Condition System/Shipment schedule maintain/Shipmentschedulemaintain";
import QA_ORT_WorkingRecord from "./Condition System/QA ORT Working Record/QA_ORT_WorkingRecord";
import AnalysisUpload from "./FPC System/Analysis Formula Master Upload/AnalysisUpload";

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
                 <Route
                  path="/CommonSystem/ConditionSystem/AnalysisFormulaMaster"
                  element={<AnalysisUpload />}
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
