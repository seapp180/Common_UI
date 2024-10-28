import React, { useState } from "react";
import axios from "axios";

function fn_QA_ORT_WorkingRecord() {
  const [opFactory, setOpFactory] = useState([
    { value: "A1", label: "A1" },
    { value: "N1", label: "N1" },
  ]);
  const [opProduct_Type, setOpProduct_Type] = useState([
    { value: "ALL", label: "ALL" },
    { value: "Bare", label: "Bare" },
    { value: "Assy", label: "Assy" },
  ]);
  const [opInput, setOpInput] = useState([
    { value: "INPUT1", label: "INPUT1" },
    { value: "INPUT2", label: "INPUT2" },
  ]);
  const [opOutput, setOpOutput] = useState([
    { value: "OUTPUT1", label: "OUTPUT1" },
    { value: "OUTPUT2", label: "OUTPUT2" },
  ]);
  const [selectedDateFromIn, setSelectedFromIn] = useState(null);
  const [selectedDateFromOut, setSelectedFromOut] = useState(null);
  const [selectedDateToIn, setSelectedToIn] = useState(null);
  const [selectedDateToOut, setSelectedToOut] = useState(null);
  const [drpFactory, setDrpFactory] = useState("");
  const [drpProductType, setDrpProductType] = useState("");
  const [drpInPut, setDrpInPut] = useState("");
  const [drpOutPut, setDrpOutPut] = useState("");
  const [inputProductName, setInputProductName] = useState(null);
  const [inputTestItem, setInputTestItem] = useState(null);
  const [inputLotNo, setInputLotNo] = useState(null);
  const [inputWeekNo, setInputWeekNo] = useState(null);
  const [inputSerialNo, setInputSerialNo] = useState(null);

  const Btn_Search = async () => {
    console.log(
      "Btn_Search",
      selectedDateFromIn,
      selectedDateFromOut,
      selectedDateToIn,
      selectedDateToOut,
      drpFactory,
      drpProductType,
      drpInPut,
      drpOutPut,
      inputProductName,
      inputTestItem,
      inputLotNo,
      inputWeekNo,
      inputSerialNo
    );
    await axios
    .post("/api/QA_ORT_WorkingRecord/Search_QA_ORT_WorkingRecord", {
      PtrList: {
        ptrFactory: drpFactory,
        ptrProductType: drpProductType,
        ptrInput: drpInPut,
        ptrOutput: drpOutPut,
        ptrProductName: inputProductName,
        ptrTestItem: inputTestItem,
        ptrLotNo: inputLotNo,
        ptrWeekNo: inputWeekNo,
        ptrSerialNo: inputSerialNo,
        ptrDateFrom1: selectedDateFromIn,
        ptrDateFrom2: selectedDateFromOut,
        ptrDateTo1: selectedDateToIn,
        ptrDateTo2: selectedDateToOut
      },
    })
    .then((res) => {
      let data = res.data.flat().flat();
      console.log("data ibtExcel_Click", data);
    });
  };

  const Btn_Cancel = async () => {
    console.log("Btn_Cancel");
    setSelectedFromIn(null);
    setSelectedFromOut(null);
    setSelectedToIn(null);
    setSelectedToOut(null);
    setDrpFactory("");
    setDrpProductType("");
    setDrpInPut("");
    setDrpOutPut("");
    setInputProductName(null);
    setInputTestItem(null);
    setInputLotNo(null);
    setInputWeekNo(null);
    setInputSerialNo(null);
  };
  return {
    opFactory,
    opProduct_Type,
    opInput,
    opOutput,
    setSelectedFromIn,
    selectedDateFromIn,
    setSelectedFromOut,
    selectedDateFromOut,
    setSelectedToIn,
    selectedDateToIn,
    setSelectedToOut,
    selectedDateToOut,
    drpFactory,
    setDrpFactory,
    drpProductType,
    setDrpProductType,
    drpInPut,
    setDrpInPut,
    drpOutPut,
    setDrpOutPut,
    setInputProductName,
    inputProductName,
    inputTestItem,
    setInputTestItem,
    inputLotNo,
    setInputLotNo,
    inputWeekNo,
    setInputWeekNo,
    inputSerialNo,
    setInputSerialNo,
    Btn_Search,
    Btn_Cancel,
  };
}

export { fn_QA_ORT_WorkingRecord };
