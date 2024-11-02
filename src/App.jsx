import React, { useState } from "react";
import { Layout, theme } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./StyleCommon.css";
import { LoadingProvider } from './component/loading/fn_loading';

//import File
import Header from "./Header/Header";
import RDESMasterUpload from "./Condition System/RDESMasterUpload/RDESMasterUpload";
import Shipmentschedulemaintain from "./Condition System/Shipment schedule maintain/Shipmentschedulemaintain";
import QA_ORT_WorkingRecord from "./Condition System/QA ORT Working Record/QA_ORT_WorkingRecord";
import AnalysisUpload from "./FPC System/Analysis Formula Master Upload/AnalysisUpload";
import Loading from "./component/loading/loading";

const { Content } = Layout;
const backendUrl = import.meta.env.VITE_SERVICE_URL;
axios.defaults.baseURL = backendUrl;

const App = () => {

  return (
    <LoadingProvider>
    <Router > 
      <Layout >
        <Header/>
      </Layout>
      <Layout>
        <Layout style={{background:'#FFF8F3'}}>
          <Content className="ContentAPP">
            <div
              style={{
                paddingTop :65,
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
                  path="/CommonSystem/ConditionSystem/Loading"
                  element={<Loading />}
                />
                 <Route
                  path="/CommonSystem/FPCSystem/AnalysisFormulaMaster"
                  element={<AnalysisUpload />}
                />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
    </LoadingProvider> 
  );
};

export default App;
