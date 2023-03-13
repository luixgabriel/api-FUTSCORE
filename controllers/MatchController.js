import Teams from "../models/Teams.js";
import Match from "../models/Match.js";
/* eslint-disable class-methods-use-this */
class MatchController {
  async index(req, res) {
    res.send('APP EXPRESS! - Guia do programador');
  }

  async createMatch(req,res){
    const { name, duration, times } = req.body
    const names = ['Barcelona']
    names.push(name)
    const teams = {
      team1: names[0],
      team2: names[1]
    }
   
    const match = await Match.create(duration, times, teams)
    res.json(match)
  
  }

  async resultMatch(req,res){
    const id = req.params.id
    const {winner, defeated, draw, scoreboard} = req.body
    let scoreboardTeste = [2]
    scoreboardTeste.push(scoreboard)
    const result = await Match.matchResult(id, winner, defeated, draw, scoreboardTeste)
    res.json(result)
  }

  async searchMatch(req,res){
    const id = req.params.id
    const match = await Match.searchMatch(id)
    res.json(match)
  }
}

export default new MatchController();
