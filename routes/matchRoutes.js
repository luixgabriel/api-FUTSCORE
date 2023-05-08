/* eslint-disable import/extensions */
import { Router } from 'express';
import matchController from '../controllers/MatchController.js';
const routes = new Router();

routes.post('/', matchController.createMatch)
routes.put('/result/:id', matchController.resultMatch)
routes.get('/searchmatch/:id', matchController.searchMatch)
routes.get('/matches', matchController.getAll)
routes.put('/current/:id', matchController.matchEvents)
routes.delete('/deleteMatch/:id', matchController.deleteMatch)

export default routes;
