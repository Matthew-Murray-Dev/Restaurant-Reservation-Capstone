import React from "react";
import { useHistory } from "react-router-dom";
import { updateReservation } from "../utils/api";

function ReservationListItem({ reservation }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;
  const handleUpdate = (event) => {
    event.preventDefault();
    windowConfirm();
  };
  const history = useHistory();

  const reDirect = () => {
    const abortController = new AbortController();
    console.log(updateReservation(
      { status: "cancelled" },
      abortController.signal,
      reservation_id,
      "/status"
    ))
    updateReservation(
      { status: "cancelled" },
      abortController.signal,
      reservation_id,
      "/status"
    ).then(()=>history.go(0));
  };
  const windowConfirm = () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation?\n\nThis cannot be undone."
      )
    ) {
      reDirect();
    }
  };
  return (
    <tr key={reservation_id}>
      <td>{reservation_id}</td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{mobile_number}</td>
      <td>{reservation_date}</td>
      <td>{reservation_time}</td>
      <td>{people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>{status}</td>
      <td>
        {status === "booked" && (
          <a href={`/reservations/${reservation_id}/seat`}>Seat</a>
        )}
      </td>
      <td>
      <a href={`/reservations/${reservation_id}/edit`}>Edit</a>
      </td>
      <td>
        <button data-reservation-id-cancel={reservation.reservation_id} onClick={handleUpdate}>Cancel</button>
      </td>
    </tr>
  );
}
//`/reservations/${reservation_id}/edit`
export default ReservationListItem;
