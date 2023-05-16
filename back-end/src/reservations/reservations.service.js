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
  return knex("reservations").select("*").where({ reservation_id });
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
    return knex("reservations").select("*").where({ reservation_date:date }).whereNot({status: "finished"}).andWhereNot({status:"cancelled"}).orderBy('reservation_time','asc');
    
    
}

function updateReservation(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation);
}


/*
function deleteReservation(reservation_id) {
    return knex("reservations").where({ reservation_id }).del();
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