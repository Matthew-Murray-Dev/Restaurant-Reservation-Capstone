import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm(api, type, reservation = []) {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  if (reservation.length) {
    initialFormState = {
      first_name: reservation.first_name,
      last_name: reservation.last_name,
      mobile_number: reservation.mobile_number,
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time,
      people: reservation.people,
    };
  }

  const [formData, setFormData] = useState({ ...initialFormState });
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    api(formData);
    setFormData({ ...initialFormState });
    reservation.length
      ? history.go(-1)
      : (window.location.href = `${url}/dashboard?date=${formData.reservation_date}`); //history.goBack() - history.push("/")
  };

  return (
    <main>
      <h1>{type} Reservation</h1>
      <div>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Enter First Name"
          style={{ width: "100%" }}
          required={true}
          onChange={handleChange}
          value={formData.first_name}
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Enter Last Name"
          style={{ width: "100%" }}
          required={true}
          onChange={handleChange}
          value={formData.last_name}
        />
      </div>
      <div>
        <label htmlFor="mobile_number">Last Name</label>
        <input
          type="tel"
          id="mobile_number"
          name="mobile_number"
          placeholder="Enter Telephone Number"
          style={{ width: "100%" }}
          required={true}
          onChange={handleChange}
          value={formData.mobile_number}
        />
      </div>
      <div>
        <label htmlFor="reservation_date">Last Name</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          placeholder="During working days and not in the past"
          style={{ width: "100%" }}
          required={true}
          onChange={handleChange}
          value={formData.last_name}
        />
      </div>
      <div>
        <label htmlFor="reservation_time">Last Name</label>
        <input
          type="time"
          id="reservation_time"
          name="description"
          placeholder="During working hours and not <1hr before closing or in the past"
          style={{ width: "100%" }}
          required={true}
          onChange={handleChange}
          value={formData.reservation_time}
        />
      </div>
      <div>
        <label htmlFor="people">Last Name</label>
        <input
          type="number"
          id="people"
          name="people"
          placeholder="Number of people in party, minimum of 1"
          style={{ width: "100%" }}
          required={true}
          onChange={handleChange}
          value={formData.people}
        />
      </div>

      <div className="row p-3">
        <button onClick={history.go(-1)}>Cancel</button>
        <button onSubmit={handleFormSubmit}>Submit</button>
      </div>
    </main>
  );
}

export default ReservationForm;
