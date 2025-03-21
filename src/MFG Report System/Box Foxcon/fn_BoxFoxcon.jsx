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
import { set } from "date-fns";

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
  const [BoxDate, setBoxDate] = useState(today);
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
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleGoToNextPage = (page) => {
    console.log(page, "page");
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.PACK_ID)}
        />
      ),
    },
  ];
  const DataSearch = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      render: (text, record, index) => {
        return index + 1;
      },
      width: 30,
      align: "center",
    },
    {
      title: "Product",
      dataIndex: "PRODUCT",
      key: "product",
      render: (text, record, index) => {
        return text;
      },
      width: 150,
      align: "center",
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "BoxNo",
      render: (text, record, index) => {
        return text;
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
        return text ? text.toLocaleString() : "0";
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
      width: 150,
      align: "center",
    },
    {
      title: "Edit",
      dataIndex: "PACK_DATE",
      key: "qty",
      render: (text, record, index) => {
        return <EditOutlined />;
      },
    },
    {
      title: "Delete",
      dataIndex: "PACK_DATE",
      key: "qty",
      render: (text, record, index) => {
        return <DeleteOutlined />;
      },
    },
    {
      title: "Label",
      dataIndex: "PACK_DATE",
      key: "qty",
      render: (text, record, index) => {
        return <PrinterOutlined />;
      },
    },
  ];
  const handleDelete = (packId) => {
    console.log("PACK_ID to delete:", packId);
    console.log("Before delete:", DataPackLabel);
    setDataPackLabel((prevData) => {
      const updatedData = prevData.filter((item) => item.PACK_ID !== packId);
      console.log("After delete:", updatedData);
      return updatedData;
    });
  };
  const handleUser = async () => {
    try {
      const response = await axios.get("/api/BoxFoxcon/GetUser", {
        params: { empcode: PackBy || "" },
      });
      console.log(response.data);
      if (response.data.length > 0) {
        console.log(response.data[0], "DATA1111");
        setFistName(response.data[0].F_NAME);
        setSurname(response.data[0].SURNAME);
        let fac_code = response.data[0].FAC;
        console.log(fac_code, "fac_code");
        await axios
          .post("/api/BoxFoxcon/GetFactoryCode", {
            fac: fac_code,
          })
          .then((res) => {
            console.log(res.data[0].FAC_CODE, "res.data[0].FAC_CODE");
            setFac(res.data[0].FAC_CODE);
          });
        setTimeout(() => {
          fcProduct.current.focus();
        }, 0);
        setdis_product(false);
      } else {
        Swal.fire({
          icon: "error",
          text: "ไม่พบข้อมูล User",
        });
        setTimeout(() => {
          fcPackBy.current.focus();
        }, 0);
        setdis_product(true);
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
    console.log(status, "status");
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
      setBoxDate(today);
    } else if (status == "ResetSearch") {
      set;
    }
  };
  const GetProductKey = async () => {
    if (ProductNew.length <= 20) {
      try {
        const response = await axios.get("/api/BoxFoxcon/GetProductKey", {
          params: { product: ProductNew.trim() || "" },
        });
        if (response.data.length > 0) {
          setProductNew(response.data[0].PRD_NAME);
          setTimeout(() => {
            fcBoxqty.current.focus();
          }, 0);
          setdis_boxqty(false);
          setdis_packlabel(false);
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
          console.log(response.data[0].ITEM, "response.data[0].ITEM");
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
    const totalQtyText = totalQty.toLocaleString();
    showLoading("Processing...");
    if (BoxQty !== totalQtyText) {
      Swal.fire({
        icon: "error",
        text: "Qty from scan packing not same box qty!!",
      });
      hideLoading();
      return;
    } else {
      console.log("Qty from scan packing same box qty!!");
      showLoading("Processing...");
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
          const parsedBoxQty = Number(BoxQty.replace(/,/g, ""));
          setBoxNo(boxResponse.data[0]);
          await axios
            .post("/api/BoxFoxcon/InsertBoxMSTR", {
              dataList: {
                item: id_box,
                boxno: boxResponse.data[0],
                fac1: Fac,
                box_qty: parsedBoxQty,
                box_max_qty: parsedBoxQty,
                packingBy: PackBy,
                fac2: Fac,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("InsertBoxMSTR success:", res.data);
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
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  console.log(
                    `InsertBoxDet success for LOT ${DataPackLabel[i].LOT}:`,
                    res.data
                  );
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

          // ตรวจสอบและดำเนินการในลูปที่สอง
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
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  console.log(
                    `InsertBoxDetail success for LOT ${DataPackLabel[i].LOT}:`,
                    res.data
                  );
                } else {
                  Swal.fire({
                    icon: "error",
                    text: `Error inserting BoxDetail for LOT ${DataPackLabel[i].LOT}!`,
                  });
                  return;
                }
              })
              .catch((error) => {
                console.error(
                  `InsertBoxDetail error for LOT ${DataPackLabel[i].LOT}:`,
                  error
                );
                Swal.fire({
                  icon: "error",
                  text: `เกิดข้อผิดพลาดในการบันทึกข้อมูล BoxDetail สำหรับ LOT ${DataPackLabel[i].LOT}`,
                });
                return;
              });
          }
          setdis_genbox(true);
          setdis_print(false);
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

  const showModal = (page) => {
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
  };
  const GetPackLabel = async () => {
    console.log(Packlabel.length, "Packlabel.length", Packlabel, BoxQty.length);
    
    if (Number(BoxQty) == 0 || BoxQty.length == 0) {
      console.log("Please enter box qty !!");
      Swal.fire({
        icon: "error",
        text: "Please enter box qty !!",
      }).then(() => {
        setTimeout(() => {
          fcPacklabel.current.focus();
        }, 0);
      });
    } else if (Packlabel.length == 0) {
      console.log("Please enter packing label !!");
      Swal.fire({
        icon: "error",
        text: "Please enter packing label !!",
      }).then(() => {
        setTimeout(() => {
          fcPacklabel.current.focus();
        }, 0);
      });
    }
     else {
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
                    console.log(res.data, "DATA_SCAn");
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
                      setDataPackLabel((prevData) => {
                        // กรองข้อมูลใหม่ที่ไม่มี Pack ID ซ้ำ
                        const newData = res.data.filter(
                          (newItem) =>
                            !prevData.some(
                              (existingItem) =>
                                existingItem.PACK_ID === newItem.PACK_ID
                            )
                        );

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
  const GetBoxQty = async () => {
    setTimeout(() => {
      fcPacklabel.current.focus();
    }, 0);
  };
  const Search = async () => {
    console.log(packDateFrom, "packDateFrom");
    console.log(packDateTo, "packDateTo");
    console.log(selectProduct, "ProductSeacrh");
    console.log(LotSearch, "LotSearch");
    console.log(BoxSearch, "BoxSearch");
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
        console.log(res.data, "res.data");
        setDataSource(res.data);
      });
  };
  const handleProduct = async (data) => {
    console.log(data.label, "selectProduct");
    setSelectProduct(data.label);
    await axios
      .post("/api/BoxFoxcon/ddlProduct", {
        product: data.label,
      })
      .then((res) => {
        console.log(res.data, "res.data55");
        setProductSeacrh(res.data);
      });
  };

  // const GetddlProduct = async () => {
  //   // console.log(data.label, "GetddlProduct");
  //   // setSelectProduct(data.label);
  //   await axios
  //   .post("/api/BoxFoxcon/GetddlProduct", {
  //     // product:data.label
  //   })
  //   .then((res) => {
  //     console.log(res.data, "GetddlProduct");
  //     setProductSeacrh(res.data)
  //    });
  // };

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
  };
}

export { fn_BoxFoxcon };
