/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//~~~~~Validation Functions~~~~~~~~~~

//For Update
async function reservationExistsById(req, res, next) {
  const reservation_id = req.params;
  const reservation = await service.listReservationById(reservation_id);
  if (reservation && reservation.length !== 0) {
    res.locals.reservation = reservation[0];

    return next();
  }
  return next({ status: 404, message: "Reservation cannot be found." });
}
//These two can probably be combined
async function reservationExistsByMobileNumber(req, res, next) {
  const mobileNumber = req.query.mobile_number;
  const reservation = await service.listReservationByMobileNumber(mobileNumber);
  if (reservation && reservation.length !== 0) {
    res.locals.reservationByMobileNumber = reservation;

    return next();
  }
  return next({ status: 404, message: "No reservations found" });
}

async function reservationExistsByDate(req, res, next) {
  const date = req.query.date;
  const reservation = await service.listReservationByDate(date);
  if (reservation && reservation.length !== 0) {
    res.locals.reservationsByDate = reservation;

    return next();
  }
  return next({ status: 404, message: "No reservations found" });
}

//~~~~~Create validation~~~~~
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
  let fieldCheck = true;
  fields.forEach((field) => {
    if (!req.body.data[field] || req.body.data[field] === "") {
      fieldCheck = false;
    }
  });
  if (fieldCheck) {
    return next();
  }
  next({ status: 400, message: "All fields must be filled out" });
}

function isADate(req, res, next) {
  const date = req.body.data.reservation_date;
  const regexDateTest = /^([0-9]{4})[-/.]*([0-9]{2})[-/.]*([0-9]{2})$/.test(
    date
  );
  if (regexDateTest) {
    return next();
  }
  next({ status: 400, message: "Date must be a valid date" });
}

function isATime(req, res, next) {
  const time = req.body.data.reservation_time;
  const regexTimeTest =
    /^([0-9]{2})[-:.]*([0-9]{2})$/.test(time) ||
    /^([0-9]{2})[-:.]*([0-9]{2})[-:.]*([0-9]{2})$/.test(time);
  if (regexTimeTest) {
    return next();
  }
  next({ status: 400, message: "Time must be a valid time" });
}

function hasEligibleNumberOfPeople(req, res, next) {
  const people = req.body.data.people;
  if (!people < 1 && typeof people === "number") {
    return next();
  }
  next({
    status: 400,
    message: "Party size must be a number greater than 0",
  });
}
//User Story 2
function hasEligibleFutureDate(req, res, next) {
  const dateToday = new Date().toJSON().slice(0, 10);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfReservation = weekday[new Date(reservationDate).getDay()];
  const reservationDate = req.body.data.reservation_date;
  if (!reservationDate < dateToday && dayOfReservation !== "Tuesday") {
    return next();
  }
  next({
    status: 400,
    message: "Date must be in the future and not on a Tuesday",
  });
}
//User Story 3
function hasEligibleTimeframe(req, res, next) {
  const reservationTime = req.body.data.reservation_time;
  const reservationDate = req.body.data.reservation_date;
  const date = new Date();
  const dateToday = date.toJSON().slice(0, 10);
  const minutesSecondsToday = date.toJSON().slice(13, 19);
  const hours = JSON.stringify(date.getHours());
  let timeToday = hours + minutesSecondsToday;
  if (!reservationTime < "10:30" && !reservationTime > "21:30") {
    if (reservationDate > dateToday) {
      return next();
    }
    if (!reservationTime < timeToday) {
      return next();
    }
  }
  next({
    status: 400,
    message: "Time must be in the future and during working hours",
  });
}
//User story 6
function setDefaultStatus(req,res,next){
  const status=req.body.data.status
  if(!status||status===""){
    req.body.data.status="booked"
    }
    if(status==="booked"){
      return next();
    }
  next({status:400,message:'Cannot create reservation with "seated" or "finished" status'})
}

function statusFinished(req,res,next){
  const status=res.locals.reservation.status
  if (!status==="finished"){
    return next();
  }
  next({status:400,message:"a finished reservation cannot be updated"})
}

function statusUnknown(req,res,next){
  const status=req.body.data.status
  const validStatus=["booked","seated","finished","cancelled"]
  if (!status==="unknown"&&validStatus.includes(status)){
    return next();
  }
  next({status:400,message:"Status to update cannot be unknown"})
}


//~~~~~~~~~~~~~~~~~~~~~~~
function listReservationById(req, res) {
  const { reservation } = res.locals;
  res.json({
    data: reservation,
  });
}

function listReservationByDate(req, res) {
  const { reservationsByDate } = res.locals;
  res.json({
    data: reservationsByDate,
  });
}

function listReservationByMobileNumber(req, res) {
  const { reservationsByMobileNumber } = res.locals;
  res.json({
    data: reservationsByMobileNumber,
  });
}

async function create(req, res) {
  const newReservation = await service.create(req.body.data);

  res.status(201).json({
    data: newReservation,
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
  const output = await service.listReservationById(reReadData.reservation_id);

  res.json({ data: output });
}



/*
async function deleteReservation(req, res, next) {
  service
    .deleteReservation(res.locals.reservation.reservation_id)
    .then(() => res.sendStatus(204))
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
    hasEligibleNumberOfPeople,setDefaultStatus,
    asyncErrorBoundary(create),
  ],
  listReservationById: [
    asyncErrorBoundary(reservationExistsById),
    listReservationById,
  ],

  listReservationByMobileNumber: [
    asyncErrorBoundary(reservationExistsByMobileNumber),
    listReservationByMobileNumber,
  ],
  listReservationByDate: [
    asyncErrorBoundary(reservationExistsByDate),
    listReservationByDate,
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
  updateStatus:[asyncErrorBoundary(reservationExistsById),
    hasData,statusFinished,statusUnknown,asyncErrorBoundary(updateReservation)],
  /*deleteReservation: [
    asyncErrorBoundary(reservationExistsById),
    asyncErrorBoundary(deleteReservation),
  ],*/
};
