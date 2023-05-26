import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function SeatTableList({ tables, reservation }) {
  const [thisTable, setThisTable] = useState(tables[0].table_id);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const history = useHistory();

  const handleTableChange = ({ target }) => {
    setThisTable(target.value);
  };

  function formValidation() {
    const formErrors = [];
    const tableSelect = tables.find(
      (table) => table.table_id === parseInt(thisTable)
    );

    if (!tableSelect) {
      formErrors.push({ id: 1, message: "Selected table does not exist." });
    } else if (!reservation) {
      formErrors.push({ id: 2, message: "Reservation does not exist." });
    } else {
      if (tableSelect.reservation_id) {
        formErrors.push({
          id: 3,
          message: "Selected table is currently occupied.",
        });
      }

      if (tableSelect.capacity < reservation.people) {
        formErrors.push({id:4,
          message: `Selected table has insufficient capacity for ${reservation.people} people.`,
        });
      }
    }

    if (formErrors.length) {
      setError(formErrors);
    }
    
    return !formErrors.length;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    if (formValidation()) {
      updateTable(
        { reservation_id: reservation.reservation_id },
        abortController.signal,
        thisTable
      )
        .then(() => history.push(`/dashboard`))
        .catch(setApiError);
    }
    return () => abortController.abort();
  };


  return (
    <div>
      
      {error && (
        <div id="alert-Div" className="alert alert-danger">
          {error.map((e) => {
            return <ErrorAlert key={e.id} error={e.message}/>
          })}
        </div>
      )}

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
        <button type="button" onClick={() => history.go(-1)}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SeatTableList;
