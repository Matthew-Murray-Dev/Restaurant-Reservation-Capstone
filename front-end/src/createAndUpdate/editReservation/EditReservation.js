import React, { useEffect, useState } from "react";
import ReservationForm from "../ReservationForm";
import ErrorAlert from "../../layout/ErrorAlert";
import { updateReservation } from "../../utils/api";


function EditReservation(reservation) {
    initialFormState = {
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        mobile_number: reservation.mobile_number,
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time,
        people: reservation.people,
      };
      
      

      return <ReservationForm api={updateReservation} initialForm={initialFormState} reservation={reservation}/>
}


export default EditReservation