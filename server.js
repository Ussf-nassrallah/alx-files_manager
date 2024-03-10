/* First API */
import express from 'express';
import configureRoutes from './routes';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
