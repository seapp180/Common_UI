import React, { useEffect, useState } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

function fn_QA_ORT_WorkingRecord() {
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
  const [selectedDateFromOut, setSelectedFromOut] = useState("");
  const [selectedDateToIn, setSelectedToIn] = useState("");
  const [selectedDateToOut, setSelectedToOut] = useState("");
  const [drpFactory, setDrpFactory] = useState("");
  const [drpProductType, setDrpProductType] = useState("");
  const [drpInPut, setDrpInPut] = useState("");
  const [drpOutPut, setDrpOutPut] = useState("");
  const [inputProductName, setInputProductName] = useState("");
  const [inputTestItem, setInputTestItem] = useState("");
  const [inputLotNo, setInputLotNo] = useState("");
  const [inputWeekNo, setInputWeekNo] = useState("");
  const [inputSerialNo, setInputSerialNo] = useState("");
  const [dataSource, setDataSource] = useState("");

  const Btn_Search = async () => {
    console.log(
      "Start Btn_Search",
      selectedDateFromIn,
      selectedDateFromOut,
      selectedDateToIn,
      selectedDateToOut,
      drpFactory,
      drpProductType,
      drpInPut,
      drpOutPut,
      inputProductName,
      inputTestItem,
      inputLotNo,
      inputWeekNo,
      inputSerialNo
    );
    axios
      .post("/api/QAORTWorkingRecord/SearchQAORTWorkingRecord", {
        ptrFactory: drpFactory,
        ptrProductType: drpProductType,
        ptrInput: drpInPut,
        ptrOutput: drpOutPut,
        ptrProductName: inputProductName,
        ptrTestItem: inputTestItem,
        ptrLotNo: inputLotNo,
        ptrWeekNo: inputWeekNo,
        ptrSerialNo: inputSerialNo,
        ptrDateFromIn: selectedDateFromIn,
        ptrDateFromOut: selectedDateFromOut,
        ptrDateToIn: selectedDateToIn,
        ptrDateToOut: selectedDateToOut,
      })
      .then((res) => {
        let data = res.data;
        //let data = res.data.flat();
        console.log("data Btn_Search", data);
        setDataSource(data);
      });
  };

  const Btn_Cancel = async () => {
    console.log("Btn_Cancel");
    setSelectedFromIn("");
    setSelectedFromOut("");
    setSelectedToIn("");
    setSelectedToOut("");
    setDrpFactory("");
    setDrpProductType("");
    setDrpInPut("");
    setDrpOutPut("");
    setInputProductName("");
    setInputTestItem("");
    setInputLotNo("");
    setInputWeekNo("");
    setInputSerialNo("");
  };

  const Btn_Excel = async () => {
  console.log("เข้ามาในเงื่อนไขแล้ว : ",dataSource);
   FN_ExportGridView("QA_ORT_working_record" + ".xls", dataSource);
};

const FN_ExportGridView = async (namefile, data) => {
  console.log(data, "FN_ExportGridView", namefile);
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("My Sheet");
  sheet.properties.defaultRowHeight = 20;

  // ดึงชื่อคีย์จาก data[0] เพื่อสร้าง header อัตโนมัติ
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
      render: (text) => <div style={{ width: "70px"  }}>{text}</div>,
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
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Lot No",
      dataIndex: "lot_no",
      key: "lot_no",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
      render: (text) => <div style={{ width: "50px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
      render: (text) => <div style={{ width: "50px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Product Type",
      dataIndex: "product_type",
      key: "product_type",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Job Type",
      dataIndex: "job_type",
      key: "job_type",
      render: (text) => <div style={{ width: "180px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Item Test",
      dataIndex: "item_test",
      key: "item_test",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "MC Code",
      dataIndex: "mc_code",
      key: "mc_code",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Test Cycle",
      dataIndex: "test_cycle",
      key: "test_cycle",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Fixture Jig Code",
      dataIndex: "fixture_jig_code",
      key: "fixture_jig_code",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Cavity No",
      dataIndex: "cavity_no",
      key: "cavity_no",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Layer Position",
      dataIndex: "layer_position",
      key: "layer_position",
      render: (text) => <div style={{ width: "120px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Cond 1",
      dataIndex: "cond_1",
      key: "cond_1",
      render: (text) => <div style={{ width: "170px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Cond 2",
      dataIndex: "cond_2",
      key: "cond_2",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Receive Pic",
      dataIndex: "receive_pic",
      key: "receive_pic",
      render: (text) => <div style={{ width: "160px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Receive Date",
      dataIndex: "receive_date",
      key: "receive_date",
      render: (text) => <div style={{ width: "160px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Receive Time",
      dataIndex: "receive_time",
      key: "receive_time",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Input1 Pic",
      dataIndex: "input1_pic",
      key: "input1_pic",
      render: (text) => <div style={{ width: "160px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Input1 Date",
      dataIndex: "input1_date",
      key: "input1_date",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Input1 Time",
      dataIndex: "input1_time",
      key: "input1_time",
      render: (text) => <div style={{ width: "100px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output Plan1 Date",
      dataIndex: "output_plan1_date",
      key: "output_plan1_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output Plan1 Time",
      dataIndex: "output_plan1_time",
      key: "output_plan1_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output1 Pic",
      dataIndex: "output1_pic",
      key: "output1_pic",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output1 Date",
      dataIndex: "output1_date",
      key: "output1_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output1 Time",
      dataIndex: "output1_time",
      key: "output1_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Input2 Pic",
      dataIndex: "input2_pic",
      key: "input2_pic",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Input2 Date",
      dataIndex: "input2_date",
      key: "input2_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Input2 Time",
      dataIndex: "input2_time",
      key: "input2_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output Plan2 Date",
      dataIndex: "output_plan2_date",
      key: "output_plan2_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output Plan2 Time",
      dataIndex: "output_plan2_time",
      key: "output_plan2_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output2 Pic",
      dataIndex: "output2_pic",
      key: "output2_pic",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output2 Date",
      dataIndex: "output2_date",
      key: "output2_date",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Output2 Time",
      dataIndex: "output2_time",
      key: "output2_time",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Inspection Item",
      dataIndex: "inspection_item",
      key: "inspection_item",
      render: (text) => <div style={{ width: "250px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Inspection Pic",
      dataIndex: "inspection_pic",
      key: "inspection_pic",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Test Result",
      dataIndex: "test_result",
      key: "test_result",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (text) => <div style={{ width: "150px" }}>{text}</div>,
      align: "center",
    },
  ];

  return {
    opFactory,
    opProduct_Type,
    opInput,
    opOutput,
    setSelectedFromIn,
    selectedDateFromIn,
    setSelectedFromOut,
    selectedDateFromOut,
    setSelectedToIn,
    selectedDateToIn,
    setSelectedToOut,
    selectedDateToOut,
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
  };
}

export { fn_QA_ORT_WorkingRecord };







// const ibtExcel_Click = async () => {
//   console.log("เข้ามาในเงื่อนไขแล้ว : ");
//   await axios
//     .post("/api/GetSerialMagazineByLot", {
//       dataList: {
//         strplant_code: plantCode,
//         strlot: txtLotNo.value,
//       },
//     })
//     .then((res) => {
//       let data = res.data.flat().flat();
//       console.log("data ibtExcel_Click", data);
//       setGvScanResult((prevState) => ({
//         ...prevState,
//         value: data,
//       }));
//       FN_ExportGridView("Serail_" + txtLotNo.value + ".xls", data);
//     });
// };

// const FN_ExportGridView = async (namefile, data) => {
//   console.log(data, "hhhhhhhh", namefile);
//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("My Sheet");
//   sheet.properties.defaultRowHeight = 20;

//   // ดึงชื่อคีย์จาก data[0] เพื่อสร้าง header อัตโนมัติ
//   const dynamicColumns = Object.keys(data[0] || {}).map((key) => ({
//     header: key.toUpperCase(),
//     key: key,
//     width: 10,
//     style: { alignment: { horizontal: "center" } },
//   }));
//   sheet.columns = dynamicColumns;

//   if (data.length === 0) {
//     const emptyRow = {};
//     dynamicColumns.forEach((col) => (emptyRow[col.dataIndex] = "")); // เติมค่าค่าว่าง
//     data.push(emptyRow);
//   }

//   data.forEach((row) => {
//     const newRow = sheet.addRow(row);
//     newRow.eachCell({ includeEmpty: true }, (cell) => {
//       cell.alignment = { horizontal: "center" };

//       cell.border = {
//         top: { style: "thin" },
//         left: { style: "thin" },
//         bottom: { style: "thin" },
//         right: { style: "thin" },
//       };
//     });
//   });

//   const firstRow = sheet.getRow(1);
//   firstRow.eachCell({ includeEmpty: true }, (cell) => {
//     cell.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "FFFF00" },
//     };
//     cell.font = {
//       name: "Roboto",
//       size: 9,
//       bold: true,
//     };

//     cell.border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//   });

//   sheet.columns.forEach((column) => {
//     let maxWidth = column.header.length;
//     data.forEach((row) => {
//       const cellValue = String(row[column.key] || "");
//       maxWidth = Math.max(maxWidth, cellValue.length);
//     });
//     column.width = maxWidth + 2;
//   });

//   workbook.xlsx.writeBuffer().then((buffer) => {
//     const blob = new Blob([buffer], { type: "application/octet-stream" });
//     saveAs(blob, `${namefile}`);
//   });
// };
