/* eslint-disable class-methods-use-this */
import Teams from "../models/Teams.js";

class TeamsController {
  async index(req, res) {
    const teams = await Teams.getTeams()
    res.json(teams)
  }

  async createTeam(req,res) {
    const {name, players, shield, slogan} = req.body
    const team = await Teams.create(name, players, shield, slogan)
    if(team.error){
      return res.json(team.msg)
    }
    res.json(team)
  }

  async updateTeam(req,res){
    const id = req.params.id
    const {name, players, shield, slogan} = req.body
    const teste = await Teams.updateTeam(id,name,players,shield,slogan)
    res.json(teste)

  }

}

export default new TeamsController();
