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
} from "@ant-design/icons";

function fn_AnalysisUpload() {
  const [Unit, setUnit] = useState([]);
  const [Process, setProcess] = useState([]);
  const [Machine, setMachine] = useState([]);
  const [Bath, setBath] = useState([]);
  const [Ch, setCh] = useState([]);
  const [SL_Ch, setSL_Ch] = useState("ALL");
  const [SL_Bath, setSL_Bath] = useState("ALL");
  const [SL_Machine, setSL_Machine] = useState("ALL");
  const [SL_Process, setSL_Process] = useState("ALL");
  const [SL_Unit, setSL_Unit] = useState("");
  useEffect(() => {
    GetUnit();
    //  HandleUnit()
    //  GetMachine()
    //  GetBath()
    //  Get_Ch()
  }, []);


  const HandleCh = (ch) => {
    setSL_Ch(ch)
  };

  const GetUnit = () => {
    
    axios.post("/api/Analysis_Formular/GetUnit", {}).then((res) => {
      console.log("Unit", res.data);
      setUnit(res.data);
    });
  };

  const HandleUnit = (unit) => {
    setSL_Unit(unit)
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
    setSL_Process(process)
    axios.post("/api/Analysis_Formular/GetMachine", {
      PARAMETER_PROCESS:process
    }).then((res) => {
      console.log("Machine", res.data);
      setMachine(res.data);
    });
  };
  
  const handleMachine = (machine) => {
    setSL_Machine(machine)
    axios.post("/api/Analysis_Formular/GetBath", {
      PARAMETER_MC:machine
    }).then((res) => {
      console.log("Bath", res.data);
      setBath(res.data);
    });
  };

  const HandleBath = (bath) => {
    setSL_Bath(bath)
    axios.post("/api/Analysis_Formular/GetChemical", {
      PARAMETER_MC:SL_Machine,
      PARAMETER_BATH:bath
    }).then((res) => {
      
      console.log("Chh", res.data);
      setCh(res.data);
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
      width: 50,
    },
    {
      title: "Unit",
      dataIndex: "",
      key: "Unit",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Process",
      dataIndex: "",
      key: "Process.",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 150,
    },
    {
      title: "Machine",
      dataIndex: "",
      key: "Machine",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Chemical",
      dataIndex: "",
      key: "Chemical",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 80,
    },
    {
      title: "Seq",
      dataIndex: "",
      key: "Seq",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 70,
    },
    {
      title: "Input",
      dataIndex: "",
      key: "Input",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "",
      dataIndex: "Formular",
      key: "",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Refer1",
      dataIndex: "",
      key: "Refer1",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    {
      title: "Refer2",
      dataIndex: "",
      key: "Refer2",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width: 200,
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   key: "",
    //   align: "center",
    //   render: (text, record, index) => {
    //     console.log(record, "record");
    //     text = (
    //       <Button
    //         icon={<CloseOutlined style={{ color: "red" }} />}
    //         onClick={() => Btn_Delete(record.PRODUCT, record.PROCESS)}
    //         size="large"
    //       ></Button>
    //     );
    //     return text;
    //   },
    //   width: 50,
    // },
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
    HandleCh
  };
}

export { fn_AnalysisUpload };
