import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import SeatTableReservationItem from "./seatTable/SeatTableReservationItem";
import { listReservationById,listTables } from "../utils/api";
import SeatTableList from "./seatTable/SeatTableList";

function SeatForm() {
  const [reservation, setReservation] = useState(null);
  const [tables,setTables]=useState(null)
  const [reservationError, setReservationError] = useState(null);
  const [tablesError,setTablesError] = useState(null)

  const { reservation_id } = useParams();

  useEffect(loadReservation, [reservation_id]);
  useEffect(loadTables, []);
  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    listReservationById(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    return () => abortController.abort();
  }

function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }




  return (
    <div>
      <h1>Seat This Reservation!</h1>
      <div>
        <ErrorAlert error={reservationError} />
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
            </tr>
          </thead>
          {reservation && <SeatTableReservationItem reservation={reservation} />}
        </table>
      </div>
      <ErrorAlert error={tablesError} />
      {(tables&&reservation)&&<SeatTableList key={reservation.reservation_id} tables={tables} reservation={reservation}/>}
    </div>
  );
}

export default SeatForm;
