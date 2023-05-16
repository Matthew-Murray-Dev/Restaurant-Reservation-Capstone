/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router.route("/:reservation_id/status").put(controller.updateStatus).all(methodNotAllowed)

router.route("/:reservation_id").get(controller.listReservationById).put(controller.updateReservation).all(methodNotAllowed);

router.route("/").get(controller.listReservationByQuery).post(controller.create).all(methodNotAllowed)

module.exports = router;
