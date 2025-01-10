import React, { useEffect, useState } from "react";
import axios from "axios";

function fn_Box_Search() {
  const [ddlShipFactory, setddlShipFactory] = useState([]);
  const [selectddlShipFactory, setselectddlShipFactory] = useState("");
  const [ddlProduct, setddlProduct] = useState([]);
  const [selectddlProduct, setselectddlProduct] = useState("");
  const [LotFrom, setLotFrom] = useState("");
  const [LotTo, setLotTo] = useState("");
  const [openManual ,setopenManual ]= useState(false);
  let PackType = "" 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [radioselect, setradioselect] = useState("Manual");
  const ChooseMenu = (e) => {
    console.log('radio checked', e.target.value);
    setradioselect(e.target.value);
  };
  const NewPopup = () => {
    setUploadOpen(true)
  }
  const NewBoxCapacity = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      align: "center",
      render: (text, record, index) => {
        // console.log(record, "record");
        return text;
      },
      width: 30,
    },
    {
      title: "Factory",
      dataIndex: "",
      key: "Factory",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "Item/Product",
      dataIndex: "",
      key: "Item/Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Box No.",
      dataIndex: "",
      key: "Box No",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 100,
    },
    {
      title: "Lot No.",
      dataIndex: "",
      key: "Lot No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 100,
    },
    {
      title: "Packing Date",
      dataIndex: "",
      key: "Packing Date",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "",
      key: "Status",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Quantity",
      dataIndex: "",
      key: "Quantity",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "Packing By",
      dataIndex: "",
      key: "Packing By",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 70,
    },
  ];
  const packingTable = [
    {
      align: "center",
      render: (text, record, index) => {
        // console.log(record, "record");
        return text;
      },
      width: 10,
    },
    {
      title: "Factory",
      dataIndex: "",
      key: "Factory",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Item/Product",
      dataIndex: "",
      key: "Item/Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
  
  ];
  const GenPack = (TypePack) => {
    console.log(TypePack,"TypePack")
    PackType = TypePack
    if(TypePack =="ManaulPack"){
      setopenManual(true)
    }
  };
  return {
    columns,
    NewPopup,
    NewBoxCapacity,
    handleOk,
    handleCancel,
    isModalOpen,
    packingTable,
    ChooseMenu,
    radioselect,
    GenPack,
    openManual

  };
}

export { fn_Box_Search };
