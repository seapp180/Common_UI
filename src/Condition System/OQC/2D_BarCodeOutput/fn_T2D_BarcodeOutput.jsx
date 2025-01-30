import React, { useEffect, useState } from "react";
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
  const [ lblError , setLblError ] = useState({
    ErrorMsg:'',
    ErrorStatus:false,
    ErrorColor:'',
    ErrorBackground:''
  });
  useEffect(() => {
    if(txtPOS == "") setFocus("txtFPOS");
  }, [txtPOS]);
  //SetFocus
  function setFocus(txtField) {
    document.getElementById(txtField).focus();
  }
  //TextChange
  const handleChangePOS = async () => {
    if (txtPOS === "") {
      setLblError({
        ErrorMsg:'Please Scan POS !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
    } else {
      showLoading("กำลังค้นหา กรุณารอสักครู่");
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
            setLblError({
              ErrorMsg:'This lot have duplicate serial , Please check !!',
              ErrorStatus:true,
              ErrorColor:'white',
              ErrorBackground:'red'
            })
            hideLoading();
            setFocus("txtFPOS");
            return;
          } else if (checkRawdata.length <= 0) {
            setTxtPOS("");
            setTxtLotNo("");
            setTxtProduct("");
            setLblError({
              ErrorMsg:'This lot no. not found raw data , Please check !!',
              ErrorStatus:true,
              ErrorColor:'white',
              ErrorBackground:'red'
            })
            hideLoading();
            setFocus("txtFPOS");
            return;
          }
          const checkResultNg = await getData("getCheckResultNg", {lotno: lotno,});
          if (parseInt(checkResultNg.ng_count) > 0) { 
            setTxtPOS("");
            setTxtLotNo("");
            setTxtProduct("");
            setLblError({
              ErrorMsg:'This lot have result NG of raw data , Please check !!',
              ErrorStatus:true,
              ErrorColor:'white',
              ErrorBackground:'red'
            })
            hideLoading();
            setFocus("txtFPOS");
            return;
          }
          const checkDuplicataData = await getData("getCheckDuplicataData", {lotno: lotno,});
          if(checkDuplicataData != ''){
            if(checkDuplicataData.QOH_CONFIRM_DATE != null){
              setTxtPOS("");
              setTxtLotNo("");
              setTxtProduct("");
              setLblError({
                ErrorMsg:'This lot no. has already output!!',
                ErrorStatus:true,
                ErrorColor:'white',
                ErrorBackground:'red'
              })
              hideLoading();
              setFocus("txtFPOS");
              return;
            }
          }
          setLblError({
            ErrorMsg:'',
            ErrorStatus:false,
            ErrorColor:'',
            ErrorBackground:''
          })
          hideLoading();
          setFocus("txtFOperatorCode")
        } else {
          setLblError({
            ErrorMsg:'Data not found !!',
            ErrorStatus:true,
            ErrorColor:'white',
            ErrorBackground:'red'
          })
          hideLoading();
        }
      } else {
        hideLoading();
        setLblError({
          ErrorMsg:'Wrong POS , Please check !!',
          ErrorStatus:true,
          ErrorColor:'white',
          ErrorBackground:'red'
        })
        setTxtPOS("");
        setTxtProduct("");
        setTxtLotNo("");
      }
      hideLoading();
    }
  };
  const handleChangeOperator = async () => {
    if (txtOperatorCode === "") {
      setLblError({
        ErrorMsg:'Please fill in Operator Code !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
    } else {
      showLoading("กำลังค้นหา กรุณารอสักครู่");
      const checkUserStatus = await getData("getCheckUserStatus", {user: txtOperatorCode});
      if (checkUserStatus != ''){
        if(checkUserStatus.message == "Not Found Data") {
          setLblError({
            ErrorMsg:'Wrong operator code , Please check !!',
            ErrorStatus:true,
            ErrorColor:'white',
            ErrorBackground:'red'
          })
          setTxtOperatorCode("");
          setFocus("txtFOperatorCode");
          hideLoading();
          return;
        }
        if(checkUserStatus.status !== 'Active'){
          setLblError({
            ErrorMsg:'This employee has resigned. , Please check !!',
            ErrorStatus:true,
            ErrorColor:'white',
            ErrorBackground:'red'
          })
          setTxtOperatorCode("");
          setFocus("txtFOperatorCode");
          hideLoading();
          return;
        }
        hideLoading();
        setLblError({
          ErrorMsg:'',
          ErrorStatus:false,
          ErrorColor:'',
          ErrorBackground:''
        })
        setFocus("txtFState");
      }
    }
  }
  const handleChangeSampleSize = async (value) => {
    if (value !== "----Select----") {
      setLblError({
        ErrorMsg: "",
        ErrorStatus: false,
        ErrorColor: "",
        ErrorBackground: "",
      });
      const checkSampleSize = await getData("getCheckSampleSize", { lotno: txtLotNo });  
      if (checkSampleSize) {
        if (parseInt(checkSampleSize.qty) !== parseInt(value)) {
          setLblError({
            ErrorMsg:'Value of sampling size is not equal qty of raw data.!!',
            ErrorStatus:true,
            ErrorColor:'white',
            ErrorBackground:'red'
          })
          setTxtSampleSize("----Select----");
          setFocus("txtFSampleSize");
        }else{
          document.getElementById("txtFBarcodetype").focus(); 
        }
      }
    }else{
      setLblError({
        ErrorMsg:'Please select Sampling Size !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
    }
  };
  function saveSuccessed(){
    setTxtPOS("");
    setTxtProduct("");
    setTxtLotNo("");
    setTxtOperatorCode("");
    setTxtState("----Select----");
    setTxtLotSize("");
    setTxtReject("");
    setTxtSampleSize("----Select----");
    setTxtBarcodetype("----Select----");
    setTxtAperture("----Select----");
    setTxtRemark("");
    setFocus("txtFPOS");

  }
  const handleCancel = () => {
    setTxtPOS("");
    setTxtProduct("");
    setTxtLotNo("");
    setTxtOperatorCode("");
    setTxtState("----Select----");
    setTxtLotSize("");
    setTxtReject("");
    setTxtSampleSize("----Select----");
    setTxtBarcodetype("----Select----");
    setTxtAperture("----Select----");
    setTxtRemark("");
    setLblError({
      ErrorMsg:'',
      ErrorStatus:false,
      ErrorColor:'',
      ErrorBackground:''
    })
    setFocus("txtFPOS");
  };
  const handleSave = async () => {
    if(txtLotNo === ""){
      setTxtPOS("");
      setTxtProduct("");
      setTxtLotNo("");
      setLblError({
        ErrorMsg:'Please scan POS !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
      setFocus("txtFPOS");
      return;
    }
    if(txtOperatorCode === ""){
      setTxtOperatorCode("");
      setLblError({
        ErrorMsg:'Please scan Operator code !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
      setFocus("txtFOperatorCode");
      return;
    }
    if(txtState === "----Select----"){
      setTxtState("----Select----");
      setLblError({
        ErrorMsg:'Please select Stage !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
      setFocus("txtFState");
      return;
    }
    if(txtLotSize === ""){
      setTxtLotSize("");
      setLblError({
        ErrorMsg:'Please input Lot size !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
      setFocus("txtFLotSize");
      return;
    }
    if(txtSampleSize === "----Select----"){
      setTxtSampleSize("----Select----");
      setLblError({
        ErrorMsg:'Please select Sampling Size !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
      setFocus("txtFSampleSize");
      return;
    }
    if(txtBarcodetype === "----Select----"){
      setTxtBarcodetype("----Select----");
      setLblError({
        ErrorMsg:'Please select Barcode type !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
      setFocus("txtFBarcodetype");
      return;
    }
    if(txtAperture === "----Select----"){
      setTxtAperture("----Select----");
      setLblError({
        ErrorMsg:'Please select Aperture !!',
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
      setFocus("txtFAperture");
      return;
    }
    if(txtLotNo != ''){
      confirm("Do you want to save data ?");
      if (confirm) {
        const insertOqcBarcodeOutputData = await getData("InsertOqcBarcodeOutputData", {
          lotno: txtLotNo,
          operator: txtOperatorCode,
          state: txtState,
          lotsize: txtLotSize,
          reject: txtReject,
          samplesize: txtSampleSize,
          barcodetype: txtBarcodetype,
          aperture: txtAperture,
          remark: txtRemark
        });
        if (insertOqcBarcodeOutputData.message == "Success") {
          setLblError({
            ErrorMsg:'Save successed',
            ErrorStatus:true,
            ErrorColor:'white',
            ErrorBackground:'green'
          })
          saveSuccessed();
        }else{
          setLblError({
            ErrorMsg:insertOqcBarcodeOutputData.message,
            ErrorStatus:true,
            ErrorColor:'white',
            ErrorBackground:'red'
          })
        }
      }
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
      } else if (type == 'InsertOqcBarcodeOutputData'){
        const response = await axios.post(`/api/Oqc_barcode/InsertOqcoutputData`, {
          dataList:{
            strLotNo: params.lotno,
            strOp: params.operator,
            strState: params.state,
            strLotSize: params.lotsize,
            strReject: params.reject,
            strSampingSize: params.samplesize,
            strBarcodeType: params.barcodetype,
            strAperture: params.aperture,
            strRemark: params.remark
          }
        });
        data = response.data;
      }
    } catch (error) {
      setLblError({
        ErrorMsg:error,
        ErrorStatus:true,
        ErrorColor:'white',
        ErrorBackground:'red'
      })
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
    handleChangeSampleSize,
    handleCancel,
    handleSave,
    lblError,
    setLblError
  };
}

export { fn_T2D_BarcodeOutput };
