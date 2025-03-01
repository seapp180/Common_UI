import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import ImgDelete from "../../assets/edit.png";
import { DeleteOutlined } from "@ant-design/icons";
import { useLoading } from "../../component/loading/fn_loading";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { set } from "date-fns";

function fn_Box_Search() {
  const today = new Date().toISOString().split("T")[0];
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
  const [RequestTotal, setRequestTotal] = useState("");
  const [ReError, setReError] = useState("");
  const [DataLotPacking1, setDataLotPacking1] = useState([]);
  const [ItemError, setItemError] = useState("");
  const [FullError, setFullError] = useState("");
  const [PackbyError, setPackbyError] = useState("");
  const [Name_User, setName_User] = useState("");
  let PackType = "";
  let pack_qty;
  const { showLoading, hideLoading } = useLoading();
  //useEffect
  // const fnItem = useRef([]);
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
      if (ddlProduct != "") {
        await axios
        .post("/api/BoxCapacity/DDLItemProduct", {
          product: ddlProduct,
        })
        .then((response) => {
          if (response.status === 500) {
            throw new Error("API Error at DDLItemProduct");
          }
          if (response.data.length > 0) {
            setddlItem(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            text: "Internal Server Error",
          });
        });
      }
      // setTimeout(() => {
      //   fnItem.current.focus();
      // }, 0);
    } else if (Page == "ItemNew") {
      if (ItemNew != "") {
        await axios
          .post("/api/BoxCapacity/DDLItemProduct", {
            product: ItemNew,
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
            product: ItemNew,
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
          if (radioselect !== "Auto") {
            await axios
              .post("/api/BoxCapacity/DataBoxno", {
                dataList: {
                  fac: FAC,
                  product: ItemNew,
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
        }

        await axios
          .post("/api/BoxCapacity/DataFullBoxQTY", {
            product: ItemNew,
          })
          .then(async (response) => {
            if (response.data[0].MAX_QTY > 0) {
              setFullBoxQty(response.data[0].MAX_QTY);
            } else {
              await axios
                .post("/api/BoxCapacity/DataPPL_QTY", {
                  product: ItemNew,
                })
                .then((response) => {
                  setFullBoxQty(response.data[0].PPI_QTY);
                });
            }
          });
      }
      // setTimeout(() => {
      //   fnItem.current.focus();
      // }, 0);
    }
    await GetDataPacking(ItemNew);
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
    setradioselect("Manual");
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
    setRequestTotal("");
    setDataLotPacking1([]);
    setName_User("");
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
              <img src={ImgDelete} style={{ width: "20px", height: "20px" }} />
            }
            onClick={() =>
              handle_Edit(
                record.ITEM,
                record.BOX_NO,
                record.LOT_NO,
                record.STATUS,
                "UPDATE",
                record.PACKING_BY
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
      width: 20,
    },
    {
      title: "Qty",
      dataIndex: "GOOD_QTY",
      key: "Qty",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
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
        return text.toLocaleString();
      },
      align: "center",
      width: 40,
    },
    {
      align: "center",
      width: 10,
      render: (text, record, index) => {
        text = (
          <Button
            style={{
              backgroundColor: "red",
              color: "white",
              marginBottom: "5px",
              marginTop: "5px",
            }}
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
  const LotPacking1 = [
    {
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
      width: 10,
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "Box No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "STATUS",
      key: "Lot No.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
    {
      title: "Full Box Qty",
      dataIndex: "MAX_QTY",
      key: "Full Box Qty",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 40,
    },
    {
      title: "Packing Qty",
      dataIndex: "QTY",
      key: "Packing Qty",
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
        return text.toLocaleString();
      },
      align: "center",
      width: 40,
    },
    {
      title: "Process",
      dataIndex: "PROCESS",
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
          product: ItemNew,
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
            item: ItemNew,
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
          setName_User("");
        });
      await Search();
    }
  };
  const handleDeleteLot = async (seq_id, lot_no, item_no, box_no, qty_box) => {
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
        await DataReceive(item_no);
        await Search();
        setRemain_qty("");
      } catch (error) {
        console.error("Error during deletion:", error);
        Swal.fire("Error!", "There was an error deleting the item.", "error");
      }
    } else {
      Swal.fire("ยกเลิก", "ได้ทำการยกเลิก", "error");
    }
  };
  const handle_Edit = async (itemsearch, box, lot, status, page,packging_by) => {
    let itemname;
    let box_no;
    handleUser(packging_by);
    await DataManual(itemname, box_no);
    await GetDataLotPacking(itemname, box_no);
    await DataReceive(itemname);
    setPageInsert(page);
    setCheckStatus(status);
    setRemain_qty("");
    setopenManual(false);
    setradioselect("Manual");
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
    
    
  };
  // const GenPack = async (TypePack) => {
  //   // Disable the button to prevent double-click
  //   // document.getElementById("genPackButton").disabled = true;

  //   PackType = TypePack;
  //   if (TypePack == "ManaulPack") {
  //     if (ItemNew == "") {
  //       await Swal.fire({
  //         icon: "error",
  //         text: "กรุณากรอกข้อมูลใน Item",
  //       });
  //       setItemError(true);
  //       // throw new Error("กรุณากรอกข้อมูลใน Item");
  //       return;
  //     } else if (FullBoxQty == "") {
  //       await Swal.fire({
  //         icon: "error",
  //         text: "กรุณากรอกข้อมูลใน Full Box Qty",
  //       });
  //       setFullError(true);
  //       // throw new Error("กรุณากรอกข้อมูลใน Full Box Qty");
  //       return;
  //     } else if (PackBy == "") {
  //       await Swal.fire({
  //         icon: "error",
  //         text: "กรุณากรอกข้อมูลใน Packing By",
  //       });
  //       setPackbyError(true);
  //       // throw new Error("กรุณากรอกข้อมูลใน Packing By");
  //       return;
  //     }
  //     showLoading("กำลังบันทึกข้อมูล...");
  //     if (PageInsert == "NewBox") {
  //       await SaveBoxMainTain("NEW");
  //       await DataManual(ItemNew, BoxNo);
  //       await DataReceive(ItemNew);
  //       setopenManual(true);
  //       hideLoading();
  //     } else {
  //       await SaveBoxMainTain("UPDATE");
  //       await DataManual(ItemNew, BoxNo);
  //       await DataReceive(ItemNew);
  //       setopenManual(true);
  //       hideLoading();
  //     }
  //   } else if (TypePack == "AutoPack") {
  //     if (ItemNew == "") {
  //       await Swal.fire({
  //         icon: "error",
  //         text: "กรุณากรอกข้อมูลใน Item",
  //       });
  //       setItemError(true);
  //       // throw new Error("กรุณากรอกข้อมูลใน Item");
  //       return;
  //     } else if (FullBoxQty == "") {
  //       await Swal.fire({
  //         icon: "error",
  //         text: "กรุณากรอกข้อมูลใน Full Box Qty",
  //       });
  //       setFullError(true);
  //       // throw new Error("กรุณากรอกข้อมูลใน Full Box Qty");
  //       return;
  //     } else if (PackBy == "") {
  //       await Swal.fire({
  //         icon: "error",
  //         text: "กรุณากรอกข้อมูลใน Packing By",
  //       });
  //       setPackbyError(true);
  //       //throw new Error("กรุณากรอกข้อมูลใน Packing By");
  //       return;
  //     }
  //     if (PageInsert == "NewBox") {
  //       if (ItemNew == "") {
  //         await Swal.fire({
  //           icon: "error",
  //           text: "กรุณากรอกข้อมูลใน Item",
  //         });
  //         setItemError(true);
  //         throw new Error("กรุณากรอกข้อมูลใน Item");
  //       }
  //       await SaveBoxMainTain("NEW");
  //       await DataManual(ItemNew, BoxNo);
  //       await DataReceive(ItemNew);
  //       await GetDataRemainQTY_AUTO(ItemNew, BoxNo);
  //       setopenManual(false);
  //       Swal.fire({
  //         icon: "success",
  //         text: "บันทึกข้อมูลสำเร็จ",
  //       });
  //     } else {
  //       await SaveBoxMainTain("UPDATE");
  //       await DataManual(ItemNew, BoxNo);
  //       await DataReceive(ItemNew);
  //       await GetDataRemainQTY_AUTO(ItemNew, BoxNo);
  //       setopenManual(false);
  //     }
  //     hideLoading();
  //   } else if (TypePack == "AutoGenerate") {
  //     if (PageInsert == "NewBox") {
  //       if (ItemNew == "") {
  //         await Swal.fire({
  //           icon: "error",
  //           text: "กรุณากรอกข้อมูลใน Item",
  //         });
  //         setItemError(true);
  //         // throw new Error("กรุณากรอกข้อมูลใน Item");
  //         return;
  //       } else if (RequestTotal == "") {
  //         await Swal.fire({
  //           icon: "error",
  //           text: "กรุณากรอกจำนวนกล่องที่ต้องการแพค",
  //         });
  //         setReError(true);
  //         // throw new Error("กรุณากรอกจำนวนกล่องที่ต้องการแพค");
  //         return;
  //       } else if (FullBoxQty == "") {
  //         await Swal.fire({
  //           icon: "error",
  //           text: "กรุณากรอกข้อมูลใน Full Box Qty",
  //         });
  //         setFullError(true);
  //         // throw new Error("กรุณากรอกข้อมูลใน Full Box Qty");
  //         return;
  //       } else if (PackBy == "") {
  //         await Swal.fire({
  //           icon: "error",
  //           text: "กรุณากรอกข้อมูลใน Packing By",
  //         });
  //         setPackbyError(true);
  //         // throw new Error("กรุณากรอกข้อมูลใน Packing By");
  //         return;
  //       }

  //       await DataReceive(ItemNew);
  //       let datapacking = await GetDataPacking(ItemNew);
  //       await GetAutoGenerate(ItemNew, BoxNo, "NEW", datapacking);
  //       setopenManual(false);
  //       await Swal.fire({
  //         icon: "success",
  //         text: "บันทึกข้อมูลสำเร็จ",
  //       });
  //       hideLoading();
  //     }
  //   }

  //   // Re-enable the button after the operation is complete
  //  // document.getElementById("genPackButton").disabled = false;
  // };

  const GenPack = async (TypePack) => {
    // Disable the button to prevent double-click
    const button = document.getElementById("genPackButton");
    if (button) {
      button.disabled = true;
    }

    PackType = TypePack;
    if (TypePack == "ManaulPack") {
      if (ItemNew == "") {
        await Swal.fire({
          icon: "error",
          text: "กรุณากรอกข้อมูลใน Item",
        });
        setItemError(true);
        if (button) {
          button.disabled = false;
        }
        return;
      } else if (FullBoxQty == "") {
        await Swal.fire({
          icon: "error",
          text: "กรุณากรอกข้อมูลใน Full Box Qty",
        });
        setFullError(true);
        if (button) {
          button.disabled = false;
        }
        return;
      } else if (PackBy == "") {
        await Swal.fire({
          icon: "error",
          text: "กรุณากรอกข้อมูลใน Packing By",
        });
        setPackbyError(true);
        if (button) {
          button.disabled = false;
        }
        return;
      }
      showLoading("กำลังบันทึกข้อมูล...");
      if (PageInsert == "NewBox") {
        await SaveBoxMainTain("NEW");
        await DataManual(ItemNew, BoxNo);
        await DataReceive(ItemNew);
        setopenManual(true);
        hideLoading();
      } else {
        await SaveBoxMainTain("UPDATE");
        await DataManual(ItemNew, BoxNo);
        await DataReceive(ItemNew);
        setopenManual(true);
        hideLoading();
      }
    } else if (TypePack == "AutoPack") {
      showLoading("กำลังค้นหาข้อมูล...");
      if (ItemNew == "") {
        await Swal.fire({
          icon: "error",
          text: "กรุณากรอกข้อมูลใน Item",
        });
        setItemError(true);
        if (button) {
          button.disabled = false;
        }
        return;
      } else if (FullBoxQty == "") {
        await Swal.fire({
          icon: "error",
          text: "กรุณากรอกข้อมูลใน Full Box Qty",
        });
        setFullError(true);
        if (button) {
          button.disabled = false;
        }
        return;
      } else if (PackBy == "") {
        await Swal.fire({
          icon: "error",
          text: "กรุณากรอกข้อมูลใน Packing By",
        });
        setPackbyError(true);
        if (button) {
          button.disabled = false;
        }
        return;
      }
      if (PageInsert == "NewBox") {
        if (ItemNew == "") {
          await Swal.fire({
            icon: "error",
            text: "กรุณากรอกข้อมูลใน Item",
          });
          setItemError(true);
          if (button) {
            button.disabled = false;
          }
          return;
        }
        await SaveBoxMainTain("NEW");
        await DataManual(ItemNew, BoxNo);
        await DataReceive(ItemNew);
        await GetDataRemainQTY_AUTO(ItemNew, BoxNo);
        setopenManual(false);
        Swal.fire({
          icon: "success",
          text: "บันทึกข้อมูลสำเร็จ",
        });
      } else {
        await SaveBoxMainTain("UPDATE");
        await DataManual(ItemNew, BoxNo);
        await DataReceive(ItemNew);
        await GetDataRemainQTY_AUTO(ItemNew, BoxNo);
        setopenManual(false);
      }
      hideLoading();
    } else if (TypePack == "AutoGenerate") {
      if (PageInsert == "NewBox") {
        if (ItemNew == "") {
          await Swal.fire({
            icon: "error",
            text: "กรุณากรอกข้อมูลใน Item",
          });
          setItemError(true);
          if (button) {
            button.disabled = false;
          }
          return;
        } else if (RequestTotal == "") {
          await Swal.fire({
            icon: "error",
            text: "กรุณากรอกจำนวนกล่องที่ต้องการแพค",
          });
          setReError(true);
          if (button) {
            button.disabled = false;
          }
          return;
        } else if (FullBoxQty == "") {
          await Swal.fire({
            icon: "error",
            text: "กรุณากรอกข้อมูลใน Full Box Qty",
          });
          setFullError(true);
          if (button) {
            button.disabled = false;
          }
          return;
        } else if (PackBy == "") {
          await Swal.fire({
            icon: "error",
            text: "กรุณากรอกข้อมูลใน Packing By",
          });
          setPackbyError(true);
          if (button) {
            button.disabled = false;
          }
          return;
        }

        await DataReceive(ItemNew);
        let datapacking = await GetDataPacking(ItemNew);
        await GetAutoGenerate(ItemNew, BoxNo, "NEW", datapacking);
        setopenManual(false);
        await Swal.fire({
          icon: "success",
          text: "บันทึกข้อมูลสำเร็จ",
        });
        hideLoading();
      }
    }

    // Re-enable the button after the operation is complete
    if (button) {
      button.disabled = false;
    }
  };
  // Add the button with the id "genPackButton"

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
      });
    hideLoading();
  };
  const DataManual = async (itemname, boxno) => {
    await axios
      .post("/api/BoxCapacity/DataSeq", {
        dataList: {
          product: itemname,
          boxno: boxno,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setSeq(response.data[0]);
        }
      });
    await GetDataPacking(itemname);
    await DataHeader(itemname, boxno);
  };
  const GetDataPacking = async (itemname) => {
    console.log(itemname,'itemname')
    let data = [];
    await axios
    .post("/api/BoxCapacity/LotNo", {
      dataList: {
        product: itemname,
      },
    })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("API Error");
      }
      if (response.data.length > 0) {
        setddlLot(response.data);
        setselectddlLot(response.data.GOOD_QTY);
        setPack_qtyLot(0);
        setDataPacking(response.data);
        data = response.data;
      } else {
        setDataPacking([]);
      }
    })
    .catch((error) => {
      console.error(error);
      Swal.fire({
        icon: "error",
        text: "Internal Server Error",
      });
    });
    return data;
  };
  const DataHeader = async (ItemNew, BoxNo) => {
    await axios
      .post("/api/BoxCapacity/DataHeader", {
        dataList: {
          product: ItemNew,
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
  const DataReceive = async (ItemNew) => {
    await axios
      .post("/api/BoxCapacity/DataReceive", {
        dataList: {
          product: ItemNew,
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
      setRequestTotal("");
      setName_User("");
    } else if (Page == "ResetManual") {
      setselectddlLot("");
      setRemain_qty("");
      setPack_qtyLot(0);
      setName_User("");
    }
  };
  const SaveBoxMainTain = async (page) => {
    if (page == "NEW") {
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
        // return { status: "success", data: response.data };
      } catch (error) {
        console.error("Error inserting data:", error);
        setopenManual(false);
        // return { status: "error", error: error };
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

        // return { status: "success", data: response.data };
      } catch (error) {
        console.error("Error updating data:", error);
        // return { status: "error", error: error };
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
    }
  };
  const GetDataLotPacking = async (ItemNew, BoxNo) => {
    await axios
      .post("/api/BoxCapacity/DataLotPacking", {
        dataList: {
          product: ItemNew,
          boxno: BoxNo,
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setDataLotPacking(response.data);
        } else {
          setDataLotPacking([]);
        }
      });
  };
  const GetDataLotPacking1 = async (ItemNew, BoxNo) => {
    await axios
      .post("/api/BoxCapacity/DataLotPackingAuto_Gen", {
        dataList: {
          item: ItemNew,
          boxno: BoxNo || "",
        },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setDataLotPacking1(response.data);
        } else {
          setDataLotPacking1([]);
        }
      });
  };
  const GetDataRemainQTY_AUTO = async (ItemNew, BoxNo) => {
    hideLoading();
    const parts = BoxNo.split("/");
    const running_box = parseInt(parts[1], 10);
    let Max_DATE;
    let Data;
    let Remain_QTY;
    if (running_box > 1) {
      await axios
        .post("/api/BoxCapacity/DataRemainQTY_AUTO", {
          dataList: {
            boxno: BoxNo,
            item: ItemNew,
          },
        })
        .then(async (response) => {
          if (response.data[0].REMAIN_QTY > 0) {
            Remain_QTY = response.data[0].REMAIN_QTY;
          
            await Swal.fire({
              icon: "warning",
              text: "Previous box packed not full. Are you sure you want to packing in this box?",
              showCancelButton: true,
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
            }).then(async (result) => {
              if (result.isConfirmed) {
                await Swal.fire({
                  icon: "warning",
                  text: "Are you sure you want to auto calculate packing ?",
                  showCancelButton: true,
                  confirmButtonText: "OK",
                  cancelButtonText: "Cancel",
                }).then(async (result) => {
              
                  if (result.isConfirmed) {
                    showLoading("กำลังบันทึกข้อมูล...");
                    await axios
                      .post("/api/BoxCapacity/DataLOT_AUTO", {
                        dataList: {
                          boxno: BoxNo,
                          item: ItemNew,
                        },
                      })
                      .then(async (response) => {
                        let LOT = response.data;
                        if (response.data.length > 0) {
                          await axios
                            .post("/api/BoxCapacity/DataMAX_DATE_AUTO", {
                              dataList: {
                                lotno: LOT || "",
                                item: ItemNew,
                              },
                            })
                            .then((response) => {
                              Max_DATE = response.data;
                              if (Max_DATE.length > 0) {
                                Max_DATE = "";
                              } else {
                                Max_DATE = Max_DATE;
                              }
                            });
                        } else {
                          Max_DATE = "";
                        }
                        Remain_QTY = FullBoxQty - PackQty;
                        await axios
                          .post("/api/BoxCapacity/LotNo", {
                            dataList: {
                              product: ItemNew,
                            },
                          })
                          .then(async (response) => {
                            Data = response.data;
                            let goodQtyArray = [];
                            let lotNoArray = [];

                            Data.forEach((item) => {
                              goodQtyArray.push(item.GOOD_QTY);
                              lotNoArray.push(item.LOT_NO);
                            });
                            if (Data.length > 0) {
                              let rec;
                              do {
                                let qty = goodQtyArray.shift();
                                let lot = lotNoArray.shift();
                                await axios
                                  .post("/api/BoxCapacity/DataMAX_SEQ_AUTO", {
                                    dataList: {
                                      item: ItemNew,
                                      boxno: BoxNo,
                                    },
                                  })
                                  .then(async (response) => {
                                    rec = response.data[0].MAX_SEQ;
                                  });
                                if (qty > Remain_QTY) {
                                  await axios.post(
                                    "/api/BoxCapacity/INS_UP_AUTO_PACK1",
                                    {
                                      dataList: {
                                        item: ItemNew,
                                        boxno: BoxNo,
                                        maxseq: rec,
                                        lot_no: lot,
                                        remain_qty: Remain_QTY,
                                        packdate: Packdate,
                                      },
                                    }
                                  );
                                  Remain_QTY = 0;
                                } else {
                                  await axios.post(
                                    "/api/BoxCapacity/INS_UP_AUTO_PACK2",
                                    {
                                      dataList: {
                                        item: ItemNew,
                                        boxno: BoxNo,
                                        maxseq: rec,
                                        lot_no: lot,
                                        qty_pack: qty,
                                        packdate: Packdate,
                                      },
                                    }
                                  );
                                  Remain_QTY = Remain_QTY - qty;
                                  rec = rec + 1;
                                }
                              } while (Remain_QTY > 0);
                            }
                          });
                        setPackQty(FullBoxQty);
                      });
                    await axios
                      .post("/api/BoxCapacity/UpdateAutoSts", {
                        dataList: {
                          item: ItemNew,
                          date: Max_DATE,
                        },
                      })
                      .then(async (response) => {});
                    await GetDataPacking(ItemNew);
                    await GetDataLotPacking(ItemNew, BoxNo);
                    await Search();
                  } else if (result.isDismissed) {
                    return;
                  }
                });
              } else if (result.isDismissed) {
                return;
              }
            });
          } else {
            await axios
              .post("/api/BoxCapacity/DataLOT_AUTO", {
                dataList: {
                  boxno: BoxNo,
                  item: ItemNew,
                },
              })
              .then(async (response) => {
                let LOT = response.data;
                if (response.data.length > 0) {
                  await axios
                    .post("/api/BoxCapacity/DataMAX_DATE_AUTO", {
                      dataList: {
                        lotno: LOT || "",
                        item: ItemNew,
                      },
                    })
                    .then((response) => {
                      Max_DATE = response.data;
                      if (Max_DATE.length > 0) {
                        Max_DATE = "";
                      } else {
                        Max_DATE = Max_DATE;
                      }
                    });
                } else {
                  Max_DATE = "";
                }
                Remain_QTY = FullBoxQty - PackQty;
                await axios
                  .post("/api/BoxCapacity/LotNo", {
                    dataList: {
                      product: ItemNew,
                    },
                  })
                  .then(async (response) => {
                    Data = response.data;
                    let goodQtyArray = [];
                    let lotNoArray = [];

                    Data.forEach((item) => {
                      goodQtyArray.push(item.GOOD_QTY);
                      lotNoArray.push(item.LOT_NO);
                    });
                    if (Data.length > 0) {
                      let rec;
                      do {
                        let qty = goodQtyArray.shift(); // เก็บค่าของ qty
                        let lot = lotNoArray.shift(); // เก็บค่าของ lotno
                        await axios
                          .post("/api/BoxCapacity/DataMAX_SEQ_AUTO", {
                            dataList: {
                              item: ItemNew,
                              boxno: BoxNo,
                            },
                          })
                          .then(async (response) => {
                            rec = response.data[0].MAX_SEQ;
                          });
                        if (qty > Remain_QTY) {
                          await axios.post(
                            "/api/BoxCapacity/INS_UP_AUTO_PACK1",
                            {
                              dataList: {
                                item: ItemNew,
                                boxno: BoxNo,
                                maxseq: rec,
                                lot_no: lot,
                                remain_qty: Remain_QTY,
                                packdate: Packdate,
                              },
                            }
                          );
                          Remain_QTY = 0;
                        } else {
                          await axios.post(
                            "/api/BoxCapacity/INS_UP_AUTO_PACK2",
                            {
                              dataList: {
                                item: ItemNew,
                                boxno: BoxNo,
                                maxseq: rec,
                                lot_no: lot,
                                qty_pack: qty,
                                packdate: Packdate,
                              },
                            }
                          );
                          Remain_QTY = Remain_QTY - qty;
                          rec = rec + 1;
                        }
                      } while (Remain_QTY > 0);
                    }
                  });
                setPackQty(FullBoxQty);
              });
            await axios
              .post("/api/BoxCapacity/UpdateAutoSts", {
                dataList: {
                  item: ItemNew,
                  date: Max_DATE,
                },
              })
              .then(async (response) => {});
            await GetDataPacking(ItemNew);
            await GetDataLotPacking(ItemNew, BoxNo);
            await Search();
          }
        });
      hideLoading();
    } else {
      const result = await Swal.fire({
        icon: "warning",
        text: "Are you sure you want to auto calculate packing?",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
      });
      if (result.isConfirmed) {
        showLoading("กำลังบันทึกข้อมูล...");
        await axios
          .post("/api/BoxCapacity/DataLOT_AUTO", {
            dataList: {
              boxno: BoxNo,
              item: ItemNew,
            },
          })
          .then(async (response) => {
            let LOT = response.data;
            if (response.data.length > 0) {
              await axios
                .post("/api/BoxCapacity/DataMAX_DATE_AUTO", {
                  dataList: {
                    lotno: LOT || "",
                    item: ItemNew,
                  },
                })
                .then((response) => {
                  Max_DATE = response.data;
                  if (Max_DATE.length > 0) {
                    Max_DATE = "";
                  } else {
                    Max_DATE = Max_DATE;
                  }
                });
            } else {
              Max_DATE = "";
            }
            Remain_QTY = FullBoxQty - PackQty;
            await axios
              .post("/api/BoxCapacity/GetDataGOOD_QTY_FOR_AUTO", {
                dataList: {
                  item: ItemNew,
                  date: Max_DATE,
                },
              })
              .then(async (response) => {
                Data = response.data;
                let goodQtyArray = [];
                let lotNoArray = [];

                Data.forEach((item) => {
                  goodQtyArray.push(item.GOOD_QTY);
                  lotNoArray.push(item.LOT_NO);
                });
                if (Data.length > 0) {
                  let rec;
                  do {
                    let qty = goodQtyArray.shift(); // เก็บค่าของ qty
                    let lot = lotNoArray.shift(); // เก็บค่าของ lotno
                    await axios
                      .post("/api/BoxCapacity/DataMAX_SEQ_AUTO", {
                        dataList: {
                          item: ItemNew,
                          boxno: BoxNo,
                        },
                      })
                      .then(async (response) => {
                        rec = response.data[0].MAX_SEQ;
                      });
                    if (qty > Remain_QTY) {
                      await axios.post("/api/BoxCapacity/INS_UP_AUTO_PACK1", {
                        dataList: {
                          item: ItemNew,
                          boxno: BoxNo,
                          maxseq: rec,
                          lot_no: lot,
                          remain_qty: Remain_QTY,
                          packdate: Packdate,
                        },
                      });
                      Remain_QTY = 0;
                    } else {
                      await axios.post("/api/BoxCapacity/INS_UP_AUTO_PACK2", {
                        dataList: {
                          item: ItemNew,
                          boxno: BoxNo,
                          maxseq: rec,
                          lot_no: lot,
                          qty_pack: qty,
                          packdate: Packdate,
                        },
                      });
                      Remain_QTY = Remain_QTY - qty;
                      rec = rec + 1;
                    }
                  } while (Remain_QTY > 0);
                }
              });
            setPackQty(FullBoxQty);
          });
        await axios
          .post("/api/BoxCapacity/UpdateAutoSts", {
            dataList: {
              item: ItemNew,
              date: Max_DATE,
            },
          })
          .then(async (response) => {});
      }
      await GetDataPacking(ItemNew);
      await GetDataLotPacking(ItemNew, BoxNo);
      await Search();
      hideLoading();
    }
  };
  const GetAutoGenerate = async (ItemNew, BoxNo, page, DataPacking) => {
    let Box_NO;
    let Qty = 0;
    let DataBox = [];
    let check;
    if (DataPacking.length > 0) {
      showLoading("กำลังค้นหาข้อมูล...");
      for (let i = 0; i < RequestTotal; i++) {
        // เช็คกล่องล่าสุดว่าเต็มหรือยัง
        let dataPack = await GetDataPacking(ItemNew);
        if (dataPack.length > 0) {
          await axios
            .post("/api/BoxCapacity/DataBoxno", {
              dataList: {
                fac: Fac.value,
                product: ItemNew,
              },
            })
            .then((response) => {
              if (response.data.length > 0) {
                setBoxNo(response.data[0]);
                Box_NO = response.data[0];
                DataBox.push(response.data[0]);
                setPackQty(0);
              }
            });
          await axios.post("/api/BoxCapacity/InsBoxCapacity1", {
            dataList: {
              Item: ItemNew,
              box_No: Box_NO,
              fac1: Fac.value,
              box_status: Boxstatus,
              box_qty: Qty,
              box_max_qty: FullBoxQty,
              sheet_qty: TotalSheetQty,
              packingBy: PackBy,
              remark: Remark,
              packdate: Packdate == "" ? today : Packdate,
              fac2: Fac.value,
            },
          });

          if (Box_NO != "") {
            const parts = Box_NO.split("/");
            const running_box = parseInt(parts[1], 10);
            let Lot;
            let Max_DATE;
            let Data;
            let Remain_QTY;
            if (running_box > 1) {
              // ตรวจสอบว่ากล่องล่าสุดเต็มหรือไม่
              await axios
                .post("/api/BoxCapacity/DataRemainQTY_AUTO", {
                  dataList: {
                    boxno: Box_NO,
                    item: ItemNew,
                  },
                })
                .then(async (response) => {
                  hideLoading();
                  if (response.data[0].REMAIN_QTY > 0) {
                    Remain_QTY = response.data[0].REMAIN_QTY;
                    const result = await Swal.fire({
                      icon: "warning",
                      text: "Previous box packed not full. Are you sure you want to packing in this box?",
                      showCancelButton: true,
                      confirmButtonText: "OK",
                      cancelButtonText: "Cancel",
                    });

                    if (result.isConfirmed) {
                      const result2 = await Swal.fire({
                        icon: "warning",
                        text: "Are you sure you want to auto calculate packing ?",
                        showCancelButton: true,
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                      });

                      if (result2.isConfirmed) {
                        showLoading("กำลังบันทึกข้อมูล...");
                        await axios
                          .post("/api/BoxCapacity/DataLOT_AUTO", {
                            dataList: {
                              boxno: Box_NO,
                              item: ItemNew,
                            },
                          })
                          .then(async (response) => {
                            let LOT = response.data;
                            if (response.data.length > 0) {
                              await axios
                                .post("/api/BoxCapacity/DataMAX_DATE_AUTO", {
                                  dataList: {
                                    lotno: LOT || "",
                                    item: ItemNew,
                                  },
                                })
                                .then((response) => {
                                  Max_DATE = response.data;
                                  if (Max_DATE.length > 0) {
                                    Max_DATE = "";
                                  } else {
                                    Max_DATE = Max_DATE;
                                  }
                                });
                            } else {
                              Max_DATE = "";
                            }
                            Remain_QTY = FullBoxQty - PackQty;

                            await axios
                              .post("/api/BoxCapacity/LotNo", {
                                dataList: {
                                  product: ItemNew,
                                },
                              })
                              .then(async (response) => {
                                Data = response.data;
                                let goodQtyArray = [];
                                let lotNoArray = [];

                                Data.forEach((item) => {
                                  goodQtyArray.push(item.GOOD_QTY);
                                  lotNoArray.push(item.LOT_NO);
                                });
                                if (Data.length > 0) {
                                  let rec;
                                  do {
                                    let qty = goodQtyArray.shift(); // เก็บค่าของ qty
                                    let lot = lotNoArray.shift(); // เก็บค่าของ lotno
                                    await axios
                                      .post(
                                        "/api/BoxCapacity/DataMAX_SEQ_AUTO",
                                        {
                                          dataList: {
                                            item: ItemNew,
                                            boxno: Box_NO,
                                          },
                                        }
                                      )
                                      .then(async (response) => {
                                        rec = response.data[0].MAX_SEQ;
                                      });
                                    if (qty > Remain_QTY) {
                                      await axios.post(
                                        "/api/BoxCapacity/INS_UP_AUTO_PACK1",
                                        {
                                          dataList: {
                                            item: ItemNew,
                                            boxno: Box_NO,
                                            maxseq: rec,
                                            lot_no: lot,
                                            remain_qty: Remain_QTY,
                                            packdate: Packdate,
                                          },
                                        }
                                      );
                                      Remain_QTY = 0;
                                    } else {
                                      await axios.post(
                                        "/api/BoxCapacity/INS_UP_AUTO_PACK2",
                                        {
                                          dataList: {
                                            item: ItemNew,
                                            boxno: Box_NO,
                                            maxseq: rec,
                                            lot_no: lot,
                                            qty_pack: qty,
                                            packdate: Packdate,
                                          },
                                        }
                                      );

                                      Remain_QTY = Remain_QTY - qty;
                                      rec = rec + 1;
                                    }
                                  } while (Remain_QTY > 0);
                                }
                              });
                            // setPackQty(FullBoxQty);
                          });
                        await axios
                          .post("/api/BoxCapacity/UpdateAutoSts", {
                            dataList: {
                              item: ItemNew,
                              date: Max_DATE,
                            },
                          })
                          .then(async (response) => {});
                        await GetDataPacking(ItemNew);
                        // await Search();
                        hideLoading();
                      } else if (result2.isDismissed) {
                        hideLoading();
                        return;
                      }
                    } else if (result.isDismissed) {
                      hideLoading();
                      return;
                    }
                  } else {
                    if (check != 1) {
                      showLoading("กำลังบันทึกข้อมูล...");
                    }
                    await axios
                      .post("/api/BoxCapacity/DataLOT_AUTO", {
                        dataList: {
                          boxno: Box_NO,
                          item: ItemNew,
                        },
                      })
                      .then(async (response) => {
                        let LOT = response.data;
                        if (response.data.length > 0) {
                          await axios
                            .post("/api/BoxCapacity/DataMAX_DATE_AUTO", {
                              dataList: {
                                lotno: LOT || "",
                                item: ItemNew,
                              },
                            })
                            .then((response) => {
                              Max_DATE = response.data;
                              if (Max_DATE.length > 0) {
                                Max_DATE = "";
                              } else {
                                Max_DATE = Max_DATE;
                              }
                            });
                        } else {
                          Max_DATE = "";
                        }
                        Remain_QTY = FullBoxQty - PackQty;
                        await axios
                          .post("/api/BoxCapacity/LotNo", {
                            dataList: {
                              product: ItemNew,
                            },
                          })
                          .then(async (response) => {
                            Data = response.data;
                            let goodQtyArray = [];
                            let lotNoArray = [];

                            Data.forEach((item) => {
                              goodQtyArray.push(item.GOOD_QTY);
                              lotNoArray.push(item.LOT_NO);
                            });
                            if (Data.length > 0) {
                              let rec;
                              do {
                                let qty = goodQtyArray.shift(); // เก็บค่าของ qty
                                let lot = lotNoArray.shift(); // เก็บค่าของ lotno
                                await axios
                                  .post("/api/BoxCapacity/DataMAX_SEQ_AUTO", {
                                    dataList: {
                                      item: ItemNew,
                                      boxno: Box_NO,
                                    },
                                  })
                                  .then(async (response) => {
                                    rec = response.data[0].MAX_SEQ;
                                  });
                                if (qty > Remain_QTY) {
                                  await axios.post(
                                    "/api/BoxCapacity/INS_UP_AUTO_PACK1",
                                    {
                                      dataList: {
                                        item: ItemNew,
                                        boxno: Box_NO,
                                        maxseq: rec,
                                        lot_no: lot,
                                        remain_qty: Remain_QTY,
                                        packdate: Packdate,
                                      },
                                    }
                                  );
                                  Remain_QTY = 0;
                                } else {
                                  if (
                                    qty !== undefined &&
                                    qty !== null &&
                                    qty !== ""
                                  ) {
                                    await axios.post(
                                      "/api/BoxCapacity/INS_UP_AUTO_PACK2",
                                      {
                                        dataList: {
                                          item: ItemNew,
                                          boxno: Box_NO,
                                          maxseq: rec,
                                          lot_no: lot,
                                          qty_pack: qty,
                                          packdate: Packdate,
                                        },
                                      }
                                    );
                                    Remain_QTY = Remain_QTY - qty;
                                    rec = rec + 1;
                                  } else {
                                    break;
                                  }
                                }
                              } while (Remain_QTY > 0);
                            }
                          });
                        // setPackQty(FullBoxQty);
                      });

                    await axios
                      .post("/api/BoxCapacity/UpdateAutoSts", {
                        dataList: {
                          item: ItemNew,
                          date: Max_DATE,
                        },
                      })
                      .then(async (response) => {});
                    await GetDataPacking(ItemNew);
                    // await Search();
                    // hideLoading();
                  }
                });
            } else {
              // กล่องที่เป็น 1 ไม่ต้องเช็คก่อน
              hideLoading();
              const result = await Swal.fire({
                icon: "warning",
                text: "Are you sure you want to auto calculate packing ?",
              });

              if (result.isConfirmed) {
                showLoading("กำลังบันทึกข้อมูล...");
                check = 1;
                await axios
                  .post("/api/BoxCapacity/DataLOT_AUTO", {
                    dataList: {
                      boxno: Box_NO,
                      item: ItemNew,
                    },
                  })
                  .then(async (response) => {
                    let LOT = response.data;
                    if (response.data.length > 0) {
                      await axios
                        .post("/api/BoxCapacity/DataMAX_DATE_AUTO", {
                          dataList: {
                            lotno: LOT || "",
                            item: ItemNew,
                          },
                        })
                        .then((response) => {
                          Max_DATE = response.data;
                          if (Max_DATE.length > 0) {
                            Max_DATE = "";
                          } else {
                            Max_DATE = Max_DATE;
                          }
                        });
                    } else {
                      Max_DATE = "";
                    }
                    Remain_QTY = FullBoxQty - PackQty;
                    await axios
                      .post("/api/BoxCapacity/GetDataGOOD_QTY_FOR_AUTO", {
                        dataList: {
                          item: ItemNew,
                          date: Max_DATE,
                        },
                      })
                      .then(async (response) => {
                        Data = response.data;
                        let goodQtyArray = [];
                        let lotNoArray = [];

                        Data.forEach((item) => {
                          goodQtyArray.push(item.GOOD_QTY);
                          lotNoArray.push(item.LOT_NO);
                        });
                        if (Data.length > 0) {
                          let rec;
                          do {
                            let qty = goodQtyArray.shift(); // เก็บค่าของ qty
                            let lot = lotNoArray.shift(); // เก็บค่าของ lotno
                            await axios
                              .post("/api/BoxCapacity/DataMAX_SEQ_AUTO", {
                                dataList: {
                                  item: ItemNew,
                                  boxno: Box_NO,
                                },
                              })
                              .then(async (response) => {
                                rec = response.data[0].MAX_SEQ;
                              });
                            if (qty > Remain_QTY) {
                              await axios.post(
                                "/api/BoxCapacity/INS_UP_AUTO_PACK1",
                                {
                                  dataList: {
                                    item: ItemNew,
                                    boxno: Box_NO,
                                    maxseq: rec,
                                    lot_no: lot,
                                    remain_qty: Remain_QTY,
                                    packdate: Packdate,
                                  },
                                }
                              );
                              Remain_QTY = 0;
                            } else {
                              await axios.post(
                                "/api/BoxCapacity/INS_UP_AUTO_PACK2",
                                {
                                  dataList: {
                                    item: ItemNew,
                                    boxno: Box_NO,
                                    maxseq: rec,
                                    lot_no: lot,
                                    qty_pack: qty,
                                    packdate: Packdate,
                                  },
                                }
                              );
                              Remain_QTY = Remain_QTY - qty;
                              rec = rec + 1;
                            }
                          } while (Remain_QTY > 0);
                        }
                      });
                    // setPackQty(FullBoxQty);
                  });
                await axios
                  .post("/api/BoxCapacity/UpdateAutoSts", {
                    dataList: {
                      item: ItemNew,
                      date: Max_DATE,
                    },
                  })
                  .then(async (response) => {});
                hideLoading();

                // await Search();
              }
            }
          } else {
            hideLoading();
            return;
          }
        } else {
          hideLoading();
          break;
        }
      }
    }
    hideLoading();
    await GetDataLotPacking1(ItemNew, DataBox);
  };
  const exportToExcel = async (data, namefile) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sheet 1");
    sheet.columns = [
      { header: "LOT NO", key: "LOT_NO", width: 20 },
      { header: "GOOD QTY", key: "GOOD_QTY", width: 20 },
    ];
    data.forEach((item) => {
      sheet.addRow({
        LOT_NO: item.LOT_NO,
        GOOD_QTY: item.GOOD_QTY,
      });
    });
    sheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.font = { size: 12 };
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `${namefile}.xlsx`);
  };
  const BtnExport = () => {
    exportToExcel(DataPacking, "For Packing");
  };
  const BtnExportReceive = () => {
    exportToExcelReceive(DataLotReceive, "Wait For Receive");
  };
  const exportToExcelReceive = async (data, namefile) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sheet 1");
    sheet.columns = [
      { header: "LOT NO", key: "LOT_NO", width: 20 },
      { header: "GOOD QTY", key: "GOOD_QTY", width: 20 },
      { header: "PROCESS", key: "PROCESS", width: 20 },
    ];
    data.forEach((item) => {
      sheet.addRow({
        LOT_NO: item.LOT_NO,
        GOOD_QTY: item.GOOD_QTY,
        PROCESS: item.PROCESS,
      });
    });

    sheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.font = { size: 12 };
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `${namefile}.xlsx`);
  };
  const handleUser = async (data) => {
    await axios
      .post("/api/BoxCapacity/DATA_USER", {
        dataList: {
          empcode: data,
        },
      })
      .then((res) => {
        if(res.data.length > 0){
          setName_User(res.data[0].NAME_USER);
        }else{
           Swal.fire({
            icon: "error",
            text: "ไม่พบข้อมูล User",
          })
          setName_User("No User");
        }
        
      });

    console.log(data, "eiei");
  };
  return {
    columns,
    NewBoxCapacity,
    handleOk,
    handleCancel,
    isModalOpen,
    packingTable,
    ChooseMenu,
    radioselect,
    GenPack,
    LotPacking,
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
    Search,
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
    Pack_qtyLot,
    handleLotNo,
    Remain_qty,
    DataPacking,
    SaveLotPacking,
    setPack_qtyLot,
    DataLotPacking,
    tableReceive,
    handleDelete,
    openManual,
    PageInsert,
    BtnExport,
    DataLotReceive,
    BtnExportReceive,
    RequestTotal,
    setPackQty,
    setRequestTotal,
    ReError,
    setReError,
    LotPacking1,
    DataLotPacking1,
    ItemError,
    setItemError,
    FullError,
    setFullError,
    PackbyError,
    setPackbyError,
    Name_User,
    handleUser,
  };
}

export { fn_Box_Search };
