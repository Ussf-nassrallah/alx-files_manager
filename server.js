/* First API */
import express from 'express';
const bodyParser = require('body-parser');
import configureRoutes from './routes';

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const PORT = process.env.PORT || 5000;

configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
