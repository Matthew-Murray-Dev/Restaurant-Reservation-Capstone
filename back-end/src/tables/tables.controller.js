const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for table resources
 */

async function tableExistsById(req, res, next) {
  const table_id = req.params.table_id;
  const table = await service.listTableById(table_id);
  if (table && table.length !== 0) {
    res.locals.table = table[0];

    return next();
  }
  return next({ status: 404, message: `Table ${table_id} cannot be found.` });
}
//Create validation

function hasData(req, res, next) {
  if (req.body.data) {
    return next();
  }
  next({ status: 400, message: "Body must have data property" });
}

function hasAllRequiredFields(req, res, next) {
  const fields = ["table_name", "capacity"];
  let fieldCheck = false;
  fields.forEach((field) => {
    if (!req.body.data[field] || req.body.data[field] === "") {
      if (!fieldCheck) {fieldCheck=field} else {fieldCheck=fieldCheck+", "+field}
    }
  });
  if (!fieldCheck) {
    return next();
  }
  next({ status: 400, message: `Please fill out ${fieldCheck} field(s)` });
}

function hasEligibleTableName(req, res, next) {
  const tableName = req.body.data.table_name;
  if (!(tableName.length < 2)) {
    return next();
  }
  next({
    status: 400,
    message: "table_name must be a minimum of two characters",
  });
}

function hasEligibleCapacity(req, res, next) {
  let capacity = req.body.data.capacity;
  if (!capacity){capacity=res.locals.table.capacity}
  if (typeof capacity === "number" && !(capacity < 1)) {
    return next();
  }
  next({
    status: 400,
    message: `capacity must be a number greater than 0`,
  });
}
// Update with Reservation Validation
function hasReservationId(req, res, next) {
  if (req.body.data.reservation_id) {
    return next();
  }
  next({ status: 400, message: "Must contain reservation_id" });
}

async function reservationExistsById(req, res, next) {
  const reservation_id = req.body.data.reservation_id;
  const reservation = await reservationService.listReservationById(
    reservation_id
  );
  if (reservation && reservation.length !== 0) {
    res.locals.reservation = reservation[0];

    return next();
  }
  return next({ status: 404, message: `Reservation ${reservation_id} cannot be found.` });
}

function hasTableCapacity(req, res, next) {
  if (!(res.locals.reservation.people > res.locals.table.capacity)) {
    return next();
  }
  next({ status: 400, message: "Table capacity insufficient for seating" });
}

function hasAvailability(req, res, next) {
    if (!res.locals.table.reservation_id){
return next();
    }
    next({status: 400, message: "table is occupied"})
}
//userStory6
function isNotSeated(req,res,next){
if (!(res.locals.reservation.status==="seated")){
    return next();
}
next({status:400,message:"Reservation is already seated"})
}
//Delete validation
function hasNoOccupants(req, res, next) {
    if (res.locals.table.reservation_id){
return next();
    }
    next({status: 400, message: "Table is not occupied"})
}

//crud functionality
async function create(req, res) {
  const newTable = await service.create(req.body.data);
  res.status(201).json({
    data: newTable[0],
  });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

function listTableById(req, res) {
  const { table } = res.locals;
  res.json({
    data: table,
  });
}

async function updateTable(req, res, next) {
  const updatedTable = {
    ...res.locals.table,
    ...req.body.data,
  };
  
  const updatedReservation = {
    ...res.locals.reservation,
    status:"seated"
  }
  //,updatedReservation
  await service.updateTable(updatedTable,updatedReservation);
  const reReadData = await service.listTableById(res.locals.table.table_id);
  //const output = await service.listTableById(reReadData.table_id);

  res.status(200).json({ data: reReadData });
}

async function deleteTableSeating(req, res, next) {
    service
    .deleteTableSeating(res.locals.table.table_id,res.locals.table.reservation_id)
    .then(() => res.sendStatus(200))
    .catch(next);
  }

module.exports = {
  create: [
    hasData,
    hasAllRequiredFields,
    hasEligibleTableName,
    hasEligibleCapacity,
    asyncErrorBoundary(create),
  ],
  list: asyncErrorBoundary(list),
  update: [
    asyncErrorBoundary(tableExistsById),
    hasData,
    hasReservationId,
    asyncErrorBoundary(reservationExistsById),
    hasEligibleCapacity,hasTableCapacity,
    hasAvailability,isNotSeated,
    asyncErrorBoundary(updateTable),
  ],
  listTableById: [asyncErrorBoundary(tableExistsById), listTableById],
  deleteTableSeating:[asyncErrorBoundary(tableExistsById),hasNoOccupants,asyncErrorBoundary(deleteTableSeating)]
};
