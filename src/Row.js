import React from "react";
import { Select, Input, Button } from "antd";

export default function Row({ row, index, onRowChange, deleteRow }) {
  return (
    <div>
      <Select
        className="m-10"
        value={row.operation}
        onChange={(value) => onRowChange(index, "operation", value)}
        options={[
          { label: "+", value: "add" },
          { label: "-", value: "subtract" }
        ]}
      />

      <Input
        className="w-200 m-10"
        value={row.value}
        type="number"
        onChange={(event) => onRowChange(index, "value", event.target.value)}
      />

      {row.disabled ? (
        <Button
          className="m-10"
          onClick={() => onRowChange(index, "disabled", false)}
        >
          Enable
        </Button>
      ) : (
        <Button
          className="m-10"
          onClick={() => onRowChange(index, "disabled", true)}
        >
          Disable
        </Button>
      )}

      <Button className="m-10" onClick={() => deleteRow(index)}>
        Delete
      </Button>
    </div>
  );
}
