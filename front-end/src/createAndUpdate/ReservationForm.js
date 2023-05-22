import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({
  api,
  initialForm,
  reservation = false,
  reload,
  setReloading,
}) {
  const [formData, setFormData] = useState({ ...initialForm });
  const [error, setError] = useState(null);
  const history = useHistory();

  console.log(initialForm);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  console.log(reload)
  console.log(formData);
  const handleFormSubmit = (event) => {
    event.preventDefault();
    setReloading(!reload);
    formData.people = parseInt(formData.people);
    const abortController = new AbortController();
    api(formData, abortController.signal, formData.reservation_id)
      .then(
        reservation
          ? history.go(-1)
          : history.push(`/dashboard?date=${formData.reservation_date}`)
      )
      .catch(setError);
  };

  const labelStyle = { marginBottom: "4px" };
  const divStyle = { marginBottom: "7px" };

  return (
    <div>
      <h1>{reservation ? "Edit" : "New"} Reservation</h1>
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
            placeholder="Enter first name"
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
            placeholder="###-###-####"
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
            placeholder="Enter reservation date"
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
            placeholder="Enter reservation time"
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
            placeholder="Enter number of people, minimum 1"
            style={{ width: "100%" }}
            required={true}
            onChange={handleChange}
            value={formData.people}
          />
        </div>

        <div className="row p-3 ">
          <button type="button" onClick={() => history.go(-1)}>
            Cancel
          </button>
          <div className="col col-2">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
