const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams allows access to ID of the router

const {
  createMessage,
  getMessage,
  deleteMessage
} = require("../handlers/messages");

//prefix this with /api/users/:id/messages
//router.route to make sure to make all routes start with '/'
router.route("/").post(createMessage);

//prefix this with /api/users/:id/messages/:messaged_id
router
  .route("/:message_id")
  .get(getMessage)
  .delete(deleteMessage);

module.exports = router;
