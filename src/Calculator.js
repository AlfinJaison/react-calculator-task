import React, { useState } from "react";
import { Input, Button, Divider } from "antd";
import Row from "./Row";

export default function Calculator() {
  //STATE CONTAINING LIST OF ROWS
  const [rows, setRows] = useState([
    {
      operation: "add",
      value: "0",
      disabled: false
    }
  ]);

  //UPDATES VALUE OF ROWS[INDEX][PROPERTY]
  function onRowChange(index, field, value) {
    console.log(index, field, value);
    setRows((prevState) => {
      prevState[index][field] = value;
      return [...prevState];
    });
  }

  //APPENDS A ROW TO THE STATE (ROWS)
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

  //FILTERS OUT THE DELETED ROW USING INDEX FROM THE STATE (ROWS)
  function deleteRow(rowIndex) {
    setRows((prevState) => {
      let state = prevState.filter((row, index) => index !== rowIndex);
      return state;
    });
  }

  //CALCULATES SUM OF ALL INPUT VALUES FROM THE STATE (ROWS)
  function calcSum() {
    let sum = 0;
    rows.forEach((row) => {
      const { value, operation, disabled } = row;
      //ONLY DO THE OPERATION IF ROW IS NOT DISABLED
      //AND INPUT VALUE IS NOT AN EMPTY STRING
      if (!disabled && value.length > 0) {
        //VALUE FROM INPUT IS STRING AND MUST BE PARSED BEFORE OPERATION
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
