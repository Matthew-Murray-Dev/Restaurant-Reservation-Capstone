import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../listItems/ReservationsList";

function Search() {
  const [error, setError] = useState(null);
  const initialFormState = { mobile_number: "" };
  const [formData, setFormData] = useState(initialFormState);
  const [searchStatus, setSearchStatus] = useState(false);

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  console.log(formData);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setReservationsError(null);
    listReservations({mobile_number:formData.mobile_number})
      .then(setReservations)
      .catch(setReservationsError);
    setFormData({ ...initialFormState });
  };
  return (
    <main>
      <div className="row" style={{ padding: "5px" }}>
        <form name="search" onSubmit={handleFormSubmit}>
          <input
            id="mobile_number"
            name="mobile_number"
            type="tel"
            placeholder="Enter a customer's phone number"
            style={{ minWidth: "247px" }}
            value={formData.mobile_number}
            onChange={handleChange}
            required={true}
          />
          <button style={{ marginLeft: "5px" }} onSubmit={handleFormSubmit}>
            Find
          </button>
        </form>
      </div>
      <br />
      <ErrorAlert error={reservationsError} />
<div><ReservationsList reservations={reservations}/></div>
      
{JSON.stringify(reservations)}



      
    </main>
  );
}

/* {<ErrorAlert error={reservationsError} /> ? (
        <ErrorAlert error={reservationsError} />
      ) : (
        JSON.stringify(reservations)
      )}*/
export default Search;
