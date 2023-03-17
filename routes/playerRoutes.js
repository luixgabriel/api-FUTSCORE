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
routes.get('/showPlayers', PlayerController.showPlayers)
routes.get('/selectedPlayer/:id', PlayerController.searchPlayerById)
routes.put('/updatePlayer/:id', PlayerController.edit)
routes.delete('/deletePlayer/:id', PlayerController.delete)

export default routes;