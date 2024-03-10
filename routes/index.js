import AppController from '../controllers/AppController';

const configureRoutes = (app) => {
  app.get('/status', (req, res) => AppController.getStatus(req, res));
  app.get('/stats', (req, res) => AppController.getStats(req, res));
};

export default configureRoutes;
