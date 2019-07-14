const db = require("../models");

//get followers

//add followers
exports.addFollower = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    //check if user is already follower the foundUser
    if (!foundUser.followers.includes(req.params.followerId)) {
      foundUser.followers.push(req.params.followerId);
      await foundUser.save();
      //if not save user in follower of foundUser
      return res.status(200).json(foundUser);
    } else {
      //if user is already follower return error
      return next({ status: 400, message: "Already a follower" });
    }
  } catch (error) {
    return next(error);
  }
};

// remove follower
exports.removeFollower = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    //find if the follower is follower foundUser
    if (foundUser.followers.includes(req.params.followerId)) {
      //if found, remove the follower in the foundUser follower array
      foundUser.followers.remove(req.params.followerId);
      await foundUser.save();
      return res.status(200).json(foundUser);
    } else {
      return next({ status: 400, message: "Not A Follower" });
    }
  } catch (error) {}
};
