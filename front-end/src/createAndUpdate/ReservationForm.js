import React, { useState, } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({ api, initialForm, reservation = [] }) {
  const [formData, setFormData] = useState({ ...initialForm });
  const [error, setError] = useState(null);
  const history = useHistory();
  

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    api(formData)
      .then(
        reservation.length
          ? history.go(-1)
          : history.push(`/dashboard?date=${formData.reservation_date}`)
      )
      .catch(setError);
  };

  const labelStyle = { marginBottom: "4px" };
  const divStyle = { marginBottom: "7px" };

  return (
    <div>
      <h1>{reservation.length ? "Edit" : "New"} Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleFormSubmit}>
        <div style={divStyle}>
          <label style={labelStyle} htmlFor="first_name">
            First Name
          </label>
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
        <div style={divStyle}>
          <label style={labelStyle} htmlFor="last_name">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Enter last name"
            style={{ width: "100%" }}
            required={true}
            onChange={handleChange}
            value={formData.last_name}
          />
        </div>
        <div style={divStyle}>
          <label style={labelStyle} htmlFor="mobile_number">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile_number"
            name="mobile_number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="Enter mobile number"
            style={{ width: "100%" }}
            required={true}
            onChange={handleChange}
            value={formData.mobile_number}
          />
        </div>
        <div style={divStyle}>
          <label style={labelStyle} htmlFor="reservation_date">
            Reservation Date
          </label>
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            placeholder="During working days and not in the past"
            style={{ width: "100%" }}
            required={true}
            onChange={handleChange}
            value={formData.reservation_date}
          />
        </div>
        <div style={divStyle}>
          <label style={labelStyle} htmlFor="reservation_time">
            Reservation Time
          </label>
          <input
            type="time"
            id="reservation_time"
            name="reservation_time"
            placeholder="During working hours and not <1hr before closing or in the past"
            style={{ width: "100%" }}
            required={true}
            onChange={handleChange}
            value={formData.reservation_time}
          />
        </div>
        <div style={divStyle}>
          <label style={labelStyle} htmlFor="people">
            Number of People
          </label>
          <input
            type="number"
            min="1"
            id="people"
            name="people"
            placeholder="Number of people in party, minimum of 1"
            style={{ width: "100%" }}
            required={true}
            onChange={handleChange}
            value={formData.people}
          />
        </div>

        <div className="row p-3 ">
          <button onClick={() => history.go(-1)}>Cancel</button>
          <div className="col col-2">
            <button onSubmit={handleFormSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
