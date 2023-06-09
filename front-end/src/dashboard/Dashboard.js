import React, { useEffect, useState } from "react";
import { useHistory} from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../listItems/ReservationsList";
import { previous, next, today } from "../utils/date-time";
import TablesList from "../listItems/TablesList";



/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date}) {

 
  
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  
  const history = useHistory();

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  let buttonProps = {};

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="row" style={{ maxWidth: "400px" }}>
        <div className="col">
          <button {...buttonProps}
            onClick={() =>{//console.log(buttonProps,"1")
              buttonProps={disabled:true};
//console.log(buttonProps,"2")
              history.push(`/dashboard?date=${previous(date)}`);
              //console.log(buttonProps,"3")
            buttonProps={}
            //console.log(buttonProps,"4")
          }
              }
          >
            Previous <br /> {previous(date)}
          </button>
        </div>
        <div className="col">
          <button onClick={() => {
              history.push(`/dashboard?date=${today()}`);}}>
            Today <br /> {today()}
          </button>
        </div>
        <div className="col">
          <button onClick={() => {
              history.push(`/dashboard?date=${next(date)}`);}}>
            Next <br /> {next(date)}
          </button>
        </div>
      </div>
      <br />
      <ErrorAlert error={reservationsError} />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Reservation ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone #</th>
              <th scope="col">Reservation Date</th>
              <th scope="col">Reservation Time</th>
              <th scope="col">Party Size</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              <th scope="col">Edit Reservation</th>
              <th scope="col">Cancel Reservation</th>
            </tr>
          </thead>
          {!reservationsError && (
            <ReservationsList reservations={reservations}  />
          )}
        </table>
      </div>
      <ErrorAlert error={tablesError} />
      <div style={{ maxWidth: "400px" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Table ID</th>
              <th scope="col">Table Name</th>
              <th scope="col">Capacity</th>
              <th scope="col">Availability</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          {!tablesError && <TablesList tables={tables} />}
        </table>
      </div>
    </main>
  );
}
//
export default Dashboard;
