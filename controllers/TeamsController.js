/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import Teams from "../models/Teams.js";
import { extname } from 'path';

dotenv.config();


class TeamsController {
  async showTeams(req, res) {
    const teams = await Teams.getTeams()
    res.status(200).json(teams)
  }

  async createTeam(req,res) {
    const url = 'https://apiintersala-production.up.railway.app/';
    if(!req.file){
      const {name, players, slogan} = req.body
      const shield = 'null';
      const team = await Teams.create(name, players,shield, slogan);
      return res.status(200).json(team);
    }

    const shield = url + req.file.filename;
    if(extname(shield) !== '.png'){
      return res.status(400).json({msg: 'A imagem precisa ser no formato png.'});
    }
    const {name, players, slogan} = req.body
    const team = await Teams.create(name, players, shield, slogan);

    if(team.error){
      return res.status(404).json(team.msg);
    };
    
    return res.status(200).json(team);
  }

  async updateTeam(req,res){
    const id = req.params.id;
    const {name, players, shield, slogan} = req.body;

    if(id.length !== 24){
      return res.status(404).json({msg:'Time não encontrado na base de dados.'})
    }

    const team = await Teams.searchTeam(id);
    if(!team){
      return res.status(404).json(team.msg)
    }
    
    const teamUp = await Teams.updateTeam(id, name, players, shield, slogan)
    res.status(200).json(teamUp)
   
  }

  async deleteTeam(req,res){
    const id = req.params.id;
      if(id.length !== 24){
        return res.status(404).json('Time não encontrado na base de dados')
      }
    const team = await Teams.deleteTeam(id)
      if(!team){
        return res.status(404).json('Time não encontrado na base de dados')
      }
      return res.status(200).json('Time deletado com sucesso');
  }

  async searchTeam (req,res){
    const id = req.params.id;
      if(id.length !== 24){
        return res.status(404).json('Time não encontrado na base de dados');
      }
    const team = await Teams.searchTeam(id);
     res.status(200).json(team);
  }


}

export default new TeamsController();
