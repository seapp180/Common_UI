import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Swal from "sweetalert2";
import {Tag} from "antd";
function Fn_zPO_Report() {
  const params = new URLSearchParams(window.location.search);
  const PONO = params.get("pono");
  const [txtPono, settxtPono] = useState([]);
  const [dataTable, setdataTable] = useState([]);
  const [open860, setOpen860] = React.useState(false);
  const [open856, setOpen856] = React.useState(false);
  const [open846, setOpen846] = React.useState(false);
  const [open810, setOpen810] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [LoadingModal, setLoadingModal] = React.useState(true);
  const [dataTable860, setdataTable860] = useState([]);
  const [dataTable856, setdataTable856] = useState([]);
  const [dataTable846, setdataTable846] = useState([]);
  const [dataTable810, setdataTable810] = useState([]);

  useEffect(() => {
    if (PONO != null) {
      settxtPono(PONO);
      Search(PONO);
    }
  }, []);

  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      key: "No.",
      render: (text, record, index) => {
        const previousRow = index > 0 ? dataTable[index - 1] : null;
        if (previousRow && previousRow.No === record.No) {
          return "";
        }
        return index + 1;
      },
      align: "center",
    },
    {
      title: "FETL PO No.",
      dataIndex: "PRT_PO_NO",
      key: "FETL PO No.",
      align:'center',
      render: (text, record, index) => {
        if (index === 0 || dataTable[index - 1].PRT_PO_NO !== text) {
          return text;
        }
        return "";
      },
    },
    {
      title: "Order Date",
      dataIndex: "PRT_ORDER_DATE",
      key: "Order Date",
      align: "center",
      render: (text, record, index) => {
        if (index === 0 || dataTable[index - 1].PRT_ORDER_DATE !== text) {
          return text;
        }
        return "";
      },
    },
    {
      title: "Due Date",
      key: "Due Date",
      dataIndex: "PRT_DUE_DATE",
      align: "center",
      render: (text, record, index) => {
        if (index === 0 || dataTable[index - 1].PRT_DUE_DATE !== text) {
          return text;
        }
        return "";
      },
    },
    {
      title: "Order Qty",
      key: "Order Qty",
      dataIndex: "PRT_ORDER_QTY",
      align: "right",
      render: (text, record, index) => {
        if (index === 0 || dataTable[index - 1].PRT_ORDER_QTY !== text) {
          return text;
        }
        return "";
      },
    },
    {
      title: "EDI status",
      key: "EDI status",
      dataIndex: "PRT_EDI_STATUS",

      render: (text, record, index) => {
        if (index === 0 || dataTable[index - 1].PRT_EDI_STATUS !== text) {
          let color = "";
          let fontcolor =''
          if (text === "CANCEL") {
            color = "#C7C8CC"; // สีสำหรับ 'CANCEL'
            fontcolor='bLACK'
            
          } else if (text === "CLOSE") {
            color = "green"; // สีสำหรับ 'CLOSE'
          }

          if (color) {
            return <Tag color={color} style={{color:'black'}}>{text}</Tag>;
          }

          return text;
        }

        return "";
      },
      align: "center",
    },

    {
      title: "PO change 860",
      key: "PO change 860",
      dataIndex: "PRT_860_DATE",
      align: "center",
      render: (text, record, index) => {
        const previousRow = index > 0 ? dataTable[index - 1] : null;
        if (previousRow && previousRow.PRT_860_DATE === text) {
          return "";
        }

        return (
          <a
            onClick={() => {
              setOpen860(true); // เปิดสถานะ
              Search860(text); // เรียกฟังก์ชันค้นหา
            }}
          >
            {text}
          </a>
        );
      },
    },

    {
      title: "Confirm shipment 856",
      key: "Confirm shipment 856",
      dataIndex: "PRT_856_DATE",
      align: "center",
      render: (text) => (
        <a
          onClick={() => {
            setOpen856(true); // เปิดสถานะ
            Search856(text); // เรียกฟังก์ชันค้นหา
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Good Receive 846",
      key: "Good Receive 846",
      dataIndex: "PRT_846_DATE",
      align: "center",
      render: (text) => (
        <a
          onClick={() => {
            setOpen846(true); // เปิดสถานะ
            Search846(text); // เรียกฟังก์ชันค้นหา
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Invoice 810",
      key: "Invoice 810",
      align: "center",
      dataIndex: "PRT_810_DATE",
      render: (text) => (
        <a
          onClick={() => {
            setOpen810(true); // เปิดสถานะ
            Search810(text); // เรียกฟังก์ชันค้นหา
          }}
        >
          {text}
        </a>
      ),
    },
  ];

  const columns860 = [
    {
      title: "FETL PO No.",
      dataIndex: "FETL_PO",
      key: "FETL PO No.",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "APPLE PO No.",
      dataIndex: "APPLE_PO",
      key: "APPLE PO No.",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Rev.",
      key: "Rev.",
      dataIndex: "REV",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Refer Change No.",
      key: "Refer Change No.",
      dataIndex: "REF_CHANGE_NO",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Receive Date",
      key: "Receive Date",
      dataIndex: "RECEIVE_DATE",
      align: "center",
      className: "red-border-column",
    },

    {
      title: " PO Date",
      key: " PO Date",
      dataIndex: "PO_DATE",
      align: "center",
      className: "red-border-column",
    },

    {
      title: " APPLE Request Date",
      key: " APPLE Request Date",
      dataIndex: "APPLE_REQ_DATE",
      align: "center",
      className: "red-border-column",
    },

    {
      title: "Change Qty",
      key: "Change Qty",
      dataIndex: "CHANGE_QTY",
      align: "right",
      className: "red-border-column",
    },

    {
      title: "APPLE Part No.",
      key: "APPLE Part No.",
      align: "center",
      dataIndex: "APPLE_PART_NO",
      className: "red-border-column",
    },
    {
      title: "APPLE Part Desc.",
      dataIndex: "APPLE_PART_DESC",
      key: "APPLE Part Desc.",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Change Type",
      dataIndex: "CHANGE_TYPE",
      key: "Change Type",
      align: "center",
    },
  ];

  const columns856 = [
    {
      title: "FETL PO No.",
      dataIndex: "FETL_PO",
      key: "FETL PO No.",
      align:'center',
      className: "red-border-column",
    },
    {
      title: "Receive Date",
      dataIndex: "RECEIVE_DATE",
      key: "Receive Date",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Partner DO No.",
      key: "Partner DO No.",
      dataIndex: "PARTNER_DO",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "APPLE return PO No.",
      key: "APPLE return PO No.",
      dataIndex: "APPLE_RETUEN_PO",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Ship Date",
      key: "Ship Date",
      dataIndex: "SHIP_DATE",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Ship Qty",
      key: "Ship Qty",
      dataIndex: "SHIP_QTY",
      align: "right",
     
    },
  ];

  const columns846 = [
    {
      title: "FETL PO No.",
      dataIndex: "FETL_PO",
      key: "FETL PO No",
      align:'center',
      className: "red-border-column",
    },
    {
      title: "APPLE PO No.",
      dataIndex: "APPLE_PO",
      key: "APPLE PO No.",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Send Date",
      key: "Send Date",
      dataIndex: "SEND_DATE",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "GR No.",
      key: "GR No.",
      dataIndex: "GR_NO",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "DO No.",
      key: "DO No.",
      dataIndex: "DO_NO",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Proforma Invoice",
      key: "Proforma Invoice",
      dataIndex: "PROFORMA_INVOICE",
      align: "center",
      className: "red-border-column",
    },

    {
      title: "Transfer Qty",
      key: "Transfer Qty",
      dataIndex: "STOCK_TRANSFER_QTY",
      align: "right",
    },
  ];

  const columns810 = [
    {
      title: <span>FETL PO<br/> No.</span>,
      dataIndex: "FETL_PO",
      key: "FETL PO No.",
      className: "red-border-column",
      align:'center'
     
      
    },
    {
      title: <span>Invoice <br/>No.</span>,
      dataIndex: "POIH_INV_NO",
      key: "Invoice No.",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>Proforma<br/> Invoice</span>,
      key: "Proforma Invoice",
      dataIndex: "POIH_PROFORMA_INV",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>APPLE PO<br/> No.</span>,
      key: "APPLE PO No.",
      dataIndex: "APPLE_PO",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>Receive<br/> Date</span>,
      key: "Receive Date",
      dataIndex: "POIH_SEND_DATE",
      align: "center",
      className: "red-border-column",
    },

    {
      title: <span>Invoice<br/>Date</span>,
      key: "Invoice Date",
      dataIndex: "POIH_INV_DATE",
      align: "center",
      className: "red-border-column",
    },

    {
      title: <span>Curr<br/>Code</span>,
      key: "Curr Code",
      dataIndex: "POIH_CURR_CODE",
      align: "center",
      className: "red-border-column",
    },

    {
      title: "Vendor name",
      key: "Vendor name",
      dataIndex: "POIH_VENDOR_NAME",
      align: "center",
      className: "red-border-column",
    },

    {
      title: "Vendor Addr1",
      key: "Vendor Addr1",
      align: "center",
      dataIndex: "POIH_VENDOR_ADDR1",
      className: "red-border-column",
    },
    {
      title: " Vendor Addr2",
      dataIndex: "POIH_VENDOR_ADDR2",
      key: " Vendor Addr2",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "Vendor City",
      dataIndex: "POIH_VENDOR_CITY",
      key: "Vendor City",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>Vendor<br/>Postal</span>,
      dataIndex: "POIH_VENDOR_POSTAL",
      key: "Vendor Postal",
      align:'center',
      className: "red-border-column",

    },
    {
      title: <span>Vendor<br/>Country</span>,
      dataIndex: "POIH_VENDOR_COUNTRY",
      key: "Vendor Country",
      align: "center",
      className: "red-border-column",
    },

    {
      title: <span>Vendor<br/>State</span>,
      key: "Vendor State",
      dataIndex: "POIH_VENDOR_STATE",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>Ship to<br/>Name</span>,
      key: "Shipto Name",
      dataIndex: "POIH_SHIPTO_NAME",
      align: "center",
      className: "red-border-column",
    },

    {
      title: <span>Bill to<br/>Name</span>,
      key: "Bill to Name",
      dataIndex: "POIH_BILLTO_NAME",
      align: "center",
      className: "red-border-column",
    },

    {
      title: "Bill to Code",
      key: "Bill to Code",
      dataIndex: "POIH_BILLTO_CODE",
      align: "center",
      className: "red-border-column",
    },

    {
      title: <span>Payer<br/>Name</span>,
      key: "Payer Name",
      dataIndex: "POIH_PAYER_NAME",
      align: "center",
      className: "red-border-column",
    },

    {
      title: <span>Payer<br/>Code</span>,
      key: "Payer Code",
      align: "center",
      dataIndex: "POIH_PAYER_CODE",
      className: "red-border-column",
    },
    {
      title: <span>Sold to<br/>Name</span>,
      key: "Sold to Name",
      dataIndex: "POIH_SOLDTO_NAME",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>Sold to<br/>Code</span>,
      dataIndex: "POIH_SOLDTO_CODE",
      key: "Sold to Code",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>Unit Price<br/>Code</span>,
      dataIndex: "POID_UNIT_PRICE_CODE",
      key: "Unit Price Code",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>Unit<br/>Price</span>,
      dataIndex: "POID_UNIT_PRICE",
      key: "Unit Price",
      align: "right",
      className: "red-border-column",
    },
    {
      title: <span>APPLE<br/>part no.</span>,
      dataIndex: "POID_APPLE_PART_NO",
      key: "APPLE part no.",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "APPLE part desc",
      dataIndex: "POID_PRODUCT_DESC",
      key: "APPLE part desc",
      align: "center",
      className: "red-border-column",
    },
    {
      title: "GR No.",
      dataIndex: "POID_GR_NO",
      key: "GR No.",
      align: "center",
      className: "red-border-column",
    },
    {
      title: <span>Invoice<br/>Amount</span>,
      dataIndex: "POID_INV_AMOUNT",
      key: "Invoice Amount",
      align: "right",
      
    },
  ];

  const Search = (dataPoNo) => {
    setLoading(true);
    setdataTable([]);

    if (dataPoNo == null || dataPoNo == "") {
      Swal.fire({
        title: "FETL PO No.",
        text: "Please enter the FETL PO No.",
        icon: "warning",
      });
      setLoading(false);
    } else {
      axios
        .post("/api/zPO_Report/Prt_Poz", {
          PoNo: dataPoNo,
        })
        .then((res) => {
          if (res.data.length > 0) {
            setTimeout(() => {
              setdataTable(res.data);
              setLoading(false); 
            }, 1000);
          } else {
            Swal.fire({
              title: `FETL PO No. : ${txtPono} not found.`,
              text: "Please enter the FETL PO No. again.",
              icon: "error",
            });
            setLoading(false);
            settxtPono(null);
          }
        });
    }
  };

  const Search860 = (date860) => {
    axios
      .post("/api/zPO_Report/Search860", {
        PoNo: txtPono,
        Date860: date860,
      })
      .then((res) => {
        setTimeout(() => {
          setLoadingModal(false);
          setdataTable860(res.data);
        }, 500);
      });
  };

  const Search810 = (date810) => {
    axios
      .post("/api/zPO_Report/Search810", {
        PoNo: txtPono,
        Date810: date810,
      })
      .then((res) => {
        setTimeout(() => {
          setLoadingModal(false);
          setdataTable810(res.data);
        }, 500);
      });
  };

  const Search846 = (date846) => {
    axios
      .post("/api/zPO_Report/Search846", {
        PoNo: txtPono,
        Date846: date846,
      })
      .then((res) => {
        setTimeout(() => {
          setLoadingModal(false);
          setdataTable846(res.data);
        }, 500);
      });
  };

  const Search856 = (date856) => {
    axios
      .post("/api/zPO_Report/Search856", {
        PoNo: txtPono,
        Date856: date856,
      })
      .then((res) => {
        setTimeout(() => {
          setLoadingModal(false);
          setdataTable856(res.data);
        }, 500);
      });
  };

  const Reset = () => {
    settxtPono(null);
    setdataTable([]);
  };

  const exportToExcel = (dataHeader, dataColumns) => {
    const filteredColumns = dataColumns.filter(
      (col) => col.title !== "" && col.key !== null && col.title !== undefined
    );

    const headers = filteredColumns.map((col) => col.key);

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

  return {
    columns,
    columns810,
    columns846,
    columns856,
    columns860,
    Search,
    Search810,
    Search846,
    Search856,
    Search860,
    Reset,
    exportToExcel,
    txtPono,
    settxtPono,
    dataTable,
    setdataTable,
    dataTable810,
    setdataTable810,
    dataTable846,
    setdataTable846,
    dataTable856,
    setdataTable856,
    dataTable860,
    setdataTable860,
    open810,
    setOpen810,
    open846,
    setOpen846,
    open856,
    setOpen856,
    open860,
    setOpen860,
    loading,
    setLoading,
    LoadingModal,
    setLoadingModal,
  };
}

export { Fn_zPO_Report };
