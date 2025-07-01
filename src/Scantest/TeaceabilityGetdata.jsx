import React, { useState } from "react";
import { Table, Input, Button, Card, Row, Col } from "antd";
import Title from "antd/es/skeleton/Title";

export default function LotForm() {
  const [lotNo, setLotNo] = useState("");
  const [serials, setSerials] = useState(Array(5).fill(""));
  const [ngSerials, setNgSerials] = useState(
    Array(5).fill({ serial: "", result: "" })
  );

  const handleSerialChange = (index, value) => {
    const newSerials = [...serials];
    newSerials[index] = value;
    setSerials(newSerials);
  };

  const handleNgChange = (index, key, value) => {
    const newNgSerials = [...ngSerials];
    newNgSerials[index] = { ...newNgSerials[index], [key]: value };
    setNgSerials(newNgSerials);
  };

  const handleSave = () => {
    alert(`Lot No : ${lotNo}`)
    alert(`Serials : ${serials}`)
    alert(`Serials : ${ngSerials.map(item => item.serial).join(', ')} Results : ${ngSerials.map(item => item.result).join(', ')}`)
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
          id={`txtserial${index}`}
          value={serials[index]}
          onChange={(e) => handleSerialChange(index, e.target.value)}
        />
      ),
    },
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
             id={`txtserial${index}`}

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
             id={`txtresult${index}`}

          value={ngSerials[index].result}
          onChange={(e) => handleNgChange(index, "result", e.target.value)}
        />
      ),
    },
  ];

  return (
    <Card style={{ maxWidth: 900, margin: "40px auto", padding: 30 }}>
      <Title level={3} style={{ textAlign: "center" }}>Lot Form</Title>
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
      </Row>

      <Row gutter={20}>
        <Col span={12}>
          <Card title="Serials" bordered>
            <Table
            id="grid1"
              pagination={false}
              dataSource={serials.map((_, i) => ({ key: i }))}
              columns={serialColumns}
              size="middle"
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title={<span id='btnSummaryResult' style={{ color: "red", fontWeight: "bold" ,alignContent:'center'}}>NG</span>}
            bordered
            headStyle={{ backgroundColor: "#fffacd" }}
          >
            <Table
            id="grid2"
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