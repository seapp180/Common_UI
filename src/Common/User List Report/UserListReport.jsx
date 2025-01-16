import React from "react";
import {
    Layout,
    Button,
    Table,
    Select,
    Modal,
    Spin,
    Tag,
    Avatar,
    Input,
    Card,
    Radio,
    DatePicker
} from "antd";
import {
    SearchOutlined,
    LoadingOutlined,
    CloudUploadOutlined,
    FileOutlined,
    FileExcelOutlined,
    CloseOutlined,
    SaveOutlined,
    UploadOutlined,
    CloseCircleOutlined,
    PlusOutlined,
    MedicineBoxOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import ImgExcel from "../../assets/excel.png";
const { Content } = Layout;
import dayjs from 'dayjs';
import "./UserListReport.css";
import { fn_UserListReport } from "./fn_UserListReport";

function UserListReport() {

    const { selFactory, setselFactory, FactoryData } = fn_UserListReport();
    const monthFormat = 'YYYY/MM';

    return (
        <Content>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="TitlePage_h2">User List Report</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Card
                    bordered={true}
                    style={{
                        width: "300px", // กำหนดความกว้างของการ์ด
                        margin: '20px',
                        height: "100px"
                      }}
                >
                </Card>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}>Factory :</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Select
                                        style={{
                                            width: "200px",
                                            marginLeft: "5px",
                                            marginTop: "5px",
                                        }}
                                        placeholder="Select Factory"
                                        value={selFactory || ""}
                                        onChange={(e) => setselFactory(e)}
                                    >
                                        <Select.Option value="" disabled>
                                            Select Factory
                                        </Select.Option>
                                        {FactoryData.map((data, index) => (
                                            <Select.Option key={index} value={data.value} />
                                        ))}
                                    </Select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}>Resign Month :</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    {/* <Select
                                        style={{
                                            width: "200px",
                                            marginLeft: "5px",
                                            marginTop: "5px",
                                        }}
                                        placeholder="Select Resign Month"
                                    >
                                        <Select.Option value="1">Factory 1</Select.Option>
                                        <Select.Option value="2">Factory 2</Select.Option>
                                    </Select> */}
                                    <DatePicker
                                        style={{
                                            width: "200px",
                                            marginLeft: "5px",
                                            marginTop: "5px",
                                        }}
                                        format={monthFormat}
                                        picker="month"
                                    />
                                </div>
                            </td>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}>To :</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    {/* <Select
                                        style={{
                                            width: "200px",
                                            marginLeft: "5px",
                                            marginTop: "5px",
                                        }}
                                        placeholder="Select Resign Month To :"
                                    >
                                        <Select.Option value="1">Factory 1</Select.Option>
                                        <Select.Option value="2">Factory 2</Select.Option>
                                    </Select> */}
                                    <DatePicker
                                        style={{
                                            width: "200px",
                                            marginLeft: "5px",
                                            marginTop: "5px",
                                        }}
                                        format={monthFormat}
                                        picker="month"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}>Resign Date :</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Input
                                        type="date"
                                        // showSearch
                                        // value={SL_Unit}
                                        style={{
                                            width: "200px",
                                            marginTop: "5px",
                                            marginLeft: "5px",
                                        }}
                                        placeholder="Resign Date From :"
                                    />
                                </div>
                            </td>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}>To :</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Input
                                        type="date"
                                        // showSearch
                                        // value={SL_Unit}
                                        style={{
                                            width: "200px",
                                            marginTop: "5px",
                                            marginLeft: "5px",
                                        }}
                                        placeholder="Resign Date To :"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}>Emp ID :</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Input
                                        style={{
                                            width: "200px",
                                            marginTop: "5px",
                                            marginLeft: "5px",
                                        }}
                                        placeholder="Emp ID"
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}>Name :</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Input
                                        style={{
                                            width: "200px",
                                            marginTop: "5px",
                                            marginLeft: "5px",
                                        }}
                                        placeholder="Name"
                                    />
                                </div>
                            </td>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}>Surname :</span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Input
                                        style={{
                                            width: "200px",
                                            marginTop: "5px",
                                            marginLeft: "5px",
                                        }}
                                        placeholder="Surname"
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div style={{ marginLeft: "30px", textAlign: "right" }}>
                                    <span style={{ fontSize: "14px" }}></span>
                                </div>
                            </td>
                            <td>
                                <div className="divbutton">
                                    <Button
                                        style={{
                                            //background: "#5AA8F5",
                                            marginLeft: "5px",
                                        }}
                                        type="primary"
                                        icon={<SearchOutlined />}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        icon={<CloseOutlined />}
                                        danger
                                        type="primary"
                                        style={{ marginLeft: "10px" }}
                                    // onClick={() => Clear()}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        icon={<img src={ImgExcel} alt="icon" style={{ width: '20px', height: '20px' }} />}
                                        style={{ marginLeft: "10px" }}
                                    // onClick={() => Clear()}
                                    >
                                        Export
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Content>
    )
};

export default UserListReport;