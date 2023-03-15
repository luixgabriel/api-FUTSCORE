/* eslint-disable import/extensions */
import { Router } from 'express';
import PlayerController from '../controllers/PlayerController.js';
const routes = new Router();

// routes.get('/', teamsController.index);
// routes.get('/show/:id', teamsController.searchTeam);
// routes.post('/create', teamsController.createTeam);
// routes.put('/update/:id', teamsController.updateTeam);
// routes.delete('/delete/:id', teamsController.deleteTeam);

routes.post('/', PlayerController.create)
routes.get('/selectedPlayer/:id', PlayerController.searchPlayerById)

export default routes;