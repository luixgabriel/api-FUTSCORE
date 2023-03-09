/* eslint-disable import/extensions */
import { Router } from 'express';
import homeController from '../controllers/HomeController.js';
import teamsController from '../controllers/TeamsController.js';
const routes = new Router();

routes.get('/', teamsController.index);

export default routes;
