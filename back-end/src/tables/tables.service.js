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

/*function updateTable(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable);
}*/

//fix this for userStory 5/6
async function updateTable(updatedTable, updatedReservation) {
  return await knex.transaction(async trx=>{

    const table = await trx('tables').select("*")
      .where({ table_id: updatedTable.table_id })
      .update(updatedTable);

       await trx('reservations').select("*")
          .where({ reservation_id: updatedTable.reservation_id })
          .update(updatedReservation)

          return table
  }
)
}

  
  


// .catch(function(error){console.error(error)})
/*knex("tables")
  .select("*")
  .where({ table_id: updatedTable.table_id })
  .update(updatedTable)
  .then();
return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable);
*/
/*


    return knex("reservation").select("*").where({reservation_id: updatedTable.reservation_id}).update(updatedReservation)
    */

async function deleteTableSeating(table_id, reservation_id) {
  return await knex.transaction(async (trx) => {
    const updatedTable = await trx("tables")
      .select("reservation_id")
      .where({ table_id })
      .del();
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
