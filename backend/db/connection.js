// const { MongoClient } = require('mongodb');

// let dbConnection;

// const connectToDb = (mongoURI, cb) => {
//   MongoClient.connect(mongoURI)
//     .then((client) => {
//       dbConnection = client.db();
//       console.log('Connected to the database');
//       return cb();
//     })
//     .catch((err) => {
//       console.error('Error connecting to the database:', err);
//       return cb(err);
//     });
// };

// const getDb = () => dbConnection;

// module.exports = { connectToDb, getDb };

const mongoose = require('mongoose');

let dbConnection;

const connectToDb = (mongoURI, cb) => {
  mongoose.connect(mongoURI, { })
    .then(() => {
      dbConnection = mongoose.connection;
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

