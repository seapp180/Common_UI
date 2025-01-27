import React, { useState } from "react";
import axios from "axios";
import { useLoading } from "../../../component/loading/fn_loading";
function fn_T2D_BarcodeOutput() {
  const { showLoading, hideLoading } = useLoading();
  //txtField
  const [txtPOS, setTxtPOS] = useState("");
  const [txtProduct, setTxtProduct] = useState("");
  const [txtLotNo, setTxtLotNo] = useState("");
  const [txtOperatorCode, setTxtOperatorCode] = useState("");
  const [txtState, setTxtState] = useState("----Select----"); //Combobox
  const [txtLotSize, setTxtLotSize] = useState("");
  const [txtReject, setTxtReject] = useState("");
  const [txtSampleSize, setTxtSampleSize] = useState('----Select----'); //Combobox
  const [txtBarcodetype, setTxtBarcodetype] = useState('----Select----'); //Combobox
  const [txtAperture, setTxtAperture] = useState("----Select----");
  const [txtRemark, setTxtRemark] = useState("");

  //SetFocus
  function setFocus(txtField) {
    document.getElementById(txtField).focus();
  }
  //TextChange
  const handleChangePOS = async () => {
    if (txtPOS === "") {
      alert("Please fill in POS");
    } else {
      if (txtPOS.split(";").length > 1) {
        const lotno = txtPOS.split(";")[0];
        const prdno = await getData("getPOSdata", { lotno: lotno });
        if (prdno.message != "Not Found Data" || prdno.message == undefined) {
          setTxtProduct(prdno.prdName);
          setTxtLotNo(prdno.lot);
          const checkRawdata = await getData("getCheckrawdata", {lotno: lotno,});
          if (checkRawdata.length > 1) {
            setTxtPOS("");
            setTxtLotNo("");
            setTxtProduct("");
            alert("This lot have duplicate serial , Please check !!");
            setFocus("txtFPOS");
            return;
          } else if (checkRawdata.length <= 0) {
            setTxtPOS("");
            setTxtLotNo("");
            setTxtProduct("");
            alert("This lot no. not found raw data , Please check !!");
            setFocus("txtFPOS");
            return;
          }
          const checkResultNg = await getData("getCheckResultNg", {lotno: lotno,});
          if (parseInt(checkResultNg.ng_count) > 0) {
            setTxtPOS("");
            setTxtLotNo("");
            setTxtProduct("");
            alert("This lot have result NG of raw data , Please check !!");
            setFocus("txtFPOS");
            return;
          }
          const checkDuplicataData = await getData("getCheckDuplicataData", {lotno: lotno,});
          if(checkDuplicataData != ''){
            if(checkDuplicataData.QOH_CONFIRM_DATE != null){
              setTxtPOS("");
              setTxtLotNo("");
              setTxtProduct("");
              alert("This lot no. has already output!!");
              setFocus("txtFPOS");
              return;
            }
          }
          setFocus("txtFOperatorCode")
        } else {
          alert("Data not found");
        }
      } else {
        alert("Wrong POS , Please check !!");
        setTxtPOS("");
        setTxtProduct("");
        setTxtLotNo("");
      }
    }
  };
  const handleChangeOperator = async () => {
    if (txtOperatorCode === "") {
      alert("Please fill in Operator Code");
    } else {
      showLoading("กำลังค้นหา กรุณารอสักครู่");
      const checkUserStatus = await getData("getCheckUserStatus", {user: txtOperatorCode});
      if (checkUserStatus != ''){
        if(checkUserStatus.message == "Not Found Data") {
          alert('Wrong operator code , Please check !!'); 
          setTxtOperatorCode("");
          setFocus("txtFOperatorCode");
          hideLoading();
          return;
        }
        if(checkUserStatus.status !== 'Active'){
          alert("This employee has resigned. , Please check !!");
          setTxtOperatorCode("");
          setFocus("txtFOperatorCode");
          hideLoading();
          return;
        }
        hideLoading();
        setFocus("txtFState");
      }
    }
  }
  const handleChangeSampleSize = async (value) => {
    if (value !== "----Select----") {
      console.log(txtLotNo);
      const checkSampleSize = await getData("getCheckSampleSize", { lotno: txtLotNo });
      console.log(checkSampleSize.qty);
  
      if (checkSampleSize) {
        if (parseInt(checkSampleSize.qty) !== parseInt(value)) {
          alert("Value of sampling size is not equal qty of raw data.!!");
          setTxtSampleSize("----Select----");
          setFocus("txtFSampleSize");
        }else{
          document.getElementById("txtFBarcodetype").focus(); 
        }
      }
    }else{
      alert("Please select Sampling Size");
    }
  };
  async function getData(type, params) {
    let data = [];
    try {
      if (type == "getPOSdata") {
        const response = await axios.get(
          `/api/Oqc_barcode/getCheckPrdnamewithLot?strLotNo=${params.lotno}`
        );
        data = response.data;
      } else if (type == "getCheckrawdata") {
        const response = await axios.get(
          `/api/Oqc_barcode/getCheckRawData?strLotNo=${params.lotno}`
        );
        data = response.data;
      } else if (type == "getCheckResultNg") {
        const response = await axios.get(`/api/Oqc_barcode/getCheckNGRawData?strLotNo=${params.lotno}`
        );
        data = response.data;
      } else if (type == "getCheckDuplicataData"){
        const response = await axios.get(`/api/Oqc_barcode/getCheckDuplicatedata?strLotNo=${params.lotno}`);
        data = response.data;
      } else if (type == "getCheckUserStatus"){
        const response = await axios.get(`/api/Oqc_barcode/getCheckUserStatus?strUserIdCode=${params.user}`);
        data = response.data;
      } else if (type == "getCheckSampleSize"){
        const response = await axios.get(`/api/Oqc_barcode/GetcheckSameQtywithLot?strLotNo=${params.lotno}`);
        data = response.data;
      }
    } catch (error) {
      alert(error);
    }
    return data;
  }
  return {
    txtPOS,
    setTxtPOS,
    txtProduct,
    setTxtProduct,
    txtLotNo,
    setTxtLotNo,
    txtOperatorCode,
    setTxtOperatorCode,
    txtState,
    setTxtState,
    txtLotSize,
    setTxtLotSize,
    txtReject,
    setTxtReject,
    txtSampleSize,
    setTxtSampleSize,
    txtBarcodetype,
    setTxtBarcodetype,
    txtAperture,
    setTxtAperture,
    txtRemark,
    setTxtRemark,
    handleChangePOS,
    handleChangeOperator,
    handleChangeSampleSize
  };
}

export { fn_T2D_BarcodeOutput };
