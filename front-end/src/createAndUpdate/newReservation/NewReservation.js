import React from "react";
import ReservationForm from "../ReservationForm";

import { createReservation } from "../../utils/api";
function NewReservation() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  return (
    <ReservationForm api={createReservation} initialForm={initialFormState} />
  );
}

export default NewReservation;
