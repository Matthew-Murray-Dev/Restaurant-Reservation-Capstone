import React from "react";


function ReservationListItem({reservation}){
   const {reservation_id,first_name,last_name,mobile_number,reservation_date,reservation_time,people,status}=reservation

    return (<tr key={reservation_id}>
        <td>{reservation_id}</td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{mobile_number}</td>
        <td>{reservation_date}</td>
        <td>{reservation_time}</td>
        <td>{people}</td>
        <td>{status}</td>
        <td>{status==="booked"&&<a href={`/reservations/${reservation_id}/seat`}>Seat</a>}</td>
        <td><button>Edit</button></td></tr>)
}


export default ReservationListItem;