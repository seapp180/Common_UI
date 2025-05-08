import React, { useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import axios from "axios";
import { useLoading } from "../../component/loading/fn_loading";
import { EditOutlined } from "@ant-design/icons";
import "../Box Selection By Invoice/BoxInv.css";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function fn_BoxINV() {
  const { showLoading, hideLoading } = useLoading();
  const today = new Date().toISOString().split("T")[0];
  // Page Search
  const [Factory, setFactory] = useState([]);
  const [selectFactory, setselectFactory] = useState("");
  const [InvNo, setInvNo] = useState([]);
  const [selectInvNoFrom, setselectInvNoFrom] = useState("");
  const [selectInvNoTo, setselectInvNoTo] = useState("");
  const [ProductItem, setProductItem] = useState([]);
  const [selectProductItem, setselectProductItem] = useState("");
  const [InvdateFrom, setInvdateFrom] = useState("");
  const [BoxSearch, setBoxSearch] = useState("");
  const [DataSeachBox, setDataSeachBox] = useState([]);
  // Page New
  const [selectFactoryNew, setselectFactoryNew] = useState("");
  const [selectProductItemNew, setselectProductItemNew] = useState("");
  const [Seq, setSeq] = useState("");
  const [selectInvNew, setselectInvNew] = useState("");
  const [InvdateNew, setInvdateNew] = useState(today);
  const [DataSelectBox, setDataSelectBox] = useState([]);
  const [DataBoxDetail, setDataBoxDetail] = useState([]);
  const [Inv_No, setInv_No] = useState("");

  const [showGrid, setshowGrid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setstatus] = useState("");

  // Pagination
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    showLoading("");
    GetFactory();
    hideLoading();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
    setshowGrid(false);
    setstatus("NEW");
    setselectFactoryNew("");
    setDataSelectBox([]);
    setDataBoxDetail([]);
    setselectInvNew("");
    setselectProductItemNew("");
    setInvdateNew("");
    setSeq("");
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCheckboxChange = (checked, record) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, record.BOX_NO]);
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== record.BOX_NO));
    }
  };
  // const TableSelectBox = [
  //   {
  //     title: (
  //       <Checkbox

  //       ></Checkbox>
  //     ),
  //     key: "select",
  //     render: (_, record, index) => (
  //       <Checkbox
  //    ></Checkbox>
  //     ),
  //     align: "center",
  //   },
  //   {
  //     title: "Box No.",
  //     dataIndex: "BOX_NO",
  //     key: "key",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "Packing Date",
  //     dataIndex: "D_DATE",
  //     key: "product",
  //     render: (text, record, index) => {
  //       return text;
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "Quantity",
  //     dataIndex: "QTY",
  //     key: "lotNo",
  //     render: (text, record, index) => {
  //       return text ? text.toLocaleString() : "0";
  //     },
  //     align: "center",
  //   },
  //   {
  //     title: "Inv Box",
  //     dataIndex: "INV_BOX",
  //     key: "bin",
  //     align: "center",
  //     render: (text, record, index) => {
  //       return (
  //         <Input
  //           value={record.INV_BOX || ""} // ใช้ค่า INV_BOX ของ record
  //           style={{ width: "100px", height: "25px" }}
  //           onChange={(e) => {
  //             record.INV_BOX = e.target.value; // อัปเดตค่าใน record
  //             setDataSelectBox((prev) => {
  //               const newData = [...prev];
  //               newData[index] = { ...record }; // อัปเดตแถวที่เปลี่ยนแปลง
  //               return newData;
  //             });
  //           }}
  //         />
  //       );
  //     },
  //   },

  //   {
  //     title: "Status",
  //     dataIndex: "STATUS",
  //     key: "qty",
  //     render: (text, record, index) => {
  //       return text ? text.toLocaleString() : "0";
  //     },
  //     align: "center",
  //   },
  // ];
  const handleSelectAll = (checked) => {
    if (checked) {
      // เลือกทั้งหมด
      setSelectedRows(DataSelectBox.map((item) => item.BOX_NO));
    } else {
      // ยกเลิกการเลือกทั้งหมด
      setSelectedRows([]);
    }
  };
  const TableSelectBox = [
    {
      title: (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={
            selectedRows.length === DataSelectBox.length &&
            DataSelectBox.length > 0
          }
          indeterminate={
            selectedRows.length > 0 &&
            selectedRows.length < DataSelectBox.length
          }
        ></Checkbox>
      ),
      key: "select",
      render: (_, record, index) => (
        <Checkbox
          onChange={(e) =>
            handleCheckboxChange(e.target.checked, record, index)
          }
          checked={selectedRows.includes(record.BOX_NO)}
        />
      ),
      align: "center", width: "50px",
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "key",
      render: (text) => text,
      align: "center",
    },
    {
      title: "Packing Date",
      dataIndex: "D_DATE",
      key: "product",
      render: (text) => text,
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "QTY",
      key: "QTY",
      render: (text) => (text ? text.toLocaleString() : "0"),
      align: "center",
    },
    {
      title: "Inv Box",
      dataIndex: "INV_BOX",
      key: "bin",
      align: "center",
      render: (text, record) => (
        <Input
          value={record.INV_BOX || ""}
          style={{ width: "100px", height: "25px" }}
          onChange={(e) => {
            const value = e.target.value;
            setDataSelectBox((prev) =>
              prev.map((item) =>
                item.BOX_NO === record.BOX_NO
                  ? { ...item, INV_BOX: value }
                  : item
              )
            );
          }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "STATUS",
      key: "qty",
      render: (text) => (text ? text.toLocaleString() : "0"),
      align: "center",
    },
  ];

  const TableBoxNoDetail = [
    {
      title: "Item Code",
      dataIndex: "PRD_ITEM_CODE",
      key: "key",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 130,
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 115,
    },
    {
      title: "Box Qty",
      dataIndex: "BOX_QTY",
      key: "lotNo",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 70,
    },
    {
      title: "Inv Box",
      dataIndex: "INV_BOX",
      key: "bin",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 80,
    },

    {
      title: "No.",
      dataIndex: "SEQ_NO",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 60,
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 100,
    },
    {
      title: "Lot Qty",
      dataIndex: "LOT_QTY",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 100,
    },
  ];

  const TableSearch = [
    {
      title: "Edit",
      dataIndex: "",
      key: "",
      render: (text, record, index) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                  record.FACTORY_CODE,
                  record.INVOICE_NO,
                  record.PRD_ITEM_CODE,
                  "EDIT",
                  record.SEQ,
                  record.POST_DATE,
                  record.BOX_NO
                )
              }
            >
              <EditOutlined style={{ color: "orange" }} />
            </button>
          </div>
        );
      },
      align: "center",
      width: 40,
    },
    {
      title: "No.",
      key: "key",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
      width: 80,
    },

    {
      title: "Invoice No.",
      dataIndex: "INVOICE_NO",
      key: "INVOICE_NO",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 100,
    },
    {
      title: "Invoice Date",
      dataIndex: "INVOICE_DATE",
      key: "INVOICE_DATE",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 150,
    },
    {
      title: "Inv Box",
      dataIndex: "INVOICE_BOX",
      key: "INVOICE_BOX",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 100,
    },
    {
      title: "Item / Product",
      dataIndex: "ITEM",
      key: "ITEM",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 250,
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "BOX_NO",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 150,
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "LOT_NO",
      render: (text, record, index) => {
        return <div className="scrollable-columnInv">{text}</div>;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Packing Date",
      dataIndex: "PACKING_DATE",
      key: "PACKING_DATE",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "STATUS",
      key: "STATUS",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 80,
    },
    {
      title: "Quantity",
      dataIndex: "QUANTITY",
      key: "QUANTITY",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 100,
    },
    {
      title: "Packing By",
      dataIndex: "PACKING_BY",
      key: "PACKING_BY",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
      width: 100,
    },
  ];

  const GetFactory = () => {
    axios
      .get("/api/BoxSelectInv/GetFac")
      .then((res) => {
        setFactory(res.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const handleFactory = (value, type) => {
    if (type === "Search") {
      setselectFactory(value);
      setInvNo([]);
      setselectInvNoFrom("");
      setSeq("");
      setInvdateFrom("");
      setshowGrid(true);
      GetInvoice(value);
    } else if (type === "New") {
      setselectFactoryNew(value);
      setInvNo([]);
      setSeq("");
      setDataSelectBox([]);
      setDataBoxDetail([]);
      setshowGrid(true);
      GetInvoice(value);
    }
  };

  const GetInvoice = (value) => {
    showLoading("");
    axios
      .post("/api/BoxSelectInv/GetInv", {
        fac: value,
      })
      .then((res) => {
        hideLoading();
        setInvNo(res.data);
      })
      .catch((error) => {
        hideLoading();
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const handleInvoice = (value, type) => {
    if (type === "From") {
      setselectInvNoFrom(value);
      setshowGrid(true);
      setProductItem([]);
      setselectProductItem("");
      setSeq("");
      setInvdateFrom("");
      setDataSelectBox([]);
      setDataBoxDetail([]);
      GetProductItem(selectFactory, value);
    } else if (type === "To") {
      setselectInvNoTo(value);
    } else if (type === "New") {
      setselectInvNew(value);
      setProductItem([]);
      setSeq("");
      setInvdateFrom("");
      setDataSelectBox([]);
      setDataBoxDetail([]);
      GetProductItem(selectFactory, value);
      GetDataBoxDetail(value);
    }
  };

  const GetProductItem = (selectFactory, Invoice) => {
    axios
      .post("/api/BoxSelectInv/GetProduct", {
        fac: selectFactory,
        inv: Invoice,
      })
      .then((res) => {
        hideLoading();
        setProductItem(res.data);
      })
      .catch((error) => {
        hideLoading();
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const handleProductItem = (value, type) => {
    if (type == "Search") {
      setshowGrid(true);
      setselectProductItem(value);
    } else if (type == "New") {
      setshowGrid(true);
      setselectProductItemNew(value);
      GetSeqDate(selectFactoryNew, selectInvNew, value);
      GetDataSelectBox(selectInvNew, value, Seq);
    }
  };

  const GetSeqDate = (selectFactory, Invoice, product) => {
    axios
      .post("/api/BoxSelectInv/GetSeq_Date", {
        fac: selectFactory,
        inv: Invoice,
        prd: product,
      })
      .then((res) => {
        setSeq(res.data[0].BOX_SEQ);
        setInvdateNew(res.data[0].POST_DATE);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const GetDataBoxDetail = (Invoice) => {
    axios
      .post("/api/BoxSelectInv/DataBoxDetail", {
        fac: selectFactory,
        inv: Invoice,
      })
      .then((res) => {
        setDataBoxDetail(res.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const GetDataSelectBox = (
    selectInvNoFrom,
    selectProductItem,
    Seq,
    page,
    box_no
  ) => {
    if (page == "EDIT") {
      axios
        .post("/api/BoxSelectInv/DataSelectBoxeEdit", {
          invno: selectInvNoFrom,
          prd: selectProductItem,
          seq: Seq,
          boxno: box_no,
        })
        .then((res) => {
          setDataSelectBox(res.data);
          if (res.data.length > 0) {
            const allBoxNos = res.data.map((item) => item.BOX_NO);
            setSelectedRows(allBoxNos);
          }
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        });
    } else {
      axios
        .post("/api/BoxSelectInv/DataSelectBoxNew", {
          invno: selectInvNoFrom,
          prd: selectProductItem,
          seq: Seq,
        })
        .then((res) => {
          setDataSelectBox(res.data);
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        });
    }
  };

  const Reset = (page) => {
    if (page == "SEARCH") {
      setselectFactory("");
      setselectInvNoFrom("");
      setselectProductItem("");
      setInvdateFrom("");
      setselectInvNoTo("");
      setDataSelectBox([]);
      setDataBoxDetail([]);
      setDataSeachBox([]);
      setshowGrid(false);
    } 
    else if(page == "Cancel") {
     setSelectedRows([]);
     setDataSelectBox((prev) =>
      prev.map((item) => ({
        ...item,
        INV_BOX: "", // ตั้งค่า INV_BOX ให้เป็นค่าว่าง
      }))
    );
    }else {
      setselectFactoryNew("");
      setselectInvNoFrom("");
      setselectProductItemNew("");
      setSeq("");
      setInvdateFrom("");
      setselectInvNew("");
      setDataSelectBox([]);
      setDataBoxDetail([]);
      setInvdateNew("")
    }
  };

  const Search = () => {
    if (
      selectFactory == "" &&
      selectInvNoFrom == "" &&
      selectInvNoTo == "" &&
      selectProductItem == "" &&
      InvdateFrom == ""
    ) {
      Swal.fire({
        icon: "error",
        text: "กรุณากรอกข้อมูลที่ต้องการค้นหา",
      });
      return;
    }
    showLoading("...กำลังค้นหาข้อมูล");
    axios
      .post("/api/BoxSelectInv/Search", {
        prd: selectProductItem || "",
        invfrom: selectInvNoFrom || "",
        invto: selectInvNoTo || "",
        datefrom: InvdateFrom || "",
      })
      .then((res) => {
        setDataSeachBox(res.data);
        hideLoading();
      })
      .catch((error) => {
        hideLoading();
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const Save = async () => {
    const selectedItems = DataSelectBox.filter((item) =>
      selectedRows.includes(item.BOX_NO)
    );
    if (status == "NEW") {
      try {
        if (selectedItems.length === 0) {
          Swal.fire({
            icon: "error",
            text: "กรุณาเลือกข้อมูลที่ต้องการบันทึก",
          });
          return;
        }

        showLoading("กำลังบันทึก...");
        await axios.post("/api/BoxSelectInv/UpdataStatusNew", {
          dataList: selectedItems,
          inv_no: selectInvNew,
          inv_date: InvdateNew,
          seq_no: Seq,
        });
        Swal.fire({
          icon: "success",
          text: "บันทึกข้อมูลสำเร็จ",
        });
        GetDataSelectBox(selectInvNew, selectProductItemNew, Seq);
        GetDataBoxDetail(selectInvNew);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error("Error saving data:", error);
      }
    } else if (status == "EDIT") {
      if (selectedRows.length === 0) {
        await axios.post("/api/BoxSelectInv/UpdataStatusEdit_NotCheck", {
          dataList: DataSelectBox,
          inv_no: selectInvNew,
          seq_no: Seq,
        });
        Swal.fire({
          icon: "success",
          text: "บันทึกข้อมูลสำเร็จ",
        });
        GetDataSelectBox(selectInvNew, selectProductItemNew, Seq, "EDIT", DataSelectBox[0].BOX_NO);
        GetDataBoxDetail(selectInvNew);
      } else if (selectedItems.length > 0) {
        await axios.post("/api/BoxSelectInv/UpdataStatusEdit_Check", {
          dataList: DataSelectBox,
          inv_no: selectInvNew,
          seq_no: Seq,
          date_inv: InvdateNew,
        });
        Swal.fire({
          icon: "success",
          text: "บันทึกข้อมูลสำเร็จ",
        });
      }
    }
  };

  const handle_Edit = async (FAC, INV_NO, PRD, page, seq, date_inv, boxno) => {
    setIsModalOpen(true);
    setshowGrid(true);
    GetDataSelectBox(INV_NO, PRD, seq, "EDIT", boxno);
    setSeq(seq);
    setInvdateNew(date_inv);
    GetProductItem(FAC, INV_NO);
    GetDataBoxDetail(INV_NO);
    setstatus(page);
    setselectFactoryNew(FAC);
    setselectInvNew(INV_NO);
    setselectProductItemNew(PRD);
  };

  const BtnExport = () => {
    exportToExcel(DataBoxDetail, "Box no. Detail");
  };

  const exportToExcel = async (data, namefile) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sheet 1");
    sheet.columns = [
      { header: "Item Code", key: "PRD_ITEM_CODE", width: 20 },
      { header: "Box No", key: "BOX_NO", width: 20 },
      { header: "Box Qty", key: "BOX_QTY", width: 20 },
      { header: "Invoice Box", key: "INV_BOX", width: 20 },
      { header: "No.", key: "SEQ_NO", width: 20 },
      { header: "Lot No.", key: "LOT_NO", width: 20 },
      { header: "Lot Qty", key: "LOT_QTY", width: 20 },
    ];
    data.forEach((item) => {
      sheet.addRow({
        PRD_ITEM_CODE: item.PRD_ITEM_CODE,
        BOX_NO: item.BOX_NO,
        BOX_QTY: item.BOX_QTY,
        INV_BOX: item.INV_BOX,
        SEQ_NO: item.SEQ_NO,
        LOT_NO: item.LOT_NO,
        LOT_QTY: item.LOT_QTY,
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
  return {
    TableSelectBox,
    TableBoxNoDetail,
    Factory,
    selectFactory,
    InvNo,
    selectInvNoFrom,
    ProductItem,
    selectProductItem,
    Seq,
    handleFactory,
    handleInvoice,
    handleProductItem,
    DataBoxDetail,
    DataSelectBox,
    showGrid,
    DataSeachBox,
    InvdateFrom,
    setInvdateFrom,
    Search,
    TableSearch,
    showModal,
    isModalOpen,
    handleOk,
    handleCancel,
    selectFactoryNew,
    selectProductItemNew,
    selectInvNoTo,
    selectInvNew,
    setInvdateNew,
    InvdateNew,
    Save,
    status,
    Reset,
    BtnExport,
    selectedRows
  };
}

export { fn_BoxINV };
