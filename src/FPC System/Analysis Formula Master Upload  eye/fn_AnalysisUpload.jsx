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
  EditOutlined,
} from "@ant-design/icons";

function fn_AnalysisUpload() {
  const [Unit, setUnit] = useState({Search:[],Edit:[],PopUp:[],disabled:false});
  const [Process, setProcess] = useState({Search:[],Edit:[],PopUp:[]});
  const [Machine, setMachine] = useState({Search:[],Edit:[],PopUp:[]});
  const [Bath, setBath] = useState({Search:[],Edit:[],PopUp:[]});
  const [Ch, setCh] = useState({Search:[],Edit:[],PopUp:[]});

  const [SL_Ch, setSL_Ch] = useState(null);
  const [SL_Bath, setSL_Bath] = useState(null);
  const [SL_Machine, setSL_Machine] = useState(null);
  const [SL_Process, setSL_Process] = useState(null);
  const [SL_Unit, setSL_Unit] = useState(null);
  const [DataSearch, setDataSearch] = useState([]);
  const [UploadOpen, setUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dataFile, SetdataFile] = useState([]);
  const [FileName, setFileName] = useState("");
  const [DisableSave, setDisableSave] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [SL_UnitPopUp, setSL_UnitPopUp] = useState(null);
  const [SL_ProcessPopUp, setSL_ProcessPopUp] = useState(null);
  const [SL_MCPopUp, setSL_MCPopUp] = useState(null);


  const { showLoading, hideLoading } = useLoading();
  const [openedit, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  //Edit
  const [Unit2, setUnit2] = useState([]);
  const [Target, setTarget] = useState([]);
  const [LCL, setLCL] = useState([]);
  const [UCL, setUCL] = useState([]);
  const [LSL, setLSL] = useState([]);
  const [USL, setUSL] = useState([]);
  const [Formula, setFormula] = useState([]);
  const [Refer1, setRefer1] = useState([]);
  const [Refer2, setRefer2] = useState([]);
  const [Input_value, setInput_value] = useState([]);
  const [Seq, setSeq] = useState([]);
  const [Replenisher, setReplenisher] = useState([]);
  const [Refer1_1, setRefer1_1] = useState([]);
  const [Refer2_1, setRefer2_1] = useState([]);

  useEffect(() => {
    GetUnit();
    GetUnitPopUP();
  }, []);
  

  const GetUnitPopUP = () => {
    axios.post("/api/Analysis_Formular/GetUnitPopup", {}).then((res) => {
      setUnit((prevState) => ({...prevState,PopUp: res.data}));
    });
  };

  const HandleUnitPopUp = (unit) => {
    setSL_UnitPopUp(unit);
    axios
      .post("/api/Analysis_Formular/GetProcessPopup", {
        PARAMETER_UNIT: unit,
      })
      .then((res) => {
        setProcess((prevState) => ({...prevState,PopUp: res.data}));
      });
  };

  const HandleProcessPopUp = (process) => {
    setSL_ProcessPopUp(process);
    axios
      .post("/api/Analysis_Formular/GetMachinePopup", {
        PARAMETER_PROCESS: process,
      })
      .then((res) => {
        setMachine((prevState) => ({...prevState,PopUp: res.data}));
      });
  };

  const HandleMachinePopUp = (Mc) => {
    setSL_MCPopUp(Mc);
  };

  const HandleCh = (ch) => {
    setSL_Ch(ch);
  };

  const GetUnit = () => {
    axios.post("/api/Analysis_Formular/GetUnit", {}).then((res) => {
      setUnit((prevState) => ({...prevState,Search: res.data}));
      // setUnit(res.data);
    });
  };

  const HandleUnit = (unit) => {
    setSL_Unit(unit);
    axios
      .post("/api/Analysis_Formular/GetProcess", {
        PARAMETER_UNIT: unit,
      })
      .then((res) => {
        setProcess((prevState) => ({...prevState,Search: res.data}));
      });
  };

  const handleProcess = (process) => {
    setSL_Process(process);
    axios
      .post("/api/Analysis_Formular/GetMachine", {
        PARAMETER_PROCESS: process,
      })
      .then((res) => {
        setMachine((prevState) => ({...prevState,Search: res.data}));
      });
  };

  const handleMachine = (machine) => {
    setSL_Machine(machine);
    axios
      .post("/api/Analysis_Formular/GetBath", {
        PARAMETER_MC: machine,
      })
      .then((res) => {
        setBath((prevState) => ({...prevState,Search: res.data}));
      });
  };

  const HandleBath = (bath) => {
    setSL_Bath(bath);
    axios
      .post("/api/Analysis_Formular/GetChemical", {
        PARAMETER_MC: SL_Machine,
        PARAMETER_BATH: bath,
      })
      .then((res) => {
        setCh((prevState) => ({...prevState,Search: res.data}));
      });
  };

  const Clear = () => {
    setSL_Bath(null);
    setSL_Ch(null);
    setSL_Machine(null);
    setSL_Process(null);
    setSL_Unit(null);
    setDataSearch([]);
  };

  const Search = () => {
    showLoading('กำลังค้นหา กรุณารอสักครู่');
    if (
      SL_Bath != null ||
      SL_Ch != null ||
      SL_Machine != null ||
      SL_Process != null ||
      SL_Unit != null
    ) {
      axios
        .post("/api/Analysis_Formular/Search_Analysis", {
          PARAMETER_UNIT: SL_Unit || "",
          PARAMETER_PROCESS: SL_Process || "",
          PARAMETER_MC: SL_Machine || "",
          PARAMETER_BATH: SL_Bath || "",
          PARAMETER_CHEMICAL: SL_Ch || "",
        })
        .then((res) => {
          setTimeout(() => {
            setDataSearch(res.data);
            // setLoadingSearch(false);
            hideLoading()
          }, 500);
        });
    } else {
      hideLoading()
      Swal.fire({
        icon: "error",
        title: "Please Select Unit",
      });
    }
  };
  
  const Insert = () => {
   Btn_Edit("","insert");
  };
  
  const showPopUp = () => {
    setUploadOpen(true);
  };

  const handlePopUpOk = () => {
    setUploadOpen(false);
  };

  const handlePopUpCancel = async () => {
    SetdataFile([]);
    setUploadOpen(false);
    setFileName("");
    setSelectedFiles([]);
    document.getElementById("fileInput").value = "";
    // setUnitPopUp([])
    // setProcessPopUp([])
    // setMCPopUp([])
    // setSL_UnitPopUp(null)
    // setSL_MCPopUp(null)
    // setSL_ProcessPopUp(null)
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

      const datajson = filteredData.slice(2).map((row) => ({
        // ข้าม 2 แถวแรก
        // UNIT : row[1] || "", // เริ่มจากคอลัมน์ B
        // PROCESS: row[2] || "",
        // MACHINE: row[3] ,
        BATH: row[4] || "",
        CHEMICAL: row[5] || "",
        SEQ: row[6] || "",
        INPUT: "", //row[7],
        FORMULA: row[8],
        FORMULA_REFER1: row[9],
        FORMULA_REFER2: row[10],
        REPLENISHER: row[11],
        REPLENISHER_REFER1: row[12],
        REPLENISHER_REFER2: row[13],
        UNIT: row[14],
        TARGET: row[15],
        LCL: row[16],
        UCL: row[17],
        LSL: row[18],
        USL: row[19],
        REMARK: "",
      }));
      // กรองเฉพาะแถวที่มี PRODUCT และ PROCESS ไม่เป็นค่าว่าง
      // .filter((row) => row.PRODUCT !== "" || row.PROCESS !== "");

      setSelectedFiles(datajson);
    };

    reader.readAsArrayBuffer(file);
  };

  const CheckConditions= async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      let dataChem = "";
      let bathValue = "";
      let bath = selectedFiles[i].BATH;
      await axios //find Bath Value
        .post("/api/Analysis_Formular/GetBathValue", {
          Bath: selectedFiles[i].BATH,
        })
        .then((res) => {
          bathValue = res.data;
        });
      await axios //get Chem
        .post("/api/Analysis_Formular/GetChemical", {
          PARAMETER_MC: SL_MCPopUp,
          PARAMETER_BATH: bathValue,
        })
        .then((res) => {
          dataChem = res.data;
        });
      let chem = selectedFiles[i].CHEMICAL;
      let seq = selectedFiles[i].SEQ;
      let formula = selectedFiles[i].FORMULA||'';
      let replenisher = selectedFiles[i].REPLENISHER||'';
      
      let countFomula = (formula.match(/\b(V1|V2|V3|V4)\b/g) || []).length;
      let formulaRef1 = formula.match(/\bREF_V1\b/g);
      let formulaRef2 = formula.match(/\bREF2_V1\b/g);
      const openParenthesesCount = (formula.match(/\(/g) || []).length; //วงเล็บเปิด
      const closeParenthesesCount = (formula.match(/\)/g) || []).length; //วงเล็บปิด
      const regexFormula = /^(\s*[\d]+(\.\d+)?|\s*V[1-4]|\s*REF_V1|\s*REF2_V1|\s*[\+\-\*\/\(\)]+)+\s*$/; //Fomat Formula =V1 V2 V3 V4 REF_V1 REF2_V1 ( ) , * / + - 0-9
      const regexReplenisher = /^(\s*[\d]+(\.\d+)?|\s*A|\s*REF_V1|\s*REF2_V1|\s*[\+\-\*\/\(\)]+)+\s*$/;
      let PatternFormula = regexFormula.test(formula);
      let PatternReplenisher = regexReplenisher.test(replenisher);
      let ReplenisherRef1 = replenisher.match(/\bREF_V1\b/g);
      let ReplenisherRef2 = replenisher.match(/\bREF2_V1\b/g);
      const target =selectedFiles[i].TARGET;
      const lcl =selectedFiles[i].LCL;
      const ucl =selectedFiles[i].UCL;
      const lsl =selectedFiles[i].LSL;
      const usl =selectedFiles[i].USL;
      let remark = "";

      //-----------------------------------------------1
      if (bath == "" && chem == "" && seq == "") {
        remark = "ไม่พบ Bath/Chemical/Seq";
      }
      //-----------------------------------------------3-6
      if (countFomula != 0) {
        selectedFiles[i].INPUT = countFomula;
      }
      //------------------------------------------------ข้อ7
      if (formulaRef1 != null) {
        if (selectedFiles[i].FORMULA_REFER1 != "") {
          const CheckChem = dataChem.find(
            (item) => item.label === selectedFiles[i].FORMULA_REFER1
          );
          if (!CheckChem) {
            remark = "Chemical Formula Refer1 ไม่อยู่ใน MC และ Bath เดียวกัน";
          }
        } else {
          remark = "ไม่พบ Fomula Refer1";
        }
      }
      //------------------------------------------------ข้อ8
      if (formulaRef2 != null) {
        if (selectedFiles[i].FORMULA_REFER2 != "") {
          const CheckChem = dataChem.find(
            (item) => item.label === selectedFiles[i].FORMULA_REFER2
          );
          if (!CheckChem) {
            remark = "Chemical Formula Refer2  ไม่อยู่ใน MC และ Bath เดียวกัน";
          }
        } else {
          remark = "ไม่พบ Fomula Refer2";
        }
      }
      //------------------------------------------------ข้อ9
      if (
        !/\bV[1-4]\b/.test(formula) &&
        (formulaRef1 != null || formulaRef2 != null)
      ) {
        selectedFiles[i].INPUT = "";
      }
      //------------------------------------------------ข้อ10
      if (openParenthesesCount != closeParenthesesCount) {
        remark = "วงเล็บเปิด-ปิดไม่ครบถ้วน";
      }
      //------------------------------------------------ข้อ11
      if(formula!=''){
        if (!PatternFormula) {
          remark = "Fomat Formula ไม่ถูกต้อง "+formula;
        }
      }
 
      //------------------------------------------------ข้อ12
      if(replenisher!=''){
        if (!PatternReplenisher) {
          remark = "Fomat Replenisher ไม่ถูกต้อง "+replenisher;
        }
      }

      //------------------------------------------------ข้อ13
      if (ReplenisherRef1 != null) {
        if (selectedFiles[i].REPLENISHER_REFER1 != "") {
          const CheckChem = dataChem.find(
            (item) => item.label === selectedFiles[i].REPLENISHER_REFER1
          );
          if (!CheckChem) {
            remark = "Chemical Replenisher Refer1 ไม่อยู่ใน MC และ Bath เดียวกัน";
          }
        } else {
          remark = "ไม่พบ Replenisher Refer1";
        }
      }
      //------------------------------------------------ข้อ14
      if (ReplenisherRef2 != null) {
        if (selectedFiles[i].REPLENISHER_REFER2 != "") {
          const CheckChem = dataChem.find(
            (item) => item.label === selectedFiles[i].REPLENISHER_REFER2
          );
          if (!CheckChem) {
            remark = "Chemical Replenisher Refer2 ไม่อยู่ใน MC และ Bath เดียวกัน";
          }
        } else {
          remark = "ไม่พบ Replenisher Refer2";
        }
      }
      //------------------------------------------------ข้อ15
      if (target !== '' && isNaN(target)) {
        remark='Target ไม่ใช่ตัวเลข'
      }
      if (lcl !== '' && isNaN(lcl)) {
        remark='LCL ไม่ใช่ตัวเลข'
      }
      if (ucl !== '' && isNaN(ucl)) {
        remark='UCL ไม่ใช่ตัวเลข'
      }
      if ( lsl !== '' && isNaN(lsl)) {
        remark='LSL ไม่ใช่ตัวเลข'
      }
      if (usl !== '' && isNaN(usl)) {
        remark='USL ไม่ใช่ตัวเลข'
      }
      //--------------------------end-----------------------
      selectedFiles[i].REMARK = remark;
    }
    SetdataFile(selectedFiles)
  }

  const UploadFile = async () => {

    showLoading('กำลัง Upload กรุณารอสักครู่');
    if (SL_MCPopUp == null) {
      Swal.fire({
        icon: "error",
        title: "Please Select Machine",
      });
      return;
    } else {
      await CheckConditions()
    }
    hideLoading()

  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(
      (file) => file.name.endsWith(".xlsx") || file.name.endsWith(".xls")
    );

    if (validFiles.length > 0) {
      setFileName(validFiles.map((file) => file.name));
      readExcelData(validFiles[0]);
    } else {
      Swal.fire({
        icon: "error",
        title: "Please drop .xlsx or .xls files.",
      });
    }
  };

  const ClearFile = () => {
    setFileName("");
    setSelectedFiles([]);
    document.getElementById("fileInput").value = "";
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

  const GetFileFormat = () => {
    axios
      .post(
        "/api/Analysis_Formular/GetFileFormat",
        {},
        { responseType: "blob" }
      )
      .then((res) => {
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

  const BtnExport = async () => {
    let nameFile = "";
    if (DataSearch.length <= 0) {
      Swal.fire({
        icon: "error",
        title: "No Data Export!",
      });
    } else {
      nameFile = "Export.xls";

      exportExcelFile(columns, DataSearch, nameFile);
    }
  };

  const exportExcelFile = async (columns, data, NameFile) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    const filteredColumns = columns.filter((col, colIndex) => col.title !== "No." && colIndex !== 1 && colIndex !== 2);

    const mainHeaderRow = [
      "No.",
      ...filteredColumns.flatMap((col) =>
        col.children ? Array(col.children.length).fill(col.title) : col.title
      ),
    ];

    const mainHeader = worksheet.addRow(mainHeaderRow);

    const subHeaderRow = [
      "No.",
      ...filteredColumns.flatMap((col) =>
        col.children ? col.children.map((subCol) => subCol.title) : col.title
      ),
    ];
    worksheet.addRow(subHeaderRow);

    data.forEach((row, index) => {
      const rowData = [
        index + 1,
        ...filteredColumns.flatMap((col) =>
          col.children
            ? col.children.map((subCol) => row[subCol.dataIndex] || "")
            : row[col.dataIndex] || ""
        ),
      ];
      worksheet.addRow(rowData);
    });

    // รวมเซลล์
    worksheet.mergeCells("I1:K1");
    worksheet.mergeCells("L1:N1");

    // worksheet.mergeCells("K1:M1");
    // worksheet.mergeCells("N1:P1");

    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C2");
    worksheet.mergeCells("D1:D2");
    worksheet.mergeCells("E1:E2");
    worksheet.mergeCells("F1:F2");
    worksheet.mergeCells("G1:G2");
    worksheet.mergeCells("H1:H2");

    worksheet.mergeCells("O1:O2");
    worksheet.mergeCells("P1:P2");
    worksheet.mergeCells("Q1:Q2");
    worksheet.mergeCells("R1:R2");
    worksheet.mergeCells("S1:S2");
    worksheet.mergeCells("T1:T2");

    const headerRowCount = 2;
    for (let rowIndex = 1; rowIndex <= headerRowCount; rowIndex++) {
      const row = worksheet.getRow(rowIndex);
      row.eachCell((cell) => {
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
        // จัดตำแหน่งข้อความให้อยู่กลางเซลล์
        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
      });
    }
    worksheet.eachRow((row, rowIndex) => {
      row.eachCell((cell, colIndex) => {
        if (colIndex !== 21 && colIndex !== 22) {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const dataBlob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(dataBlob, `${NameFile}.xlsx`);
  };

  const Btn_Edit = (record,page) => {
    if (page == 'edit'){
      setUnit((prevState) => ({...prevState,Edit: record.FAUM_UNIT_DESC,disabled:true}))
      setProcess((prevState) => ({...prevState,Edit: record.FAPM_PROCESS_DESC,disabled:true}))
      setMachine((prevState) => ({...prevState,Edit: record.FAMM_MC_ID,disabled:true}))
      setBath((prevState) => ({...prevState,Edit: record.FAB_BATH_DESC,disabled:true}))
      setCh((prevState) => ({...prevState,Edit: record.FAM_CHEMICAL_DESC,disabled:true}))
      setUnit2(record.FAM_UNIT)
      setTarget(record.FAM_TARGET)
      setLCL(record.FAM_LCL)
      setUCL(record.FAM_UCL)
      setUSL(record.FAM_USL)
      setLSL(record.FAM_LSL)
      setFormula(record.FAM_FORMULA)
      setRefer1(record.FAM_FORMULA_REFER_ID)
      setRefer2(record.FAM_FORMULA_REFER_ID2)
      setInput_value(record.FAM_INPUT)
      setSeq(record.FAM_SEQ)
      setReplenisher(record.FAM_REPLENISHER)
      setRefer1_1(record.FAM_REP_REFER_ID1)
      setRefer2_1(record.FAM_REP_REFER_ID2)
    }else if (page == 'insert'){
      setUnit((prevState) => ({...prevState,Edit: [],disabled:false}))
      setProcess((prevState) => ({...prevState,Edit: [],disabled:false}))
      setMachine((prevState) => ({...prevState,Edit: [],disabled:false}))
      setBath((prevState) => ({...prevState,Edit: [],disabled:false}))
      setCh((prevState) => ({...prevState,Edit: [],disabled:false}))
      setUnit2([])
      setTarget([])
      setLCL([])
      setUCL([])
      setUSL([])
      setLSL([])
      setFormula([])
      setRefer1([])
      setRefer2([])
      setInput_value([])
      setSeq([])
      setReplenisher([])
      setRefer1_1([])
      setRefer2_1([])
    }
  
    setOpen(true);
  
    
    
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        text = index + 1;
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      align: "center",
      render: (text, record, index) => {

        text = (
          <Button
            icon={<EditOutlined />}
            onClick={() => Btn_Edit(record,"edit")}
            size="large"
          ></Button>
        );
        return text;
      },
      width: 30,
    },
    {
      align: "center",
      render: (text, record, index) => {
        text = (
          <Button
            icon={<CloseOutlined style={{ color: "red" }} />}
            // onClick={() => Btn_Delete(record.PRODUCT, record.PROCESS)}
            size="large"
          ></Button>
        );
        return text;
      },
      width: 30,
    },
    {
      title: "Fac Unit",
      dataIndex: "FAUM_UNIT_DESC",
      key: "Unit",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Process",
      dataIndex: "FAPM_PROCESS_DESC",
      key: "Process.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "Machine",
      dataIndex: "FAMM_MC_ID",
      key: "Machine",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 100,
    },
    {
      title: "Bath",
      dataIndex: "FAB_BATH_DESC",
      key: "Bath",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 250,
    },
    {
      title: "Chemical",
      dataIndex: "FAM_CHEMICAL_DESC",
      key: "Chemical",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 120,
    },
    {
      title: "Seq",
      dataIndex: "FAM_SEQ",
      key: "Seq",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "Input",
      dataIndex: "FAM_INPUT",
      key: "Input",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "Formula",
      children: [
        {
          title: "",
          dataIndex: "FAM_FORMULA",
          key: "",
          render: (text, record, index) => {
            return text;
          },
          align: "left",
          width: 350,
        },
        {
          title: "Refer1",
          dataIndex: "FAM_FORMULA_REFER_ID",
          key: "Refer1",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width: 50,
        },
        {
          title: "Refer2",
          dataIndex: "FAM_FORMULA_REFER_ID2",
          key: "Refer2",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width: 50,
        },
      ],
    },
    {
      title: "Replenisher",
      children: [
        {
          title: "",
          dataIndex: "FAM_REPLENISHER",
          key: "",
          render: (text, record, index) => {
            return text;
          },
          align: "left",
          width: 350,
        },
        {
          title: "Refer1",
          dataIndex: "FAM_REP_REFER_ID1",
          key: "Refer1",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width: 50,
        },
        {
          title: "Refer2",
          dataIndex: "FAM_REP_REFER_ID2",
          key: "Refer2",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width: 50,
        },
      ],
    },
    {
      title: "Unit",
      dataIndex: "FAM_UNIT",
      key: "Unit",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Target",
      dataIndex: "FAM_TARGET",
      key: "Target",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "LCL",
      dataIndex: "FAM_LCL",
      key: "LCL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "UCL",
      dataIndex: "FAM_UCL",
      key: "UCL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "LSL",
      dataIndex: "FAM_LSL",
      key: "LSL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
    {
      title: "USL",
      dataIndex: "FAM_USL",
      key: "USL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 30,
    },
  ];

  const columnsUpload = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        text = index + 1;
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Bath",
      dataIndex: "BATH",
      key: "Bath",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 150,
    },
    {
      title: "Chemical",
      dataIndex: "CHEMICAL",
      key: "Chemical",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 150,
    },
    {
      title: "Seq",
      dataIndex: "SEQ",
      key: "Seq",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Input",
      dataIndex: "INPUT",
      key: "Input",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 60,
    },
    {
      title: "Formula",
      children: [
        {
          title: "",
          dataIndex: "FORMULA",
          key: "",
          render: (text, record, index) => {
            return text;
          },
          align: "left",
          width: 350,
        },
        {
          title: "Refer1",
          dataIndex: "FORMULA_REFER1",
          key: "Refer1",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width: 60,
        },
        {
          title: "Refer2",
          dataIndex: "FORMULA_REFER2",
          key: "Refer2",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width: 60,
        },
      ],
    },
    {
      title: "Replenisher",
      children: [
        {
          title: "",
          dataIndex: "REPLENISHER",
          key: "",
          render: (text, record, index) => {
            return text;
          },
          align: "left",
          width: 350,
        },
        {
          title: "Refer1",
          dataIndex: "REPLENISHER_REFER1",
          key: "Refer1",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width: 60,
        },
        {
          title: "Refer2",
          dataIndex: "REPLENISHER_REFER2",
          key: "Refer2",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width: 60,
        },
      ],
    },
    {
      title: "Unit",
      dataIndex: "UNIT",
      key: "Unit",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 60,
    },
    {
      title: "Target",
      dataIndex: "TARGET",
      key: "Target",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 60,
    },
    {
      title: "LCL",
      dataIndex: "LCL",
      key: "LCL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "UCL",
      dataIndex: "UCL",
      key: "UCL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "LSL",
      dataIndex: "LSL",
      key: "LSL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "USL",
      dataIndex: "USL",
      key: "USL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 50,
    },
    {
      title: "Remark",
      dataIndex: "REMARK",
      key: "Remark",
      render: (text, record, index) => {
        return text;
      },
      align: "left",
      width: 400,
    },
  ];

  return {
    columns,
    Unit,
    Process,
    Machine,
    Bath,
    Ch,
    SL_Bath,
    SL_Ch,
    SL_Machine,
    SL_Process,
    SL_Unit,
    HandleUnit,
    handleMachine,
    handleProcess,
    HandleBath,
    HandleCh,
    Search,
    DataSearch,
    showPopUp,
    handlePopUpOk,
    handlePopUpCancel,
    UploadOpen,
    handleDrop,
    handleFileUpload,
    selectedFiles,
    dataFile,
    FileName,
    DisableSave,
    loadingSave,
    ClearFile,
    GetFileFormat,
    BtnExport,
    loadingSearch,
    Clear,
    HandleUnitPopUp,
    HandleProcessPopUp,
    HandleMachinePopUp,
    SL_ProcessPopUp,
    SL_UnitPopUp,
    SL_MCPopUp,

    UploadFile,
    columnsUpload,
    openedit,
    handleOk,
    confirmLoading,
    handleCancel,
    Unit2,
    Target,
    LCL,
    UCL,
    LSL,
    USL,
    Formula,
    Refer1,
    Refer2,
    Input_value,
    Seq,
    Replenisher,
    Refer1_1,
    Refer2_1,
    setUnit,
    setMachine,
    setCh,
    setBath,
    setProcess,
    setUnit2,
    setTarget,
    setLCL,
    setUCL,
    setLSL,
    setUSL,
    setFormula,
    setRefer1,
    setRefer2,
    setRefer1_1,
    setRefer2_1,
    setInput_value,
    setSeq,
    setReplenisher,
    Insert
    
  };
}

export { fn_AnalysisUpload };
