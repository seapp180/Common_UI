import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import axios from "axios";
import { useLoading } from "../../../component/loading/fn_loading";
import { fn_Header } from "../../../Header/fn_Header";
function fn_T2D_BarCodeConfirm() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dtDataSearch, setDtDataSearch] = useState([]);
  const [popUpdata, setPopUpdata] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const { loginID } = fn_Header();
  useEffect(() => {
    getData("getDtdata", "");
  }, []);
  const handleConfirm = async () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one row");
      return;
    }
    let data = [];
    for (let i = 0; i < selectedRows.length; i++) {
      const response = await getData("UpdateConfirmData", {
        lotNo: selectedRows[i],
        LoginId: loginID,
      });
      console.log(response, "response");
      if (response.message !== "Updated Success") {
        data.push(selectedRows[i]);
      }
    }
    if (data.length > 0) {
      alert("Updated Fail: " + data.join(", "));
    }
    await getData("getDtdata", "");
  };
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSelectModal = async (value) => {
    setIsModalOpen(true);
    getData("getDataPopup", value);
  };
  const data = [
    {
      width: 60,
      align: "center",
      title: (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              const allKeys = dtDataSearch.map((item) => item.lot);
              setSelectedRows(allKeys);
            } else {
              setSelectedRows([]);
            }
          }}
          checked={selectedRows.length === dtDataSearch.length}
        />
      ),
      dataIndex: "lot",
      render: (text, record) => (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows((prev) => [...prev, record.lot]);
            } else {
              setSelectedRows((prev) =>
                prev.filter((key) => key !== record.lot)
              );
            }
          }}
          checked={selectedRows.includes(record.lot)}
        />
      ),
    },
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
        <div className="TextAlignRigth">
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
      title: "Remark",
      align: "center",
      dataIndex: "remark",
      key: "remark",
      // render: () => "A=97%,B=3%,C=0%,D=0%,F=0%",
    },
  ];

  async function getData(type, params) {
    let data = [];

    try {
      if (type == "getDtdata") {
        console.log("getDtdata");
        showLoading("กำลังค้นหา กรุณารอสักครู่");
        const response = await axios.get(
          "/api/Oqc_barcode/getAlldtDataConfirm"
        );
        setDtDataSearch(response.data);
      } else if (type == "getDataPopup") {
        // showLoading("กำลังค้นหา กรุณารอสักครู่");
        const response = await axios.get(
          "/api/Oqc_barcode/getpopUpdataConfirm?strLotNo=" + params
        );
        console.log(response.data);
        setPopUpdata(response.data);
      } else if (type == "UpdateConfirmData") {
        showLoading("กำลังบันทึก กรุณารอสักครู่");
        const response = await axios.post(
          `/api/Oqc_barcode/UpdatedDataConfirm?strLotNo=${params.lotNo}&strLogInid=${params.LoginId}`
        );
        return response.data;
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      console.error(error);
    }
  }
  return {
    columns,
    data,
    dtDataSearch,
    isModalOpen,
    handleCancel,
    popUpdata,
    handleConfirm,
  };
}

export { fn_T2D_BarCodeConfirm };
