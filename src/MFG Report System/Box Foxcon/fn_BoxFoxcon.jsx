import React from "react";
import { useNavigate } from "react-router-dom";

function fn_BoxFoxcon() {
  const navigate = useNavigate();
  const [item, setItem] = React.useState("");
  const handleGoToNextPage = (page) => {
    console.log(page, "page");
    navigate("/CommonSystem/MFGReportSystem/NewBoxFoxcon", {
      state: { message: item },
    });
  };
  return {
    handleGoToNextPage,
    item,
    setItem,
  };
}

export { fn_BoxFoxcon };
