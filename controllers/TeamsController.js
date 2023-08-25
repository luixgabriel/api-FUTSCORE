/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import Teams from "../models/Teams.js";
import { extname } from 'path';

dotenv.config();


class TeamsController {
  async showTeams(req, res) {
    const teams = await Teams.getTeams()
    res.json(teams)
  }

  async createTeam(req,res) {
    
    const url = 'https://futscore.onrender.com/';
    // const url = 'http://localhost:8686/';
    console.log('teste')
    if(!req.file){
      const {name, players, slogan} = req.body
      const shield = 'null';
      const team = await Teams.create(name, players,shield, slogan);
      return res.json(team);
    }

    const shield = url + req.file.filename;
    console.log(shield);
    if(extname(shield) !== '.png'){
      return res.json({msg: 'A imagem precisa ser no formato png.'});
    }
    const {name, players, slogan} = req.body
    const team = await Teams.create(name, players, shield, slogan);

    if(team.error){
      return res.json(team.msg);
    };
    
    return res.json(team);
  }

  async updateTeam(req,res){
    const id = req.params.id;
    const {name, players, shield, slogan} = req.body;

    if(id.length !== 24){
      return res.json({msg:'Time não encontrado na base de dados.'})
    }

    const team = await Teams.searchTeam(id);
    if(!team){
      return res.json(team.msg)
    }
    
    const teamUp = await Teams.updateTeam(id, name, players, shield, slogan)
    res.json(teamUp)
   
  }

  async deleteTeam(req,res){
    const id = req.params.id;
      if(id.length !== 24){
        return res.json('Time não encontrado na base de dados')
      }
    const team = await Teams.deleteTeam(id)
      if(!team){
        return res.json('Time não encontrado na base de dados')
      }
      return res.json('Time deletado com sucesso');
  }

  async searchTeam (req,res){
    const id = req.params.id;
      if(id.length !== 24){
        return res.json('Time não encontrado na base de dados');
      }
    const team = await Teams.searchTeam(id);
     res.json(team);
  }


  //ROUTE SPECIFIC FOR FUTSCORE
  async updateTeamMatches (req,res){
    const {winner, defeated, draw} = req.body;
    const result = await Teams.updateTeamsMatches(winner, defeated, draw);
    res.json(result)
  }


}

export default new TeamsController();
