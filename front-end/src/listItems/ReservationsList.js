import React from "react";
import ReservationListItem from "./ReservationListItem"

function ReservationsList({reservations}){
    
       return (<tbody>{reservations.map((reservation)=>(<ReservationListItem reservation={reservation} key={reservation.reservation_id}/>))}</tbody>)

}
    

//
export default ReservationsList