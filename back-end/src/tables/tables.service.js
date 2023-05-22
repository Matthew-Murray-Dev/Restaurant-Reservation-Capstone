const knex = require("../db/connection");

function create(newTable) {
  return knex("tables").insert(newTable).returning("*");
}

function list() {
  return knex("tables").select("*").orderBy("table_name", "asc");
}

function listTableById(table_id) {
  return knex("tables").select("*").where({ table_id });
}
//User Story 5

/*function updateTable(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable);
}*/

//User Story 6
async function updateTable(updatedTable, updatedReservation) {
  return await knex.transaction(async (trx) => {
    const table = await trx("tables")
      .select("*")
      .where({ table_id: updatedTable.table_id })
      .update(updatedTable);

    await trx("reservations")
      .select("*")
      .where({ reservation_id: updatedTable.reservation_id })
      .update(updatedReservation);

    return table;
  });
}

async function deleteTableSeating(table_id, reservation_id) {
  return await knex.transaction(async (trx) => {
    const updatedTable = await trx("tables")
      .select("reservation_id")
      .where({ table_id })
      .update({"reservation_id":null});
    await trx("reservations")
      .where({ reservation_id })
      .update({ status: "finished" });

    return updatedTable;
  });
}

module.exports = {
  create,
  list,
  listTableById,
  updateTable,
  deleteTableSeating,
};
