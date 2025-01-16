import React, { useEffect, useState } from "react";
import axios from "axios";

function fn_UserListReport() {
    const[selFactory, setselFactory] = useState("");
    const[FactoryData, setFactoryData] = useState([]);
    const[txtEmpID, settxtEmpID] = useState("");
    const[txtName, settxtName] = useState("");
    const[txtSurname, settxtSurname] = useState("");

    useEffect(() => {
      GetFactory();
    }, []);

    const GetFactory = async () => {
        await axios.post("/api/UserListReport/GetFactory")
        .then((res) => {
            let data = res.data.flat();
            setFactoryData(data);
            setselFactory(data[0].value);
        })
        .catch((error) => {
            console.error("Error fetching the URL:", error);
        });
    };

  return {
    selFactory, setselFactory, FactoryData
  }   
};

export { fn_UserListReport };