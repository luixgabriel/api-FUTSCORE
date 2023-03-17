
import { Router } from 'express';
import PlayerController from '../controllers/PlayerController.js';
const routes = new Router();

routes.post('/', PlayerController.create)
routes.get('/showPlayers', PlayerController.showPlayers)
routes.get('/selectedPlayer/:id', PlayerController.searchPlayerById)
routes.put('/updatePlayer/:id', PlayerController.edit)
routes.delete('/deletePlayer/:id', PlayerController.delete)

export default routes;