import React from "react";
import TableListItem from "./TableListItem";

function TablesList({tables}){

return <tbody>{tables.map((table)=>(<TableListItem table={table} key={table.table_id}/>))}</tbody>
}

    
export default TablesList;