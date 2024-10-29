import React, { useEffect, useState } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

import { Button, Tag } from "antd";

import {
  CloseOutlined,
  SaveOutlined,
  UploadOutlined,
  CloseCircleOutlined,
  EditOutlined
} from "@ant-design/icons";

function fn_AnalysisUpload() {
  const [Unit, setUnit] = useState([]);
  const [Process, setProcess] = useState([]);
  const [Machine, setMachine] = useState([]);
  const [Bath, setBath] = useState([]);
  const [Ch, setCh] = useState([]);
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

  useEffect(() => {
    GetUnit();
    //  HandleUnit()
    //  GetMachine()
    //  GetBath()
    //  Get_Ch()
  }, []);

  const HandleCh = (ch) => {
    setSL_Ch(ch);
  };

  const GetUnit = () => {
    axios.post("/api/Analysis_Formular/GetUnit", {}).then((res) => {
      console.log("Unit", res.data);
      setUnit(res.data);
    });
  };

  const HandleUnit = (unit) => {
    setSL_Unit(unit);
    axios
      .post("/api/Analysis_Formular/GetProcess", {
        PARAMETER_UNIT: unit,
      })
      .then((res) => {
        console.log("Process", res.data);
        setProcess(res.data);
      });
  };

  const handleProcess = (process) => {
    setSL_Process(process);
    axios
      .post("/api/Analysis_Formular/GetMachine", {
        PARAMETER_PROCESS: process,
      })
      .then((res) => {
        console.log("Machine", res.data);
        setMachine(res.data);
      });
  };

  const handleMachine = (machine) => {
    setSL_Machine(machine);
    axios
      .post("/api/Analysis_Formular/GetBath", {
        PARAMETER_MC: machine,
      })
      .then((res) => {
        console.log("Bath", res.data);
        setBath(res.data);
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
        console.log("Chh", res.data);
        setCh(res.data);
      });
  };

  const Search = () => {
    axios.post("/api/Analysis_Formular/Search_Analysis", {
      PARAMETER_UNIT:SL_Unit||'',
      PARAMETER_PROCESS:SL_Process||'',
      PARAMETER_MC:SL_Machine||'',
      PARAMETER_BATH:SL_Bath||'',
      PARAMETER_CHEMICAL:SL_Ch||''
    }).then((res) => {
      console.log("Search", res.data);
      setDataSearch(res.data);
    });
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
      .post("/api/Analysis_Formular/GetFileFormat", {}, { responseType: "blob" })
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

  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
      width:30
    },
    {
      title: "Unit",
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
      width:30
    },
    {
      title: "Machine",
      dataIndex: "FAMM_MC_ID",
      key: "Machine",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:100
    },
    {
      title: "Bath",
      dataIndex: "FAB_BATH_DESC",
      key: "Bath",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:250
    },
    {
      title: "Chemical",
      dataIndex: "FAM_CHEMICAL_DESC",
      key: "Chemical",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:120
    },
    {
      title: "Seq",
      dataIndex: "FAM_SEQ",
      key: "Seq",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:30
    },
    {
      title: "Input",
      dataIndex: "FAM_INPUT",
      key: "Input",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:30
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
          width:400
        },
        {
          title: "Refer1",
          dataIndex: "FAM_FORMULA_REFER_ID",
          key: "Refer1",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width:50
        },
        {
          title: "Refer2",
          dataIndex: "FAM_FORMULA_REFER_ID2",
          key: "Refer2",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width:50
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
          width:400
        },
        {
          title: "Refer1",
          dataIndex: "FAM_REP_REFER_ID1",
          key: "Refer1",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width:50
        },
        {
          title: "Refer2",
          dataIndex: "FAM_REP_REFER_ID2",
          key: "Refer2",
          render: (text, record, index) => {
            return text;
          },
          align: "center",
          width:50
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
      width:50
    },
    {
      title: "Target",
      dataIndex: "FAM_TARGET",
      key: "Target",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:30
    },
    {
      title: "LCL",
      dataIndex: "FAM_LCL",
      key: "LCL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:30
    },
    {
      title: "UCL",
      dataIndex: "FAM_UCL",
      key: "UCL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:30
    },
    {
      title: "LSL",
      dataIndex: "FAM_LSL",
      key: "LSL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:30
    },
    {
      title: "USL",
      dataIndex: "FAM_USL",
      key: "USL",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:30
    },
    {
      title: "EDIT",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record, index) => {
        console.log(record, "record");
        text = (
          <Button
            icon={  <EditOutlined />}
            onClick={() => Btn_Delete(record.PRODUCT, record.PROCESS)}
            size="large"
          ></Button>
        );
        return text;

      },
      width:30
    },
    {
      title: "DELETE",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record, index) => {
        console.log(record, "record");
        text = (
          <Button
            icon={<CloseOutlined style={{ color: "red" }} />}
            onClick={() => Btn_Delete(record.PRODUCT, record.PROCESS)}
            size="large"
          ></Button>
        );
        return text;
      },
      width:30
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
    handleFileUpload,selectedFiles,dataFile,FileName,DisableSave,loadingSave,ClearFile,GetFileFormat
  };
}

export { fn_AnalysisUpload };
