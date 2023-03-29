const { mongoose, configs } = require("../helper/imports");

async function dbConnection() {
  try {
    //start using your models immediately, without waiting for mongoose to establish a connection to MongoDB.
    await mongoose.connect(configs.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("Database connection error", error);
  }
}
module.exports = dbConnection;
