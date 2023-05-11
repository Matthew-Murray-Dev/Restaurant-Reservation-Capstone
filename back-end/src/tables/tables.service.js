const knex = require("../db/connection");

function create(newTable) {
    return knex("tables").insert(newTable).returning("*");
  }


function list() {
  return knex("tables").select("*").sortBy('table_name','asc');;
}


function listTableById(table_id) {
    return knex("tables").select("*").where({ table_id });
  }

  function updateTable(updatedTable) {
    return knex("table")
      .select("*")
      .where({ table_id: table.table_id })
      .update(updatedTable);
  }

  module.exports = {
    create,
    list,
    listTableById,
    updateTable}