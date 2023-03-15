import Players from "../models/Players.js";
/* eslint-disable class-methods-use-this */
class PlayerController {
  async index(req, res) {
    res.json('oi')
  }

  async create(req,res){
    const {name, team, numberTshirt} = req.body;
    if(!name || !team || !numberTshirt){
      return res.json({msg: 'Erro ao enviar os dados, preencha o cadastro completo'})
    }
    const player = await Players.createPlayer(name,team,numberTshirt)
    res.json(player)
  }

  async delete(req,res){
    const id = req.params.id;
    const p = await Players.deletePlayer(id);
    res.json(p)
  }

  async searchPlayerByName(req,res){
    const {player} = req.body
    const playerBD = await Players.serchPlayerByName(player)
    res.json(playerBD)
  }

  async searchPlayerById(req,res){
    const id = req.params.id;
    const player = await Players.serchPlayerById(id);
    res.json(player)

  }
}

export default new PlayerController();
