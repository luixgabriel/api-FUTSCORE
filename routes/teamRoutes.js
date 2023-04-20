import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer.js';
import teamsController from '../controllers/TeamsController.js';
const routes = new Router();

const upload = multer(multerConfig);

routes.get('/', teamsController.showTeams);
routes.get('/show/:id', teamsController.searchTeam);
routes.post('/create', upload.single('shield'), teamsController.createTeam);
routes.put('/update/:id', teamsController.updateTeam);
routes.delete('/delete/:id', teamsController.deleteTeam);
//ROUTE ESPECIF FOR FUTSCORE
routes.put('/update', teamsController.updateTeamMatches)

export default routes;
