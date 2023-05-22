/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//~~~~~Validation Functions~~~~~~~~~~

async function reservationExistsById(req, res, next) {
  const reservation_id = req.params.reservation_id;
  const reservation = await service.listReservationById(reservation_id);
  if (reservation && reservation.length !== 0) {
    res.locals.reservation = reservation[0];

    return next();
  }
  return next({
    status: 404,
    message: `Reservation ${reservation_id} cannot be found.`,
  });
}

async function reservationExistsByQuery(req, res, next) {
  const mobile_number = req.query.mobile_number;
  if (!mobile_number) {
    let date = req.query.date;
    if (!date) {
      let todaysDate = new Date();
      todaysDate.toISOString().split("T")[0];

      const offset = todaysDate.getTimezoneOffset();
      todaysDate = new Date(todaysDate.getTime() - offset * 60 * 1000);

      date = todaysDate;
    }
    const reservationByDate = await service.listReservationByDate(date);
    if (reservationByDate && reservationByDate.length !== 0) {
      res.locals.reservation = reservationByDate;

      return next();
    }
    return next({ status: 404, message: "No reservations found" });
  } else {
    const reservationByMobile_Number =
      await service.listReservationByMobileNumber(mobile_number);
    res.locals.reservation = [];
    if (reservationByMobile_Number && reservationByMobile_Number.length !== 0) {
      res.locals.reservation = reservationByMobile_Number;
    }

    return next();
  }
}

//User Story 1 - Create/Update validation
function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must have data property" });
}

function hasAllRequiredFields(req, res, next) {

  
  const fields = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  let fieldCheck = false;
  fields.forEach((field) => {
    if (!req.body.data[field] || req.body.data[field] === "") {
      if (!fieldCheck) {
        fieldCheck = field;
      } else {
        fieldCheck = fieldCheck + ", " + field;
      }
    }
  });
  if (!fieldCheck) {
    return next();
  }
  next({ status: 400, message: `Please fill out ${fieldCheck} field(s)` });
}

function isADate(req, res, next) {
  const date = req.body.data.reservation_date;
  const regexDateTest = /^([0-9]{4})[-/.]*([0-9]{2})[-/.]*([0-9]{2})$/.test(
    date
  );
  if (regexDateTest) {
    return next();
  }
  next({ status: 400, message: "reservation_date must be a valid date" });
}

function isATime(req, res, next) {
  const time = req.body.data.reservation_time;
  const regexTimeTest =
    /^([0-9]{2})[-:.]*([0-9]{2})$/.test(time) ||
    /^([0-9]{2})[-:.]*([0-9]{2})[-:.]*([0-9]{2})$/.test(time);
  if (regexTimeTest) {
    return next();
  }
  next({ status: 400, message: "reservation_time must be a valid time" });
}

function hasEligibleNumberOfPeople(req, res, next) {
  const people = req.body.data.people;
  
  if (typeof people === "number" && !(people < 1)) {
    return next();
  }
  next({
    status: 400,
    message: "Number of people must be greater than 0 and a number",
  });
}
//User Story 2 - future date validation
function hasEligibleFutureDate(req, res, next) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const reservationDate = req.body.data.reservation_date;

  let dayOfWeek = new Date(reservationDate);
  let dateToday = new Date();

  const offset = dayOfWeek.getTimezoneOffset();

  dayOfWeek = new Date(dayOfWeek.getTime() + offset * 60 * 1000);
  dateToday = new Date(dateToday.getTime() - offset * 60 * 1000)
    .toJSON()
    .slice(0, 10);

  const dayOfReservation = weekday[dayOfWeek.getDay()];

  if (!(reservationDate < dateToday) && dayOfReservation !== "Tuesday") {
    return next();
  }
  next({
    status: 400,
    message: `reservation_date must be in the future and not on a Tuesday when the restaurant is closed`,
  });
}
//User Story 3 - future time validation
function hasEligibleTimeframe(req, res, next) {
  const reservationTime = req.body.data.reservation_time;
  const reservationDate = req.body.data.reservation_date;

  let dateToday = new Date();
  const offset = dateToday.getTimezoneOffset();
  dateToday = new Date(dateToday.getTime() - offset * 60 * 1000);

  if (!(reservationTime < "10:30") && !(reservationTime > "21:30")) {
    if (reservationDate > dateToday.toJSON().slice(0, 10)) {
      return next();
    }
    if (!(reservationTime < dateToday.toJSON().slice(11, 19))) {
      return next();
    }
  }
  next({
    status: 400,
    message: `Time must be in the future and during working hours`,
  });
}
//User story 6 - status validation
function checkStatus(req, res, next) {
  const status = req.body.data.status;
  const invalidStatus = ["seated", "finished", "cancelled"];
  if (!invalidStatus.includes(status)) {
    return next();
  }
  next({
    status: 400,
    message: 'Cannot create reservation with "seated" or "finished" status',
  });
}

