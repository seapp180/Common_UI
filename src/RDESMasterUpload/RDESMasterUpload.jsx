import React, { useEffect, useState, useRef } from "react";
import {
  Layout,
  theme,
  Input,
  Button,
  Table,
  Avatar,
  Card,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
import axios from "axios";
import {
  SearchOutlined,
  UndoOutlined,
  LoadingOutlined,
  UploadOutlined,
  CloseOutlined
 
} from "@ant-design/icons";
import moment from "moment";
import ImgInProcess from "../assets/time-management.png";
import ImgComplete from "../assets/completed-task.png";
import ImgAllPo from "../assets/result.png";
import { styled } from "@mui/material";
import { fn_RDESMasterUpload } from "./fn_RDESMasterUpload";
import "./RDESMasterUpload.css";
const { Content } = Layout;
 
const Page2 = () => {

 
  const { SL_Product, handleChange, columns, Product,DataSearch } = fn_RDESMasterUpload();
 
  return (
    <>
     
      
    </>
  );
};
 
export default Page2;