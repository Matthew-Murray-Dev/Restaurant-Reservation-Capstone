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
    return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function listReservationByDate(date){
    return knex("reservation").select("*").where({ date }).whereNot({status: "finished"}).orWhereNot({status:"cancelled"}).sortBy('reservation_time','asc');
}

function updateReservation(updatedReservation) {
  return knex("reservation")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation);
}


/*
function deleteReservation(reservation_id) {
    return knex("reservation").where({ reservation_id }).del();
  }
  */

  module.exports = {
    create,
    //list,
    listReservationById,
    listReservationByMobileNumber,
    listReservationByDate,
    updateReservation,
    //deleteReservation,
  };