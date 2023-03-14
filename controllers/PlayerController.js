import Players from "../models/Players.js";
/* eslint-disable class-methods-use-this */
class PlayerController {
  async index(req, res) {
    res.json('oi')
  }

  async create(req,res){
    const {name, team, numberTshirt} = req.body
    const player = await Players.createPlayer(name,team,numberTshirt)
    res.json(player)
  }

  async searchPlayer(req,res){
    const {player} = req.body
    const playerBD = await Players.serchPlayerByName(player)
    res.json(playerBD)
  }
}

export default new PlayerController();
