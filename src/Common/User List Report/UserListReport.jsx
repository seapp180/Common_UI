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
} from "antd";
const { Content } = Layout;
import "./UserListReport.css";
import { fn_UserListReport } from "./fn_UserListReport";

function UserListReport() {
    return (
        <Content>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="TitlePage_h2">User List Report</h2>
            </div>
        </Content>
    )
};

export default UserListReport;