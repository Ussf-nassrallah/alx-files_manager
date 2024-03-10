// Controllers
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

// Middlewares
import { basicAuth, tokenAuth } from '../middlewares/auth';

// Routes
const configureRoutes = (app) => {
  app.get('/status', (req, res) => AppController.getStatus(req, res));
  app.get('/stats', (req, res) => AppController.getStats(req, res));
  app.post('/users', (req, res) => UsersController.postNew(req, res));

  app.get('/connect', basicAuth, (req, res) => AuthController.getConnect(req, res));
  app.get('/disconnect', tokenAuth, (req, res) => AuthController.getDisconnect(req, res));
  app.get('/users/me', tokenAuth, (req, res) => UsersController.getMe(req, res));
};

export default configureRoutes;
