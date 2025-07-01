import axios from "axios";
import React, { useState } from "react";
import { useLoading } from "../../../component/loading/fn_loading";
import ExcelJS from "exceljs";

function fn_T2D_BarcodeReport() {
  const { showLoading, hideLoading } = useLoading();
  const [txtproduct, setTxtproduct] = useState("");
  const [txtlotno, setTxtlotno] = useState("");
  const [txtdatefrom, setTxtdatefrom] = useState("");
  const [txtdateto, setTxtdateto] = useState("");
  const [dtDataSearch, setDtDataSearch] = useState([]);
  const [popUpdata, setPopUpdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = async () => {
    showLoading("กำลังค้นหา กรุณารอสักครู่");
    await getData("getAlldata", "");
    hideLoading();
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setTxtproduct("");
    setTxtlotno("");
    setTxtdatefrom("");
    setTxtdateto("");
    setDtDataSearch([]);
    setFocus("txtproduct2DReport");
  };
  const handleSelectModal = async (value) => {
    setIsModalOpen(true);
    getData("getDataPopup", value);
  };
  const handleexportINModal = async () => {
    showLoading("กำลังส่งออก กรุณารอสักครู่");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("2D Barcode Report");
    worksheet.columns = [
      { header: "Product", key: "product", width: 30 },
      { header: "Lot No.", key: "lot", width: 30 },
      { header: "Date", key: "date", width: 30 },
      { header: "No.", key: "no", width: 30 },
      { header: "Serial No.", key: "serial", width: 30 },
      { header: "Grade", key: "grade", width: 30 },
    ];
    popUpdata.forEach((element, index) => {
      worksheet.addRow({
        product: element.product,
        lot: element.lot,
        date: element.date,
        no: index + 1,
        serial: element.serial,
        grade: element.grade,
      });
    });
    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "2D Barcode Report.xlsx";
    a.click();
    hideLoading();

  }
  const handleExport = async () => {
    showLoading("กำลังส่งออก กรุณารอสักครู่");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("2D Barcode Report");
    worksheet.columns = [
      { header: "Date", key: "date", width: 30 },
      { header: "Product", key: "product", width: 30 },
      { header: "Lot No.", key: "lot", width: 30 },
      { header: "Lot Size", key: "lot_size", width: 30 },
      { header: "Sampling Size", key: "sampling_size", width: 30 },
      { header: "Aperture", key: "aperture", width: 30 },
      { header: "Result Good", key: "good", width: 30 },
      { header: "Result NG", key: "ng", width: 30 },
      { header: "Judgement", key: "judgement", width: 30 },
      { header: "Work Shift", key: "shift", width: 30 },
      { header: "Inspector Code", key: "inspector", width: 30 },
      { header: "Confirm By (Leader up)", key: "confirm_by", width: 30 },
      { header: "Remark", key: "remark", width: 50 },
    ];
    dtDataSearch.forEach((element) => {
      worksheet.addRow({
        date: element.date,
        product: element.product,
        lot: element.lot,
        lot_size: element.lot_size,
        sampling_size: element.sampling_size,
        aperture: element.aperture,
        good: element.good,
        ng: element.ng,
        judgement: element.judgement,
        shift: element.shift,
        inspector: element.inspector,
        confirm_by: element.confirm_by,
        remark: "A=97%,B=3%,C=0%,D=0%,F=0%",
      });
    });
    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "2D Barcode Report.xlsx";
    a.click();
    hideLoading();
  }

  function setFocus(txtField) {
    document.getElementById(txtField).focus();
  }
  const data = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      align: "center",
    },
    {
      title: "Lot No.",
      dataIndex: "lot",
      key: "lot",
      align: "center",
      render: (text) => (
        <div className="TextAlignCenter">
          <a
            href={`http://10.17.66.190/smt/rpt_LotTraceView.aspx?lot=${text}`}
            target="#"
          >
            {text}
          </a>
        </div>
      ),
    },
    {
      title: "Lot Size",
      dataIndex: "lot_size",
      key: "lot_size",
      align: "center",
      render: (text) => <div className="TextAlignRigth">{text}</div>,
    },
    {
      title: "Sampling Size",
      dataIndex: "sampling_size",
      key: "sampling_size",
      align: "center",
      render: (text) => <div className="TextAlignRigth">{text}</div>,
    },
    {
      title: "Aperture",
      dataIndex: "aperture",
      key: "aperture",
      align: "center",
      render: (text) => <div className="TextAlignRigth">{text}</div>,
    },
    {
      title: "Result",
      children: [
        {
          title: "Good",
          dataIndex: "good",
          align: "center",
          key: "good",
          render: (text, record) => (
            <div className="TextAlignRigth">
              <a onClick={() => handleSelectModal(record.lot)}>{text}</a>
            </div>
          ),
        },
        {
          title: "NG",
          dataIndex: "ng",
          key: "ng",
          align: "center",
          render: (text) => <div className="TextAlignRigth">{text}</div>,
        },
      ],
    },
    {
      title: "Judgement",
      dataIndex: "judgement",
      key: "judgement",
      align: "center",
    },
    {
      title: "Work Shift",
      dataIndex: "shift",
      key: "shift",
      align: "center",
    },
    {
      title: "Inspector Code",
      dataIndex: "inspector",
      key: "inspector",
      align: "center",
    },
    {
      title: (
        <>
          Confirm By <br /> (Leader up)
        </>
      ),
      dataIndex: "confirm_by",
      key: "confirm_by",
      align: "center",
    },
    {
      title: "Remark",
      align: "center",
      dataIndex: "remark",
      key: "remark",
      // render: () => "A=97%,B=3%,C=0%,D=0%,F=0%",
    },
  ];
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      align: "center",
      render: (text, record, index) => (
        <div className="TextAlignCenter">{index === 0 ? text : ""}</div>
      ),
    },
    {
      title: "Lot No.",
      dataIndex: "lot",
      key: "lot",
      align: "center",
      render: (text, record, index) => (
        <div className="TextAlignCenter">{index === 0 ? text : ""}</div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text, record, index) => (
        <div className="TextAlignCenter">{index === 0 ? text : ""}</div>
      ),
    },
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      align: "center",
      render: (text, record, index) => (
        <div className="TextAlignCenter">{index}</div>
      ),
    },
    {
      title: "Serial No.",
      dataIndex: "serial",
      key: "serial",
      align: "center",
      render: (text, record, index) => (
        <div className="TextAlignLeft">{text}</div>
      ),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
    },
  ];
  async function getData(type, params) {
    let data = [];
    try {
      if (type == "getAlldata") {
        const response = await axios.get(
          `/api/Oqc_barcode/getAlldtDataReport?strLotNo=${txtlotno}&strProduct=${txtproduct}&strDateFrom=${txtdatefrom}&strDateTo=${txtdateto}`
        );
        data = response.data;
        setDtDataSearch(response.data);
      } else if (type == "getDataPopup") {
        showLoading("กำลังค้นหา กรุณารอสักครู่");
        const response = await axios.get(
          "/api/Oqc_barcode/getpopUpdataConfirm?strLotNo=" + params
        );
        setPopUpdata(response.data);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      console.error(error);
    }
  }
  return {
    txtproduct,
    setTxtproduct,
    txtlotno,
    setTxtlotno,
    txtdatefrom,
    setTxtdatefrom,
    txtdateto,
    setTxtdateto,
    handleSearch,
    handleCancel,
    handleExport,
    data,
    dtDataSearch,
    popUpdata,
    isModalOpen,
    handleCancelModal,
    columns,
    handleexportINModal
  };
}

export { fn_T2D_BarcodeReport };
