import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Checkbox } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useLoading } from "../../component/loading/fn_loading";

function formatDateToMMDDYYYY(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}
function fn_BoxFoxcon() {
  const { showLoading, hideLoading } = useLoading();
  const today = formatDateToMMDDYYYY(new Date());
  const date = new Date().toISOString().split("T")[0];
  const [PackBy, setPackBy] = useState("");
  const [FistName, setFistName] = useState("");
  const [Surname, setSurname] = useState("");
  const [ProductNew, setProductNew] = useState("");
  const [BoxNo, setBoxNo] = useState("");
  const [BoxQty, setBoxQty] = useState("");
  const [BoxDate, setBoxDate] = useState(date);
  const [Packlabel, setPacklabel] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DataSource, setDataSource] = useState([]);
  const [ProductSeacrh, setProductSeacrh] = useState([]);
  const [LotSearch, setLotSearch] = useState("");
  const [packDateFrom, setPackDateFrom] = useState("");
  const [packDateTo, setPackDateTo] = useState("");
  const [BoxSearch, setBoxSearch] = useState("");
  const [DataPackLabel, setDataPackLabel] = useState([]);
  const [DataPackLabelbk, setDataPackLabelbk] = useState([]);
  const [Fac, setFac] = useState("");
  const [selectProduct, setSelectProduct] = useState("");
  const [Item_search, setItem_serach] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [DataBoxDet, setDataBoxDet] = useState([]);
  const [DataShipTo, setDataShipTo] = useState([]);
  const [selectShipTo, setselectShipTo] = useState("");
  const [Item, setItem] = useState("");

  // Focus
  const fcPackBy = useRef([]);
  const fcProduct = useRef([]);
  // const fcBoxqty = useRef([]);
  const fcPacklabel = useRef([]);
  // disable
  const [dis_product, setdis_product] = useState(true);
  const [dis_boxqty, setdis_boxqty] = useState(true);
  const [dis_packlabel, setdis_packlabel] = useState(true);
  const [dis_genbox, setdis_genbox] = useState(false);
  const [dis_print, setdis_print] = useState(true);

  // checkpahe
  const [sts_page, setsts_page] = useState("");
  const [item_box, setitem_box] = useState("");
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const seenProducts = new Set();
  const columns = [
    {
      title: "No.",
      // dataIndex: "key",
      key: "key",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Product",
      dataIndex: "ITEM",
      key: "product",
      render: (text, record, index) => {
        if (!seenProducts.has(text)) {
          seenProducts.add(text);
          return text; // แสดงค่าเฉพาะแถวแรกที่เจอ
        }
        return ""; // ซ่อนค่าที่ซ้ำกัน
      },
    },
    {
      title: "Lot No.",
      dataIndex: "LOT",
      key: "lotNo",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Bin",
      dataIndex: "BIN",
      key: "bin",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Pack ID",
      dataIndex: "PACK_ID",
      key: "packId",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Qty",
      dataIndex: "QTY",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
    },
    {
      title: "Pack Date",
      dataIndex: "PACK_DATE",
      key: "packDate",
      render: (text, record, index) => {
        return text;
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record, index) => (
    //     <Button
    //       type="danger"
    //       icon={<DeleteOutlined />}
    //       disabled={sts_page === "GEN_SUCCESS"}
    //       onClick={() => {
    //         let dtData2 = DataPackLabelbk.filter(item => item.PACK_ID == record.PACK_ID);
    //         handleDelete(
    //           index + 1,
    //           dtData2[0].PACK_ID,
    //           dtData2[0].ITEM,
    //           dtData2[0].BOX_NO,
    //           dtData2[0].SEQ,
    //           dtData2[0].LOT,
    //           dtData2[0].PRODUCT,
    //           dtData2[0].BIN,
    //           "DELETE"
    //         );
    //       }}
    //     />
    //   ),
    // },
    {
      title: (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={
            selectedRows.length === DataPackLabel.length &&
            DataPackLabel.length > 0
          }
          indeterminate={
            selectedRows.length > 0 &&
            selectedRows.length < DataPackLabel.length
          }
          disabled={sts_page === "GEN_SUCCESS"}
        ></Checkbox>
      ),
      key: "select",
      render: (_, record, index) => (
        <Checkbox
          onChange={(e) =>
            handleCheckboxChange(e.target.checked, record, index)
          }
          checked={selectedRows.includes(record.PACK_ID)}
          disabled={sts_page === "GEN_SUCCESS"}
        />
      ),
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Button
    //       type="danger"
    //       icon={<DeleteOutlined />}
    //       disabled={sts_page === "GEN_SUCCESS"}
    //       onClick={() => handleDeleteSelected()}
    //     />
    //   ),
    // },
    // {
    //   title: "QTY",
    //   dataIndex: "QTY",
    //   key: "qty",
    // },
  ];
  const seenProducts1 = new Set();
  const seenBoxNos = new Set();
  const DataSearch = [
    // {
    //   title: "No.",
    //   dataIndex: "key",
    //   key: "key",
    //   render: (text, record, index) => {
    //     return index + 1;
    //   },
    //   width: 30,
    //   align: "center",
    // },
    {
      title: "Product",
      dataIndex: "PRODUCT",
      key: "product",
      render: (text, record, index) => {
        if (!seenProducts1.has(text)) {
          seenProducts1.add(text); // เก็บค่าใน Set
          return text; // แสดงค่าเฉพาะแถวแรกที่เจอ
        }
        return ""; // ซ่อนค่าที่ซ้ำกัน
      },
      width: 150,
      align: "center",
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "BoxNo",
      render: (text, record, index) => {
        if (!seenBoxNos.has(text)) {
          seenBoxNos.add(text); // เก็บค่าใน Set
          return text; // แสดงค่าเฉพาะแถวแรกที่เจอ
        }
        return ""; // ซ่อนค่าที่ซ้ำกัน
      },
      width: 150,
      align: "center",
    },
    {
      title: "Box Qty",
      dataIndex: "BOX_QTY",
      key: "boxQty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      width: 150,
      align: "center",
    },
    {
      title: "Box Date",
      dataIndex: "BOX_DATE",
      key: "boxDate",
      render: (text, record, index) => {
        return text;
      },
      width: 120,
      align: "center",
    },
    {
      title: "Lot No.",
      dataIndex: "LOT",
      key: "lotno",
      render: (text, record, index) => {
        return text;
      },
      width: 120,
      align: "center",
    },
    {
      title: "Qty",
      dataIndex: "LOT_QTY",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      width: 150,
      align: "center",
    },
    // {
    //   title: "Bin",
    //   dataIndex: "BIN",
    //   key: "bin",
    //   render: (text, record, index) => {
    //     return <div className="scrollable-column">{text}</div>;
    //   },
    //   width: 120,
    //   align: "center",
    // },

    {
      title: "Packing By",
      dataIndex: "PACKAGE_BY",
      key: "packing by",
      render: (text, record, index) => {
        return text;
      },
      width: 250,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "BOX_STATUS",
      key: "status",
      render: (text, record, index) => {
        return text;
      },
      width: 100,
      align: "center",
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return (
          <button
            style={{
              backgroundColor: "white",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f0f0f0";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white";
            }}
            onClick={() =>
              handle_Edit(
                record.PRODUCT,
                record.BOX_NO,
                record.LOT,
                "UPDATE",
                record.ITEM
              )
            }
          >
            <EditOutlined style={{ color: "orange" }} />
          </button>
        );
      },
      width: 70,
      align: "center",
    },

    {
      title: "Delete",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return (
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() =>
              handleDeleteAll(record.PRODUCT, record.BOX_NO, record.ITEM)
            }
          />
        );
      },
      width: 50,
      align: "center",
    },
    // {
    //   title: "Label",
    //   dataIndex: "",
    //   key: "",
    //   render: (text, record, index) => {
    //     return <PrinterOutlined />;
    //   },
    //   width: 50,
    //   align: "center",
    // },
  ];
  const handleDeleteAll = async (prd, Box_No, item_box) => {
    await axios
      .post("/api/BoxFoxcon/GetEdit_BoxDet_Detail", {
        dataList: { product: prd, boxno: Box_No },
      })
      .then((res) => {
        if (res.data.length > 0) {
          Swal.fire({
            icon: "error",
            text: "ไม่สามารถลบข้อมูลได้ เนื่องจากมี Lot No. อยู่",
          });
          return;
        } else {
          Swal.fire({
            title: "ยืนยันการลบ",
            text: "คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ลบข้อมูล",
            cancelButtonText: "ยกเลิก",
          }).then((result) => {
            if (result.isConfirmed) {
              axios
                .post("/api/BoxFoxcon/DeleteBoxALL_DET", {
                  dataList: { item: item_box, box_no: Box_No },
                })
                .then(async (res) => {
                  if (res.status === 200) {
                    axios
                      .post("/api/BoxFoxcon/DeleteBoxMaster", {
                        dataList: { item: item_box, box_no: Box_No },
                      })
                      .then(async (res) => {
                        if (res.status === 200) {
                          Swal.fire({
                            icon: "success",
                            text: "ลบข้อมูลสำเร็จ!",
                          });
                          await Search(item_box, Box_No);
                        }
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        Swal.fire({
                          icon: "error",
                          text: "เกิดข้อผิดพลาดในการลบข้อมูล",
                        });
                      });
                    // Swal.fire({
                    //   icon: "success",
                    //   text: "ลบข้อมูลสำเร็จ!",
                    // });
                    // await Search(item_box, Box_No);
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  Swal.fire({
                    icon: "error",
                    text: "เกิดข้อผิดพลาดในการลบข้อมูล",
                  });
                });
            }
          });
        }
      });
  };
  const handle_Edit = async (item, box_no, lotno, type, item_no) => {
    setsts_page(type);
    setItem_serach(item_no);
    setdis_packlabel(false);
    setdis_genbox(false);
    setdis_product(true);
    setdis_print(false);
    setPacklabel("");
    handleShipTo(item);
    setItem(item_no);
    let id;
    showLoading("...กำลังค้นหาข้อมูล");
    await axios
      .post("/api/BoxFoxcon/GetEdit_MSTR", {
        dataList: {
          product: item,
          boxno: box_no,
        },
      })
      .then((res) => {
        setProductNew(res.data[0].PRODUCT);
        setBoxNo(res.data[0].BOX_NO);
        setBoxDate(res.data[0].BOX_DATE);
        setBoxQty(res.data[0].BOX_QTY);
        setitem_box(res.data[0].ITEM);
        id = res.data[0].PACK_BY;
        setPackBy(res.data[0].PACK_BY);
      });
    await axios
      .get("/api/BoxFoxcon/GetUser", {
        params: { empcode: id || "" },
      })
      .then((res) => {
        setFistName(res.data[0].F_NAME);
        setSurname(res.data[0].SURNAME);
        setFac(res.data[0].FAC);
      });
    await axios
      .post("/api/BoxFoxcon/GetEdit_BoxDet", {
        dataList: { product: item, boxno: box_no },
      })
      .then((res) => {
        setDataBoxDet(res.data);
      });
    await axios
      .post("/api/BoxFoxcon/GetEdit_BoxDet_Detail", {
        dataList: { product: item, boxno: box_no },
      })
      .then((res) => {
        setDataPackLabel(res.data);
        setDataPackLabelbk(res.data);
      });
    hideLoading();
    setIsModalOpen(true);
  };
  const handleSelectAll = (checked) => {
    if (checked) {
      // เลือกทั้งหมด
      setSelectedRows(DataPackLabel.map((item) => item.PACK_ID));
    } else {
      // ยกเลิกการเลือกทั้งหมด
      setSelectedRows([]);
    }
  };

  const handleDelete = async (
    index,
    packId,
    item_no,
    box_no,
    seq_no,
    lot_no,
    product,
    bin,
    status,
    qty
  ) => {
    if (sts_page === "UPDATE") {
      if (status === "DELETE") {
        try {
          await axios.post("/api/BoxFoxcon/DeleteBoxDet_Foxconn", {
            dataList: {
              lot: lot_no,
              item: product,
              boxno: box_no,
              lot_qty: qty,
            },
          });
          await axios.post("/api/BoxFoxcon/DeleteBoxDetDetail_Foxconn", {
            dataList: {
              item: product,
              boxno: box_no,
              lot: lot_no,
              pack_id: packId,
              lot_bin: bin,
            },
          });
          // await axios.post("/api/BoxFoxcon/updateDeleteRejectFoxconn", {
          //   dataList: {
          //     lot: lot_no,
          //   },
          // });
          await axios.post("/api/BoxFoxcon/UpdateSeqDet", {
            dataList: { item: product, boxno: box_no },
          });
          setDataPackLabel((prevData) => {
            const updatedData = prevData.filter(
              (item) => item.PACK_ID !== packId
            );
            const totalQty = updatedData.reduce(
              (sum, item) => sum + (item.QTY || 0),
              0
            );
            // setBoxQty(totalQty);
            return updatedData;
          });
          Swal.fire({
            icon: "success",
            text: "ลบข้อมูลสำเร็จ",
          });
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire({
            icon: "error",
            text: "ลบข้อมูลไม่สำเร็จ",
          });
        }
      } else {
        setDataPackLabel((prevData) => {
          const updatedData = prevData.filter(
            (item) => item.PACK_ID !== packId
          );
          return updatedData;
        });
      }
    } else {
      setDataPackLabel((prevData) => {
        const updatedData = prevData.filter((item) => item.PACK_ID !== packId);
        return updatedData;
      });
    }
  };
  const handleUser = async () => {
    try {
      const response = await axios.get("/api/BoxFoxcon/GetUser", {
        params: { empcode: PackBy.toUpperCase() || "" },
      });
      if (response.data.length > 0) {
        setFistName(response.data[0].F_NAME);
        setSurname(response.data[0].SURNAME);
        let fac_code = response.data[0].FAC;
        await axios
          .post("/api/BoxFoxcon/GetFactoryCode", {
            fac: fac_code,
          })
          .then((res) => {
            setFac(res.data[0].FAC_CODE);
          });
        // setdis_product(false);
        setdis_packlabel(false);
        setTimeout(() => {
          fcPacklabel.current.focus();
        }, 200);
      } else {
        Swal.fire({
          icon: "error",
          text: "ไม่พบข้อมูล User",
        });
        // setdis_product(true);
        setdis_packlabel(false);
        setTimeout(() => {
          fcPackBy.current.focus();
        }, 0);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Swal.fire({
        icon: "error",
        text: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
  };
  const Reset = (status) => {
    if (status == "ResetName") {
      setPackBy("");
      setFistName("");
      setSurname("");
    } else if (status == "Cancel") {
      setProductNew("");
      setBoxNo("");
      setBoxQty("");
      setPacklabel("");
      setDataPackLabel([]);
      setdis_genbox(false);
      setdis_print(true);
      setBoxDate(date);
      setItem("");
      setDataShipTo([]);
      setselectShipTo("");
    } else if (status == "ResetSearch") {
      setProductSeacrh("");
      setLotSearch("");
      setPackDateFrom("");
      setPackDateTo("");
      setBoxSearch("");
      setDataSource([]);
      setSelectProduct("");
    }
  };
  // Product
  const GetProductKey = async () => {
    let item;
    let Max;
    let product = ProductNew.trim();

    // แยกค่าด้วยลูกน้ำ
    let productArrayData = product.split(",");
    let productArray;
    if (productArrayData.length >= 5) {
      productArrayData[5] = productArrayData[5].replace(/^S/, "");
      productArray = productArrayData[5];
    }
    if (productArray.length <= 20) {
      try {
        const response = await axios.get("/api/BoxFoxcon/GetProductKey", {
          params: { product: productArray || "" },
        });
        if (response.data.length > 0) {
          setProductNew(response.data[0].PRD_NAME);
          setdis_packlabel(false);
          // setBoxQty(0);
          setTimeout(() => {
            fcPacklabel.current.focus();
          }, 0);

          const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
            dataList: { fac: Fac, product: productArray || "" },
          });
          if (Prd_id.data.length > 0) {
          }
        } else {
          Swal.fire({
            icon: "error",
            text: "Not Found Product!!",
          });
          setTimeout(() => {
            fcProduct.current.focus();
          }, 0);
          setdis_packlabel(true);
          setProductNew("");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          text: "เกิดข้อผิดพลาดในการดึงข้อมูล",
        });
      }
    } else {
      try {
        const response = await axios.post("/api/BoxFoxcon/GetproductScan", {
          packid: productArray.trim() || "",
        });
        if (response.data.length > 0) {
          const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
            dataList: { fac: Fac, product: response.data[0].ITEM || "" },
          });
          if (Prd_id.data.length > 0) {
            // item = Prd_id.data[0].ITEM;
            // await axios
            //   .post("/api/BoxFoxcon/DataBox_Qty", {
            //     product: item,
            //   })
            //   .then(async (res) => {
            //     if (res.data.length == 0) {
            //       setBoxQty(res.data[0].MAX_QTY);
            //     } else {
            //       await axios
            //         .post("/api/BoxFoxcon/DataPPL_QTYfoxConn", {
            //           product: item,
            //         })
            //         .then((res) => {
            //           setBoxQty(res.data[0].PPI_QTY);
            //         });
            //     }
            //   });
          }
          setProductNew(response.data[0].ITEM);
          setdis_packlabel(false);
          setTimeout(() => {
            fcPacklabel.current.focus();
          }, 300);
        } else {
          Swal.fire({
            icon: "error",
            text: "Not Found Product!!",
          });
          setTimeout(() => {
            fcProduct.current.focus();
          }, 0);
          setProductNew("");
          setdis_packlabel(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Swal.fire({
          icon: "error",
          text: "เกิดข้อผิดพลาดในการดึงข้อมูล",
        });
      }
    }
  };
  /////////////////////
  const GenBoxNo = async (active) => {
    const totalQty = DataPackLabel.reduce(
      (sum, item) => sum + (item.QTY || 0),
      0
    );
    const totalQtyText = Number(totalQty.toLocaleString().replace(/,/g, ""));
    showLoading("กำลังบันทึก....");
    if (BoxQty !== totalQtyText) {
      Swal.fire({
        icon: "error",
        text: "Total Pack ไม่เท่ากับ Box Qty /Qty from scan packing not same box qty!!",
      });
      hideLoading();
      return;
    }
    // else {
    showLoading("กำลังบันทึก....");
    let id_box = "";
    const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
      dataList: { fac: Fac, product: ProductNew.trim() || "" },
    });
    if (Prd_id.data.length > 0) {
      id_box = Prd_id.data[0].ITEM;
      setItem(Prd_id.data[0].ITEM);

      const boxResponse = await axios.post("/api/BoxFoxcon/GetBoxNo", {
        dataList: { fac: Fac, product: Prd_id.data[0].ITEM.trim() || "" },
      });
      if (boxResponse.data.length > 0) {
        // const parsedBoxQty = Number(BoxQty.replace(/,/g, ""));
        setBoxNo(boxResponse.data[0]);
        await axios
          .post("/api/BoxFoxcon/InsertBoxMSTR", {
            dataList: {
              item: id_box,
              boxno: boxResponse.data[0],
              fac1: Fac,
              box_qty: BoxQty,
              box_max_qty: BoxQty,
              packingBy: PackBy.toUpperCase(),
              fac2: Fac,
              datepack: BoxDate == "" ? today : BoxDate,
            },
          })
          .then((res) => {
            if (res.status === 200) {
            } else {
              Swal.fire({
                icon: "error",
                text: "Error inserting BoxMSTR!",
              });
              return;
            }
          })
          .catch((error) => {
            console.error("InsertBoxMSTR error:", error);
            Swal.fire({
              icon: "error",
              text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล BoxMSTR",
            });
            return;
          });

        // ตรวจสอบและดำเนินการในลูป
        for (let i = 0; i < DataPackLabel.length; i++) {
          await axios
            .post("/api/BoxFoxcon/InsertBoxDetail", {
              dataList: {
                item_id: id_box,
                box_no: boxResponse.data[0],
                lot_no: DataPackLabel[i].LOT,
                lotbin: DataPackLabel[i].BIN,
                qty: DataPackLabel[i].QTY,
                pack_id: DataPackLabel[i].PACK_ID,
                packdate: BoxDate == "" ? today : BoxDate,
              },
            })
            .then((res) => {
              if (res.status === 200) {
              } else {
                Swal.fire({
                  icon: "error",
                  text: `Error inserting BoxDet for LOT ${DataPackLabel[i].LOT}!`,
                });
                return;
              }
            })
            .catch((error) => {
              console.error(
                `InsertBoxDet error for LOT ${DataPackLabel[i].LOT}:`,
                error
              );
              Swal.fire({
                icon: "error",
                text: `เกิดข้อผิดพลาดในการบันทึกข้อมูล BoxDet สำหรับ LOT ${DataPackLabel[i].LOT}`,
              });
              return;
            });
        }

        for (let i = 0; i < DataPackLabel.length; i++) {
          await axios
            .post("/api/BoxFoxcon/UpdateBoxDet", {
              dataList: {
                item: id_box,
                boxNo: boxResponse.data[0],
                lotno: DataPackLabel[i].LOT,
                binqty: DataPackLabel[i].QTY,
                packdate: BoxDate == "" ? today : BoxDate,
              },
            })
            .then((res) => {
              if (res.status === 200) {
              } else {
                Swal.fire({
                  icon: "error",
                  text: `Error inserting BoxDet for LOT ${DataPackLabel[i].LOT}!`,
                });
                return;
              }
            })
            .catch((error) => {
              console.error(
                `InsertBoxDet error for LOT ${DataPackLabel[i].LOT}:`,
                error
              );
              Swal.fire({
                icon: "error",
                text: `เกิดข้อผิดพลาดในการบันทึกข้อมูล BoxDet สำหรับ LOT ${DataPackLabel[i].LOT}`,
              });
              return;
            });
          // await axios.post("/api/BoxFoxcon/UpdateAddReject", {
          //   dataList: {
          //     item: id_box,
          //     lot: DataPackLabel[0].LOT,
          //   },
          // });
        }
        setdis_genbox(true);
        setdis_print(false);
        setsts_page("GEN_SUCCESS");
      }
      hideLoading();
      await Search(id_box, BoxNo);
      Swal.fire({
        icon: "success",
        text: "Save Success",
      });
    } else {
      hideLoading();
      Swal.fire({
        icon: "error",
        text: "Not Found Product!!",
      });
    }
    // }
    hideLoading();
  };

  const showModal = () => {
    setTimeout(() => {
      fcPackBy.current.focus();
    }, 300);
    setIsModalOpen(true);
    setPackBy("");
    setFistName("");
    setSurname("");
    setProductNew("");
    setBoxNo("");
    setBoxQty(0);
    setPacklabel("");
    setdis_product(true);
    setdis_packlabel(true);
    setDataPackLabel([]);
    setdis_genbox(false);
    setdis_print(true);
    setsts_page("");
    setBoxDate(date);
    setselectShipTo("");
    setDataShipTo("");
  };
  const GetPackLabel = async () => {
    let pack = Packlabel.trim();
    let packtData = pack.split(",");
    showLoading("");
    if (packtData.length <= 5) {
      setPacklabel("");
      Swal.fire({
        icon: "error",
        text: "Not found data",
      });
      hideLoading();
      return;
    }
    let packlabel = packtData[5].replace(/^S/, ""); //ตัด S ออก
    let productnew = packtData[2].replace(/^M/, ""); // ตัด M ออก เอาแค่ prdocut
    setPacklabel(packtData[5].replace(/^S/, ""));

    if (ProductNew == "") {
      setProductNew(packtData[2].replace(/^M/, "")); // set productnew ครั้งแรก
      handleShipTo(packtData[2].replace(/^M/, ""));
    } else {
      if (packtData[2].replace(/^M/, "") != ProductNew) {
        setPacklabel("");
        Swal.fire({
          icon: "error",
          text: "Product not match !!",
        });
        hideLoading();
        return;
      }
    }
    const totalQty = DataPackLabel.reduce(
      (sum, item) => sum + (item.QTY || 0),
      0
    );
    const totalQtyText = totalQty.toLocaleString();
    const parsedTotal = Number(totalQtyText.replace(/,/g, ""));

    try {
      const response = await axios.post("/api/BoxFoxcon/GetproductScan", {
        packid: packlabel.trim() || "",
      });
      if (response.data.length === 0) {
        Swal.fire({
          icon: "error",
          text: "Not found packing data, Please check packing label !!",
        });
        setPacklabel("");
        setTimeout(() => fcPacklabel.current.focus(), 0);
        hideLoading();
        return;
      }
      const res = await axios.post("/api/BoxFoxcon/GetDataPackLabel", {
        pack_label: packlabel.trim() || "",
      });
      if (res.data.length > 0) {
        Swal.fire({
          text: "This packing exist other box no!!",
          icon: "error",
        });
        setTimeout(() => fcPacklabel.current.focus(), 0);
        hideLoading();
        return;
      }
      if (response.data[0].ITEM !== productnew) {
        Swal.fire({ text: "Product not match", icon: "error" });
        setTimeout(() => fcPacklabel.current.focus(), 0);
        hideLoading();
        return;
      }
      setDataPackLabelbk((prevData) => [
        ...prevData,
        ...response.data.map((item) => ({
          ...item, // ค่าจาก resScan
          PRODUCT: Item_search, // เพิ่ม NAME: ""
          BOX_NO: BoxNo,
        })),
      ]);
      setDataPackLabel((prevData) => {
        const newData = response.data.filter(
          (newItem) =>
            !prevData.some(
              (existingItem) => existingItem.PACK_ID === newItem.PACK_ID
            )
        );

        const totalNewDataQty = newData.reduce(
          (sum, item) => sum + (item.QTY || 0),
          0
        );
        // setBoxQty(totalNewDataQty + parsedTotal);
        // setBoxQty(totalQty)
        // Data สำหรับ UpdateDetail
        const updatedData = [...prevData, ...newData].sort((a, b) =>
          a.LOT.localeCompare(b.LOT)
        );
        // Data สำหรับ UpdateBoxDet
        const DataDet = [newData].sort((a, b) => a.LOT.localeCompare(b.LOT));

        if (sts_page == "UPDATE") {
          async function updateBoxDetails() {
            for (let i = 0; i < DataDet[0].length; i++) {
              try {
                const res = await axios.post("/api/BoxFoxcon/UpdateBoxDet", {
                  dataList: {
                    item: item_box,
                    boxNo: BoxNo,
                    lotno: DataDet[0][i].LOT,
                    binqty: DataDet[0][i].QTY,
                    packdate: BoxDate === "" ? today : BoxDate,
                  },
                });
                if (res.status === 200) {
                } else {
                  Swal.fire({
                    icon: "error",
                    text: "Error UpdateBoxDet",
                  });
                  hideLoading();
                }
              } catch (error) {
                console.error("UpdateBoxDet failed:", error);
                Swal.fire({
                  icon: "error",
                  text: "Error UpdateBoxDet",
                });
                hideLoading();
              }
            }
          }
          // เรียกใช้ฟังก์ชัน updateBoxDetails
          updateBoxDetails();

          updatedData.forEach(async (dataItem) => {
            try {
              await axios.post("/api/BoxFoxcon/UpdateBoxDetDetail", {
                dataList: {
                  item: item_box,
                  boxNo: BoxNo,
                  lotno: dataItem.LOT,
                  binlot: dataItem.BIN,
                  binqty: dataItem.QTY,
                  packdate: BoxDate === "" ? today : BoxDate,
                  packid: dataItem.PACK_ID,
                },
              });
            } catch (error) {
              hideLoading();
              console.error("UpdateBoxDetDetail error:", error);
              Swal.fire({ icon: "error", text: "Error UpdateBoxDetDetail" });
            }
          });
        }
        setdis_print(false);
        hideLoading();
        return updatedData;
      });
      setPacklabel("");
      hideLoading();
    } catch (error) {
      hideLoading();
      console.error("Error fetching data:", error);
      Swal.fire({ icon: "error", text: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
    }
  };

  const GetBoxQty = async (selectProduct, BoxSearch) => {
    setTimeout(() => {
      fcPacklabel.current.focus();
    }, 0);
  };
  const Search = async () => {
    if (
      ProductSeacrh == "" &&
      LotSearch == "" &&
      packDateFrom == "" &&
      packDateTo == "" &&
      BoxSearch == ""
    ) {
      Swal.fire({
        icon: "error",
        text: "กรอกข้อมูลอย่างน้อย 1 ช่อง",
      });
      hideLoading();
      return;
    }
    showLoading("...กำลังค้นหาข้อมูล");
    await axios
      .post("/api/BoxFoxcon/SearchBoxFoxConn", {
        dataList: {
          product: selectProduct.trim() || "",
          lot: LotSearch.trim() || "",
          boxno: BoxSearch.trim() || "",
          datefrom: packDateFrom,
          dateto: packDateTo,
        },
      })
      .then((res) => {
        setDataSource(res.data);
        hideLoading();
      });
  };
  const handleProduct = async (data) => {
    setSelectProduct(data.label);
    await axios
      .post("/api/BoxFoxcon/ddlProduct", {
        product: data.label,
      })
      .then((res) => {
        setProductSeacrh(res.data);
      });
  };
  const SaveBox = async () => {
    const totalQty = DataPackLabel.reduce(
      (sum, item) => sum + (item.QTY || 0),
      0
    );
    showLoading("กำลังบันทึก....");
    await axios
      .post("/api/BoxFoxcon/Update_BoxMSTR", {
        dataList: {
          item: item_box,
          boxno: BoxNo,
          maxqty: BoxQty,
          boxqty: BoxQty,
          packing_By: PackBy.toUpperCase(),
          datepack: BoxDate == "" ? today : BoxDate,
        },
      })
      .then((res) => {
        if (res.status === 200) {
        } else {
          Swal.fire({
            icon: "error",
            text: "Error Update BoxMSTR!",
          });
          return;
        }
      });

    hideLoading();
    Swal.fire({
      icon: "success",
      text: "Save Success",
    });
    await Search(item_box, BoxNo);
  };

  const handleCheckboxChange = (checked, record) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, record.PACK_ID]);
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== record.PACK_ID));
    }
  };
  const handleDeleteSelected = () => {
    // อัปเดตลำดับใหม่หลังจากลบ
    selectedRows.forEach((packId) => {
      const dtIndex = DataPackLabelbk.findIndex(
        (item) => item.PACK_ID === packId
      ); // หา index ปัจจุบัน
      const dtData2 = DataPackLabelbk[dtIndex];
      if (dtData2) {
        // ส่ง index ใหม่หลังการอัปเดต
        handleDelete(
          dtIndex + 1, // ส่ง index ใหม่
          dtData2.PACK_ID,
          dtData2.ITEM,
          dtData2.BOX_NO,
          dtData2.SEQ, // ใช้ SEQ ที่อัปเดตแล้ว
          dtData2.LOT,
          dtData2.PRODUCT,
          dtData2.BIN,
          "DELETE",
          dtData2.QTY
        );
      }
    });
    setSelectedRows([]); // เคลียร์ state หลังจากลบ
  };

  const GetLink = async () => {
    await axios.get("/api/BoxFoxcon/GetLink").then((res) => {
      window.location.href = res.data[0].LINK;
    });
  };
  useEffect(() => {
    GetShipToAll();
  }, []);

  const GetShipToAll = async () => {
    const res = await axios.post("/api/BoxFoxcon/GetShipTo_2", {});
    const arrayB = res.data;
    setDataShipTo(arrayB);
  };

  const handleShipTo = async (ProductNew) => {
    const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
      dataList: { fac: Fac, product: ProductNew.trim() || "" },
    });
    if (Prd_id.data.length > 0) {
      setItem(Prd_id.data[0].ITEM);
      const res_data = await axios.post("/api/BoxFoxcon/GetShipTo", {
        product: Prd_id.data[0].ITEM,
      });
      // setDataShipTo([res_data.data[0]]);
      setselectShipTo(res_data.data[0].value);
      GetShipToAll();
    }
  };
  const handleLinkShipTo = async (data) => {
    await axios.post("/api/BoxFoxcon/GetLinkWH", {}).then((res) => {
      window.location.href =
        res.data[0].LINK +
        `?prditem=${Item}&shipto=${selectShipTo}&box=${BoxNo}`;
    });
  };
  const handleLinkLabel = async () => {
    
    await axios.post("/api/BoxFoxcon/GetLinkLabel", {}).then((res) => {
      console.log(res.data[0].LINK);
     // window.location.href = res.data[0].LINK + `?prditem=${Item}&shipto=${selectShipTo}&box=${BoxNo}`;
    });
  };
  return {
    showModal,
    handleOk,
    handleCancel,
    isModalOpen,
    columns,
    handleUser,
    PackBy,
    setPackBy,
    ProductNew,
    setProductNew,
    BoxNo,
    BoxQty,
    BoxDate,
    setBoxDate,
    Packlabel,
    setPacklabel,
    FistName,
    Surname,
    Reset,
    GetProductKey,
    fcPackBy,
    fcProduct,
    GetPackLabel,
    dis_product,
    dis_packlabel,
    fcPacklabel,
    ProductSeacrh,
    LotSearch,
    setLotSearch,
    packDateFrom,
    setPackDateFrom,
    packDateTo,
    setPackDateTo,
    BoxSearch,
    setBoxSearch,
    DataPackLabel,
    GenBoxNo,
    dis_genbox,
    dis_print,
    Search,
    DataSearch,
    DataSource,
    selectProduct,
    handleProduct,
    sts_page,
    SaveBox,
    handleDeleteSelected,
    selectedRows,
    GetLink,
    handleShipTo,
    selectShipTo,
    setselectShipTo,
    DataShipTo,
    handleLinkShipTo,
    setBoxQty,
    handleLinkLabel,
  };
}

export { fn_BoxFoxcon };
