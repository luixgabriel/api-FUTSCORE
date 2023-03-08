/* eslint-disable import/extensions */
import { Router } from 'express';
import homeController from '../controllers/HomeController.js';

const routes = new Router();

routes.get('/', homeController.index);

export default routes;
