/* eslint-disable import/extensions */
import { Router } from 'express';
import homeController from '../controllers/HomeController.js';
import teamsController from '../controllers/TeamsController.js';
const routes = new Router();

routes.get('/', teamsController.showTeams);
routes.get('/show/:id', teamsController.searchTeam);
routes.post('/create', teamsController.createTeam);
routes.put('/update/:id', teamsController.updateTeam);
routes.delete('/delete/:id', teamsController.deleteTeam);

export default routes;
