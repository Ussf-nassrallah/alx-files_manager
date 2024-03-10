/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    try {
      // get user info
      const userEmail = req.body ? req.body.email : null;
      const userPassword = req.body ? req.body.password : null;

      // checks if user missing he's email
      if (!userEmail) {
        res.status(400).json({ error: 'Missing email' });
        return;
      }

      // checks if user missing he's password
      if (!userPassword) {
        res.status(400).json({ error: 'Missing password' });
      }

      // checks if the user already exists in database
      const user = await (await dbClient.getUsersCollection()).findOne({ email: userEmail });

      if (user) {
        res.status(400).json({ error: 'Already exist' });
        return;
      }

      // insert user info into database
      const newUser = await (await dbClient.getUsersCollection()).insertOne({
        email: userEmail,
        password: sha1(userPassword),
      });

      // send user info
      const newUserId = newUser.insertedId.toString();
      res.status(201).json({ email: userEmail, id: newUserId });
    } catch (error) {
      console.error(`Error in postNew -> ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
