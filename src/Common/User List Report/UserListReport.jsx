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
    Row,
    Col,
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
import ImgCheck from "../../assets/Check.png";
import ImgExport from "../../assets/export1.png";
import ImgResign from "../../assets/box2.png";
const { Content } = Layout;
import dayjs from 'dayjs';
import "./UserListReport.css";
import { fn_UserListReport } from "./fn_UserListReport";

function UserListReport() {

    const {
        selFactory, setselFactory, FactoryData, CheckMFGProClick, columnsCheck, CheckMFGProData, btnExportClick, pnlCheck, StyleonMouseEnter, StyleonMouseLeave,
        MFGProuserlistClick, selMonthFrom, handleMonthChange, btnSearchClick, columnsSearch, SearchData, handleMonthToChange, selMonthTo, handleDateFromChange, selDatefrom,
        handleDateToChange, selDateTo, txtEmpID, settxtEmpID, txtName, settxtName, txtSurname, settxtSurname, TbSearch, btnResetClick, btnExport_Click, pnlResign, ReSidePersonClick,
        factoryRef } = fn_UserListReport();

    const monthFormat = 'MM/YYYY';
    const dateFormat = 'DD/MM/YYYY';

    return (
        <Content>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="TitlePage_h2">User List Report</h2>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                    gap: "20px",
                }}>
                <Card
                    style={{
                        width: "390px",
                        height: "160px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        padding: "6px",
                        background: "#998CEB",
                        border: 0,
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out",
                        color: "#ffffff",
                    }}
                    onMouseEnter={(e) => {
                        StyleonMouseEnter(e)
                    }}
                    onMouseLeave={(e) => {
                        StyleonMouseLeave(e)
                    }}
                    onClick={() => CheckMFGProClick()}
                >
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>

                                <td style={{ width: "120px", verticalAlign: "middle" }}>
                                    <Avatar
                                        src={ImgCheck}
                                        shape="square"
                                        style={{
                                            cursor: "pointer",
                                            height: "100px",
                                            width: "100px",
                                        }}
                                    />
                                </td>

                                <td style={{ textAlign: "left", verticalAlign: "middle", paddingLeft: "10px" }}>
                                    <div>
                                        <span
                                            style={{
                                                fontSize: "22px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Check MFG/Pro user still active
                                        </span>
                                        <br />
                                        <span
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            (Resigned)
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>

                <Card
                    style={{
                        width: "390px",
                        height: "160px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        padding: "6px",
                        background: "#37B7C3", //3DC2EC //37B7C3 //7AB2D3
                        border: 0,
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        color: "#ffffff",
                    }}
                    onMouseEnter={(e) => {
                        StyleonMouseEnter(e)
                    }}
                    onMouseLeave={(e) => {
                        StyleonMouseLeave(e)
                    }}
                    onClick={() => MFGProuserlistClick()}
                >
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>

                                <td style={{ width: "120px", verticalAlign: "middle" }}>
                                    <Avatar
                                        src={ImgExport}
                                        shape="square"
                                        style={{
                                            cursor: "pointer",
                                            height: "100px",
                                            width: "100px",
                                        }}
                                    />
                                </td>

                                <td style={{ textAlign: "left", verticalAlign: "middle", paddingLeft: "10px" }}>
                                    <div>
                                        <span
                                            style={{
                                                fontSize: "22px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            MFG/Pro user list
                                        </span>
                                        <br />
                                        <span
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            (for Auditor)
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>

                <Card
                    style={{
                        width: "390px",
                        height: "160px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        padding: "6px",
                        background: "#FF9F66",
                        border: 0,
                        cursor: "pointer",
                        transition: "transform 0.3s ease-in-out",
                        color: "#ffffff",
                    }}
                    onClick={() => ReSidePersonClick()}
                    onMouseEnter={(e) => {
                        StyleonMouseEnter(e)
                    }}
                    onMouseLeave={(e) => {
                        StyleonMouseLeave(e)
                    }}
                    
                >
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>

                                <td style={{ width: "120px", verticalAlign: "middle" }}>
                                    <Avatar
                                        src={ImgResign}
                                        shape="square"
                                        style={{
                                            cursor: "pointer",
                                            height: "100px",
                                            width: "100px",
                                        }}
                                    />
                                </td>

                                <td style={{ textAlign: "left", verticalAlign: "middle", paddingLeft: "10px" }}>
                                    <div>
                                        <span
                                            style={{
                                                fontSize: "22px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Resign Person
                                        </span>
                                        <br />
                                        <span
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            (Humantrix)
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Card>
            </div>

            {pnlCheck && (
                <div>
                    <Card
                        style={{
                            marginTop: "40px",
                            padding: "5px",
                        }}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "10px",
                        }}
                        >
                            <Button
                                icon={
                                    <img
                                        src={ImgExcel}
                                        alt="Excel Icon"
                                        style={{ width: 20, height: 20 }}
                                    />
                                }
                                onClick={() => btnExportClick()}
                            >
                                Export Excel
                            </Button>
                        </div>
                        <Table
                            columns={columnsCheck}
                            dataSource={CheckMFGProData}
                            className="tableCheckMFG"
                            bordered
                            pagination={false}
                            scroll={{ x: "max-content", y: 240 }}
                            rowKey={(record) => record.EMP_CODE}
                        >
                        </Table>
                    </Card>
                </div>
            )}

            {pnlResign && (
                <div style={{ height:'800px' }}>
                    <Card
                        style={{
                            marginTop: "40px",
                            padding: "5px",
                            // height: "300px",
                        }}
                    >
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
                                                    id="Factory"
                                                    style={{
                                                        width: "200px",
                                                        marginLeft: "5px",
                                                        marginTop: "5px",
                                                    }}
                                                    showSearch
                                                    placeholder="Select Factory"
                                                    value={selFactory || "" || undefined}
                                                    onChange={(value) => setselFactory(value)}
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                                    }
                                                    options={FactoryData}
                                                    ref={factoryRef}
                                                >
                                                    {/* <Select.Option value="" disabled>Select Factory</Select.Option>
                                                    {FactoryData.map((data, index) => (
                                                        <Select.Option key={index} value={data.value || ""}>
                                                            {data.label}
                                                        </Select.Option>
                                                    ))} */}
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
                                                <DatePicker
                                                    style={{
                                                        width: "200px",
                                                        marginLeft: "5px",
                                                        marginTop: "5px",
                                                    }}
                                                    format={monthFormat}
                                                    value={selMonthFrom ? dayjs(selMonthFrom, "YYYYMM") : ""}
                                                    onChange={(e) => handleMonthChange(e)}
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
                                                    value={selMonthTo ? dayjs(selMonthTo, "YYYYMM") : ""}
                                                    onChange={(e) => handleMonthToChange(e)}
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
                                                <DatePicker
                                                    style={{
                                                        width: "200px",
                                                        marginLeft: "5px",
                                                        marginTop: "5px",
                                                    }}
                                                    format={dateFormat}
                                                    value={selDatefrom ? dayjs(selDatefrom, "YYYYMMDD") : ""}
                                                    onChange={(e) => handleDateFromChange(e)}
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
                                                <DatePicker
                                                    style={{
                                                        width: "200px",
                                                        marginLeft: "5px",
                                                        marginTop: "5px",
                                                    }}
                                                    format={dateFormat}
                                                    value={selDateTo ? dayjs(selDateTo, "YYYYMMDD") : ""}
                                                    onChange={(e) => handleDateToChange(e)}
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
                                                    value={txtEmpID || ""}
                                                    onChange={(e) => settxtEmpID(e.target.value)}
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
                                                    value={txtName || ""}
                                                    onChange={(e) => settxtName(e.target.value)}
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
                                                    value={txtSurname || ""}
                                                    onChange={(e) => settxtSurname(e.target.value)}
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
                                                    onClick={() => btnSearchClick()}
                                                >
                                                    Search
                                                </Button>
                                                <Button
                                                    icon={<CloseOutlined />}
                                                    danger
                                                    type="primary"
                                                    style={{ marginLeft: "10px" }}
                                                    onClick={() => btnResetClick()}
                                                >
                                                    Reset
                                                </Button>
                                                <Button
                                                    icon={<img src={ImgExcel} alt="icon" style={{ width: '20px', height: '20px' }} />}
                                                    style={{ marginLeft: "10px" }}
                                                    onClick={() => btnExport_Click()}
                                                >
                                                    Export
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {TbSearch && (
                            <Table
                                columns={columnsSearch}
                                dataSource={SearchData}
                                className="tableCheckMFG"
                                style={{ width: "100%", marginTop: "20px" }}
                                bordered
                                pagination={true}
                                scroll={{ x: "max-content", y: 240 }}
                                rowKey={(record) => record.EMPCODE}
                            >
                            </Table>
                        )}
                    </Card>
                </div>
            )}
        </Content>
    )
};

export default UserListReport;