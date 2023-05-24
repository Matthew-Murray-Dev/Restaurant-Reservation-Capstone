import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

function ReservationForm({ api, initialForm, reservation = false }) {
  const [formData, setFormData] = useState({ ...initialForm });
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  function formValidation() {
    const formEntryErrors = [];
    let reservationDate = new Date(
      formData.reservation_date.replace(/-/g, "/")
    );
    const date = today();
    const dateToday = new Date();
    const timeToday =
      dateToday.getHours() +
      ":" +
      dateToday.getMinutes() +
      ":" +
      dateToday.getSeconds();

    if (reservationDate.getDay() === 2) {
      formEntryErrors.push({
        id: 1,
        message:
          "Reservation must not be on a Tuesday when the restaurant is closed",
      });
    }

    if (
      new Date(formData.reservation_date + " " + formData.reservation_time) <
      new Date(date + " " + timeToday)
    ) {
      formEntryErrors.push({
        id: 2,
        message: "Reservation must not be in the past",
      });
    }

    if (
      new Date(formData.reservation_date + " " + formData.reservation_time) <
        new Date(`${formData.reservation_date} 10:30`) ||
      new Date(formData.reservation_date + " " + formData.reservation_time) >
        new Date(`${formData.reservation_date} 21:30`)
    ) {
      formEntryErrors.push({
        id: 3,
        message: "Reservation must be after 10:30 AM and before 9:30 PM",
      });
    }

    if (formEntryErrors.length) {
      setError(formEntryErrors);
    }

    return !formEntryErrors.length;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    if (formValidation()) {
      formData.people = parseInt(formData.people);
      if (formData.mobile_number.length === 10) {
        let formatMobileNumber =
          formData.mobile_number.slice(0, 3) +
          "-" +
          formData.mobile_number.slice(3, 6) +
          "-" +
          formData.mobile_number.slice(6);
        formData.mobile_number = formatMobileNumber;
      }
//reservation ? history.go(-1) :


      api(formData, abortController.signal, formData.reservation_id)
        .then(() =>
           history.push(`/dashboard?date=${formData.reservation_date}`)
        )
        .catch(setApiError);
    }
    return () => abortController.abort();
  };

  const labelStyle = { marginBottom: "4px" };
  const divStyle = { marginBottom: "7px" };

  return (
    <div>
      <h1>{reservation ? "Edit" : "New"} Reservation</h1>
      <ErrorAlert error={apiError} />
      {error && (
        <div id="alert-Div" className="alert alert-danger">
          {error.map((e) => {
            return <div key={e.id}>{e.message}</div>;
          })}
        </div>
      )}
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
            pattern="[0-9]{3}[\-]*[0-9]{3}[\-]*[0-9]{4}"
            placeholder="##########"
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
          <button type="button" onClick={() => reservation ? history.go(-1) :history.push('/dashboard')}>
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
