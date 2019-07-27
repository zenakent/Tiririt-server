const db = require("../models");

//get following

//add following
exports.addFollowing = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.foundUserId);
    let currentUser = await db.User.findById(req.params.currentUserId);
    //check if user is already following the foundUser
    if (!currentUser.following.includes(req.params.foundUserId)) {
      currentUser.following.push(req.params.foundUserId);
      foundUser.followers.push(req.params.currentUserId);
      await currentUser.save();
      await foundUser.save();
      //if not save user in following of foundUser
      return res.status(200).json(currentUser);
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
    let foundUser = await db.User.findById(req.params.foundUserId);
    let currentUser = await db.User.findById(req.params.currentUserId);
    console.log(currentUser);
    console.log(foundUser);
    //find if the currentUser is following foundUser
    if (currentUser.following.includes(req.params.foundUserId)) {
      //if found, remove the currentUser in the foundUser following array
      currentUser.following.remove(req.params.foundUserId);
      foundUser.followers.remove(req.params.currentUserId);
      await foundUser.save();
      await currentUser.save();
      return res.status(200).json(currentUser);
    } else {
      return next({ status: 400, message: "Not Following" });
    }
  } catch (error) {}
};
