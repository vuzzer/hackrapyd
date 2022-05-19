const mongodb = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.NODE_ENV ==='production' ? process.env.MONGO_URL : 'mongodb://localhost:27017/');
  database = client.db('online-shop');
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