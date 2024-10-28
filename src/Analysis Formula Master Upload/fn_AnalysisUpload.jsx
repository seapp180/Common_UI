import React, { useEffect, useState } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

import { Button, Tag } from "antd";

import {
  CloseOutlined,
  SaveOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
function fn_AnalysisUpload() {


  useEffect(() => {
   
  }, []);

 
  

  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "PRODUCT",
      key: "Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Process",
      dataIndex: "PROCESS",
      key: "Process.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 150,
    },
    {
      title: "Machine",
      dataIndex: "MACHINE",
      key: "Machine",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Chamber",
      dataIndex: "CHAMBER",
      key: "Chamber",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 80,
    },
    {
      title: "Mode",
      dataIndex: "MODE",
      key: "Mode",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 70,
    },
    {
      title: "Holding Process",
      dataIndex: "HOLDING",
      key: "Holding Process",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record, index) => {
        console.log(record,'record')
        text = (
          <Button
            icon={<CloseOutlined style={{ color: "red" }} />}
            onClick={() => Btn_Delete(record.PRODUCT,record.PROCESS)}
            size="large"
          ></Button>
        );
        return text;
      },
      width: 50,
    },
  ];

 
  return {
    columns
  };
}

export { fn_AnalysisUpload };
