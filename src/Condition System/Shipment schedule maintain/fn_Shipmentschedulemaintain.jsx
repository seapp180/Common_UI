import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import dayjs from 'dayjs';

function fn_Shipmentschedulemaintain() {
  const [txtProduct, settxtProduct] = useState("");
  const [selBuild, setselBuild] = useState(null);
  const [BuildData, setBuildData] = useState([]);
  const [txtLine, settxtLine] = useState("");
  const [txtLotNo, settxtLotNo] = useState("");
  const [txtFirtshipment, settxtFirtshipment] = useState(null);
  const [txtSecondshipment, settxtSecondshipment] = useState(null);

  //Disabled
  const [txtLineDisabled, settxtLineDisabled] = useState(false);
  const [txtLotDisabled, settxtLotDisabled] = useState(false);
  const [txtSecondDisabled, settxtSecondDisabled] = useState(false);
  const [btsaveDisabled, setbtsaveDisabled] = useState(true);

  //link
  const params = new URLSearchParams(window.location.search);
  const LoginID = params.get("loginID");
  const SystemID = params.get("systemID");

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

  useEffect(() => {
    settxtLineDisabled(true);
    settxtLotDisabled(true);
  }, []);

  const btnhomeClick = async () => {
    await axios.post("/api/Shipment/GetURL", {
      loginID: LoginID,
      systemID: SystemID,
    })
      .then((res) => {
        if (res.data.length > 0) {
          window.open(res.data[0].F_URL, "_blank");
        }
      })
      .catch((error) => {
        console.error("Error fetching the URL:", error);
      });
  };

  const handleChangeProduct = async () => {
    let strproduct = txtProduct.trim().toUpperCase();
    await axios.post("/api/Shipment/GetBuild", {
      strprdname: strproduct
    })
      .then((res) => {
        let data = res.data.flat();
        setBuildData(data);
        setselBuild(data[0].build);
      });
  };


  const handleChangeBuild = async (value) => {
    console.log(value)
    setselBuild(value.value);
    getdata(value.value);
  };

  const getdata = async (strbuild) => {
    let data = [];
    try {
      await axios.post("/api/Shipment/Getdata", {
        strprdname: txtProduct,
        strbuild: strbuild
      })
        .then((res) => {
          data = res.data;
        });
      console.log(data)
      settxtLine(data.F_LINE);
      settxtLotNo(data.F_LOT);
      settxtFirtshipment(data.F_FIRST_DATE ? dayjs(data.F_FIRST_DATE).format('DD/MM/YYYY') : null);
      if (data.F_SECOND_DATE !== null) {
        settxtSecondshipment(dayjs(data.F_SECOND_DATE).format('DD/MM/YYYY'));
      } else {
        settxtSecondDisabled(true);
      }
      setbtsaveDisabled(false);
    } catch (error) {
      console.log(error.message);
      setbtsaveDisabled(true);
    }
  };

  const btnSaveClick = async () => {
    try {
      if (txtFirtshipment !== "") {
        const res = await axios.post("/api/Shipment/SaveData", {
          firstshipment: txtFirtshipment,
          loginid: LoginID,
          strprdname: txtProduct,
          strbuild: selBuild
        });
        console.log("บันทึกข้อมูลสำเร็จ =", res);
        swal("Success", "Save completed", "success");
      }

      if (txtSecondshipment !== "") {
        const res2 = await axios.post("/api/Shipment/SaveData2", {
          secondshipment: txtSecondshipment,
          loginid: LoginID,
          strprdname: txtProduct,
          strbuild: selBuild
        });
        console.log("บันทึกข้อมูลสำเร็จ =", res2);
        swal("Success", "Save completed", "success");
      }
      settxtProduct("");
      setselBuild("");
      settxtLine("");
      settxtLotNo("");
      settxtFirtshipment("");
      settxtSecondshipment("");
      setBuildData([]);
    } catch (error) {
      console.error("เกิดข้อผิดพลาด =", error);
      swal("Cannot save. Error: ", error.message, "error");
    }
  };

  const btnCancelClick = async () => {
    settxtProduct("");
    setselBuild("");
    settxtLine("");
    settxtLotNo("");
    settxtFirtshipment("");
    settxtSecondshipment("");
    setBuildData([]);
  };

  return {
    txtProduct, settxtProduct, selBuild, BuildData, txtLine, settxtLine, txtLotNo, settxtLotNo, txtFirtshipment, settxtFirtshipment,
    txtSecondshipment, settxtSecondshipment, txtLineDisabled, txtLotDisabled, txtSecondDisabled, btsaveDisabled, dateFormatList,
    btnhomeClick, handleChangeProduct, handleChangeBuild, btnSaveClick, btnCancelClick
  }
};

export { fn_Shipmentschedulemaintain };