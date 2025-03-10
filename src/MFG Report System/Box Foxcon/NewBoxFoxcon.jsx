import React from "react";
import { fn_NewFoxcon } from "./fn_NewFoxcon";
import { Table, Input, Button, Space, Form, DatePicker } from "antd";
import { PrinterOutlined, DeleteOutlined } from "@ant-design/icons";

function NewBoxFoxcon() {
  const { dataSource, columns, message } = fn_NewFoxcon();

  const NewFoxcon = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            padding: "20px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
          }}
        >
          <h3 className="TitleNew_h2">Box Capacity (Foxconn)</h3>

          {/* Form Section */}
          {/* <Form layout="inline" style={{ marginBottom: 16 }}>
            <Form.Item label="Pack By">
              <Input />
            </Form.Item>
            <Form.Item label="Name">
              <Input />
            </Form.Item>
            <Form.Item label="Surnan">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="default">Reset</Button>
            </Form.Item>
          </Form>
          <Form layout="inline" style={{ marginBottom: 16, width: "100%" }}>
            <Form.Item label="Pack Label" style={{ width: "40%" }}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="default">Reset</Button>
            </Form.Item>
          </Form> */}
          <div layout="inline" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Pack By :
                </label>
                <Input />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>Name :</label>
                <Input />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Surname :
                </label>
                <Input />
              </div>
              <div>
                <Button type="default">Reset</Button>
              </div>
            </div>
          </div>
          <div layout="inline" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <label style={{ marginRight: 8, width: "100px" }}>
                  Pack Label :
                </label>
                <Input/>
              </div>
              <div >
                <Button type="default">Reset</Button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            summary={(pageData) => {
              let totalQty = pageData.reduce(
                (sum, record) => sum + record.qty,
                0
              );
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={5}>
                    <b>Total</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <b>{totalQty}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={2}
                    colSpan={2}
                  ></Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />

          {/* Buttons */}
          <Space style={{ marginTop: 16 }}>
            <Button type="primary">Gen Box No.</Button>
            <Button>Cancel</Button>
          </Space>

          {/* Box Details */}
          <div
            style={{
              marginTop: 16,
              padding: 16,
              background: "#f5f5f5",
              borderRadius: 10,
            }}
          >
            <p>
              <b>Product:</b> RGP-494W-0D
            </p>
            <p>
              <b>Box No.:</b> 52502/00141
            </p>
            <p>
              <b>Box Qty:</b> 5,762
            </p>
            <p>
              <b>Packing Date:</b> 01/03/2025
            </p>

            {/* Print Buttons */}
            <Space>
              <Button
                type="primary"
                icon={<PrinterOutlined />}
                style={{ background: "green", borderColor: "green" }}
              >
                Print WH Label
              </Button>
              <Button
                type="primary"
                icon={<PrinterOutlined />}
                style={{ background: "goldenrod", borderColor: "goldenrod" }}
              >
                Print Box Label
              </Button>
            </Space>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <NewFoxcon />
      <h3>{message}</h3>
    </div>
  );
}

export default NewBoxFoxcon;
