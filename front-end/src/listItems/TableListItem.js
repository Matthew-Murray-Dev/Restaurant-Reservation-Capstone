import React from "react";

function TableListItem({ table }) {
  return (
    <tr key={table.table_id}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      <td>{table.reseration_id&&<button data-table-id-finish={table.table_id}>Finish</button>}</td>
    </tr>
  );
}

export default TableListItem;
