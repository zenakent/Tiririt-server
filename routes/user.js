const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams allows access to ID of the router

const { getUser } = require("../handlers/user");

router.route("/:userId").get(getUser);

module.exports = router;
