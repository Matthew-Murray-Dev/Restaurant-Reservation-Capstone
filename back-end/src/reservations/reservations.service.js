const knex = require("../db/connection");

function create(newReservation) {
  return knex("reservations").insert(newReservation).returning("*");
}

/*
function list() {
  return knex("reservations").select("*");
}
*/

function listReservationById(reservation_id) {
  return knex("reservation").select("*").where({ reservation_id });
}

function listReservationByMobileNumber(mobile_number) {
  return knex("reservation").select("*").where({ mobile_number });
}

function listReservationByDate(date){
    return knex("reservation").select("*").where({ date }).sortBy('reservation_time','desc');
}

function updateReservation(updatedReservation) {
  return knex("reservation")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation);
}

function deleteReservation(reservation_id) {
    return knex("reservation").where({ reservation_id }).del();
  }

  module.exports = {
    create,
    //list,
    listReservationById,
    listReservationByMobileNumber,
    listReservationByDate,
    updateReservation,
    deleteReservation,
  };