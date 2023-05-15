const knex = require("../db/connection");

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

function list() {
  return knex("tables").select("*").sortBy("table_name", "asc");
}

function listTableById(table_id) {
  return knex("tables").select("*").where({ table_id });
}

function updateTable(updatedTable, updatedReservation) {
  return knex.transaction(function (trx) {
    trx("table")
      .select("*")
      .where({ table_id: updatedTable.table_id })
      .update(updatedTable)
      .then(
         trx("reservation")
          .select("*")
          .where({ reservation_id: updatedTable.reservation_id })
          .update(updatedReservation)
      )
      .then(trx.commit)
      .catch(trx.rollback);
  });
}
//{}
 // .catch(function(error){console.error(error)})
/*knex("table")
  .select("*")
  .where({ table_id: updatedTable.table_id })
  .update(updatedTable)
  .then();
return knex("table")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable);
*/
/*


    return knex("reservation").select("*").where({reservation_id: updatedTable.reservation_id}).update(updatedReservation)
    */

function deleteTableSeating(table_id) {
  return knex("table")
    .select("reservation_id")
    .where({ table_id })
    .del();
}

module.exports = {
  create,
  list,
  listTableById,
  updateTable,
  deleteTableSeating,
};
