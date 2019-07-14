const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams allows access to ID of the router

const { addFollowing, removeFollowing } = require("../handlers/following");

router.route("/addFollowing/:followingId").post(addFollowing);

router.route("/removeFollowing/:followingId").delete(removeFollowing);

module.exports = router;
