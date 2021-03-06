const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams allows access to ID of the router

const {
  getUser,
  searchUsers,
  getFollowers,
  getFollowing,
  get3RandomUsers
} = require("../handlers/user");

router.route("/searchUsers").get(searchUsers);
router.route("/get3RandomUsers").get(get3RandomUsers);
router.route("/:userId").get(getUser);
router.route("/:userId/followers").get(getFollowers);
router.route("/:userId/following").get(getFollowing);

//function for protection from regex attacks
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
