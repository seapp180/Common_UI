import React, { useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./StyleCommon.css";
import { LoadingProvider } from "./component/loading/fn_loading";

//import File
import Header from "./Header/Header";
import RDESMasterUpload from "./Condition System/RDESMasterUpload/RDESMasterUpload";
import Shipmentschedulemaintain from "./Condition System/Shipment schedule maintain/Shipmentschedulemaintain";
import QA_ORT_WorkingRecord from "./Condition System/QA ORT Working Record/QA_ORT_WorkingRecord";
import AnalysisUpload from "./FPC System/Analysis Formula Master Upload/AnalysisUpload";
import BoxCapacity from "./MFG Report System/Box Capacity/Box_Search";
import UserListReport from "./Common/User List Report/UserListReport";
import ZPoReport from "./Common/Zpo/PO Summary/zPO_Report";
import PoSummary from "./Common/Zpo/PO Report/PoSummary";
import T2D_BarcodeOutput from "./Condition System/OQC/2D_BarCodeOutput/T2D_BarcodeOutput";
import T2D_BarCodeConfirm from "./Condition System/OQC/2D_BarCodeConfirm/T2D_BarCodeConfirm";
import T2D_BarcodeReport from "./Condition System/OQC/2D_BarCodeReport/T2D_BarcodeReport";

const { Content } = Layout;
// const backendUrl = import.meta.env.VITE_SERVICE_URL;
// axios.defaults.baseURL = backendUrl;

const backendUrl = `http://${window.location.hostname}:4005`;
axios.defaults.baseURL = backendUrl;

const App = () => {
  return (
    <LoadingProvider>
      <Router>
        <Layout>
          <Header />
        </Layout>
        <Layout>
          <Layout style={{ background: "#FFF8F3" }}>
            <Content className="ContentAPP">
              <div
                style={{
                  paddingTop: 65,
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
                    path="/CommonSystem/FPCSystem/AnalysisFormulaMaster"
                    element={<AnalysisUpload />}
                  />
                  <Route
                    path="/CommonSystem/MFGReportSystem/BoxCapacity"
                    element={<BoxCapacity />}
                  />
                  <Route
                    path="/CommonSystem/UserListReport"
                    element={<UserListReport />}
                  />
                  <Route path="/CommonSystem/zPO" element={<ZPoReport />} />
                  <Route
                    path="/CommonSystem/PoSummary"
                    element={<PoSummary />}
                  />
                  <Route
                    path="/CommonSystem/ConditionSystem/OQC/2D_BarcodeOutput"
                    element={<T2D_BarcodeOutput />}
                  />
                  <Route
                    path="/CommonSystem/ConditionSystem/OQC/2D_BarcodeConfirm"
                    element={<T2D_BarCodeConfirm />}
                  />
                  <Route
                    path="/CommonSystem/ConditionSystem/OQC/2D_BarcodeReport"
                    element={<T2D_BarcodeReport />}
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
