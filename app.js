require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./Project/swagger/swagger.json');

const userRoutes = require('./Project/routes/userRoutes');
const playlistRoutes = require('./Project/routes/playlistRoutes');
const trackRoutes = require('./Project/routes/trackRoutes');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/users', userRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/tracks', trackRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(3000, () => console.log('Server running')))
  .catch(err => console.error(err));

