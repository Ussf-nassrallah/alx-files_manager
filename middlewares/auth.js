import { getUserFromAuth, getUserByToken } from '../utils/helper';

export const basicAuth = async (req, res, next) => {
  try {
    const user = await getUserFromAuth(req);

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`Error in basicAuth: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const tokenAuth = async (req, res, next) => {
  try {
    const user = await getUserByToken(req);
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in tokenAuth: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
