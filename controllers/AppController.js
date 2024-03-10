import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  static async getStats(req, res) {
    try {
      const [countUsers, countFiles] = await Promise.all([dbClient.nbUsers(), dbClient.nbFiles()]);
      res.status(200).json({
        users: countUsers,
        files: countFiles,
      });
    } catch (error) {
      console.log(`Error in getStats: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
