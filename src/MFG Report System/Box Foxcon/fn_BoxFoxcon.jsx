import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function formatDateToMMDDYYYY(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0"); // เพิ่ม 0 ถ้าตัวเลขน้อยกว่า 10
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}
function fn_BoxFoxcon() {
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
  const [dataSource, setDataSource] = React.useState([]);
  const [ProductSeacrh, setProductSeacrh] = React.useState("");
  const [LotSearch, setLotSearch] = React.useState("");
  const [packDateFrom, setPackDateFrom] = React.useState("");
  const [packDateTo, setPackDateTo] = React.useState("");
  const [BoxSearch, setBoxSearch] = React.useState("");
  const [DataPackLabel, setDataPackLabel] = React.useState([]);

  // Focus
  const fcPackBy = useRef([]);
  const fcProduct = useRef([]);
  const fcBoxqty = useRef([]);
  const fcPacklabel = useRef([]);
  // disable
  const [dis_product, setdis_product] = useState(true);
  const [dis_boxqty, setdis_boxqty] = useState(true);
  const [dis_packlabel, setdis_packlabel] = useState(true);
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

  // const dataSource = [
  //   {
  //     key: "1",
  //     product: "RGP-494W-0D",
  //     lotNo: "905012834",
  //     bin: "AA",
  //     packId: "VHK001048347BG250301T000005",
  //     qty: 3255,
  //     packDate: "01/03/2025",
  //   },
  //   {
  //     key: "2",
  //     product: "RGP-494W-0D",
  //     lotNo: "905012834",
  //     bin: "AA",
  //     packId: "VHK001048347BG250301T000006",
  //     qty: 2470,
  //     packDate: "01/03/2025",
  //   },
  //   {
  //     key: "3",
  //     product: "RGP-494W-0D",
  //     lotNo: "905012834",
  //     bin: "AC",
  //     packId: "VHK001048347BG250301T000007",
  //     qty: 37,
  //     packDate: "01/03/2025",
  //   },
  // ];
  const seenProducts = new Set(); // เก็บค่าที่เคยแสดงไปแล้ว
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
        console.log(response.data[0], "DATA");
        setFistName(response.data[0].F_NAME);
        setSurname(response.data[0].SURNAME);
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
    } else if (status == "ResetSearch") {
      set;
    }
  };
  const GetProductKey = async () => {
    console.log(ProductNew.length, "ProductNew.length");
    if (ProductNew.length <= 20) {
      console.log("เข้าน้อยกว่า 20");
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
      console.log("เข้ามากกว่า 20");
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
  const GenBoxNo = async () => {
    console.log(ProductNew, "ProductNew");
    const totalQty = DataPackLabel.reduce(
      (sum, item) => sum + (item.QTY || 0),
      0
    );
    const totalQtyText = totalQty.toLocaleString();
    console.log("Total Quantity:", totalQty, "BoxQty:", BoxQty);
    if (BoxQty !== totalQtyText) {
      Swal.fire({
        icon: "error",
        text: "Qty from scan packing not same box qty!!",
      });
      return;
    } else {
      console.log("Qty from scan packing same box qty!!");
      let id_box = "";
      const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
        dataList: { fac: "5", product: ProductNew.trim() || "" },
      });
      if (Prd_id.data.length > 0) {
        console.log(Prd_id.data[0], "Prd_id.data[0]");
        const boxResponse = await axios.post("/api/BoxFoxcon/GetBoxNo", {
          dataList: { fac: "5", product: Prd_id.data[0].ITEM.trim() || "" },
        });

        if (boxResponse.data.length > 0) {
          setBoxNo(boxResponse.data[0]);
          
        }
      } else {
        Swal.fire({
          icon: "error",
          text: "Not Found Product!!",
        });
      }
    }
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
  };
  const GetPackLabel = async () => {
    console.log(Packlabel.length, "Packlabel.length", Packlabel);
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

        // const Prd_id = await axios.post("/api/BoxFoxcon/GetProductName", {
        //   dataList: { fac: "5", product: response.data[0].ITEM.trim() || "" },
        // });
        // if (Prd_id.data.length > 0) {
        //   console.log(Prd_id.data[0], "Prd_id.data[0]");
        //   const boxResponse = await axios.post("/api/BoxFoxcon/GetBoxNo", {
        //     dataList: { fac: "5", product: Prd_id.data[0].ITEM.trim() || "" },
        //   });

        //   if (boxResponse.data.length > 0) {
        //     setBoxNo(boxResponse.data[0]);
        //     setTimeout(() => {
        //       fcBoxqty.current.focus();
        //     }, 0);
        //   }
        // } else {
        //   Swal.fire({
        //     icon: "error",
        //     text: "Not Found Product!!",
        //   });
        //   setTimeout(() => {
        //     fcProduct.current.focus();
        //   }, 0);
        //   setBoxNo("");
        // }
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
  };
  const GetBoxQty = async () => {
    setTimeout(() => {
      fcPacklabel.current.focus();
    }, 0);
  };
  return {
    handleGoToNextPage,
    showModal,
    handleOk,
    handleCancel,
    isModalOpen,
    dataSource,
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
  };
}

export { fn_BoxFoxcon };
