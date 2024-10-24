import React, { useEffect, useState, useRef } from "react";
import { Layout, Button, Table, Select, Modal } from "antd";
import axios from "axios";
import {
  SearchOutlined,
  LoadingOutlined,
  UploadOutlined,
  CloudUploadOutlined,
  FileOutlined,
  FileExcelOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { fn_RDESMasterUpload } from "./fn_RDESMasterUpload";
import "./RDESMasterUpload.css";
const { Content } = Layout;

const Page2 = () => {
  const {
    SL_Product,handleChange,columns,Product,DataSearch,GetFileFormat,Bt_Search,
    showPopUp,handlePopUpOk,handlePopUpCancel,UploadOpen,handleFileUpload,FileName
    ,handleDrop,ClearFile,UploadFile,dataFile,columnsUpload
    
  } = fn_RDESMasterUpload();

  return (
    <Content>
    
    </Content>
  );
};

export default Page2;
