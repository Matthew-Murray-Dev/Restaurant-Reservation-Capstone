import React from "react";
import ReservationListItem from "./ReservationListItem"

function ReservationsList({reservations}){
    console.log(reservations)
       return (<tbody>{reservations.map((reservation)=>(<ReservationListItem reservation={reservation} key={reservation.reservation_id}/>))}</tbody>)

}
    

//
export default ReservationsList