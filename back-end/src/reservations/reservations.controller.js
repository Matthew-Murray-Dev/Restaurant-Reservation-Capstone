/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//~~~~~Validation Functions~~~~~~~~~~

//For Update/Delete
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
  const date = req.query.reservation_date;
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
function hasEligibleTimeframe(req, res, next) {}

//~~~~~~~~~~~~~~~~~~~~~~~
async function listReservationByDate(req, res) {
  const { reservationsByDate } = res.locals;
  res.json({
    data: reservationsByDate,
  });
}

async function listReservationByMobileNumber(req, res) {
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
  const output = await service.listReservation(reReadData.reservation_id);

  res.json({ data: output });
}

async function deleteReservation(req, res, next) {
  service
    .deleteReservation(res.locals.reservation.reservation_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  create: [
    hasData,
    hasEligibleFutureDate,
    hasEligibleTimeframe,
    asyncErrorBoundary(create),
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
    asyncErrorBoundary(updateReservation),
  ],
  deleteTitanDef: [
    asyncErrorBoundary(reservationExistsById),
    asyncErrorBoundary(deleteReservation),
  ],
};
