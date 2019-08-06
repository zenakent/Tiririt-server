const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

//connect to local DB
// mongoose.connect("mongodb://localhost:27017/twitter-clone", {
//   keepAlive: true,
//   useNewUrlParser: true
// });

//connect to CLOUD db
// mongoose.connect(
//   "mongodb+srv://maui:1234@cluster0-uaukw.mongodb.net/test?retryWrites=true&w=majority",
//   { dbName: "twitter-clone", useNewUrlParser: true }
// );

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${
    process.env.MONGO_ATLAS_PASS
  }@cluster0-uaukw.mongodb.net/test?retryWrites=true&w=majority`,
  { dbName: "twitter-clone", useNewUrlParser: true }
);

module.exports.User = require("./user");
module.exports.Message = require("./message");
