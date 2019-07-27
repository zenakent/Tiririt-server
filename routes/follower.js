const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams allows access to ID of the router

const { addFollower, removeFollower } = require("../handlers/follower");

router.route("/addFollower/:currentUserId").post(addFollower);

router.route("/removeFollower/:followerId").delete(removeFollower);

module.exports = router;
