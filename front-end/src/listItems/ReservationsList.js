import React from "react";
import ReservationListItem from "./ReservationListItem"

function ReservationsList({reservations,reload,setReload}){
    console.log(reservations)
       return (<tbody>{reservations.map((reservation)=>(<ReservationListItem reservation={reservation} reload={reload} setReload={setReload} key={reservation.reservation_id}/>))}</tbody>)

}
    

//
export default ReservationsList