import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import ImgDelete from "../../assets/edit.png";
import { DeleteOutlined } from "@ant-design/icons";
import { useLoading } from "../../component/loading/fn_loading";
import Swal from "sweetalert2";

function fn_Box_Search() {
  const today = new Date().toISOString().split("T")[0];
  console.log(today, "today");
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
  const [Packdate, setPackdate] = useState(today);
  const [PackQty, setPackQty] = useState("");
  const [FullBoxQty, setFullBoxQty] = useState("");
  const [TotalSheetQty, setTotalSheetQty] = useState(1);
  const [PackBy, setPackBy] = useState("");
  const [Remark, setRemark] = useState("");
  const [Seq, setSeq] = useState("");
  const [ddlLot, setddlLot] = useState([]);
  const [selectddlLot, setselectddlLot] = useState("");
  const [Remain_qty, setRemain_qty] = useState("");
  const [Pack_qtyLot, setPack_qtyLot] = useState("");
  const [DataPacking, setDataPacking] = useState([]);
  const [DataHearder, setDataHearder] = useState([]);
  const [DataLotPacking, setDataLotPacking] = useState([]);
  const [DataLotReceive, setDataLotReceive] = useState([]);
  const [CheckStatus, setCheckStatus] = useState("");
  const [PageInsert, setPageInsert] = useState("");
  let PackType = "";
  let pack_qty;
  const { showLoading, hideLoading } = useLoading();
  //useEffect
  useEffect(() => {}, []);
  useEffect(() => {
    if (openManual == true) {
      scrollToTop();
    }
  }, [openManual]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

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
    }
    hideLoading();
  };
  const ChooseMenu = (e) => {
    let value = e.target.value;
    setradioselect(e.target.value);
    if (value == "Auto") {
      setopenManual(false);
    }
  };
  const NewPopup = () => {
    setUploadOpen(true);
  };
  const NewBoxCapacity = (page) => {
    setPageInsert(page);
    setItemNew("");
    setProductShow("");
    setFac("");
    setBoxNo("");
    setBoxstatus("ACTIVE");
    setPackdate(today);
    setPackQty("");
    setFullBoxQty("");
    setTotalSheetQty(1);
    setPackBy("");
    setRemark("");
    setSeq("");
    setDataLotPacking([]);
    setDataLotReceive([]);
    setDataPacking([]);
    setopenManual(false);
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
        text = (
          <Button
            style={{ marginBottom: "5px", marginTop: "5px" }}
            icon={
              <img
                src={ImgDelete}
                alt="Delete"
                style={{ width: "20px", height: "20px" }}
              />
            }
            onClick={() =>
              handle_Edit(
                record.ITEM,
                record.BOX_NO,
                record.LOT_NO,
                record.STATUS,
                "UPADTE"
              )
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
      width: 150,
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "Box No",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 70,
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "Lot No.",
      render: (text, record, index) => {
        return <div className="scrollable-column">{text}</div>;
      },
      align: "center",
      width: 150,
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
        return index + 1;
      },
      width: 10,
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "Lot No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Qty",
      dataIndex: "GOOD_QTY",
      key: "Qty",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
  ];

  const LotPacking = [
    {
      dataIndex: "SEQ",
      key: "seq",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
      width: 10,
    },
    {
      title: "Packing Date",
      dataIndex: "LOT_DATE",
      key: "Packing Date",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "Lot No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
    {
      title: "Qty",
      dataIndex: "LOT_QTY",
      key: "Qty",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
    // {
    //   title: "Item",
    //   dataIndex: "LOT_ITEM_CODE",
    //   key: "Item",
    //   render: (text, record, index) => {
    //     return text;
    //   },
    //   align: "center",
    //   width: 40,
    // },
    // {
    //   title: "Box No.",
    //   dataIndex: "LOT_BOX_NO",
    //   key: "Qty",
    //   render: (text, record, index) => {
    //     return text;
    //   },
    //   align: "center",
    //   width: 40,
    // },
    {
      align: "center",
      width: 10,
      render: (text, record, index) => {
        text = (
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() =>
              handleDeleteLot(
                record.SEQ,
                record.LOT_NO,
                record.LOT_ITEM_CODE,
                record.LOT_BOX_NO,
                record.LOT_QTY
              )
            }
            icon={<DeleteOutlined />}
            danger
          ></Button>
        );
        return text;
      },
    },
  ];
  const tableReceive = [
    {
      align: "center",
      render: (text, record, index) => {
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
  const handleDelete = async () => {
    let DataMapping = [];
    await axios
      .post("/api/BoxCapacity/DataMapping", {
        dataList: {
          product: ItemNew.trim().toUpperCase(),
          boxno: BoxNo,
        },
      })
      .then((res) => {
        DataMapping = res.data;
      });
    if (CheckStatus == "CLOSE") {
      Swal.fire({
        icon: "error",
        text: "ไม่สามารถลบได้ เนื่องจากสถานะกล่องเป็น CLOSE",
      });
      return;
    }
    if (DataLotPacking.length > 0) {
      Swal.fire({
        icon: "error",
        text: "ไม่สามารถลบข้อมูลได้ เนื่องจากมี Lot Packing อยู่",
      });
      return;
    } else if (DataMapping.length > 0) {
      Swal.fire({
        icon: "error",
        text: "ไม่สามารถลบได้ Box No. นี้มีการแสกน Invoice แล้ว ",
      });
      return;
    }
    const result = await Swal.fire({
      text: "ต้องการลบใช่หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    });
    if (result.isConfirmed) {
      await axios
        .post("/api/BoxCapacity/DeleteBoxMaintain", {
          dataList: {
            item: ItemNew.trim().toUpperCase(),
            boxno: BoxNo,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: "ลบข้อมูลสำเร็จ",
          });
          setIsModalOpen(true);
          setItemNew("");
          setProductShow("");
          setFac("");
          setBoxNo("");
          setBoxstatus("ACTIVE");
          setPackdate(today);
          setPackQty("");
          setFullBoxQty("");
          setTotalSheetQty(1);
          setPackBy("");
          setRemark("");
          setSeq("");
          setDataLotPacking([]);
          setDataLotReceive([]);
          setDataPacking([]);
          setRemain_qty("");
          setPack_qtyLot;
          setPackdate(today);
        });
      await Search();
    }
  };
  const handleDeleteLot = async (seq_id, lot_no, item_no, box_no, qty_box) => {
    console.log(seq_id, lot_no, item_no, box_no, qty_box, "handleDeleteLot");
    const result = await Swal.fire({
      text: "ต้องการลบข้อมูลใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
    });

    if (result.isConfirmed) {
      try {
        await axios.post("/api/BoxCapacity/DeleteLotPacking", {
          dataList: {
            lot: lot_no,
            item: item_no,
            boxno: box_no,
            seq: seq_id,
          },
        });
        await axios.post("/api/BoxCapacity/UpdateSeqLotPacking", {
          dataList: {
            lot: lot_no,
            item: item_no,
            boxno: box_no,
          },
        });
        await axios.post("/api/BoxCapacity/UpdateBoxMaster", {
          dataList: {
            qty: qty_box,
            item: item_no,
            boxno: box_no,
          },
        });

        Swal.fire("Deleted!", "Lot นี้ถูกลบเรียบร้อยแล้ว", "success");
        await GetDataLotPacking(item_no, box_no);
        await DataManual(item_no, box_no);
        setRemain_qty("");
      } catch (error) {
        console.error("Error during deletion:", error);
        Swal.fire("Error!", "There was an error deleting the item.", "error");
      }
    } else {
      Swal.fire("ยกเลิก", "ได้ทำการยกเลิก)", "error");
    }
  };

  const handle_Edit = async (itemsearch, box, lot, status, page) => {
    let itemname;
    let box_no;
    setPageInsert(page);
    setCheckStatus(status);
    setRemain_qty("");

    const itemsearch1 = itemsearch.split("/")[0];
    setIsModalOpen(true);
    await axios
      .post("/api/BoxCapacity/GetDataBoxMainTain", {
        dataList: {
          item: itemsearch1,
          boxno: box,
        },
      })
      .then((res) => {
        setItemNew(res.data[0].ITEM);
        itemname = res.data[0].ITEM;
        setProductShow(res.data[0].PRODUCT);
        setFac({ text: res.data[0].FAC });
        setBoxNo(res.data[0].BOX_NO);
        box_no = res.data[0].BOX_NO;
        setBoxstatus(res.data[0].STATUS);
        setPackdate(res.data[0].PACKING_DATE);
        setPackQty(res.data[0].MRTR_QTY);
        pack_qty = res.data[0].MRTR_QTY;
        setFullBoxQty(res.data[0].MAX_QTY);
        setPackBy(res.data[0].PACK_BY);
        setRemark(res.data[0].REMARK);
      });
    await DataManual(itemname, box_no);
    await GetDataLotPacking(itemname, box_no);
    // await DataHeader();
  };
  const GenPack = async (TypePack) => {
    PackType = TypePack;
    if (TypePack == "ManaulPack") {
      showLoading("กำลังบันทึกข้อมูล...");
      if (PageInsert == "NewBox") {
        let SAVEBOX = await SaveBoxMainTain("NEW");
        if (SAVEBOX.status === "error") {
          Swal.fire({
            icon: "error",
            text: "Box No. นี้มีข้อมูลแล้ว",
          });
          hideLoading();
          return;
        } else {
          await DataManual(ItemNew, BoxNo);
          await DataReceive();
          setopenManual(true);
          scrollToTop();
          hideLoading();
        }
      } else {
        console.log("UPDATE");
        await SaveBoxMainTain("UPDATE");
        await DataManual(ItemNew, BoxNo);
        await DataReceive();
        setopenManual(true);
        hideLoading();
      }
    } else if (TypePack == "AutoPack") {
      showLoading("กำลังบันทึกข้อมูล...");
      await GetDataRemainQTY_AUTO(ItemNew, BoxNo);
      // if (PageInsert == "NewBox") {
      //   let SAVEBOX = await SaveBoxMainTain("NEW");
      //   if (SAVEBOX.status === "error") {
      //     Swal.fire({
      //       icon: "error",
      //       text: "Box No. นี้มีข้อมูลแล้ว",
      //     });
      //     hideLoading();
      //     return;
      //   } else {

      //     await DataManual(ItemNew, BoxNo);
      //     await DataReceive();
      //     setopenManual(true);
      //     scrollToTop();
      //     hideLoading();
      //   }
      // } else {
      //   console.log("UPDATE");
      //   await SaveBoxMainTain("UPDATE");
      //   await DataManual(ItemNew, BoxNo);
      //   await DataReceive();
      //   setopenManual(true);

      // }
      // await DataRemain(ItemNew, BoxNo);
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
        setDataSearch(res.data);
        console.log(res.data, "Search444");
      });
    hideLoading();
  };
  const DataManual = async (itemname, boxno) => {
    await axios
      .post("/api/BoxCapacity/DataSeq", {
        dataList: {
          // product: ItemNew.trim().toUpperCase(),
          product: itemname.trim().toUpperCase(),
          boxno: boxno,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setSeq(response.data[0]);
        }
      });

    await axios
      .post("/api/BoxCapacity/LotNo", {
        dataList: {
          product: itemname.trim().toUpperCase(),
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setddlLot(response.data);
          setselectddlLot(response.data.GOOD_QTY);
          setPack_qtyLot(0);
          setDataPacking(response.data);
        }
      });
    await DataHeader(itemname, boxno);
  };
  const DataHeader = async (ItemNew, BoxNo) => {
    await axios
      .post("/api/BoxCapacity/DataHeader", {
        dataList: {
          product: ItemNew.trim().toUpperCase(),
          boxno: BoxNo,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setDataHearder(response.data[0]);
          setPackQty(response.data[0].PACK_QTY);
        }
      });
  };
  const DataReceive = async () => {
    await axios
      .post("/api/BoxCapacity/DataReceive", {
        dataList: {
          product: ItemNew.trim().toUpperCase(),
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setDataLotReceive(response.data);
        }
      });
  };
  const Clear = (Page) => {
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
      setPackdate(today);
      setPackQty("");
      setFullBoxQty("");
      setTotalSheetQty(1);
      setPackBy("");
      setRemark("");
    } else if (Page == "ResetManual") {
      setselectddlLot("");
      setRemain_qty("");
      setPack_qtyLot(0);
    }
  };
  const SaveBoxMainTain = async (page) => {
    if (page == "NEW") {
      try {
        const response = await axios.post("/api/BoxCapacity/InsBoxCapacity1", {
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
        });
        console.log(response.data, "InsertData");
        return { status: "success", data: response.data };
      } catch (error) {
        console.error("Error inserting data:", error);
        setopenManual(false);
        return { status: "error", error: error };
      }
    } else if (page == "UPDATE") {
      try {
        const response = await axios.post("/api/BoxCapacity/InsBoxCapacity", {
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
        });
        Swal.fire({
          icon: "success",
          text: "บันทึกข้อมูลสำเร็จ",
        });
        return { status: "success", data: response.data };
      } catch (error) {
        console.error("Error updating data:", error);
        return { status: "error", error: error };
      }
    }
  };
  const handleLotNo = async (data) => {
    setselectddlLot(data.value);
    setRemain_qty(data.GOOD_QTY);
  };
  const SaveLotPacking = async (page) => {
    let Page = page;
    if (Page == "SaveManual") {
      if (Pack_qtyLot == 0) {
        Swal.fire({
          icon: "error",
          text: "กรุณากรอกจำนวนที่ Packing Qty",
        });
        return;
      } else if (Pack_qtyLot > Remain_qty) {
        Swal.fire({
          icon: "error",
          text: "จำนวนที่ Packing Qty มากกว่าจำนวนที่มี",
        });
        return;
      } else if (DataHearder.PACK_QTY + Number(Pack_qtyLot) > FullBoxQty) {
        Swal.fire({
          icon: "error",
          text: "Packing เกินจำนวน Full Box",
        });
        return;
      } else {
        await axios
          .post("/api/BoxCapacity/UpdateBoxQty", {
            dataList: {
              item: ItemNew,
              boxno: BoxNo,
              pack_qty: DataHearder.PACK_QTY + Number(Pack_qtyLot),
            },
          })
          .then((res) => {});
      }
      let LOT_STATUS = "";
      if (Remain_qty == Pack_qtyLot) {
        try {
          const res = await axios.post("/api/BoxCapacity/UpdateManual", {
            dataList: {
              item: ItemNew,
              lot: selectddlLot,
              boxno: BoxNo,
            },
          });
          LOT_STATUS = res.data.result2[0][0];
        } catch (error) {
          console.error("Error during UpdateManual:", error);
        }
      }

      if (LOT_STATUS == "HOLD") {
        Swal.fire({
          icon: "error",
          text: "บาง Lot No. ไม่ได้รับอนุญาตให้แพค / Some lot is holding shipment.",
        });
        return;
      } else {
        await axios
          .post("/api/BoxCapacity/InsLotPacking", {
            dataList: {
              item: ItemNew,
              boxno: BoxNo,
              lot: selectddlLot,
              lot_qty: Pack_qtyLot,
              packdate: today,
            },
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              text: "บันทึกข้อมูลสำเร็จ",
            });
          });
        await GetDataLotPacking(ItemNew, BoxNo);
        await DataManual(ItemNew, BoxNo);
        setselectddlLot("");
        setPack_qtyLot(0);
        setRemain_qty("");
      }
      await DataHeader(ItemNew, BoxNo);
      await DataSearch();
    }
  };
  const GetDataLotPacking = async (ItemNew, BoxNo) => {
    console.log(ItemNew, BoxNo, "GetDataLotPacking");
    await axios
      .post("/api/BoxCapacity/DataLotPacking", {
        dataList: {
          product: ItemNew.trim().toUpperCase(),
          boxno: BoxNo,
        },
      })
      .then((response) => {
        console.log(response.data, "DATA_LOT");
        if (response.data.length > 0) {
          setDataLotPacking(response.data);
        } else {
          setDataLotPacking([]);
        }
      });
  };
  const GetDataRemainQTY_AUTO = async (ItemNew, BoxNo) => {
    const parts = BoxNo.split("/");
    const running_box = parseInt(parts[1], 10);
    console.log(running_box, "running_box");
    if (running_box > 1) {
      console.log("running_boxมีค่ามากกว่า 1");
      await axios
        .post("/api/BoxCapacity/DataRemainQTY_AUTO", {
          dataList: {
            boxno: BoxNo,
            item: ItemNew,
          },
        })
        .then((response) => {
          console.log(response.data[0], "ค่า 1Remian_QTY");
          if (response.data[0].REMAIN_QTY > 0) {
            console.log("มีค่า ต้องแจ้ง swal ว่า box ก่อนหน้ายังไม่เต็ม");
            Swal.fire({
              icon: "warning",
              text: "Previous box packed not full. Are you sure you want to packing in this box?",
              showCancelButton: true,
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  icon: "warning",
                  text: "Are you sure you want to auto calculate packing ?",
                  showCancelButton: true,
                  confirmButtonText: "OK",
                  cancelButtonText: "Cancel",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    console.log("กรณีกด confirm ให้มาทำ auto packing");
                  } else if (result.isDismissed) {
                    console.log("กรณีกด cancel return กลับไป");
                  return
                  }
                });
              } else if (result.isDismissed) {
                console.log("กรณีกด cancel box ก่อนหน้ายังไม่เต็ม return กลับไป");
                return;
              }
            });
          } else {
            setDataLotPacking([]);
          }
        });
    } else {
      Swal.fire({
        icon: "warning",
        text: "Are you sure you want to auto calculate packing ?",
      });
      console.log("กรณีไม่มี box ก่อนหน้า มีค่าเป็น 1 ให้ทำ auto packing");
    // await axios
    //   .post("/api/BoxCapacity/DataRemainQTY_AUTO", {
    //     dataList: {
    //       boxno: BoxNo,
    //       item: ItemNew.trim().toUpperCase(),
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data, "DATA_LOT");
    //     // if (response.data.length > 0) {
    //     //   setDataLotPacking(response.data);
    //     // } else {
    //     //   setDataLotPacking([]);
    //     // }
    //   }); 
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
    Remain_qty,
    Pack_qtyLot,
    handleLotNo,
    DataPacking,
    SaveLotPacking,
    setPack_qtyLot,
    DataLotPacking,
    DataLotReceive,
    tableReceive,
    // ทำงานได้เเล้ว
    handleDelete,
    PageInsert,
  };
}

export { fn_Box_Search };
