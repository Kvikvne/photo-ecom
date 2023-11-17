const { MongoClient } = require('mongodb');

let dbConnection;

const connectToDb = (mongoURI, cb) => {
  MongoClient.connect(mongoURI)
    .then((client) => {
      dbConnection = client.db();
      console.log('Connected to the database');
      return cb();
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err);
      return cb(err);
    });
};

const getDb = () => dbConnection;

module.exports = { connectToDb, getDb };
