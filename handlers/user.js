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

exports.getFollowing = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.userId)
      .select("-password")
      .populate("following");

    return res.status(200).json(foundUser);
  } catch (error) {
    return next(error);
  }
};

exports.getFollowers = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.userId)
      .select("-password")
      .populate("followers");

    return res.status(200).json(foundUser);
  } catch (error) {
    return next(error);
  }
};

exports.searchUsers = async function(req, res, next) {
  try {
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      let foundUsers = await db.User.find()
        .or([{ username: regex }, { email: regex }])
        .select("-password");
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

exports.get3RandomUsers = async function(req, res, next) {
  try {
    let foundUsers = await db.User.find().select("-password");
    let newArr = [];
    while (newArr.length <= 2) {
      var item = foundUsers[Math.floor(Math.random() * foundUsers.length)];
      if (!newArr.includes(item)) {
        newArr.push(item);
      }
    }
    return res.status(200).json(newArr);
  } catch (error) {
    return next(error);
  }
};

//function for protection from regex attacks
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
