const db = require("../models");

//get following

//add following
exports.addFollowing = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    //check if user is already following the foundUser
    if (!foundUser.following.includes(req.params.followingId)) {
      foundUser.following.push(req.params.followingId);
      await foundUser.save();
      //if not save user in following of foundUser
      return res.status(200).json(foundUser);
    } else {
      //if user is already following return error
      return next({ status: 400, message: "Already following" });
    }
  } catch (error) {
    return next(error);
  }
};

//remove following
exports.removeFollowing = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    //find if the follower is following foundUser
    if (foundUser.following.includes(req.params.followingId)) {
      //if found, remove the follower in the foundUser following array
      foundUser.following.remove(req.params.followingId);
      await foundUser.save();
      return res.status(200).json(foundUser);
    } else {
      return next({ status: 400, message: "Not Following" });
    }
  } catch (error) {}
};
