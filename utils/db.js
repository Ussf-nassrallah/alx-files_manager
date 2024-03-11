/* MongoDB utils */
import mongodb from 'mongodb';
// require('dotenv').config();

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;
    // Create a new instance of MongoClient with the provided connection URL
    this.client = new mongodb.MongoClient(url, { useUnifiedTopology: true });
    // Establish a connection to the MongoDB server
    this.client.connect();
  }

  isAlive() {
    // returns true when the connection to MongoDB is a success otherwise, false
    return this.client.isConnected();
  }

  async nbUsers() {
    // returns the number of documents in the collection users.
    return this.client.db().collection('users').countDocuments();
  }

  async nbFiles() {
    // returns the number of documents in the collection files.
    return this.client.db().collection('files').countDocuments();
  }

  async getUsersCollection() {
    // get users collection from DB
    return this.client.db().collection('users');
  }

  async getFilesCollection() {
    // get files collection from DB
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
