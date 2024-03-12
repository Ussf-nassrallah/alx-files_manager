// Controllers
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

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

  app.post('/files', tokenAuth, (req, res) => FilesController.postUpload(req, res));
  app.get('/files/:id', tokenAuth, (req, res) => FilesController.getShow(req, res));
  app.get('/files', tokenAuth, (req, res) => FilesController.getIndex(req, res));
};

export default configureRoutes;
