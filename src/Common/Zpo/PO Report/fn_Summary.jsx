import React, { useEffect } from "react";
import axios from "axios";
import Column from "antd/es/table/Column";
import Swal from "sweetalert2";

function fn_Summary() {
  const [loading, setLoading] = React.useState(false);
  const [Status, setStatus] = React.useState([]);
  const [SL_Status, setSL_Status] = React.useState(null);
  const [txt_PONo, settxt_PONo] = React.useState(null);
  const [DateFrom, setDateFrom] = React.useState(null);
  const [DateTo, setDateTo] = React.useState(null);
  const [DataTable, setDataTable] = React.useState([]);
  const [CountPO, setCountPO] = React.useState([]);

  useEffect(() => {
    GetStatus();
    GetCount_PO();
  }, []);

  const GetStatus = () => {
    axios.post("/api/zPO_Summary/Status", {}).then((res) => {
      setStatus(res.data);
    });
  };

  const GetCount_PO = () => {
    axios.post("/api/zPO_Summary/Po_CountType", {}).then((res) => {
      setCountPO(res.data);
    });
  };

  const StyleonMouseEnter = (e) => {
    e.currentTarget.style.transform = "scale(1.1)";
    e.currentTarget.style.color = "black";
    e.currentTarget.style.zIndex = 10;
  };

  const StyleonMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.color = "#ffffff";
    e.currentTarget.style.zIndex = 1;
  };

  const Reset = () => {
    settxt_PONo(null);
    setSL_Status(null);
    setDateFrom(null);
    setDateTo(null);
    setDataTable([]);
  };

  const ClickStatus_PO = (PO_TYPE) => {
    if (PO_TYPE === "All") {
      axios.post("/api/zPO_Summary/PO_All", {}).then((res) => {
        setDataTable(res.data);
      });
    } else if (PO_TYPE === "Outstanding") {
      axios.post("/api/zPO_Summary/PO_Outstanding", {}).then((res) => {
        setDataTable(res.data);
      });
    } else if (PO_TYPE === "Completed") {
      axios.post("/api/zPO_Summary/PO_Complete", {}).then((res) => {
        setDataTable(res.data);
      });
    }
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
    },
    {
      title: "Order Date",
      dataIndex: "F_PO_DATE",
      key: "Order Date",
      align: "center",
      render: (text, record, index) => {
      
          return text;
        
      },
    },
    {
      title: "FETL PO No.",
      dataIndex: "F_PONO",
      key: "FETL PO No.",
      align: "center",
      render: (text, record, index) => {

        return (
          <a
            onClick={() => {
              window.open(`/CommonSystem/zPO?pono=${encodeURIComponent(text)}`, '_blank');
              // rel="noopener noreferrer"
            }}
          >
            {text}
          </a>
        );
      },
    },

    {
      title: "Due Date",
      key: "Due Date",
      dataIndex: "F_DUE_DATE",
      align: "center",
      render: (text, record, index) => {
      
          return text;
       
      },
    },
    {
      title: "Order Qty",
      key: "Order Qty",
      dataIndex: "F_QTY",
      align: "right",
      render: (text, record, index) => {
    
          return text;
        
      },
    },
    {
      title: "Status",
      key: "EDI status",
      dataIndex: "F_STATUS",

      render: (text, record, index) => {
          return text;
      },
      align: "center",
    },
  ];

  const Search = () => {
    setLoading(true)
    setDataTable([])
    if (
      DateTo == null &&
      DateFrom == null &&
      txt_PONo == null &&
      SL_Status == null
    ) {
        Swal.fire({
            title: "Please fill in the information.",
            text: "Please fill in the information.",
            icon: "warning",
          });
          setLoading(false)
    } else {
      
      axios
        .post("/api/zPO_Summary/Summary_search", {
          Status: SL_Status || "ALL",
          PO_No: txt_PONo || "",
          DateFrom: DateFrom || "",
          DateTo: DateTo || "",
        })
        .then((res) => {
            if (res.data.length > 0) {
                setTimeout(() => {
                  setDataTable(res.data);
                  setLoading(false); 
                }, 1000);
              } else {
                Swal.fire({
                  title: `No data`,
                  text: " Please fill in the information again.",
                  icon: "error",
                });
                setLoading(false);
                
              }
        });
    }
  };
  return {
    StyleonMouseEnter,
    StyleonMouseLeave,
    Reset,
    ClickStatus_PO,
    Search,
    setLoading,
    setStatus,
    setSL_Status,
    settxt_PONo,
    setDateFrom,
    setDateTo,
    setDataTable,
    setCountPO,
    loading,
    Status,
    SL_Status,
    txt_PONo,
    DateTo,
    DateFrom,
    DataTable,
    CountPO,
    columns
    
  };
}

export { fn_Summary };
