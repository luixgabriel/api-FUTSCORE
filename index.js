/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import bodyParser from 'body-parser';

import express from 'express';
import mongoose from 'mongoose';

// const router = new Router();
// console.log(router);
import routes from './routes/routes.js';

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://luixgabriel:ufcd2013@cluster0.z0hqd1i.mongodb.net/TEAMS').then(() => {
  console.log('conectado ao banco');
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', routes);

app.listen(8686, () => {
  console.log('Servidor rodando');
});
