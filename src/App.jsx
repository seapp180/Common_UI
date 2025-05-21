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
import ExportSupplier from "./Common/Export Supplier Customer/ExportSupplierCustomer";
import BoxFoncon from "./MFG Report System/Box Foxcon/BoxFoxcon";
// import NewBoxFoxcon from "./MFG Report System/Box Foxcon/NewBoxFoxcon";
import Qrscantest from "./Scantest/scantest";
import BoxInvoice from "./MFG Report System/Box Selection By Invoice/BoxInv";
import QRCodeScanner from "./FPC System/QRCode Scaner/Scanner";

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
                  {/* --------------------COMMON SYSTEM--------------------*/}
                  <Route 
                    path="/CommonSystem/zPO" 
                    element={<ZPoReport />} 
                  />
                  <Route
                    path="/CommonSystem/UserListReport"
                    element={<UserListReport />}
                  />
                  <Route
                    path="/CommonSystem/PoSummary"
                    element={<PoSummary />}
                  />
                   <Route
                    path="/CommonSystem/ExportSupplierCustomer"
                    element={<ExportSupplier />}
                  />
                  {/*--------------------CONDITION SYSTEM--------------------*/}
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
                  />{" "}
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
                 
                  {/* --------------------FPC SYSTEM-------------------- */}
                  <Route
                    path="/CommonSystem/FPCSystem/AnalysisFormulaMaster"
                    element={<AnalysisUpload />}
                  />
                  <Route
                    path="/CommonSystem/FPCSystem/QRCodeScanner"
                    element={<QRCodeScanner />}
                  />
                  
                  {/* --------------------MFG REPORT SYSTEM-------------------- */}
                  <Route
                    path="/CommonSystem/MFGReportSystem/BoxCapacity"
                    element={<BoxCapacity />}
                  />
                  {/* --------------------------------------------------------- */}
                  <Route
                    path="/CommonSystem/MFGReportSystem/BoxCapacityFoxcon"
                    element={<BoxFoncon />}
                  />
                   {/* <Route
                    path="/CommonSystem/MFGReportSystem/NewBoxFoxcon"
                    element={<NewBoxFoxcon />}
                  /> */}
                     <Route
                    path="/CommonSystem/MFGReportSystem/BoxSelectionInvoice"
                    element={<BoxInvoice />}
                  />
                  {/* --------------------------------------------------------- */}
                  <Route
                    path="/CommonSystem/Scantest"
                    element={<Qrscantest />}
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
