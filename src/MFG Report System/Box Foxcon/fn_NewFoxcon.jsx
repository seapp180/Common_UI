
import React from "react";
import { useLocation } from "react-router-dom";
import { Layout, Button, Table, Select, Modal, Input, Radio } from "antd";
import { PrinterOutlined, DeleteOutlined } from "@ant-design/icons";
import "../Box Foxcon/BoxFoxcon.css";

function fn_NewFoxcon() {
  const location = useLocation();
  const message = location.state?.message || "No message";
  const dataSource = [
    {
      key: "1",
      product: "RGP-494W-0D",
      lotNo: "905012834",
      bin: "AA",
      packId: "VHK001048347BG250301T000005",
      qty: 3255,
      packDate: "01/03/2025",
    },
    {
      key: "2",
      product: "RGP-494W-0D",
      lotNo: "905012834",
      bin: "AA",
      packId: "VHK001048347BG250301T000006",
      qty: 2470,
      packDate: "01/03/2025",
    },
    {
      key: "3",
      product: "RGP-494W-0D",
      lotNo: "905012834",
      bin: "AC",
      packId: "VHK001048347BG250301T000007",
      qty: 37,
      packDate: "01/03/2025",
    },
  ];
  
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Lot No.",
      dataIndex: "lotNo",
      key: "lotNo",
    },
    {
      title: "Bin",
      dataIndex: "bin",
      key: "bin",
    },
    {
      title: "Pack ID",
      dataIndex: "packId",
      key: "packId",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Pack Date",
      dataIndex: "packDate",
      key: "packDate",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button type="danger" icon={<DeleteOutlined />} />
      ),
    },
  ];
  return {
    dataSource,
    columns,
    message,
  };
}

export { fn_NewFoxcon };