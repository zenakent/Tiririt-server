const db = require("../models");

exports.getUser = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.userId)
      .select("-password")
      .populate("messages");

    return res.status(200).json(foundUser);
  } catch (error) {
    return next(error);
  }
};