function statusFinished(req, res, next) {
  const status = res.locals.reservation.status;
  if (!(status === "finished")) {
    return next();
  }
  next({ status: 400, message: "a finished reservation cannot be updated" });
}

function statusUnknown(req, res, next) {
  const status = req.body.data.status;
  const validStatus = ["booked", "seated", "finished", "cancelled"];
  if (!(status === "unknown") && validStatus.includes(status)) {
    return next();
  }
  next({ status: 400, message: "Status to update cannot be unknown" });
}

//format Date

function formatDate(req,res,next){
  if (res.locals.reservation.length){res.locals.reservation.forEach((reservation)=>{reservation.reservation_date=reservation.reservation_date.toISOString().slice(0, 10)})} else if (!Array.isArray(res.locals.reservation)) {res.locals.reservation.reservation_date=res.locals.reservation.reservation_date.toISOString().slice(0,10)}
  
   

  
  
  
  return next();
  }



//Create,List,Update,Delete

async function create(req, res) {
  const newReservation = await service.create(req.body.data);

  res.status(201).json({
    data: newReservation[0],
  });
}

function listReservation(req, res) {
  const { reservation } = res.locals;
  res.json({
    data: reservation,
  });
}

async function updateReservation(req, res, next) {
  const updatedReservation = {
    ...res.locals.reservation,
    ...req.body.data,
  };
  await service.updateReservation(updatedReservation);
  const reReadData = await service.listReservationById(
    res.locals.reservation.reservation_id
  );
  res.json({ data: reReadData[0] });
}

/*
async function deleteReservation(req, res, next) {
  service
    .deleteReservation(res.locals.reservation.reservation_id)
    .then(() => res.sendStatus(200))
    .catch(next);
}
*/
module.exports = {
  create: [
    hasData,
    hasAllRequiredFields,
    isADate,
    isATime,
    hasEligibleFutureDate,
    hasEligibleTimeframe,
    hasEligibleNumberOfPeople,
    checkStatus,
    asyncErrorBoundary(create),
  ],
  listReservationById: [
    asyncErrorBoundary(reservationExistsById),
    formatDate,
    listReservation,
  ],

  listReservationByQuery: [
    asyncErrorBoundary(reservationExistsByQuery),
    formatDate,
    listReservation,
  ],

  updateReservation: [
    asyncErrorBoundary(reservationExistsById),
    hasData,
    hasAllRequiredFields,
    isADate,
    isATime,
    hasEligibleFutureDate,
    hasEligibleTimeframe,
    hasEligibleNumberOfPeople,
    asyncErrorBoundary(updateReservation),
  ],
   updateStatus: [
    asyncErrorBoundary(reservationExistsById),
    hasData,
    statusFinished,
    statusUnknown,
    asyncErrorBoundary(updateReservation),
  ],
  /*deleteReservation: [
    asyncErrorBoundary(reservationExistsById),
    asyncErrorBoundary(deleteReservation),
  ],*/
};




