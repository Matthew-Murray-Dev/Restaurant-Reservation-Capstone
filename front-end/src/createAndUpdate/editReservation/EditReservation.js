import React, { useEffect, useState } from "react";
import ReservationForm from "../ReservationForm";
import { updateReservation } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import {listReservationById} from "../../utils/api"
import {useParams} from "react-router-dom"

function EditReservation() {
 
  const [reservation, setReservation] = useState(null);
  const [reservationError, setReservationError] = useState(null);

const {reservation_id} = useParams();

  useEffect(loadReservation, []);
  function loadReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    listReservationById(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setReservationError);
    return () => abortController.abort();
  }
console.log(reservation)
  return (<div>
    <ErrorAlert error={reservationError} />
    {(!reservationError&&reservation) && <ReservationForm
      api={updateReservation}
      initialForm={reservation}
      reservation={!reservationError&&true}
      
    />}</div>
  );
}

export default EditReservation;
