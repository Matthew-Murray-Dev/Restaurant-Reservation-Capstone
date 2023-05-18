import React from "react";
import ReservationListItem from "./ReservationListItem"

function ReservationsList({reservations}){
    
       return (<div>{reservations.map((reservation)=>(<ReservationListItem reservation={reservation} key={reservation.reservation_id}/>))}</div>)

}
    

//
export default ReservationsList