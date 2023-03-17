import Players from "../models/Players.js";
import Teams from "../models/Teams.js";
/* eslint-disable class-methods-use-this */
class PlayerController {
  async showPlayers(req, res) {
    const players = await Players.getplayers();
    res.json(players);
  }

  async create(req,res){
    const {name, team, numberTshirt} = req.body;
    if(!name || !team || !numberTshirt){
      return res.json({msg: 'Erro ao enviar os dados, preencha o cadastro completo.'})
    }
    const player = await Players.createPlayer(name,team,numberTshirt)
    res.json(player)
  }

  async edit(req,res){
    const id = req.params.id;
    const {name, team, numberTshirt} = req.body;
    const playerBD = await Players.serchPlayerById(id)

    if(!playerBD){
        return res.json({msg: 'Esse jogador não existe na base de dados'})
    }

    const teamBD = await Teams.searchTeamByName(team);

    if(!teamBD){
      return res.json({msg: 'Esse time não existe na base de dados'});
    }

    const teamNumbers = teamBD.selectedNumbers;
    const numberExists = teamNumbers.find(tshirt => tshirt === numberTshirt);
  
    if(numberExists){
      return res.json({msg: 'Já possui um jogador com esse numero de camisa no time'})
    }

 
    const playerAtt = await Players.updatePlayer(PlayerBD, name, TeamBD, numberTshirt, PlayerBD.numberTshirt, PlayerBD.team);

    res.json(playerAtt);
    

  }

  async delete(req,res){
    const id = req.params.id;
    const msg = await Players.deletePlayer(id);
    res.json(msg);
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
