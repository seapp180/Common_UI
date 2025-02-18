import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useLoading } from "../../component/loading/fn_loading";

function fn_Export_Supplier_Customer() {
  const { showLoading, hideLoading } = useLoading();
  const [Sl_for, setSl_for] = useState("Supplier");
  const [Add_Date, setAdd_Date] = useState(null);
  const [To_Date, setTo_Date] = useState(null);
  const [ID_Code, setID_Code] = useState("");
  const [Name, setName] = useState("");

  const handleReset =async () => {
    setSl_for("Supplier");
    setAdd_Date(null);
    setTo_Date(null);
    setID_Code("");
    setName("");
  };

  const btn_Export =async  () => {
    if(Add_Date === null || To_Date === null){
      Swal.fire({
        icon: "error",
        title: "Please select date!"
      });
    }else{

    showLoading('Exporting...');
   await axios
      .post("/api/Export_Supplier_Customer/GetdataExport", {
      Sl_for: Sl_for,
      Add_date: Add_Date ? Add_Date.format("YYYY/MM/DD") : '',
      To_date: To_Date ? To_Date.format("YYYY/MM/DD") : '',
      Id_code: ID_Code,
      Name: Name,
      })
      .then(async(res) => {
    
      if (res.data.length > 0) {
        
         await exportToExcel(res.data, columns);
        
         hideLoading();
      } else {
        Swal.fire({
        icon: "error",
        title: "No data found!",
        });
        hideLoading();
      }
      });
    }
    await handleReset();
  };

  const exportToExcel =async (dataHeader, dataColumns) => {
    const filteredColumns = dataColumns.filter(
      (col) => col.title !== "" && col.key !== null && col.title !== undefined
    );

    const headers = filteredColumns.map((col) => col.title);

    const filteredData = dataHeader.map((row) =>
      filteredColumns.map((col) => row[col.dataIndex] || "")
    );

    const wsData = [headers, ...filteredData];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blobData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blobData, "export.xlsx");
   
  };

  const columns = [
    {
      title: "AD_ADDR",
      key: "AD_ADDR",
      dataIndex: "AD_ADDR",
    },
    {
      title: "AD_NAME",
      key: "AD_NAME",
      dataIndex: "AD_NAME",
    },
    {
      title: "AD_SORT",
      key: "AD_SORT",
      dataIndex: "AD_SORT",
    },
    {
      title: "AD_LINE1",
      key: "AD_LINE1",
      dataIndex: "AD_LINE1",
    },
    {
      title: "AD_LINE2",
      key: "AD_LINE2",
      dataIndex: "AD_LINE2",
    },
    {
      title: "AD_CITY",
      key: "AD_CITY",
      dataIndex: "AD_CITY",
    },
    {
      title: "AD_STATE",
      key: "AD_STATE",
      dataIndex: "AD_STATE",
    },
    {
      title: "AD_COUNTRY",
      key: "AD_COUNTRY",
      dataIndex: "AD_COUNTRY",
    },
    {
      title: "AD_ZIP",
      key: "AD_ZIP",
      dataIndex: "AD_ZIP",
    },
    {
      title: "AD_ATTN",
      key: "AD_ATTN",
      dataIndex: "AD_ATTN",
    },
    {
      title: "AD_PHONE",
      key: "AD_PHONE",
      dataIndex: "AD_PHONE",
    },
    {
      title: "AD_ATTN2",
      key: "AD_ATTN2",
      dataIndex: "AD_ATTN2",
    },
    {
      title: "AD_PHONE2",
      key: "AD_PHONE2",
      dataIndex: "AD_PHONE2",
    },
    {
      title: "AD_DATE",
      key: "AD_DATE",
      dataIndex: "AD_DATE",
    },
    {
      title: "VD_CURR",
      key: "VD_CURR",
      dataIndex: "VD_CURR",
    },
    {
      title: "VD_CR_TERMS",
      key: "VD_CR_TERMS",
      dataIndex: "VD_CR_TERMS",
    },
  ];

  return {
    Sl_for,
    setSl_for,
    Add_Date,
    setAdd_Date,
    To_Date,
    setTo_Date,
    ID_Code,
    setID_Code,
    Name,
    setName,
    handleReset,
    btn_Export,
  };
}

export { fn_Export_Supplier_Customer };
