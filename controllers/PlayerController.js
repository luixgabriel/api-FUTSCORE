import Players from "../models/Players.js";
import Teams from "../models/Teams.js";
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

  async edit(req,res){
    const id = req.params.id;
    const {name, team, numberTshirt} = req.body;
    const PlayerBD = await Players.serchPlayerById(id)

    if(!PlayerBD){
        return res.json({msg: 'Esse jogador não existe na base de dados'})
    }

    const TeamBD = await Teams.searchTeamByName(team);

    if(!TeamBD){
      return res.json({msg: 'Esse time não existe na base de dados'});
    }

    const teamNumbers = TeamBD.selectedNumbers;
    // console.log(teamNumbers)
    // console.log(numberTshirt)
    const numberExists = teamNumbers.find(tshirt => tshirt === numberTshirt);
  
    if(numberExists){
      return res.json({msg: 'Já possui um jogador com esse numero de camisa no time'})
  }

 
    const PlayerAtt = await Players.updatePlayer(PlayerBD, name, TeamBD, numberTshirt, PlayerBD.numberTshirt, PlayerBD.team);

    res.json(PlayerAtt)
    

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
