/* eslint-disable class-methods-use-this */
import Teams from "../models/Teams.js";

class TeamsController {
  async index(req, res) {
    res.json({players: []});
  }

  async createTeam(req,res) {
    const {name, players, shield, slogan} = req.body
    const team = await Teams.create(name, players, shield, slogan)
    res.json(team)
  }
}

export default new TeamsController();
