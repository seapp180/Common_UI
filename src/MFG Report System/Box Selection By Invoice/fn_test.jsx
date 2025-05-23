import React, { useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import axios from "axios";
import { useLoading } from "../../component/loading/fn_loading";
import { EditOutlined } from "@ant-design/icons";
import "../Box Selection By Invoice/BoxInv.css";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
function fn_BoxINV() {
  const { showLoading, hideLoading } = useLoading();
  const daynow = new Date().toISOString().split("T")[0];
  const today = dayjs(daynow, "YYYY-MM-DD");
  // Page Search
  const [Factory, setFactory] = useState([]);
  const [selectFactory, setselectFactory] = useState("");
  const [InvNo, setInvNo] = useState([]);
  const [selectInvNoFrom, setselectInvNoFrom] = useState("");
  const [selectInvNoTo, setselectInvNoTo] = useState("");
  const [ProductItem, setProductItem] = useState([]);
  const [selectProductItem, setselectProductItem] = useState("");
  const [InvdateFrom, setInvdateFrom] = useState("");
  const [DataSeachBox, setDataSeachBox] = useState([]);
  // Page New
  const [FactoryNew, setFactoryNew] = useState([]);
  const [selectFactoryNew, setselectFactoryNew] = useState("");
  const [selectProductItemNew, setselectProductItemNew] = useState("");
  const [Seq, setSeq] = useState("");
  const [InvNoNew, setInvNoNew] = useState([]);
  const [selectInvNew, setselectInvNew] = useState("");
  const [InvdateNew, setInvdateNew] = useState(today);
  const [DataSelectBox, setDataSelectBox] = useState([]);
  const [DataBoxDetail, setDataBoxDetail] = useState([]);
  const [loadingTb1, setloadingTb1] = useState(false);
  const [loadingTb2, setloadingTb2] = useState(false);
  const [loadingTb3, setloadingTb3] = useState(false);

  const [showGrid, setshowGrid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setstatus] = useState("");

  // Pagination
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    showLoading("");
    GetFactory();
    GetFactoryNew();
    hideLoading();
    
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
    setshowGrid(false);

    setstatus("NEW");
    setselectFactoryNew("");
    setselectInvNew("");
    setselectProductItemNew("");
    setInvdateNew("");
    setSeq("");
    setDataSelectBox([]);
    setDataBoxDetail([]);
    hideLoading();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const onChangeDateFrom = (date, dateString) => {
    setInvdateFrom(date);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setselectFactoryNew("");
    setselectInvNew("");
    setselectProductItemNew("");
    setInvdateNew("");
    setDataBoxDetail([]);
    setDataSelectBox([]);
    setshowGrid(true);
  };

  const handleCheckboxChange = (checked, record) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, record.BOX_NO]);
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== record.BOX_NO));
    }
  };

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
      align: "center",
      width: "50px",
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "key",
      render: (text) => text,
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
      render: (text) => (
        //  text,
        <span style={{ textAlign: "right", display: "block" }}>
          {text ? text.toLocaleString() : "0"}
        </span>
      ),
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
      width: 130,
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "product",
      render: (text, record, index) => {
        return text;
      },
      width: 115,
    },
    {
      title: "Box Qty",
      dataIndex: "BOX_QTY",
      key: "lotNo",
      render: (text, record, index) => (
        <span style={{ textAlign: "right", display: "block" }}>
          {text ? text.toLocaleString() : "0"}
        </span>
      ),
      align: "center",
      width: 70,
    },
    {
      title: "Inv Box",
      dataIndex: "INV_BOX",
      key: "",
      render: (text, record, index) => {
        return text;
      },
      width: 80,
    },

    {
      title: "No.",
      dataIndex: "SEQ_NO",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      width: 60,
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "LOT_NO",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      width: 100,
    },
    {
      title: "Lot Qty",
      dataIndex: "LOT_QTY",
      key: "qty",
      render: (text, record, index) => (
        <span style={{ textAlign: "right", display: "block" }}>
          {text ? text.toLocaleString() : "0"}
        </span>
      ),
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
      width: 100,
    },
    {
      title: "Item / Product",
      dataIndex: "ITEM",
      key: "ITEM",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      width: 280,
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "BOX_NO",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      width: 150,
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "LOT_NO",
      render: (text, record, index) => {
        // return <div className="scrollable-columnInv">{text}</div>;
        return text ? text.toLocaleString() : "0";
      },
      width: 275,
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
        return text;
      },
      width: 80,
    },
    {
      title: "Quantity",
      dataIndex: "QUANTITY",
      key: "QUANTITY",
      render: (text, record, index) => (
        <span style={{ textAlign: "right", display: "block" }}>
          {text ? text.toLocaleString() : "0"}
        </span>
      ),
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
      align: "",
      width: 120,
    },
  ];

  const GetFactory = () => {
    axios
      .get("/api/BoxSelectInv/GetFac")
      .then((res) => {
        setFactory(res.data);
        GetInvoice(res.data[0].value);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const GetFactoryNew = () => {
    axios
      .get("/api/BoxSelectInv/GetFac")
      .then((res) => {
        setFactoryNew(res.data);
        GetInvoice(res.data[0].value, "New");
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
      setProductItem([]);
      setselectProductItem("");
      setshowGrid(true);
      GetInvoice(value);
    } else if (type === "New") {
      setselectFactoryNew(value);
      setInvNoNew([]);
      setSeq("");
      setProductItem([]);
      setselectProductItemNew("");
      setDataSelectBox([]);
      setDataBoxDetail([]);
      setshowGrid(true);
      GetInvoice(value, "New");
    }
  };

  const GetInvoice = (value, page) => {
    showLoading("");
    if (page == "New") {
      axios
        .post("/api/BoxSelectInv/GetInv", {
          fac: value,
        })
        .then((res) => {
          hideLoading();
          setInvNoNew(res.data);
          GetProductItem(value, res.data[0].value);
        })
        .catch((error) => {
          hideLoading();
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        });
    } else {
      axios
        .post("/api/BoxSelectInv/GetInv", {
          fac: value,
        })
        .then((res) => {
          hideLoading();
          setInvNo(res.data);
          GetProductItem(value, res.data[0].value);
        })
        .catch((error) => {
          hideLoading();
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        });
    }
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

  const GetProductItem = async (selectFactory, Invoice) => {
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

  const GetDataBoxDetail = async (Invoice) => {
    setloadingTb1(true);
    await axios
      .post("/api/BoxSelectInv/DataBoxDetail", {
        fac: selectFactory,
        inv: Invoice,
      })
      .then((res) => {
        setDataBoxDetail(res.data);
        setloadingTb1(false);
      })
      .catch((error) => {
        setloadingTb1(false);
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const GetDataSelectBox = async (
    selectInvNoFrom,
    selectProductItem,
    Seq,
    page,
    box_no
  ) => {
    if (page == "EDIT") {
      await axios
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

          setloadingTb2(false);
        })
        .catch((error) => {
          setloadingTb2(false);
          console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
        });
    } else {
      await axios
        .post("/api/BoxSelectInv/DataSelectBoxNew", {
          invno: selectInvNoFrom,
          prd: selectProductItem,
          seq: Seq,
        })
        .then((res) => {
          setloadingTb2(false);
          setDataSelectBox(res.data);
        })
        .catch((error) => {
          setloadingTb2(false);
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
    } else if (page == "Cancel") {
      setDataSelectBox((prev) =>
        prev.map((item) => ({
          ...item,
          INV_BOX: "", // ตั้งค่า INV_BOX ให้เป็นค่าว่าง
        }))
      );
    } else {
      setselectFactoryNew("");
      setselectInvNoFrom("");
      setselectProductItemNew("");
      setSeq("");
      setInvdateFrom("");
      setselectInvNew("");
      setDataSelectBox([]);
      setDataBoxDetail([]);
      setInvdateNew("");
    }
  };

  const Search = async () => {
    setloadingTb3(true);
    let date_from = InvdateFrom ? InvdateFrom.format("YYYY-MM-DD") : "";
    await axios
      .post("/api/BoxSelectInv/Search", {
        prd: selectProductItem || "",
        invfrom: selectInvNoFrom || "",
        invto: selectInvNoTo || "",
        datefrom: date_from || "",
      })
      .then((res) => {
        setDataSeachBox(res.data);
        setloadingTb3(false);
      })
      .catch((error) => {
        setloadingTb3(false);
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
        GetDataSelectBox(
          selectInvNew,
          selectProductItemNew,
          Seq,
          "EDIT",
          DataSelectBox[0].BOX_NO
        );
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
    if (selectFactory != "" || selectInvNoFrom != "") {
      await Search(selectFactory, InvdateFrom);
    }
  };

  const handle_Edit = async (FAC, INV_NO, PRD, page, seq, date_inv, boxno) => {
    setIsModalOpen(true);
    setshowGrid(true);
    setSeq(seq);
    setInvdateNew(date_inv);
    //  GetProductItem(FAC, INV_NO);
    setloadingTb2(true);
    setloadingTb1(true);
    await GetDataBoxDetail(INV_NO);
    await GetDataSelectBox(INV_NO, PRD, seq, "EDIT", boxno);
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
    Seq,
    handleFactory,
    handleInvoice,
    handleProductItem,
    DataBoxDetail,
    DataSelectBox,
    showGrid,
    DataSeachBox,
    InvdateFrom,
    Search,
    TableSearch,
    showModal,
    isModalOpen,
    handleOk,
    handleCancel,
    selectFactoryNew,
    selectProductItemNew,
    selectInvNew,
    setInvdateNew,
    InvdateNew,
    Save,
    status,
    Reset,
    BtnExport,
    selectedRows,
    onChangeDateFrom,
    FactoryNew,
    InvNoNew,
    loadingTb1,
    loadingTb2,
    loadingTb3
  };
}

export { fn_BoxINV };
