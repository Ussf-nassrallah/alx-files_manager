/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(req, res) {
    try {
      // get user from req
      const { user } = req;
      // generate a token for our user
      const token = uuidv4();
      // store user id with hes token into redis
      await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
      // send token
      res.status(200).json({ token });
    } catch (error) {
      console.log(`Error in getConnect: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getDisconnect(req, res) {
    // get user token from headers
    const userToken = req.headers['x-token'];
    // delete user token from redis
    await redisClient.del(`auth_${userToken}`);
    // delete user token successfully
    // no additional content to send in the response payload
    res.status(204).send();
  }
}

export default AuthController;
