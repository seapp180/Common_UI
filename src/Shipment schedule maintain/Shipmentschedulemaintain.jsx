import React, { useEffect, useState } from "react";
import {
  TextField,
  // Card,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Typography,
  // Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Autocomplete,
  Box,
  Tooltip,
} from "@mui/material";
import {
  Layout,
  theme,
  Input,
  Button,
  // Table,
  Avatar,
  Card,
  Select,
  Row,
  Col,
  DatePicker,
} from "antd";
const { TextArea } = Input;
const { Option } = Select;
import ImgHome from "../assets/house.png";
import "../Shipment schedule maintain/Shipmentschedulemaintain.css";
//import dayjs from 'dayjs';
import { fn_Shipmentschedulemaintain } from "./fn_Shipmentschedulemaintain";

function Shipmentschedulemaintain() {
  const {
    txtProduct, settxtProduct, selBuild, BuildData, txtLine, settxtLine, txtLotNo, settxtLotNo, txtFirtshipment, settxtFirtshipment,
    txtSecondshipment, settxtSecondshipment, txtLineDisabled, txtLotDisabled, txtSecondDisabled, btsaveDisabled, 
    btnhomeClick, handleChangeProduct, handleChangeBuild, btnSaveClick, btnCancelClick
  } = fn_Shipmentschedulemaintain();

  return (
    <div>
      <Box justifyContent="space-between"
        sx={{
          marginLeft: "10px",
          marginTop: "10px"
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            width: "430px",
            margin: "4px",
          }}
        >
          <Table className="TbShipment">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align="center">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%"
                    }}
                  >
                    <Typography variant="h6" sx={{ marginLeft: "80px" }}>
                      Shipment schedule maintain
                    </Typography>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        border: "none",
                        padding: 0,
                        marginLeft: "10px"
                      }}
                      onClick={btnhomeClick}
                    >
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                        }}
                        src={ImgHome}
                      />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography>Product name :</Typography>
                </TableCell>
                <TableCell style={{ width: "250px" }}>
                  <Input
                    value={txtProduct}
                    onChange={(e) => {
                      settxtProduct(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleChangeProduct();
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Build :</Typography>
                </TableCell>
                <TableCell>
                  <Select
                    style={{ width: '100%' }}
                    value={selBuild || ""}
                    onChange={(e, value) => {
                      handleChangeBuild(value);
                    }}
                  >
                    {BuildData.map((option, index) => (
                      <Option key={index} value={option.build || ""}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Line :</Typography>
                </TableCell>
                <TableCell>
                  <Input
                    value={txtLine}
                    onChange={(e) => {
                      settxtLine(e.target.value);
                    }}
                    disabled={txtLineDisabled}
                    style={{
                      backgroundColor: txtLineDisabled ? "#e0e0e0" : "inherit",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    style={{ marginTop: "-48px" }}
                  >
                    Lot No. :
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextArea rows={4}
                    value={txtLotNo}
                    onChange={(e) => {
                      settxtLotNo(e.target.value);
                    }}
                    disabled={txtLotDisabled}
                    style={{
                      backgroundColor: txtLotDisabled ? "#e0e0e0" : "inherit",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>First shipment plan :</Typography>
                </TableCell>
                <TableCell>
                  <DatePicker
                    style={{ width: "100%" }}
                    //defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                    // format={dateFormatList}
                    value={txtFirtshipment}
                    onChange={(e) => {
                      settxtFirtshipment(e.target.value);
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Second shipment plan :</Typography>
                </TableCell>
                <TableCell>
                  <DatePicker
                    //defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                    // format={dateFormatList}
                    value={txtSecondshipment}
                    onChange={(e) => {
                      settxtSecondshipment(e.target.value);
                    }}
                    disabled={txtSecondDisabled}
                    style={{
                      width: "100%",
                      backgroundColor: txtSecondDisabled ? "#e0e0e0" : "inherit",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{
            marginTop: "6px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginLeft: "5px",
            marginBottom: "2px"
          }}
          >
            <Button
              className="BtSave"
              disabled={btsaveDisabled}
              onClick={btnSaveClick}
            >
              Save
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              className="BtCancel"
              onClick={btnCancelClick}
            >
              Cancel
            </Button>
          </div>
        </TableContainer>
      </Box>
    </div>
  )
};

export default Shipmentschedulemaintain;