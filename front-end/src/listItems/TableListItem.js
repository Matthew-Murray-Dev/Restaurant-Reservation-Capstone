import React from "react";
import { useHistory } from "react-router-dom";
import { deleteTableAssignment } from "../utils/api";

function TableListItem({ table }) {
  const history = useHistory();

  const windowConfirm = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests?\n\nThis cannot be undone."
      )
    ) {
      reDirect();
    }
  };

  const reDirect = () => {
    
    const abortController = new AbortController();
    deleteTableAssignment(table.table_id, abortController.signal).then(
      history.go(0)
    );
  };

  return (
    <tr key={table.table_id}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id ? "Occupied" : "Free"}
      </td>
      <td>
        {table.reservation_id && (
          <button data-table-id-finish={table.table_id} onClick={windowConfirm}>
            Finish
          </button>
        )}
      </td>
    </tr>
  );
}

export default TableListItem;
