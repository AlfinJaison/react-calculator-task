import React, { useEffect, useState } from "react";
import { Input, Button, Divider } from "antd";
import Row from "./Row";

export default function Calculator() {
  const [rows, setRows] = useState([
    {
      operation: "add",
      value: 0,
      disabled: false
    }
  ]);

  useEffect(() => {}, []);

  function onRowChange(index, field, value) {
    console.log(index, field, value);
    setRows((prevState) => {
      if (field === "value" && value.length < 1) value = 0;
      prevState[index][field] = value;
      return [...prevState];
    });
  }

  function addRow() {
    setRows((prevState) => {
      let row = {
        operation: "add",
        value: "0",
        disabled: false
      };
      console.log(prevState);
      return [...prevState, row];
    });
  }

  function deleteRow(rowIndex) {
    setRows((prevState) => {
      let state = prevState.filter((row, index) => index !== rowIndex);
      return state;
    });
  }

  function calcSum() {
    let sum = 0;
    rows.forEach((row) => {
      const { value, operation, disabled } = row;
      if (!disabled) {
        let parsedValue = parseFloat(value);
        if (operation === "add") sum += parsedValue;
        if (operation === "subtract") sum -= parsedValue;
      }
    });
    return sum.toFixed(2);
  }

  return (
    <div style={{ padding: 20 }}>
      <div>
        <Button className="m-10" type="primary" onClick={() => addRow()}>
          Add Row
        </Button>
      </div>

      {rows.map((row, index) => {
        return (
          <Row
            row={row}
            index={index}
            onRowChange={onRowChange}
            deleteRow={deleteRow}
          />
        );
      })}

      <Divider />
      <Input className="w-200 m-10" value={calcSum()} type="number" />
    </div>
  );
}
