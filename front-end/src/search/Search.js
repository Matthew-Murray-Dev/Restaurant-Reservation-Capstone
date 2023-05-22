import React, { useState } from "react";
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
    <div>
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
      {reservations.length>0 && (<table className="table">
          <thead>
            <tr>
              <th scope="col">Reservation ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Phone #</th>
              <th scope="col">Reservation Date</th>
              <th scope="col">Reservation Time</th>
              <th scope="col">Party Size</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
              <th scope="col">Edit Reservation</th>
              <th scope="col">Cancel Reservation</th>
            </tr>
          </thead>
          
            <ReservationsList reservations={reservations} />
          </table>)}
          </div>
      

  );
}


export default Search;
