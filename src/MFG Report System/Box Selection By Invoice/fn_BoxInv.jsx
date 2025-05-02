import React, { useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import axios from "axios";
import { useLoading } from "../../component/loading/fn_loading";

function fn_BoxINV() {
  const { showLoading, hideLoading } = useLoading();
  const today = new Date().toISOString().split("T")[0];
  const [Factory, setFactory] = useState([]);
  const [selectFactory, setselectFactory] = useState("");
  const [InvNo, setInvNo] = useState([]);
  const [selectInvNo, setselectInvNo] = useState("");
  const [ProductItem, setProductItem] = useState([]);
  const [selectProductItem, setselectProductItem] = useState("");
  const [Seq, setSeq] = useState("");
  const [Invdate, setInvdate] = useState(today);
  const [DataSelectBox, setDataSelectBox] = useState([]);
  const [DataBoxDetail, setDataBoxDetail] = useState([]);
  const [showGrid, setshowGrid] = useState(false);

  useEffect(() => {
    showLoading("");
    GetFactory();
    hideLoading();
  }, []);

  const TableSelectBox = [
    {
      title: (
        <Checkbox
        //   onChange={(e) => handleSelectAll(e.target.checked)}
        //   checked={
        //     selectedRows.length === DataPackLabel.length &&
        //     DataPackLabel.length > 0
        //   }
        //   indeterminate={
        //     selectedRows.length > 0 &&
        //     selectedRows.length < DataPackLabel.length
        //   }
        //   disabled={sts_page === "GEN_SUCCESS"}
        ></Checkbox>
      ),
      key: "select",
      render: (_, record, index) => (
        <Checkbox
        //   onChange={(e) =>
        //     handleCheckboxChange(e.target.checked, record, index)
        //   }
        //   checked={selectedRows.includes(record.PACK_ID)}
        //   disabled={sts_page === "GEN_SUCCESS"}
        />
      ),
      align: "center",
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "key",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Packing Date",
      dataIndex: "D_DATE",
      key: "product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "QTY",
      key: "lotNo",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
    },
    {
      title: "Inv Box",
      dataIndex: "INV_BOX",
      key: "bin",
      align: "center",
      render: (text, record, index) => {
        return (
          <Input
            type="text"
            value={text}
            style={{ width: "100px", height: "30px" }}
            onChange={(e) => {
              // แก้ไขค่าใน record หรือแจ้งไปยัง parent
              record.INV_BOX = e.target.value;
              // ถ้าคุณใช้ state ให้ update ผ่าน function ด้วย
            }}
          />
        );
      },
    },

    {
      title: "Status",
      dataIndex: "STATUS",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
    },
  ];
  const TableBoxNoDetail = [
    {
      title: "Item Code",
      dataIndex: "PRD_ITEM_CODE",
      key: "key",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Box No.",
      dataIndex: "BOX_NO",
      key: "product",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
    {
      title: "Box Qty",
      dataIndex: "BOX_QTY",
      key: "lotNo",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
    },
    {
      title: "Inv Box",
      dataIndex: "INV_BOX",
      key: "bin",
      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },

    {
      title: "No.",
      dataIndex: "SEQ_NO",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
    },
    {
      title: "Lot No.",
      dataIndex: "LOT_NO",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
    },
    {
      title: "Lot Qty",
      dataIndex: "LOT_QTY",
      key: "qty",
      render: (text, record, index) => {
        return text ? text.toLocaleString() : "0";
      },
      align: "center",
    },
  ];
  const GetFactory = () => {
    axios
      .get("/api/BoxSelectInv/GetFac")
      .then((res) => {
        console.log(res.data); // เอาข้อมูลที่ได้มาใช้งาน เช่นแสดงบนจอ
        setFactory(res.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };
  const handleFactory = (value) => {
    setselectFactory(value);
    setInvNo([]);
    setselectInvNo("");
    setSeq("");
    setInvdate(today);
    setDataSelectBox([]);
    setDataBoxDetail([]);
    setshowGrid(true);
    GetInvoice(value);
  };
  const GetInvoice = (value) => {
    showLoading("");
    axios
      .post("/api/BoxSelectInv/GetInv", {
        fac: value,
      })
      .then((res) => {
        hideLoading();
        setInvNo(res.data);
      })
      .catch((error) => {
        hideLoading();
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };
  const handleInvoice = (value) => {
    setshowGrid(true);
    setselectInvNo(value);
    setProductItem([]);
    setselectProductItem("");
    setSeq("");
    setInvdate(today);
    setDataSelectBox([]);
    setDataBoxDetail([]);
    GetProductItem(selectFactory, value);
    GetDataBoxDetail(value);
  };
  const GetProductItem = (selectFactory, Invoice) => {
    axios
      .post("/api/BoxSelectInv/GetProduct", {
        fac: selectFactory,
        inv: Invoice,
      })
      .then((res) => {
        hideLoading();
        setProductItem(res.data);
      })
      .catch((error) => {
        hideLoading();
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };
  const handleProductItem = (value) => {
    setshowGrid(true);
    setselectProductItem(value);
    setSeq("");
    setInvdate(today);
    setDataSelectBox([]);
    GetSeqDate(selectFactory, selectInvNo, value);
    GetDataSelectBox(selectInvNo, value, Seq);
  };
  const GetSeqDate = (selectFactory, Invoice, product) => {
    axios
      .post("/api/BoxSelectInv/GetSeq_Date", {
        fac: selectFactory,
        inv: Invoice,
        prd: product,
      })
      .then((res) => {
        setSeq(res.data[0].BOX_SEQ);
        setInvdate(res.data[0].POST_DATE);
        console.log("Data", res.data[0]);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };
  const GetDataBoxDetail = (Invoice) => {
    axios
      .post("/api/BoxSelectInv/DataBoxDetail", {
        fac: selectFactory,
        inv: Invoice,
      })
      .then((res) => {
        setDataBoxDetail(res.data);
        console.log("Data", res.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };
  const GetDataSelectBox = (selectInvNo, selectProductItem, Seq) => {
    axios
      .post("/api/BoxSelectInv/DataSelectBox", {
        invno: selectInvNo,
        prd: selectProductItem,
        seq: Seq,
      })
      .then((res) => {
        setDataSelectBox(res.data);
        console.log("Data", res.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      });
  };
  const Reset = (page) => {
    console.log("Reset", page);
    setselectFactory("");
    setselectInvNo("");
    setselectProductItem("");
    setSeq("");
    setInvdate(today);
    setDataSelectBox([]);
    setDataBoxDetail([]);
    setshowGrid(false);
  };

  return {
    TableSelectBox,
    TableBoxNoDetail,
    Factory,
    setFactory,
    selectFactory,
    setselectFactory,
    InvNo,
    setInvNo,
    selectInvNo,
    setselectInvNo,
    ProductItem,
    setProductItem,
    selectProductItem,
    setselectProductItem,
    Seq,
    Invdate,
    setInvdate,
    handleFactory,
    handleInvoice,
    handleProductItem,
    DataBoxDetail,
    DataSelectBox,
    Reset,
    showGrid,
  };
}

export { fn_BoxINV };
