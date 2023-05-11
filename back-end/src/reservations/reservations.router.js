/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");


router.route("?mobile_number=").get(controller.listReservationByMobileNumber).all(methodNotAllowed);
router.route("/:reservation_id/edit").get(controller.listReservationById).put(controller.updateReservation).all(methodNotAllowed);
router.route("/").get(controller.listReservationByDate).post(controller.create).all(methodNotAllowed)

module.exports = router;
