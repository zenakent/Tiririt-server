const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  timestamps: {
    type: Boolean,
    default: true
  }
});

messageSchema.pre("remove", async function(next) {
  try {
    //find a user
    let user = await User.findById(this.user);
    console.log(user);
    //remove the id of the message from their message list array
    user.messages.remove(this.id);
    //save that user
    await user.save();
    //return next
    return next();
  } catch (error) {
    return next(error);
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
