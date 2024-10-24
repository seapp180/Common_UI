import React, { useEffect,useState } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';

import {
  Button,Tag
} from "antd";

import {
  CloseOutlined
} from "@ant-design/icons";
function fn_RDESMasterUpload() {
  const [loading, setLoading] = React.useState(false);
  const [Status, setStatus] = React.useState([]);
  const [SL_Status, setSL_Status] = React.useState(null);
  const [SL_Product, setSL_Product] = useState("ALL");
  const [Product, setProduct] = React.useState([]);
  const [DataSearch, setDataSearch] = React.useState([]);
  const [UploadOpen, setUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dataFile, SetdataFile] = useState([]);
  const [FileName, setFileName] = useState('');
   
  useEffect(() => {
    GetProduct()
  }, []);

  const GetProduct = () => {
    axios.post("/api/Common/GetProduct",{}).then((res) => {
      setProduct(res.data);
    });
  };

  const Bt_Search = () => {
    axios.post("/api/RDESMasterUpload/Search", {Product:SL_Product}).then((res) => {
      setDataSearch(res.data);
    });
  };

  const GetFileFormat = () => {
    axios.post("/api/RDESMasterUpload/FileFormat", {}, { responseType: 'blob' }) 
      .then((res) => {
        console.log(res.data, 'GetFileFormat');
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'File_Format.xls'); 
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

  const handlePopUpCancel = () => {
    setUploadOpen(false);
    setFileName('')
    setSelectedFiles([])
  };

  const ClearFile = () => {
    setFileName('')
    setSelectedFiles([])
    document.getElementById('fileInput').value = ''; 
  };

  const UploadFile = () => {
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
        selectedFiles[i].REMARK = 'ข้อมูล Product และ Process  ซ้ำ ภายใน ไฟล์';
      } else {
        selectedFiles[i].REMARK = ''; 
      }
    }
  
    SetdataFile(selectedFiles);
    console.log(selectedFiles, 'Check');
  };
  
  const handleFileUpload = (event) => {
    setSelectedFiles([])
     const files = Array.from(event.target.files);
    const validFiles = files.filter(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    if (validFiles.length > 0) {
      setFileName(validFiles.map(file => file.name)); 
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
    const validFiles = files.filter(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
  
    if (validFiles.length > 0) {
      console.log('mamamamam',validFiles)
      setFileName(validFiles.map(file => file.name)); 
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
      const workbook = XLSX.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); 
  
    
      const filteredData = jsonData.map(row => 
        row.map(cell => (cell === null || cell === undefined || cell === '') ? '' : cell) 
      ).filter(row => row.some(cell => cell !== '')); 
  
      console.log(filteredData, 'filteredData'); 
  
     
      const datajson = filteredData.slice(1).map(row => ({ 
        
        PRODUCT: row[1] || '', 
        PROCESS: row[2] || '',
        MACHINE: row[3] || '',
        CHAMBER: row[4] || '',
        MODE: row[5] || '',
        HOLDING: row[6] || '',
        REMARK: '' 
      }));
      
      setSelectedFiles(datajson);
      console.log(datajson, 'datajson');
    };
  
    reader.readAsArrayBuffer(file); 
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
      width:50
    },
    {
      title: "Product",
      dataIndex: "PRODUCT",
      key: "Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:200
    },   {
      title: "Process",
      dataIndex: "PROCESS",
      key: "Process.",
      render: (text, record, index) => {
        return text;
        
      },
      align: "center",
      width:150
    },   {
      title: "Machine",
      dataIndex: "MACHINE",
      key: "Machine",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:200
    },   {
      title: "Chamber",
      dataIndex: "CHAMBER",
      key: "Chamber",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:50
    },   {
      title: "Mode",
      dataIndex: "MODE",
      key: "Mode",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:50
    },   {
      title: "Holding Process",
      dataIndex: "HOLDING",
      key: "Holding Process",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:200
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render: (text, record, index) => {
        text=<Button icon={<CloseOutlined style={{ color: 'red' }} />} size="large"></Button>
        return text
      },
      width:50
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
      width:50
    },
    {
      title: "Product",
      dataIndex: "PRODUCT",
      key: "Product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:200
    },   {
      title: "Process",
      dataIndex: "PROCESS",
      key: "Process.",
      render: (text, record, index) => {
        return text;
        
      },
      align: "center",
      width:150
    },   {
      title: "Machine",
      dataIndex: "MACHINE",
      key: "Machine",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:200
    },   {
      title: "Chamber",
      dataIndex: "CHAMBER",
      key: "Chamber",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:50
    },   {
      title: "Mode",
      dataIndex: "MODE",
      key: "Mode",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:50
    },   {
      title: "Holding Process",
      dataIndex: "HOLDING",
      key: "Holding Process",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
      width:200
    },
    {
      title: "Remark",
      dataIndex: "REMARK",
      key: "Remark",
      align: "center",
      render: (text, record, index) => {
        return text !== '' ? (
          <Tag color="#B8001F">
            {text}
          </Tag>
        ) : null;
      },
    width:70
    },
  ];

  return {
    SL_Product,handleChange,columns,Product,DataSearch,GetFileFormat,Bt_Search,
    showPopUp,handlePopUpOk,handlePopUpCancel,UploadOpen,handleFileUpload,FileName
    ,handleDrop,ClearFile,UploadFile,dataFile,columnsUpload
  };
}

export { fn_RDESMasterUpload };
