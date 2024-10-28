import React, { useState } from "react";

function fn_QA_ORT_WorkingRecord() {
  const [options, setOptions] = useState([
    { value: "A1", label: "A1" },
    { value: "N1", label: "N1" },
  ]);
  return { options };
}

export { fn_QA_ORT_WorkingRecord };
