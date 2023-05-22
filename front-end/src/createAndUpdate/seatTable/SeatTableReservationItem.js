import React from "react";

function SeatTableReservationItem({reservation}){
    const {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
              } = reservation;

    return (<tbody><tr key={reservation_id}>
    <td>{reservation_id}</td>
    <td>{first_name}</td>
    <td>{last_name}</td>
    <td>{mobile_number}</td>
    <td>{reservation_date}</td>
    <td>{reservation_time}</td>
    <td>{people}</td>
</tr>

          </tbody>)
}

export default SeatTableReservationItem