import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

function TableForm() {
  let initialForm = { table_name: "", capacity: "" };
  const [formData, setFormData] = useState({ ...initialForm });
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    formData.capacity = parseInt(formData.capacity);
    createTable(formData)
      .then(() => {
        history.push(`/dashboard`);
      })
      .catch(setError);
  };

  const labelStyle = { marginBottom: "4px" };
  const divStyle = { marginBottom: "7px" };

  return (
    <div style={{ maxWidth: "250px" }}>
      <h1>New Table</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleFormSubmit}>
        <div style={divStyle}>
          <label style={labelStyle} htmlFor="table_name">
            Table Name
          </label>
          <input
            type="text"
            id="table_name"
            name="table_name"
            placeholder="Enter table name"
            style={{ width: "100%" }}
            required={true}
            onChange={handleChange}
            value={formData.table_name}
          />
        </div>
        <div style={divStyle}>
          <label style={labelStyle} htmlFor="capacity">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            placeholder="Enter capacity"
            style={{ width: "100%" }}
            required={true}
            onChange={handleChange}
            value={formData.capacity}
          />
        </div>
        <div className="row p-3 ">
          <button type="button" onClick={() => history.go(-1)}>Cancel</button>
          <div className="col col-2">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TableForm;
