const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams allows access to ID of the router

const { getUser, searchUsers } = require("../handlers/user");

router.route("/searchUsers").get(searchUsers);
router.route("/:userId").get(getUser);

//function for protection from regex attacks
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
