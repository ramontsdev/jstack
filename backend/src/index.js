/* eslint-disable no-console */
const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/error-handler');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(cors);
app.use(router);
app.use(errorHandler);

app.listen(3001, () => console.log('Server started http://localhost:3001'));
