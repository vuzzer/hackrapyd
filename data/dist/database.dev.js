"use strict";

var mongodb = require('mongodb');

var dotenv = require('dotenv');

dotenv.config();
var MongoClient = mongodb.MongoClient;
var database;

function connectToDatabase() {
  var client;
  return regeneratorRuntime.async(function connectToDatabase$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(MongoClient.connect(process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/'));

        case 2:
          client = _context.sent;
          database = client.db('online-shop');

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getDb() {
  if (!database) {
    throw new Error('You must connect first!');
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
};