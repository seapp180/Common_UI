import React, { useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import axios from "axios";
import { useLoading } from "../../component/loading/fn_loading";
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
  const [ProductItem, setProductItem] = useState([]);
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
  // Pagination
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    showLoading("");
    GetFactoryNew();
    hideLoading();
  }, []);

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
      sorter: (a, b) => {
        if (a.BOX_NO < b.BOX_NO) return -1;
        if (a.BOX_NO > b.BOX_NO) return 1;
        return 0;
      },
      sortDirections: ["descend", "ascend"],
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
      filters: [
        { text: "CLOSE", value: "CLOSE" },
        { text: "ACTIVE", value: "ACTIVE" },
      ],
      onFilter: (value, record) => record.STATUS === value,
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
      sorter: (a, b) => {
        if (a.BOX_NO < b.BOX_NO) return -1;
        if (a.BOX_NO > b.BOX_NO) return 1;
        return 0;
      },
      sortDirections: ["descend", "ascend"],
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
      width: 78,
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

  const GetFactoryNew = () => {
    axios
      .get("/api/BoxSelectInv/GetFac")
      .then((res) => {
        setFactoryNew(res.data);
        GetInvoice(res.data[0].value);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const handleFactory = (value) => {
    setselectFactoryNew(value);
    setInvNoNew([]);
    setSeq("");
    setProductItem([]);
    setselectProductItemNew("");
    setDataSelectBox([]);
    setDataBoxDetail([]);
    GetInvoice(value);
  };

  const GetInvoice = (value) => {
    showLoading("");
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
  };

  const handleInvoice = (value) => {
    setselectInvNew(value);
    setProductItem([]);
    setSeq("");
    setselectProductItemNew("");
    setDataSelectBox([]);
    setDataBoxDetail([]);
    if (value.length > 2) {
      GetProductItem(selectFactoryNew, value);
      GetDataBoxDetail(value);
    }
  };

  const GetProductItem = async (selectFactoryNew, Invoice) => {
    axios
      .post("/api/BoxSelectInv/GetProduct", {
        fac: selectFactoryNew,
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

  const handleProductItem = (value) => {
    setselectProductItemNew(value);
    GetSeqDate(selectFactoryNew, selectInvNew, value);
  };

  const GetSeqDate = (selectFactoryNew, Invoice, product) => {
    let datenow = today ? today.format("YYYY-MM-DD") : "";
    axios
      .post("/api/BoxSelectInv/GetSeq_Date", {
        fac: selectFactoryNew,
        inv: Invoice,
        prd: product,
      })
      .then((res) => {
        console.log(res.data.length, "DADADD");
        if (res.data.length == 0) {
          setSeq(1);
          GetDataSelectBox("", product, "");
          setInvdateNew(datenow);
        } else {
          setSeq(res.data[0].BOX_SEQ);
          GetDataSelectBox(Invoice, product, res.data[0].BOX_SEQ);
          setInvdateNew(res.data[0].POST_DATE);
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const GetDataBoxDetail = async (Invoice) => {
    setloadingTb1(true);
    await axios
      .post("/api/BoxSelectInv/DataBoxDetail", {
        fac: selectFactoryNew,
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
    selectInvNew,
    selectProductItem,
    Seq,
  ) => {
    await axios
      .post("/api/BoxSelectInv/GetDataTest", {
        invno: selectInvNew,
        prd: selectProductItem,
        seq: Seq,
      })
      .then((res) => {
        setloadingTb2(false);
        setDataSelectBox(res.data);
        const checkedBoxNos = res.data
          .filter((item) => item.CHECKBOX === 1)
          .map((item) => item.BOX_NO);
        setSelectedRows(checkedBoxNos);
      })
      .catch((error) => {
        setloadingTb2(false);
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };

  const Reset = (page) => {
    if (page == "Cancel") {
      GetDataSelectBox(selectInvNew, selectProductItemNew, Seq);
    } else {
      setselectFactoryNew("");
      setselectProductItemNew("");
      setSeq("");
      setselectInvNew("");
      setDataSelectBox([]);
      setDataBoxDetail([]);
      setInvdateNew("");
    }
  };

  const Save = async () => {
    const checkedStatus = DataSelectBox.map((item) => ({
      ...item,
      checked: selectedRows.includes(item.BOX_NO),
    }));

    // 1. CHECKBOX = 1 และ checked เป็น false
    const checkbox1CheckedFalse = checkedStatus.filter(
      (item) => item.CHECKBOX === 1 && item.checked === false
    );

    // 2. CHECKBOX = 1 และ checked เป็น true
    const checkbox1CheckedTrue = checkedStatus.filter(
      (item) => item.CHECKBOX === 1 && item.checked === true
    );

    // 3. CHECKBOX = 0 และ checked เป็น true
    const checkbox0CheckedTrue = checkedStatus.filter(
      (item) => item.CHECKBOX === 0 && item.checked === true
    );

    try {
      if (checkbox0CheckedTrue.length > 0) {
        try {
          await axios.post("/api/BoxSelectInv/UpdataStatusNew", {
            dataList: checkbox0CheckedTrue,
            inv_no: selectInvNew,
            inv_date: InvdateNew,
            seq_no: Seq,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: "เกิดข้อผิดพลาด (UpdataStatusNew)",
          });
          console.error("Error at UpdataStatusNew:", error);
          return;
        }
      }
      if (checkbox1CheckedFalse.length > 0) {
        try {
          await axios.post("/api/BoxSelectInv/UpdataStatusEdit_NotCheck", {
            dataList: checkbox1CheckedFalse,
            inv_no: selectInvNew,
            seq_no: Seq,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: "เกิดข้อผิดพลาด (UpdataStatusEdit_NotCheck)",
          });
          console.error("Error at UpdataStatusEdit_NotCheck:", error);
          return;
        }
      }
      if (checkbox1CheckedTrue.length > 0) {
        try {
          await axios.post("/api/BoxSelectInv/UpdataStatusEdit_Check", {
            dataList: checkbox1CheckedTrue,
            inv_no: selectInvNew,
            seq_no: Seq,
            date_inv: InvdateNew,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: "เกิดข้อผิดพลาด (UpdataStatusEdit_Check)",
          });
          console.error("Error at UpdataStatusEdit_Check:", error);
          return;
        }
      }

      Swal.fire({
        icon: "success",
        text: "บันทึกข้อมูลสำเร็จ",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "เกิดข้อผิดพลาด",
      });
      console.error("Error at Save:", error);
    }

    GetDataBoxDetail(selectInvNew);
    GetDataSelectBox(selectInvNew, selectProductItemNew, Seq);
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
    ProductItem,
    Seq,
    handleFactory,
    handleInvoice,
    handleProductItem,
    DataBoxDetail,
    DataSelectBox,
    selectFactoryNew,
    selectProductItemNew,
    selectInvNew,
    setInvdateNew,
    InvdateNew,
    Save,
    Reset,
    BtnExport,
    selectedRows,
    FactoryNew,
    InvNoNew,
    loadingTb1,
    loadingTb2,
  };
}

export { fn_BoxINV };
