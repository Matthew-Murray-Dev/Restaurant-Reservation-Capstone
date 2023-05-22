import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import { updateTable } from "../../utils/api";

function SeatTableList({ tables, reservation }) {
  const [thisTable, setThisTable] = useState(tables[0].table_id);
  const history=useHistory();

  const handleTableChange = ({ target }) => {
    setThisTable(target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateTable(
      {reservation_id:reservation.reservation_id},
      abortController.signal,
      thisTable
    ).then(()=>history.push(`/dashboard`));
  };
console.log(reservation)
console.log(reservation.reservation_id)
  return (
    <form name="create" onSubmit={handleSubmit}>
      <select
        id="table_id"
        name="table_id"
        required={true}
        onChange={handleTableChange}
        value={thisTable}
      >
        {tables.map((table) => (
          <option key={table.table_id} value={table.table_id}>
            {table.table_name} - {table.capacity}
          </option>
        ))}
      </select>
      <button type="button">Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SeatTableList;
