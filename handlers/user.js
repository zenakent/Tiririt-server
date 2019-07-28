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

exports.searchUsers = async function(req, res, next) {
  try {
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      let foundUsers = await db.User.find().or([
        { username: regex },
        { email: regex }
      ]);
      if (foundUsers.length <= 0) {
        return next({
          status: 400,
          message: "No Users by that Username/Email"
        });
      }
      return res.status(200).json(foundUsers);
    }
  } catch (error) {
    return next(error);
  }
};

//function for protection from regex attacks
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
