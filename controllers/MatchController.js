import Teams from "../models/Teams.js";
/* eslint-disable class-methods-use-this */
class MatchController {
  async index(req, res) {
    res.send('APP EXPRESS! - Guia do programador');
  }

  async createMatch(req,res){
    const { name } = req.body
    res.json(name)
    // const teams = await Teams.searchTeamByName(name)
    // res.json(teams)
  }
}

export default new MatchController();
