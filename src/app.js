const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/user', require('./routes/user'));
app.use('/api/event', require('./routes/event'));
app.use('/api/coordinate', require('./routes/coordinate')); // cambios
app.use('/api/findbytext', require('./routes/findbytext')); // Busqueda por texto


module.exports = app;