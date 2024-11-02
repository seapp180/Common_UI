import React, { useEffect, useState } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button, Tag } from "antd";
import { useLoading } from "../../component/loading/fn_loading";

import {
  CloseOutlined,
  SaveOutlined,
  UploadOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
function fn_RDESMasterUpload() {
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [loadingSave, setLoadingSave] = React.useState(false);
  const [SL_Product, setSL_Product] = useState("ALL");
  const [Product, setProduct] = React.useState([]);
  const [DataSearch, setDataSearch] = useState([]);
  const [UploadOpen, setUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dataFile, SetdataFile] = useState([]);
  const [FileName, setFileName] = useState("");
  const [DisableSave, setDisableSave] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    GetProduct();
  }, []);

  const GetProduct = () => {
    axios.post("/api/Common/GetProduct", {}).then((res) => {
      setProduct(res.data);
    });
  };

  const Bt_Search =async () => {
    showLoading('กำลังค้นหา กรุณารอสักครู่');
    setLoadingSearch(true)
    axios
      .post("/api/RDESMasterUpload/Search", { Product: SL_Product })
      .then((res) => {
        setTimeout(() => {
          setLoadingSearch(false)
          setDataSearch(res.data);
          hideLoading();
        }, 1000);
      });
  };

  const GetFileFormat = () => {
    axios
      .post("/api/RDESMasterUpload/FileFormat", {}, { responseType: "blob" })
      .then((res) => {
        console.log(res.data, "GetFileFormat");
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "File_Format.xls");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching file:", error);
      });
  };

  const handleChange = (value) => {
    setSL_Product(value);
  };

  const showPopUp = () => {
    setUploadOpen(true);
  };

  const handlePopUpOk = () => {
    setUploadOpen(false);
    
  };

  const handlePopUpCancel =async () => {
    SetdataFile([])
    setUploadOpen(false);
    setFileName("");
    setSelectedFiles([]);
    document.getElementById("fileInput").value = "";
  };

  const ClearFile = () => {
    setFileName("");
    setSelectedFiles([]);
    document.getElementById("fileInput").value = "";
  };

  const UploadFile = () => {
    setDisableSave(false);
    const productProcessCount = {};

    for (let i = 0; i < selectedFiles.length; i++) {
      const key = `${selectedFiles[i].PRODUCT}-${selectedFiles[i].PROCESS}`;
      if (productProcessCount[key]) {
        productProcessCount[key]++;
      } else {
        productProcessCount[key] = 1;
      }
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      const key = `${selectedFiles[i].PRODUCT}-${selectedFiles[i].PROCESS}`;
  
      if (productProcessCount[key] > 1) {
        setDisableSave(true);
        selectedFiles[i].REMARK = "ข้อมูล Product และ Process ซ้ำ ภายในไฟล์";
      } else if (selectedFiles[i].PRODUCT === "") {
        setDisableSave(true);
        selectedFiles[i].REMARK = "ไม่พบ Product";
      } else if (selectedFiles[i].PROCESS === "") {
        setDisableSave(true);
        selectedFiles[i].REMARK = "ไม่พบ Process";
      } else {
        selectedFiles[i].REMARK = "";
      }
    }
  
    SetdataFile(selectedFiles);
    console.log(selectedFiles, "Check");
  };

  const handleFileUpload = (event) => {
    setSelectedFiles([]);
    const files = Array.from(event.target.files);
    const validFiles = files.filter(
      (file) => file.name.endsWith(".xlsx") || file.name.endsWith(".xls")
    );
    if (validFiles.length > 0) {
      setFileName(validFiles.map((file) => file.name));
      readExcelData(validFiles[0]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Please upload .xlsx or .xls files.",
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(
      (file) => file.name.endsWith(".xlsx") || file.name.endsWith(".xls")
    );

    if (validFiles.length > 0) {
      console.log("mamamamam", validFiles);
      setFileName(validFiles.map((file) => file.name));
      readExcelData(validFiles[0]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Please drop .xlsx or .xls files.",
      });
    }
  };

  const readExcelData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
  
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      const filteredData = jsonData
        .map((row) =>
          row.map((cell) =>
            cell === null || cell === undefined || cell === "" ? "" : cell
          )
        )
        .filter((row) => row.some((cell) => cell !== ""));
  
      console.log(filteredData, "filteredData");
  
      const datajson = filteredData.slice(1).map((row) => ({
        PRODUCT: row[1] || "",
        PROCESS: row[2] || "",
        MACHINE: row[3] || "-",
        CHAMBER: row[4] || "",
        MODE: row[5] || "",
        HOLDING: row[6] || "",
        REMARK: "",
      }))
      // กรองเฉพาะแถวที่มี PRODUCT และ PROCESS ไม่เป็นค่าว่าง
      .filter((row) => row.PRODUCT !== "" || row.PROCESS !== "")
  
      setSelectedFiles(datajson);
      console.log(datajson, "datajson");
    };
  
    reader.readAsArrayBuffer(file);
  };
  
  const Btn_Delete = async (Product, Process) => {

    console.log(Product, Process,'BTN_DEL')
    axios.post("/api/RDESMasterUpload/DeleteUploadFile", {        
      Product: Product,
      Process: Process
    })
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: 'Delete Completed',
       
      });
      Bt_Search()
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: err.message,
       
      });
      console.error(err);
    });
  
  };
  

  const Save = async () => {
    let Error = "";
    showLoading('กำลังบันทึก กรุณารอสักครู่');
    setLoadingSave(true)
    try {
      for (let i = 0; i < dataFile.length; i++) {
        console.log('SaveFile', dataFile[i]);
  
      
        const deleteRes = await axios.post("/api/RDESMasterUpload/DeleteUploadFile", {
          Product: dataFile[i].PRODUCT,
          Process: dataFile[i].PROCESS,
        });
  
        if (deleteRes.data !== "") {
          console.log('Delete', deleteRes.data);
          Error = deleteRes.data;
          break; 
        }

        const insertRes = await axios.post("/api/RDESMasterUpload/InsUploadFile", {
          Product: dataFile[i].PRODUCT,
          Process: dataFile[i].PROCESS,
          Machine: dataFile[i].MACHINE,
          Chamber: dataFile[i].CHAMBER,
          Mode: dataFile[i].MODE,
          Holding: dataFile[i].HOLDING,
        });
  
        if (insertRes.data !== "") {
          Error = insertRes.data;
          break;
        }
      }
     
      if (Error !== '') {
        Swal.fire({
          icon: "error",
          title: Error,
        });
        setLoadingSave(false)
        hideLoading();
      } else {
        Swal.fire({
          icon: "success",
          title: "Save Completed",
        });
        setLoadingSave(false)
        hideLoading();
        await handlePopUpCancel()
        await Bt_Search()
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title:  err.message,
      });
      console.error(err);
      setLoadingSave(false)
      hideLoading();
      
    }
  };
  

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      render: (text, record, index) => {
        text = index + 1;
        return text
      },
      align: "center",
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "PRODUCT",
      key: "Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Process",
      dataIndex: "PROCESS",
      key: "Process.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 150,
    },
    {
      title: "Machine",
      dataIndex: "MACHINE",
      key: "Machine",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Chamber",
      dataIndex: "CHAMBER",
      key: "Chamber",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 80,
    },
    {
      title: "Mode",
      dataIndex: "MODE",
      key: "Mode",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 70,
    },
    {
      title: "Holding Process",
      dataIndex: "HOLDING",
      key: "Holding Process",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record, index) => {
        console.log(record,'record')
        text = (
          <Button
            icon={<CloseOutlined style={{ color: "red" }} />}
            onClick={() => Btn_Delete(record.PRODUCT,record.PROCESS)}
            size="large"
          ></Button>
        );
        return text;
      },
      width: 50,
    },
  ];

  const columnsUpload = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "PRODUCT",
      key: "Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Process",
      dataIndex: "PROCESS",
      key: "Process.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 150,
    },
    {
      title: "Machine",
      dataIndex: "MACHINE",
      key: "Machine",
      render: (text, record, index) => {
        return text === "" ? "-" : text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Chamber",
      dataIndex: "CHAMBER",
      key: "Chamber",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 80,
    },
    {
      title: "Mode",
      dataIndex: "MODE",
      key: "Mode",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 70,
    },
    {
      title: "Holding Process",
      dataIndex: "HOLDING",
      key: "Holding Process",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Remark",
      dataIndex: "REMARK",
      key: "Remark",
      align: "center",
      render: (text, record, index) => {
        return text !== "" ? (
          <Tag color="#B8001F" style={{ fontSize: "14px" }}>
            {text}
          </Tag>
        ) : null;
      },
      width: 70,
    },
  ];

  const BtnExport = async () => {
    let nameFile=''
    if (DataSearch.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
    } else {
      nameFile='Export.xls'
      
      exportExcelFile(columns,DataSearch, nameFile);
    }
  };

  const exportExcelFile = (HeaderColumn, data, namefile) => {
    console.log(HeaderColumn, 'hhhhhhhh');
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;
  
    const columnsToExclude = ["No", ""];

    // กรองคอลัมน์ที่ไม่ต้องการออกจาก HeaderColumn
    const filteredColumns = HeaderColumn.filter(
      (col) => !columnsToExclude.includes(col.dataIndex)
    );

    const dynamicColumns = [
      { header: "NO", key: "no", width: 5 }, // คอลัมน์ลำดับ
      ...filteredColumns.map((col) => ({
        header: col.title.toUpperCase(),
        key: col.dataIndex,
        width: 10,
        style: { alignment: { horizontal: "center" } },
      })),
    ];
  
    sheet.columns = dynamicColumns;
  
    if (data.length === 0) {
      const emptyRow = {};
      dynamicColumns.forEach((col) => (emptyRow[col.key] = ""));
      data.push(emptyRow);
    }
  
    data.forEach((row, index) => {
      const newRowData = { no: index + 1, ...row }; // ใส่ลำดับให้แต่ละแถว
      const newRow = sheet.addRow(newRowData);
  
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
  

  return {
    SL_Product,
    handleChange,
    columns,
    Product,
    DataSearch,
    GetFileFormat,
    Bt_Search,
    showPopUp,
    handlePopUpOk,
    handlePopUpCancel,
    UploadOpen,
    handleFileUpload,
    FileName,
    handleDrop,
    ClearFile,
    UploadFile,
    
    columnsUpload,
    dataFile,
    Save,
    DisableSave,
    loadingSearch,
    loadingSave,
    BtnExport
  };
}

export { fn_RDESMasterUpload };
