import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import ImgDelete from "../../assets/edit.png";
import { useLoading } from "../../component/loading/fn_loading";
import Swal from "sweetalert2";
import { se, te } from "date-fns/locale";

function fn_Box_Search() {
  const [ddlItem, setddlItem] = useState("");
  const [ddlProduct, setddlProduct] = useState("");
  const [LotFrom, setLotFrom] = useState("");
  const [LotTo, setLotTo] = useState("");
  const [openManual, setopenManual] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [radioselect, setradioselect] = useState("Manual");
  const [PackingDateFrom, setPackingDateFrom] = useState("");
  const [PackingDateTo, setPackingDateTo] = useState("");
  const [BoxNoSeacrh, setBoxNoSeacrh] = useState("");
  const [DataSearch, setDataSearch] = useState([]);
  const [ItemNew, setItemNew] = useState("");
  const [ProductShow, setProductShow] = useState("");
  const [Fac, setFac] = useState({ value: [], text: [] });
  const [BoxNo, setBoxNo] = useState("");
  const [Boxstatus, setBoxstatus] = useState("ACTIVE");
  const [Packdate, setPackdate] = useState("");
  const [PackQty, setPackQty] = useState("");
  const [FullBoxQty, setFullBoxQty] = useState("");
  const [TotalSheetQty, setTotalSheetQty] = useState(1);
  const [PackBy, setPackBy] = useState("");
  const [Remark, setRemark] = useState("");
  const [Seq, setSeq] = useState("");
  const [ddlLot, setddlLot] = useState([]);
  const [selectddlLot, setselectddlLot] = useState("");
  const [Remind_qty ,setRemind_qty]= useState("");
  const [Pack_qtyLot ,setPack_qtyLot]= useState("");

  const today = new Date().toISOString().split("T")[0];

  let PackType = "";
  const { showLoading, hideLoading } = useLoading();
  //useEffect
  useEffect(() => {}, []);

  const handleProduct = async (page) => {
    showLoading("กำลังโหลดข้อมูล...");
    let Page = page;
    if (Page == "SearchItem") {
      await axios
        .post("/api/BoxCapacity/DDLItemProduct", {
          product: ddlProduct.trim().toUpperCase(),
        })
        .then((response) => {
          if (response.data.length > 0) {
            setddlItem(response.data);
          }
        });
    } else if (Page == "ItemNew") {
      await axios
        .post("/api/BoxCapacity/DDLItemProduct", {
          product: ItemNew.trim().toUpperCase(),
        })
        .then((response) => {
          if (response.data.length > 0) {
            setProductShow(response.data);
          }
        });
      let FAC = [];
      let Box_NO = [];
      await axios
        .post("/api/BoxCapacity/ShipFAC", {
          product: ItemNew.trim().toUpperCase(),
        })
        .then((response) => {
          if (response.data.length > 0) {
            setFac((prevState) => ({
              ...prevState,
              value: response.data[0].FAC_ITEM,
              text: response.data[0].FAC_DESC,
            }));
            FAC = response.data[0].FAC_ITEM;
          }
        });
      if (ItemNew != "") {
        await axios
          .post("/api/BoxCapacity/DataBoxno", {
            dataList: {
              fac: FAC,
              product: ItemNew.trim().toUpperCase(),
            },
          })
          .then((response) => {
            if (response.data.length > 0) {
              setBoxNo(response.data[0]);
              Box_NO = response.data[0];
              setPackQty(0);
            }
          });
      }

      await axios
        .post("/api/BoxCapacity/DataFullBoxQTY", {
          product: ItemNew.trim().toUpperCase(),
        })
        .then((response) => {
          if (response.data.length > 0) {
            setFullBoxQty(response.data[0].MAX_QTY);
          }
        });
      await axios
        .post("/api/BoxCapacity/DataSeq", {
          dataList: {
            product: ItemNew.trim().toUpperCase(),
            boxno: Box_NO,
          },
        })
        .then((response) => {
          console.log(response.data, "SEQ");
          if (response.data.length > 0) {

          }
        });
    }
    hideLoading();
  };
  const ChooseMenu = (e) => {
    let value = e.target.value;
    setradioselect(e.target.value);
    console.log(e.target.value, "e.target.value");
    if (value == "Auto") {
      setopenManual(false);
    }
  };
  const NewPopup = () => {
    setUploadOpen(true);
  };
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
        text = (
          <Button
            icon={
              <img
                src={ImgDelete}
                alt="Delete"
                style={{ width: "20px", height: "20px" }}
              />
            }
            onClick={() =>
              handle_Edit(record.ITEM, record.BOX_NO, record.LOT_NO)
            }
          ></Button>
        );
        return text;
      },
      width: 30,
    },
    {
      title: "Factory",
      dataIndex: "FAC",
      key: "Factory",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "Item/Product",
      dataIndex: "ITEM",
      key: "Item/Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "Box No",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 100,
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "Lot No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 100,
    },
    {
      title: "Packing Date",
      dataIndex: "PACKING_DATE",
      key: "Packing Date",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "STATUS",
      key: "Status",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Quantity",
      dataIndex: "QUANTITY",
      key: "Quantity",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "Packing By",
      dataIndex: "PACKING_BY",
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
      dataIndex: "factory",
      key: "Factory",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Item/Product",
      dataIndex: "itemProduct",
      key: "Item/Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
  ];
  const LotPacking = [
    {
      align: "center",
      render: (text, record, index) => {
        // console.log(record, "record");
        return text;
      },
      width: 10,
    },
    {
      title: "Packing Date",
      dataIndex: "packingDate",
      key: "Packing Date",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Lot No.",
      dataIndex: "lotNo",
      key: "Lot No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "Qty",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
  ];
  const tableReceive = [
    {
      align: "center",
      render: (text, record, index) => {
        // console.log(record, "record");
        return text;
      },
      width: 10,
    },
    {
      title: "Lot No.",
      dataIndex: "lotNo",
      key: "Lot No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "Qty",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "Process",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
  ];
  const handle_Edit = (item, box, lot) => {
    console.log(item, box, lot, "item, box, lot");
  };
  const GenPack = async (TypePack) => {
    PackType = TypePack;
    if (TypePack == "ManaulPack") {
      showLoading("กำลังบันทึกข้อมูล...");
      await SaveBoxMainTain();
      setopenManual(true);
      hideLoading();
    } else {
      setopenManual(false);
    }
  };
  const Search = async () => {
    if (
      ddlProduct == "" &&
      LotFrom == "" &&
      LotTo == "" &&
      PackingDateFrom == "" &&
      PackingDateTo == "" &&
      BoxNoSeacrh == ""
    ) {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูลในช่องอย่างน้อย 1 ช่อง",
      });
      return;
    } else if (BoxNoSeacrh != "" && ddlProduct == "") {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูล Item",
      });
      return;
    }
    showLoading("กำลังค้นหาข้อมูล...");
    await axios
      .post("/api/BoxCapacity/SearchBoxCapacity", {
        datalist: {
          Product: ddlProduct,
          LotFrom: LotFrom,
          LotTo: LotTo,
          PackingDateFrom: PackingDateFrom,
          PackingDateTo: PackingDateTo,
          BoxNoSeacrh: BoxNoSeacrh,
        },
      })
      .then((res) => {
        console.log(res.data, "responseDATA");
        setDataSearch(res.data);
      });
    hideLoading();
  };
  const Clear = (Page) => {
    console.log(Page, "Page");
    if (Page == "SerachBox") {
      setddlProduct("");
      setddlItem("");
      setLotFrom("");
      setLotTo("");
      setPackingDateFrom("");
      setPackingDateTo("");
      setBoxNoSeacrh("");
      setDataSearch([]);
    } else if (Page == "ResetMaintain") {
      setItemNew("");
      setProductShow("");
      setFac("");
      setBoxNo("");
      setBoxstatus("ACTIVE");
      setPackdate("");
      setPackQty("");
      setFullBoxQty("");
      setTotalSheetQty(1);
      setPackBy("");
      setRemark("");
    }
  };
  const SaveBoxMainTain = async () => {
    await axios
      .post("/api/BoxCapacity/InsBoxCapacity", {
        dataList: {
          Item: ItemNew,
          box_No: BoxNo,
          fac1: Fac.value,
          box_status: Boxstatus,
          box_qty: PackQty,
          box_max_qty: FullBoxQty,
          sheet_qty: TotalSheetQty,
          packingBy: PackBy,
          remark: Remark,
          packdate: Packdate == "" ? today : Packdate,
          fac2: Fac.value,
        },
      })
      .then((res) => {
        console.log(res.data, "InsertData");
      });
  };
  const handleLotNo = async () => {};
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
    openManual,
    LotPacking,
    tableReceive,
    ddlItem,
    ddlProduct,
    LotFrom,
    LotTo,
    setLotFrom,
    setLotTo,
    PackingDateFrom,
    PackingDateTo,
    setPackingDateFrom,
    setPackingDateTo,
    BoxNoSeacrh,
    setBoxNoSeacrh,
    PackType,
    Search,
    ddlItem,
    setddlProduct,
    handleProduct,
    DataSearch,
    Clear,
    ItemNew,
    setItemNew,
    ProductShow,
    Fac,
    BoxNo,
    Boxstatus,
    Packdate,
    setPackdate,
    PackQty,
    FullBoxQty,
    setFullBoxQty,
    TotalSheetQty,
    setTotalSheetQty,
    PackBy,
    setPackBy,
    Remark,
    setRemark,
    Seq,
    ddlLot,
    selectddlLot,
    setselectddlLot,
    Remind_qty,
    Pack_qtyLot,
    handleLotNo
  };
}

export { fn_Box_Search };
