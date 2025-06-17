import React, { useState } from "react";
import { Table, Input, Button, Card, Row, Col, Select } from "antd";
import Title from "antd/es/skeleton/Title";

export default function LotForm() {
  const [lotNo, setLotNo] = useState("");
  // const [serials, setSerials] = useState(Array(5).fill(""));
  const [serials, setSerials] = useState([
    { serial: "TEST1" },
    { serial: "TEST2" },
    { serial: "TEST3" },
    { serial: "TEST4" },
    { serial: "TEST5" },
  ]);
  // const [ngSerials, setNgSerials] = useState(
  //   Array(5).fill({ serial: "", result: "" })
  // );
  const [ngSerials, setNgSerials] = useState([
    { serial: "NG_TEST1", result: "NG1" },
    { serial: "NG_TEST2", result: "NG2" },
    { serial: "NG_TEST3", result: "NG3" },
    { serial: "NG_TEST4", result: "NG4" },
    { serial: "", result: "" },
  ]);

  const handleSerialChange = (index, value) => {
    const newSerials = [...serials];
    newSerials[index].serial = value;
    setSerials(newSerials);
  };
  // -------------------------------------
  // const handleSerialChange = (index, value) => {
  //   const newSerials = [...serials];
  //   newSerials[index] = value;
  //   setSerials(newSerials);
  // };
  // -------------------------------------

  const handleNgChange = (index, key, value) => {
    console.log(index, key, value, "TESTจ้า");
    const newNgSerials = [...ngSerials];
    newNgSerials[index] = { ...newNgSerials[index], [key]: value };
    setNgSerials(newNgSerials);
  };

  const handleSave = () => {
    console.log("Lot No:", lotNo);
    console.log("Serials:", serials);
    console.log("NG Serials:", ngSerials);
  };

  const serialColumns = [
    {
      title: "NO.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => (
        <Input
          id={`txtSerial${index}`}
          value={serials[index].serial}
          onChange={(e) => handleSerialChange(index, e.target.value)}
        />
      ),
    },
    // -------------------------------------
    // {
    //   title: "Serial",
    //   dataIndex: "serial",
    //   key: "serial",
    //   render: (_, __, index) => (
    //     <Input
    //       id={`txtSerial${index}`}
    //       value={serials[index]}
    //       onChange={(e) => handleSerialChange(index, e.target.value)}
    //     />
    //   ),
    // },
    // -------------------------------------
  ];

  const ngColumns = [
    {
      title: "NO.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (_, __, index) => (
        <Input
          id={`txtSerial${index}`}
          value={ngSerials[index].serial}
          onChange={(e) => handleNgChange(index, "serial", e.target.value)}
        />
      ),
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      render: (_, __, index) => (
        <Input
          id={`txtResult${index}`}
          value={ngSerials[index].result}
          onChange={(e) => handleNgChange(index, "result", e.target.value)}
        />
      ),
    },
  ];

  return (
    <Card style={{ maxWidth: 900, margin: "40px auto", padding: 30 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Lot Form
      </Title>
      <Row gutter={[16, 24]} align="middle" style={{ marginBottom: 20 }}>
        <Col span={4}>
          <strong>Lot No.</strong>
        </Col>
        <Col span={8}>
          <Input
            id="txtLotNo"
            value={lotNo}
            onChange={(e) => setLotNo(e.target.value)}
            placeholder="Enter Lot Number"
          />
        </Col>
        <Col span={1}>
          <strong>LIST </strong>
        </Col>
        <Col span={8}>
          <Select
            id="txtLotNo"
            value={lotNo}
            style={{width:'100%'}}
            onChange={(e) => setLotNo(e.target.value)}
            placeholder="Enter Lot Number"
          />
        </Col>
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <Card title="Serials" bordered>
            <Table
              pagination={false}
              dataSource={serials.map((_, i) => ({ key: i }))}
              columns={serialColumns}
              size="middle"
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={
              <span
                id="btnSummaryResult"
                style={{
                  color: "red",
                  fontWeight: "bold",
                  alignContent: "center",
                }}
              >
                NG
              </span>
            }
            bordered
            headStyle={{ backgroundColor: "#fffacd" }}
          >
            <Table
              pagination={false}
              dataSource={ngSerials.map((_, i) => ({ key: i }))}
              columns={ngColumns}
              size="middle"
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 30, textAlign: "center" }}>
        <Button id="btnSave" type="primary" size="large" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Card>
  );
}
