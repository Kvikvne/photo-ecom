const { MongoClient } = require("mongodb");

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect("mongodb://127.0.0.1:27017/photoWebsite")
      .then((client) => {
        dbConnection = client.db();
        console.log("Connected to the database");
        return cb();
      })
      .catch((err) => {
        console.error("Error connecting to the database:", err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
