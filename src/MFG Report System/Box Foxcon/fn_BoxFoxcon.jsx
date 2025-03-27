import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useLoading } from "../../component/loading/fn_loading";
import { Box } from "lucide-react";
import { da } from "date-fns/locale";

function formatDateToMMDDYYYY(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0"); // เพิ่ม 0 ถ้าตัวเลขน้อยกว่า 10
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
  const navigate = useNavigate();
  const [DataSource, setDataSource] = React.useState([]);
  const [ProductSeacrh, setProductSeacrh] = React.useState([]);
  const [LotSearch, setLotSearch] = React.useState("");
  const [packDateFrom, setPackDateFrom] = React.useState("");
  const [packDateTo, setPackDateTo] = React.useState("");
  const [BoxSearch, setBoxSearch] = React.useState("");
  const [DataPackLabel, setDataPackLabel] = React.useState([]);
  const [Fac, setFac] = React.useState("");
  const [selectProduct, setSelectProduct] = React.useState("");

  // Focus
  const fcPackBy = useRef([]);
  const fcProduct = useRef([]);
  const fcBoxqty = useRef([]);
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
  const handleGoToNextPage = (page) => {
    navigate("/CommonSystem/MFGReportSystem/NewBoxFoxcon", {
      state: { message: item },
    });
  };
  useEffect(() => {
    // GetddlProduct();
  }, []);
  const seenProducts = new Set();
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => {
        return record.key || index + 1;
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          disabled={sts_page === "GEN_SUCCESS"}
          onClick={() => {
       
            handleDelete(
              record.PACK_ID,
              record.ITEM,
              record.BOX_NO,
              record.SEQ,
              record.LOT,
              record.PRODUCT,
              record.BIN,
              "DELETE"
            );
          }}
        />
      ),
    },
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
        return text;
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
      dataIndex: "BIN_QTY",
      key: "qty",
      render: (text, record, index) => {
        return text;
      },
      width: 150,
      align: "center",
    },
    {
      title: "Bin",
      dataIndex: "BIN",
      key: "bin",
      render: (text, record, index) => {
        return text;
      },
      width: 60,
      align: "center",
    },

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
              cursor: "pointer", // เปลี่ยนเมาส์เป็น pointer
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f0f0f0"; // เปลี่ยนสีพื้นหลังเมื่อชี้เมาส์
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white"; // คืนค่าพื้นหลังเดิมเมื่อเมาส์ออก
            }}
            onClick={() =>
              handle_Edit(record.PRODUCT, record.BOX_NO, record.LOT, "UPDATE")
            }
          >
            <EditOutlined />
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
            onClick={() =>
              handleDeleteAll(record.PRODUCT, record.BOX_NO, record.ITEM)
            }
          />
        );
      },
      width: 50,
      align: "center",
    },
    {
      title: "Label",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return <PrinterOutlined />;
      },
      width: 50,
      align: "center",
    },
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
              // ถ้าผู้ใช้กดยืนยัน ให้ส่งคำขอลบ
              axios
                .post("/api/BoxFoxcon/DeleteBoxMaster", {
                  dataList: { item: item_box, box_no: Box_No },
                })
                .then(async (res) => {
                  // ถ้าลบสำเร็จ
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
            }
          });
        }
      });
  };
  const handle_Edit = async (item, box_no, lotno, type) => {
    setsts_page(type);

    setdis_boxqty(false);
    setdis_packlabel(false);
    setdis_genbox(false);
    setdis_product(true);
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
      .post("/api/BoxFoxcon/GetEdit_BoxDet_Detail", {
        dataList: { product: item, boxno: box_no },
      })
      .then((res) => {
        setDataPackLabel(res.data);
      });
    hideLoading();
    setIsModalOpen(true);
  };

  const handleDelete = async (
    packId,
    item_no,
    box_no,
    seq_no,
    lot_no,
    product,
    bin,
    status
  ) => {
    if (sts_page == "UPDATE") {

      if (status == "DELETE") {
        await axios.post("/api/BoxFoxcon/DeleteBoxDet_Foxconn", {
          dataList: {
            seq: seq_no,
            lot: lot_no,
            item: product,
            boxno: box_no,
            pack_id: packId,
            lot_bin: bin,
          },
        });
        await axios.post("/api/BoxFoxcon/updateDeleteRejectFoxconn", {
          dataList: {
            lot: lot_no,
          },
        });
        // await axios.post("/api/BoxFoxcon/DeleteBoxDetDetail_Foxconn", {
        //   dataList: {
        //     item: product,
        //     boxno: box_no,
        //     lot: lot_no,
        //     pack_id: packId,
        //   },
        // });
        await axios.post("/api/BoxFoxcon/UpdateSeqDet", {
          dataList: { item: product, boxno: box_no },
        });
        Swal.fire({
          icon: "success",
          text: " ลบข้อมูลสำเร็จ",
        });
        await axios
      .post("/api/BoxFoxcon/GetEdit_BoxDet_Detail", {
        dataList: { product: item_no, boxno: box_no },
      })
      .then((res) => {
        setDataPackLabel(res.data);
      });
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
        params: { empcode: PackBy || "" },
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
        setdis_product(false);
        setTimeout(() => {
          fcProduct.current.focus();
        }, 0);
      } else {
        Swal.fire({
          icon: "error",
          text: "ไม่พบข้อมูล User",
        });
        setdis_product(true);
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
    } else if (status == "ResetSearch") {
      setProductSeacrh("");
      setLotSearch("");
      setPackDateFrom("");
      setPackDateTo("");
      setBoxSearch("");
      setDataSource([]);
    }
  };
  const GetProductKey = async () => {
    let item;
    let Max;
    if (ProductNew.length <= 20) {
      try {
        const response = await axios.get("/api/BoxFoxcon/GetProductKey", {
          params: { product: ProductNew.trim() || "" },
        });
        if (response.data.length > 0) {
          setProductNew(response.data[0].PRD_NAME);
          setdis_boxqty(false);
          setdis_packlabel(false);
          setTimeout(() => {
            fcBoxqty.current.focus();
          }, 0);

          const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
            dataList: { fac: Fac, product: ProductNew.trim() || "" },
          });
          if (Prd_id.data.length > 0) {
            item = Prd_id.data[0].ITEM;
            await axios
              .post("/api/BoxFoxcon/DataBox_Qty", {
                product: item,
              })
              .then(async (res) => {
                if (res.data.length == 0) {
                  setBoxQty(res.data[0].MAX_QTY);
                } else {
                  await axios
                    .post("/api/BoxFoxcon/DataPPL_QTYfoxConn", {
                      product: item,
                    })
                    .then((res) => {
                      setBoxQty(res.data[0].PPI_QTY);
                    });
                }
              });
          }
        } else {
          Swal.fire({
            icon: "error",
            text: "Not Found Product!!",
          });
          setTimeout(() => {
            fcProduct.current.focus();
          }, 0);
          setdis_boxqty(true);
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
          packid: ProductNew.trim() || "",
        });
        if (response.data.length > 0) {
          const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
            dataList: { fac: Fac, product: response.data[0].ITEM || "" },
          });
          if (Prd_id.data.length > 0) {
            item = Prd_id.data[0].ITEM;
            await axios
              .post("/api/BoxFoxcon/DataBox_Qty", {
                product: item,
              })
              .then(async (res) => {
                if (res.data.length == 0) {
                  setBoxQty(res.data[0].MAX_QTY);
                } else {
                  await axios
                    .post("/api/BoxFoxcon/DataPPL_QTYfoxConn", {
                      product: item,
                    })
                    .then((res) => {
                      setBoxQty(res.data[0].PPI_QTY);
                    });
                }
              });
          }
          setProductNew(response.data[0].ITEM);
          setdis_boxqty(false);
          setdis_packlabel(false);
          setTimeout(() => {
            fcBoxqty.current.focus();
          }, 200);
        } else {
          Swal.fire({
            icon: "error",
            text: "Not Found Product!!",
          });
          setTimeout(() => {
            fcProduct.current.focus();
          }, 0);
          setProductNew("");
          setdis_boxqty(true);
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
    } else {
      showLoading("กำลังบันทึก....");
      let id_box = "";
      const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
        dataList: { fac: Fac, product: ProductNew.trim() || "" },
      });
      if (Prd_id.data.length > 0) {
        id_box = Prd_id.data[0].ITEM;

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
                packingBy: PackBy,
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
              .post("/api/BoxFoxcon/InsertBoxDet", {
                dataList: {
                  item: id_box,
                  boxno: boxResponse.data[0],
                  lot: DataPackLabel[i].LOT,
                  lot_qty: DataPackLabel[i].QTY,
                  packdate: BoxDate == "" ? today : BoxDate,
                  bin_no: DataPackLabel[i].BIN,
                  binqty: DataPackLabel[i].QTY,
                  packdate_bin: BoxDate == "" ? today : BoxDate,
                  packid: DataPackLabel[i].PACK_ID,
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
            await axios.post("/api/BoxFoxcon/UpdateAddReject", {
              dataList: {
                item: id_box,
                lot: DataPackLabel[0].LOT,
              },
            });
          }

          // ตรวจสอบและดำเนินการในลูปที่สอง
          // for (let i = 0; i < DataPackLabel.length; i++) {
          //   await axios
          //     .post("/api/BoxFoxcon/InsertBoxDetail", {
          //       dataList: {
          //         item_id: id_box,
          //         box_no: boxResponse.data[0],
          //         lot_no: DataPackLabel[i].LOT,
          //         lotbin: DataPackLabel[i].BIN,
          //         qty: DataPackLabel[i].QTY,
          //         pack_id: DataPackLabel[i].PACK_ID,
          //         packdate: BoxDate == "" ? today : BoxDate,
          //       },
          //     })
          //     .then((res) => {
          //       if (res.status === 200) {
          //         console.log(
          //           `InsertBoxDetail success for LOT ${DataPackLabel[i].LOT}:`,
          //           res.data
          //         );
          //       } else {
          //         Swal.fire({
          //           icon: "error",
          //           text: `Error inserting BoxDetail for LOT ${DataPackLabel[i].LOT}!`,
          //         });
          //         return;
          //       }
          //     })
          //     .catch((error) => {
          //       console.error(
          //         `InsertBoxDetail error for LOT ${DataPackLabel[i].LOT}:`,
          //         error
          //       );
          //       Swal.fire({
          //         icon: "error",
          //         text: `เกิดข้อผิดพลาดในการบันทึกข้อมูล BoxDetail สำหรับ LOT ${DataPackLabel[i].LOT}`,
          //       });
          //       return;
          //     });
          // }
          setdis_genbox(true);
          setdis_print(false);
          setsts_page("GEN_SUCCESS");
        }
        hideLoading();
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
    }
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
    setBoxQty("");
    setPacklabel("");
    setdis_product(true);
    setdis_boxqty(true);
    setdis_packlabel(true);
    setDataPackLabel([]);
    setdis_genbox(false);
    setdis_print(true);
    setsts_page("");
    setBoxDate(date);
  };
  const GetPackLabel = async () => {
    const currentTime = new Date().toLocaleString();
    console.log(`[${currentTime}] Response data:เข้าแล้ววว`);
    const totalQty = DataPackLabel.reduce((sum, item) => sum + (item.QTY || 0), 0);
    const totalQtyText = totalQty.toLocaleString();
    const parsedTotal = Number(totalQtyText.replace(/,/g, ""));
    const parsedBoxQty = Number(String(BoxQty).replace(/,/g, ""));
    if (Number(BoxQty) == 0 || BoxQty.length == 0) {
      Swal.fire({
        icon: "error",
        text: "Please enter box qty !!",
      }).then(() => {
        setTimeout(() => {
          fcPacklabel.current.focus();
        }, 0);
      });
    } else {
      try {
        const response = await axios.post("/api/BoxFoxcon/GetproductScan", {
          packid: Packlabel.trim() || "",
        });
        if (response.data.length == 0) {
          Swal.fire({
            icon: "error",
            text: "Not found packing data, Please check packing label !!",
          });
          setTimeout(() => {
            fcPacklabel.current.focus();
          }, 0);
          setPacklabel("");
        } else {
          await axios
            .post("/api/BoxFoxcon/GetDataPackLabel", {
              pack_label: Packlabel.trim() || "",
            })
            .then(async (res) => {
              if (res.data.length > 0) {
                Swal.fire({
                  text: "This packing exist other box no!!",
                  icon: "error",
                });
                setTimeout(() => {
                  fcPacklabel.current.focus();
                }, 200);
              } else {
                axios
                  .post("/api/BoxFoxcon/GetproductScan", {
                    packid: Packlabel.trim() || "",
                  })
                  .then((res) => {
                    if (res.data.length > 0) {
                    
                      if (res.data[0].ITEM !== ProductNew) {
                        Swal.fire({
                          text: "Product not match",
                          icon: "error",
                        });
                        setTimeout(() => {
                          fcPacklabel.current.focus();
                        }, 200);
                        return;
                      }
                      console.log(`[${currentTime}] Response data:1 `, res.data);
                      setDataPackLabel((prevData) => {
                     
                        const newData = res.data.filter((newItem) => {
                          const isDuplicate = prevData.some(
                            (existingItem) =>
                              existingItem.PACK_ID === newItem.PACK_ID
                          );
                          return !isDuplicate; s
                        });

                        // คำนวณผลรวม QTY ของ newData
                        const totalNewDataQty = newData.reduce(
                          (sum, item) => sum + (item.QTY || 0),
                          0
                        );

                        // ตรวจสอบว่าผลรวม QTY ของ newData มากกว่า parsedBoxQty หรือไม่
                        if (totalNewDataQty + parsedTotal > parsedBoxQty) {
                          Swal.fire({
                            icon: "error",
                            text: "จำนวน QTY pack มากกว่าจำนวน Box Qty ",
                          }).then(() => {
                            setTimeout(() => {
                              fcPacklabel.current.focus();
                            }, 0);
                          });
                          return prevData; // คืนค่าข้อมูลเดิมโดยไม่เพิ่ม newData
                        }

                        // รวมข้อมูลใหม่กับข้อมูลเดิม
                        const updatedData = [...prevData, ...newData];

                        // จัดเรียงข้อมูลตาม LOT
                        updatedData.sort((a, b) => a.LOT.localeCompare(b.LOT));
                        setPacklabel("");
                        return updatedData;
                      });
                    } else {
                      Swal.fire({
                        text: "No product data found for this packing label!",
                        icon: "error",
                      });
                      setTimeout(() => {
                        fcPacklabel.current.focus();
                      }, 200);
                    }
                  });
              }
            });
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
  const GetBoxQty = async (selectProduct, BoxSearch) => {
    setTimeout(() => {
      fcPacklabel.current.focus();
    }, 0);
  };
  const Search = async () => {
    if(ProductSeacrh == "" &&
      LotSearch == "" && 
      packDateFrom == "" &&
      packDateTo == ""&&
      BoxSearch == ""
    ){
      Swal.fire({
        icon: "error",
        text: "กรอกข้อมูลอย่างน้อย 1 ช่อง",
      });
      hideLoading()
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
    const totalQtyText = Number(totalQty.toLocaleString().replace(/,/g, ""));

    showLoading("กำลังบันทึก....");
    if (BoxQty !== totalQtyText) {
      Swal.fire({
        icon: "error",
        text: "Total Pack ไม่เท่ากับ Box Qty /Qty from scan packing not same box qty!!",
      });
      hideLoading();
      return;
    } else {
      await axios
        .post("/api/BoxFoxcon/Update_BoxMSTR", {
          dataList: {
            item: item_box,
            boxno: BoxNo,
            maxqty: BoxQty,
            boxqty: BoxQty,
            packing_By: PackBy,
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
      for (let i = 0; i < DataPackLabel.length; i++) {
        await axios
          .post("/api/BoxFoxcon/UpdateBoxDet", {
            dataList: {
              item: item_box,
              boxNo: BoxNo,
              lotno: DataPackLabel[i].LOT,
              binqty: DataPackLabel[i].QTY,
              packdate: BoxDate == "" ? today : BoxDate,
              seq: DataPackLabel[i].SEQ,
              bin_no: DataPackLabel[i].BIN,
              binqty: DataPackLabel[i].QTY,
              pack_bin: BoxDate == "" ? today : BoxDate,
              packid: DataPackLabel[i].PACK_ID,
            },
          })
          .then((res) => {
            if (res.status === 200) {
            } else {
              Swal.fire({
                icon: "error",
                text: "Error UpdateBoxDet",
              });
              return;
            }
          })
          .catch((error) => {
            console.error("UpdateBoxMSTR error:", error);
            Swal.fire({
              icon: "error",
              text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล BoxMSTR",
            });
            return;
          });

        // await axios
        //   .post("/api/BoxFoxcon/UpdateBoxDetDetail", {
        //     dataList: {
        //       item: item_box,
        //       boxNo: BoxNo,
        //       lotno: DataPackLabel[i].LOT,
        //       binlot: DataPackLabel[i].BIN,
        //       binqty: DataPackLabel[i].QTY,
        //       packdate: BoxDate == "" ? today : BoxDate,
        //       packid: DataPackLabel[i].PACK_ID,
        //     },
        //   })
        //   .then((res) => {
        //     if (res.status === 200) {
        //       console.log("UpdateBoxMSTR success:", res.data);
        //     } else {
        //       Swal.fire({
        //         icon: "error",
        //         text: "Error Update BoxMSTR!",
        //       });
        //       return;
        //     }
        //   })
        //   .catch((error) => {
        //     console.error("UpdateBoxMSTR error:", error);
        //     Swal.fire({
        //       icon: "error",
        //       text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล BoxMSTR",
        //     });
        //     return;
        //   });
      }
      setdis_print(false);
      hideLoading();
      Swal.fire({
        icon: "success",
        text: "Save Success",
      });
    }
  };

  return {
    handleGoToNextPage,
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
    setBoxNo,
    BoxQty,
    setBoxQty,
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
    fcBoxqty,
    GetPackLabel,
    dis_product,
    dis_boxqty,
    dis_packlabel,
    GetBoxQty,
    fcPacklabel,
    ProductSeacrh,
    setProductSeacrh,
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
    setSelectProduct,
    handleProduct,
    sts_page,
    setBoxDate,
    SaveBox,
  };
}

export { fn_BoxFoxcon };
