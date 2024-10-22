import React, { useEffect,useState } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";
import Swal from "sweetalert2";
import {
  Button,
} from "antd";

import {
  CloseOutlined
} from "@ant-design/icons";
function fn_RDESMasterUpload() {
  const [loading, setLoading] = React.useState(false);
  const [Status, setStatus] = React.useState([]);
  const [SL_Status, setSL_Status] = React.useState(null);
  const [SL_Product, setSL_Product] = useState("ALL");
  const [Product, setProduct] = React.useState([]);
  const [DataSearch, setDataSearch] = React.useState([]);
  useEffect(() => {
    GetProduct()
    Bt_Search()
  }, []);

  const GetProduct = () => {
    axios.post("/api/Common/GetProduct", {}).then((res) => {
      console.log(res.data)
      setProduct(res.data);
    });
  };

  const Bt_Search = () => {
    axios.post("/api/RDESMasterUpload/Search", {}).then((res) => {
      console.log(res.data,'Bt_Search')
      setDataSearch(res.data);
    });
  };

  const handleChange = (value) => {
    setSL_Product(value);
  };


  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Product",
      dataIndex: "PRODUCT",
      key: "Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },   {
      title: "Process",
      dataIndex: "PROCESS",
      key: "Process.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },   {
      title: "Machine",
      dataIndex: "MACHINE",
      key: "Machine",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },   {
      title: "Chamber",
      dataIndex: "CHAMBER",
      key: "Chamber",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },   {
      title: "Mode",
      dataIndex: "MODE",
      key: "Mode",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },   {
      title: "Holding Process",
      dataIndex: "HOLDING",
      key: "Holding Process",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record, index) => {
        text=<Button icon={<CloseOutlined style={{ color: 'red' }} />} size="large"></Button>
        return text
      },
    },
  ];


  return {
SL_Product  ,handleChange,columns,Product,DataSearch
    
  };
}

export { fn_RDESMasterUpload };
