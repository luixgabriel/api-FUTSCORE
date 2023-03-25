import Teams from "../models/Teams.js";
import Match from "../models/Match.js";
import Player from '../models/Players.js'
/* eslint-disable class-methods-use-this */
class MatchController {
  async finishedMatches(req, res) {
    res.send('APP EXPRESS! - Guia do programador');
  }

  async createMatch(req,res){
    const { name, duration, times } = req.body;
    const teams = [name[0], name[1]];
    

    const t1 = await Teams.searchTeamByName(teams[0]);
    const t2 = await Teams.searchTeamByName(teams[1]);
    
    if(!t1 && !t2){
      return res.json({msg: 'Os times não estão cadastrados na base de dados.'});
    }

    if(!t1){
      return res.json({msg: `O ${teams[0]} não está cadastrado na base de dados.`});
    }

    if(!t2){
      return res.json({msg: `O ${teams[1]} não está cadastrado na base de dados.`});
    }

    const match = await Match.create(duration, times, teams[0], teams[1]);
    res.json(match);
  
  }

  async matchEvents(req,res){
    const id = req.params.id;
    if(id.length !== 24){
      return res.json({msg: 'Essa partida não existe.'})
    }
    const {team, goals, assists} = req.body;
   
    const match = await Match.searchMatch(id);
    const teamBD = await Teams.searchTeamByName(team);
    const playerGoal = await Player.serchPlayerByName(goals);
    
    if(!match){
      return res.json({msg: 'Essa partida não existe.'});
    }

    if(!teamBD){
      return res.json({msg: 'Esse time não está na base de dados.'});
    }

    if(!playerGoal){
      return res.json({msg: 'O jogador que fez o gol não está na base de dados.'});
    }

    
    if(playerGoal.team !== teamBD.name){
      return res.json({msg: 'Esse jogador não faz parte desse time'});
    }

    if(assists){
      const playerAssist = await Player.serchPlayerByName(assists)
        if(!playerAssist){
          return res.json({msg: 'O jogador que deu a assistência não está na base de dados'});
        }

        if(playerAssist.team !== teamBD.name){
          return res.json({msg: 'Esse jogador não faz parte desse time'});
        }

        const matchCurrent = await Match.matchEvents(match, teamBD, playerGoal, playerAssist);
        return res.json(matchCurrent);
    }
    

    const matchCurrent = await Match.matchEvents( match, teamBD, playerGoal);
    return res.json(matchCurrent);
    
  }

  async resultMatch(req,res){
    const id = req.params.id;
    if(id.length !== 24){
      return res.json({msg: 'Essa partida não existe.'});
    }
    const {winner, defeated, draw} = req.body
    const result = await Match.matchResult(id, winner, defeated, draw);
    res.json(result);
  }

  async searchMatch(req,res){
    const id = req.params.id;
    if(id.length !== 24){
      return res.json({msg: 'Essa partida não existe.'});
    }
    const match = await Match.searchMatch(id);
    res.json(match);
  }
}

export default new MatchController();
