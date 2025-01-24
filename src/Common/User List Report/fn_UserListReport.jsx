import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ExcelJS from "exceljs";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useLoading } from "../../component/loading/fn_loading";
import { set } from "date-fns";

function fn_UserListReport() {

  const [pnlCheck, setpnlCheck] = useState(false);
  const [CheckMFGProData, setCheckMFGProData] = useState([]);

  //Resign Person
  const [pnlResign, setpnlResign] = useState(false);
  const [selFactory, setselFactory] = useState("");
  const [FactoryData, setFactoryData] = useState([]);
  const [selMonthFrom, setselMonthFrom] = useState("");
  const [selMonthTo, setselMonthTo] = useState("");
  const [selDatefrom, setselDatefrom] = useState("");
  const [selDateTo, setselDateTo] = useState("");
  const [txtEmpID, settxtEmpID] = useState("");
  const [txtName, settxtName] = useState("");
  const [txtSurname, settxtSurname] = useState("");
  const [TbSearch, setTbSearch] = useState(false);
  const [SearchData, setSearchData] = useState([]);

  //MFG/Prp User List
  // const [ListMFGProData, setListMFGProData] = useState([]);
  const factoryRef = useRef(null);

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    GetFactory();
  }, []);

  const GetFactory = async () => {
    await axios.post("/api/UserListReport/GetFactory")
      .then((res) => {
        let data = res.data;
        setFactoryData(data);
        setselFactory("");
      })
      .catch((error) => {
        console.error("Error fetching the URL:", error);
      });
  };

  const StyleonMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateX(10px) scale(1.1)";
    e.currentTarget.style.color = "black";
    e.currentTarget.style.zIndex = 10;
  };

  const StyleonMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateX(0) scale(1)";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.zIndex = 1;
  };

  const CheckMFGProClick = async () => {
    setpnlResign(false);
    btnResetClick();
    showLoading('กำลังโหลด กรุณารอสักครู่');
    await axios.post("/api/UserListReport/GetDataMFG")
      .then((res) => {
        setCheckMFGProData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching the URL:", error);
      });
    setpnlCheck(true);
    hideLoading();
  }

  const columnsCheck = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "ID CODE",
      dataIndex: "EMP_CODE",
      key: "ID CODE",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "ENG NAME",
      dataIndex: "EMP_ENG_NAME",
      key: "ENG NAME",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "THAI NAME",
      dataIndex: "EMP_THA_NAME",
      key: "THAI NAME",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "JOIN DATE",
      dataIndex: "EMP_JOIN_DATE",
      key: "JOIN DATE",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "RESIGN DATE",
      dataIndex: "EMP_TERM_DATE",
      key: "RESIGN DATE",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "LEVEL",
      dataIndex: "EMP_LEVEL",
      key: "LEVEL",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "CC",
      dataIndex: "EMP_COST_CENTER",
      key: "CC",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "CC NAME",
      dataIndex: "EMP_COST_CENTER_NAME",
      key: "CC NAME",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "EMP TYPE",
      dataIndex: "EMP_TYPE",
      key: "EMP TYPE",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "FACTORY",
      dataIndex: "EMP_FACTORY",
      key: "FACTORY",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "MFG USER LOGIN",
      dataIndex: "USER_QAD_LOGIN",
      key: "MFG USER LOGIN",
      align: "center",
      width: "140px",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "MFG USER NAME",
      dataIndex: "USER_QAD_NAME",
      key: "MFG USER NAME",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
    {
      title: "MFG REMARK",
      dataIndex: "USER_QAD_REMARK",
      key: "MFG REMARK",
      align: "center",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "left" }}>
            {text}
          </div>
        );
      },
    },
  ];

  const btnExportClick = async () => {
    let nameFile = '';
    if (CheckMFGProData.length > 0) {
      nameFile = `MFG/Pro User still active.xlsx`;
      exportExcelFile(CheckMFGProData, nameFile);
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 260,
      behavior: 'smooth'
    });
  };
  const exportExcelFile = (data, namefile) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;

    // สร้างคอลัมน์แบบ dynamic
    const dynamicColumns = Object.keys(data[0] || {}).map((key) => ({
      header: key.toUpperCase(), // ทำให้ header เป็นตัวพิมพ์ใหญ่
      key: key,
      width: 10, // กำหนดขนาดความกว้างเริ่มต้น
      style: { alignment: { horizontal: "left" } },
    }));

    sheet.columns = dynamicColumns;

    // ฟอร์แมตวันที่ก่อนเพิ่มลงในข้อมูล
    const formattedData = data.map((row) => ({
      ...row,
      TERMINATE_DATE: row.TERMINATE_DATE ? formatDate(row.TERMINATE_DATE) : "", // ใช้ formatDate กับ TERMINATE_DATE
    }));

    // ถ้าไม่มีข้อมูลก็สร้างแถวว่าง
    if (formattedData.length === 0) {
      const emptyRow = {};
      dynamicColumns.forEach((col) => (emptyRow[col.key] = "")); // เติมค่าค่าว่าง
      formattedData.push(emptyRow);
    }

    // ใส่ข้อมูลลงใน sheet
    formattedData.forEach((row) => {
      const newRow = sheet.addRow(row);
      newRow.eachCell({ includeEmpty: true }, (cell) => {
        // includeEmpty เพื่อให้ทุก cell รวมถึงที่ว่างมีเส้นขอบ
        cell.alignment = { horizontal: "center" };

        // เพิ่มเส้นขอบให้ทุก cell
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // จัดรูปแบบให้แถวแรก (header)
    const firstRow = sheet.getRow(1);
    firstRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" }, // สีพื้นหลังเหลือง
      };
      cell.font = {
        name: "Roboto",
        size: 9,
        bold: true,
      };

      // เพิ่มเส้นขอบให้ header
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // กำหนดความกว้างของคอลัมน์ให้พอดีกับข้อความ
    sheet.columns.forEach((column) => {
      let maxWidth = column.header.length; // เริ่มต้นความกว้างจากความยาวของ header
      formattedData.forEach((row) => {
        const cellValue = String(row[column.key] || ""); // แปลงค่าเป็นสตริง
        maxWidth = Math.max(maxWidth, cellValue.length); // คำนวณความกว้างสูงสุด
      });
      column.width = maxWidth + 2; // เพิ่มขนาดพิเศษเล็กน้อยเพื่อความสบาย
    });

    // สร้างไฟล์ Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, `${namefile}`);
    });
  };


  //MFG/Pro User List

  const MFGProuserlistClick = async () => {
    ExportData();
    setpnlCheck(false);
    setCheckMFGProData([]);
    setpnlResign(false);
    btnResetClick();
  };


  const ExportData = async () => {
    let nameFile = '';
    let ListMFGProData = [];

    await axios.post("/api/UserListReport/GetDataMFGList")
      .then((res) => {
        ListMFGProData = res.data;
      })
      .catch((error) => {
        console.error("Error fetching the URL:", error);
      });
    if (ListMFGProData.length > 0) {
      nameFile = `MFG/Pro User List.xlsx`;
      exportExcelFile(ListMFGProData, nameFile);
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
    }
  };

  //Search Resign Person

  useEffect(() => {
    if (pnlResign && factoryRef.current) {
      setTimeout(() => {
        factoryRef.current.focus();
      }, 0); 
      scrollToTop();
    }
  }, [pnlResign]);

  const ReSidePersonClick = () => {
    setpnlResign(true);
    setpnlCheck(false);
  };

  const handleMonthChange = (value) => {
    const formattedMonthFrom = value ? dayjs(value).format("YYYYMM") : "";
    setselMonthFrom(formattedMonthFrom);
  };

  const handleMonthToChange = (value) => {
    const formattedMonthTo = value ? dayjs(value).format("YYYYMM") : "";
    setselMonthTo(formattedMonthTo);
  };

  const handleDateFromChange = (value) => {
    const formattedDateFrom = value ? dayjs(value).format("YYYYMMDD") : "";
    setselDatefrom(formattedDateFrom);
  };

  const handleDateToChange = (value) => {
    const formattedDateTo = value ? dayjs(value).format("YYYYMMDD") : "";
    setselDateTo(formattedDateTo);
  };

  const btnSearchClick = async () => {
    if (selFactory !== "" && selMonthFrom === ""
      && selMonthTo === "" && selDatefrom === ""
      && selDateTo === "" && txtEmpID === ""
      && txtName === "" && txtSurname === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Cannot search!",
        text: "Please input data in at least one additional field.",
      });
      return;
    }
    if (selFactory === "" && selMonthFrom === ""
      && selMonthTo === "" && selDatefrom === ""
      && selDateTo === "" && txtEmpID === ""
      && txtName === "" && txtSurname === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Cannot search!",
        text: "Please input data in at least one field.",
      });
      return;
    }
    showLoading('กำลังค้นหา กรุณารอสักครู่');
    await axios.post("/api/UserListReport/DataSearch", {
      FormMonth: selMonthFrom,
      ToMonth: selMonthTo,
      FormDate: selDatefrom,
      ToDate: selDateTo,
      Factory: selFactory || "",
      EmpID: txtEmpID,
      Name: txtName,
      Surname: txtSurname
    })
      .then((res) => {
        let data = res.data;
        if (data.length > 0) {
          setSearchData(data);
          console.log(data);
          setTbSearch(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "No Data Found!",
          });
        }
      })
    hideLoading();
  };

  const formatDate = (dateString) => {
    const [datePart, timePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes, secondsWithFraction] = timePart.split(":");

    const seconds = secondsWithFraction.split(".")[0];

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const columnsSearch = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "WORK_LOCATION",
      dataIndex: "WORK_LOCATION",
      key: "WORK_LOCATION",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 130,
    },
    {
      title: "EMPCODE",
      dataIndex: "EMPCODE",
      key: "EMPCODE",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "ENG_NAME",
      dataIndex: "ENG_NAME",
      key: "ENG_NAME",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "THAI_NAME",
      dataIndex: "THAI_NAME",
      key: "THAI_NAME",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "TERMINATE_DATE",
      dataIndex: "TERMINATE_DATE",
      key: "TERMINATE_DATE",
      render: (text, record, index) => {
        return formatDate(text);
      },
      align: "center",
    },
    {
      title: "POS_GRADE",
      dataIndex: "POS_GRADE",
      key: "POS_GRADE",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 90,
    },
    {
      title: "POSITION",
      dataIndex: "POSITION",
      key: "POSITION",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "COST_CENTER",
      dataIndex: "COST_CENTER",
      key: "COST_CENTER",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 110,
    },
    {
      title: "PROCESS",
      dataIndex: "PROCESS",
      key: "PROCESS",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 220,
    },
    {
      title: "V_SECTION",
      dataIndex: "V_SECTION",
      key: "V_SECTION",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "DIVISION",
      dataIndex: "DIVISION",
      key: "DIVISION",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "WORKTYPE",
      dataIndex: "WORKTYPE",
      key: "WORKTYPE",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
  ];

  const btnResetClick = () => {
    setselFactory("");
    setselMonthFrom("");
    setselMonthTo("");
    setselDatefrom("");
    setselDateTo("");
    settxtEmpID("");
    settxtName("");
    settxtSurname("");
    setTbSearch(false);
    setSearchData([]);
  };

  const btnExport_Click = async () => {
    let nameFile = '';
    if (SearchData.length > 0) {
      nameFile = `Resign Person.xlsx`;
      exportExcelFile(SearchData, nameFile);
    } else {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
    }
  };


  return {
    selFactory, setselFactory, FactoryData, CheckMFGProClick, columnsCheck, CheckMFGProData, btnExportClick, pnlCheck, StyleonMouseEnter, StyleonMouseLeave,
    MFGProuserlistClick, selMonthFrom, handleMonthChange, btnSearchClick, columnsSearch, SearchData, handleMonthToChange, selMonthTo, handleDateFromChange, selDatefrom,
    handleDateToChange, selDateTo, txtEmpID, settxtEmpID, txtName, settxtName, txtSurname, settxtSurname, TbSearch, btnResetClick, btnExport_Click, pnlResign, ReSidePersonClick,
    factoryRef
  }
};

export { fn_UserListReport };