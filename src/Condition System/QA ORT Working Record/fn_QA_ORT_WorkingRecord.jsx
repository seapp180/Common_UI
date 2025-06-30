import React, { useEffect, useState } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { notification } from "antd";
import { CloseCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { useLoading } from "../../component/loading/fn_loading";

function fn_QA_ORT_WorkingRecord() {
  const { showLoading, hideLoading } = useLoading();
  const [opFactory, setOpFactory] = useState([
    { value: "A1", label: "A1" },
    { value: "N1", label: "N1" },
  ]);
  const [opProduct_Type, setOpProduct_Type] = useState([
    { value: "ALL", label: "ALL" },
    { value: "Bare", label: "Bare" },
    { value: "Assy", label: "Assy" },
  ]);
  const [opInput, setOpInput] = useState([
    { value: "INPUT1", label: "INPUT1" },
    { value: "INPUT2", label: "INPUT2" },
  ]);
  const [opOutput, setOpOutput] = useState([
    { value: "OUTPUT1", label: "OUTPUT1" },
    { value: "OUTPUT2", label: "OUTPUT2" },
  ]);
  const [selectedDateFromIn, setSelectedFromIn] = useState("");
  const [selectedDateFromIn1, setSelectedFromIn1] = useState("");
  const [selectedDateFromIn2, setSelectedFromIn2] = useState("");
  const [selectedDateFromOut, setSelectedFromOut] = useState("");
  const [selectedDateFromOut1, setSelectedFromOut1] = useState("");
  const [selectedDateFromOut2, setSelectedFromOut2] = useState("");
  const [selectedDateToIn, setSelectedToIn] = useState("");
  const [selectedDateToIn1, setSelectedToIn1] = useState("");
  const [selectedDateToIn2, setSelectedToIn2] = useState("");
  const [selectedDateToOut, setSelectedToOut] = useState("");
  const [selectedDateToOut1, setSelectedToOut1] = useState("");
  const [selectedDateToOut2, setSelectedToOut2] = useState("");
  const [drpFactory, setDrpFactory] = useState("A1");
  const [drpProductType, setDrpProductType] = useState("ALL");
  const [drpInPut, setDrpInPut] = useState("");
  const [drpOutPut, setDrpOutPut] = useState("");
  const [inputProductName, setInputProductName] = useState("");
  const [inputTestItem, setInputTestItem] = useState("");
  const [inputLotNo, setInputLotNo] = useState("");
  const [inputWeekNo, setInputWeekNo] = useState("");
  const [inputSerialNo, setInputSerialNo] = useState("");
  const [dataSource, setDataSource] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opProductName, setOpProductName] = useState([]);
  const [drpProductName, setDrpProductName] = useState("");
  const [opItemTest, setOpItemTest] = useState([]);
  const [drpItemTest, setDrpItemTest] = useState("");

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchProductName = async () => {
      try {
        const getProductName = await axios.post(
          "/api/QAORTWorkingRecord/ProductNameQAORTWorkingRecord"
        );

        let data = getProductName.data;
        if (data && data.length > 0) {
          const flatData = data.flat().map((item) => ({
            value: item.PRODUCT_NAME,
            label: item.PRODUCT_NAME,
          }));
          setOpProductName(flatData);
        } else {
          setOpProductName([]);
        }
      } catch (error) {
        console.error("An error occurred in fetchProductName:", error);
        setOpProductName([]);
      }
    };

    const fetchItemTest = async () => {
      try {
        const getItemTest = await axios.post(
          "/api/QAORTWorkingRecord/ItemTestQAORTWorkingRecord"
        );

        let data = getItemTest.data;
        if (data && data.length > 0) {
          const flatData = data.flat().map((item) => ({
            value: item.ITEM_TEST,
            label: item.ITEM_TEST,
          }));
          setOpItemTest(flatData);
        } else {
          setOpItemTest([]);
        }
      } catch (error) {
        console.error("An error occurred in fetchItemTest:", error);
        setOpItemTest([]);
      }
    };

    const Resize = async () => {
      const handleResize = () => {
        const availableHeight = window.innerHeight - 520; 
        setScrollY(availableHeight);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };
    const fetchData = async () => {
      setShowTable(false);
      await Promise.all([Resize(), fetchItemTest(), fetchProductName()]);
    };

    fetchData();
  }, []);

  const Btn_Search = async () => {
    setLoading(true);
    showLoading("กำลังค้นหา กรุณารอสักครู่");
    if (drpFactory.trim() === "" || drpProductType.trim() === "") {
      openNotification("Error");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      return;
    }
    axios
      .post("/api/QAORTWorkingRecord/SearchQAORTWorkingRecord", {
        ptrFactory: drpFactory,
        ptrProductType: drpProductType,
        ptrInput: drpInPut,
        ptrOutput: drpOutPut,
        ptrProductName: drpProductName,
        ptrTestItem: drpItemTest,
        ptrLotNo: inputLotNo,
        ptrWeekNo: inputWeekNo,
        ptrSerialNo: inputSerialNo,
        ptrDateFromIn1: selectedDateFromIn1,
        ptrDateFromIn2: selectedDateFromIn2,
        ptrDateFromOut1: selectedDateFromOut1,
        ptrDateFromOut2: selectedDateFromOut2,
        ptrDateToIn1: selectedDateToIn1,
        ptrDateToIn2: selectedDateToIn2,
        ptrDateToOut1: selectedDateToOut1,
        ptrDateToOut2: selectedDateToOut2,
      })
      .then((res) => {
        let data = res.data;
        if (data.length > 0) {
          setDataSource(data);
          setShowTable(true);
          setLoading(false);
          hideLoading();
        } else {
          openNotification("Warning");
          setDataSource("");
          setShowTable(false);
          setLoading(false);
          hideLoading();
        }
      });
  };

  const Btn_Cancel = async () => {
    setSelectedFromIn1("");
    setSelectedFromIn2("");
    setSelectedFromOut1("");
    setSelectedFromOut2("");
    setSelectedToIn1("");
    setSelectedToIn2("");
    setSelectedToOut1("");
    setSelectedToOut2("");
    setDrpFactory("A1");
    setDrpProductType("ALL");
    setInputProductName("");
    setInputTestItem("");
    setInputLotNo("");
    setInputWeekNo("");
    setInputSerialNo("");
    setDataSource("");
    setDrpProductName("ALL");
    setDrpItemTest("ALL");
    setShowTable(false);
  };

  const Btn_Excel = async () => {
    showLoading("กำลังดาวน์โหลด กรุณารอสักครู่");
    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      await FN_ExportGridView("QA_ORT_working_record" + ".xlsx", dataSource);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      hideLoading();
    }
  };

  const FN_ExportGridView = async (namefile, data) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;

    const dynamicColumns = Object.keys(data[0] || {}).map((key) => ({
      header: key.toUpperCase(),
      key: key,
      width: 10,
      style: { alignment: { horizontal: "center" } },
    }));
    sheet.columns = dynamicColumns;

    if (data.length === 0) {
      const emptyRow = {};
      dynamicColumns.forEach((col) => (emptyRow[col.dataIndex] = "")); // เติมค่าค่าว่าง
      data.push(emptyRow);
    }

    data.forEach((row) => {
      const newRow = sheet.addRow(row);
      newRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { horizontal: "center" };

        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const firstRow = sheet.getRow(1);
    firstRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" },
      };
      cell.font = {
        name: "Roboto",
        size: 9,
        bold: true,
      };

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    sheet.columns.forEach((column) => {
      let maxWidth = column.header.length;
      data.forEach((row) => {
        const cellValue = String(row[column.key] || "");
        maxWidth = Math.max(maxWidth, cellValue.length);
      });
      column.width = maxWidth + 2;
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, `${namefile}`);
    });
  };
  const columns = [
    {
      title: () => <div style={{ textAlign: "center" }}>Factory</div>,
      dataIndex: "factory",
      key: "factory",
      render: (text) => <div style={{ width: "70px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Process</div>,
      dataIndex: "process",
      key: "process",
      render: (text) => <div style={{ width: "70px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Serial No</div>,
      dataIndex: "serial_no",
      key: "serial_no",
      render: (text) => <div style={{ width: "200px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Product Name</div>,
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Lot No</div>,
      dataIndex: "lot_no",
      key: "lot_no",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>QTY</div>,
      dataIndex: "qty",
      key: "qty",
      render: (text) => <div style={{ width: "50px" }}>{text}</div>,
      align: "right",
    },

    {
      title: () => <div style={{ textAlign: "center" }}>Product Type</div>,
      dataIndex: "product_type",
      key: "product_type",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Job Type</div>,
      dataIndex: "job_type",
      key: "job_type",
      render: (text) => <div style={{ width: "180px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Item Test</div>,
      dataIndex: "item_test",
      key: "item_test",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>MC Code</div>,
      dataIndex: "mc_code",
      key: "mc_code",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Test Cycle</div>,
      dataIndex: "test_cycle",
      key: "test_cycle",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Fixture Jig Code</div>,
      dataIndex: "fixture_jig_code",
      key: "fixture_jig_code",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Cavity No</div>,
      dataIndex: "cavity_no",
      key: "cavity_no",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Layer Position</div>,
      dataIndex: "layer_position",
      key: "layer_position",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Cond 1</div>,
      dataIndex: "cond_1",
      key: "cond_1",
      render: (text) => <div style={{ width: "170px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Cond 2</div>,
      dataIndex: "cond_2",
      key: "cond_2",
      render: (text) => <div style={{ width: "250px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Receive Pic</div>,
      dataIndex: "receive_pic",
      key: "receive_pic",
      render: (text) => <div style={{ width: "160px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Receive Date</div>,
      dataIndex: "receive_date",
      key: "receive_date",
      render: (text) => <div style={{ width: "160px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Receive Time</div>,
      dataIndex: "receive_time",
      key: "receive_time",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Input1 Pic</div>,
      dataIndex: "input1_pic",
      key: "input1_pic",
      render: (text) => <div style={{ width: "160px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Input1 Date</div>,
      dataIndex: "input1_date",
      key: "input1_date",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Input1 Time</div>,
      dataIndex: "input1_time",
      key: "input1_time",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output Plan1 Date</div>,
      dataIndex: "output_plan1_date",
      key: "output_plan1_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output Plan1 Time</div>,
      dataIndex: "output_plan1_time",
      key: "output_plan1_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output1 Pic</div>,
      dataIndex: "output1_pic",
      key: "output1_pic",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output1 Date</div>,
      dataIndex: "output1_date",
      key: "output1_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output1 Time</div>,
      dataIndex: "output1_time",
      key: "output1_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Input2 Pic</div>,
      dataIndex: "input2_pic",
      key: "input2_pic",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Input2 Date</div>,
      dataIndex: "input2_date",
      key: "input2_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Input2 Time</div>,
      dataIndex: "input2_time",
      key: "input2_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output Plan2 Date</div>,
      dataIndex: "output_plan2_date",
      key: "output_plan2_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output Plan2 Time</div>,
      dataIndex: "output_plan2_time",
      key: "output_plan2_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output2 Pic</div>,
      dataIndex: "output2_pic",
      key: "output2_pic",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output2 Date</div>,
      dataIndex: "output2_date",
      key: "output2_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Output2 Time</div>,
      dataIndex: "output2_time",
      key: "output2_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Inspection Item</div>,
      dataIndex: "inspection_item",
      key: "inspection_item",
      render: (text) => <div style={{ width: "250px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Inspection Pic</div>,
      dataIndex: "inspection_pic",
      key: "inspection_pic",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Test Result</div>,
      dataIndex: "test_result",
      key: "test_result",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Remark</div>,
      dataIndex: "remark",
      key: "remark",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "left",
    },
  ];

  const openNotification = (Data) => {
    if (Data === "Error") {
      notification.error({
        message: "Unable to search",
        description: "Please fill in factory and product type information.",
        placement: "bottomRight",
        icon: <CloseCircleOutlined style={{ color: "#F32424" }} />,
        duration: 2,
        style: {
          backgroundColor: "#FFC3C3",
        },
      });
    } else if (Data === "Warning") {
      notification.warning({
        message: "No information found",
        description: "Please fill in the information correctly.",
        placement: "bottomRight",
        icon: <WarningOutlined style={{ color: "#E9B824" }} />,
        duration: 2,
        style: {
          backgroundColor: "#FFFAD7",
        },
      });
    }
  };

  return {
    opFactory,
    opProduct_Type,
    opInput,
    opOutput,
    setSelectedFromIn,
    setSelectedFromIn1,
    setSelectedFromIn2,
    selectedDateFromIn,
    selectedDateFromIn1,
    selectedDateFromIn2,
    setSelectedFromOut,
    setSelectedFromOut1,
    setSelectedFromOut2,
    selectedDateFromOut,
    selectedDateFromOut1,
    selectedDateFromOut2,
    setSelectedToIn,
    setSelectedToIn1,
    setSelectedToIn2,
    selectedDateToIn,
    selectedDateToIn1,
    selectedDateToIn2,
    setSelectedToOut,
    setSelectedToOut1,
    setSelectedToOut2,
    selectedDateToOut,
    selectedDateToOut1,
    selectedDateToOut2,
    drpFactory,
    setDrpFactory,
    drpProductType,
    setDrpProductType,
    drpInPut,
    setDrpInPut,
    drpOutPut,
    setDrpOutPut,
    setInputProductName,
    inputProductName,
    inputTestItem,
    setInputTestItem,
    inputLotNo,
    setInputLotNo,
    inputWeekNo,
    setInputWeekNo,
    inputSerialNo,
    setInputSerialNo,
    Btn_Search,
    Btn_Cancel,
    Btn_Excel,
    dataSource,
    columns,
    showTable,
    loading,
    opProductName,
    drpProductName,
    setDrpProductName,
    drpItemTest,
    setDrpItemTest,
    opItemTest,
    scrollY,
  };
}

export { fn_QA_ORT_WorkingRecord };
