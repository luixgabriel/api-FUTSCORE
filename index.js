/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import bodyParser from 'body-parser';

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// const router = new Router();
// console.log(router);
import routes from './routes/routes.js';


dotenv.config();


const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGOURL).then(() => {
  console.log('conectado ao banco');
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', routes);

app.listen(process.env.PORT || 8000, () => {
  console.log('Servidor rodando');
});
