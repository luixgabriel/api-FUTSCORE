import Players from "../models/Players.js";
import Teams from "../models/Teams.js";
/* eslint-disable class-methods-use-this */
class PlayerController {
  async showPlayers(req, res) {
    const players = await Players.getplayers();
    res.status(200).json(players);
  }

  async create(req,res){
    const {name, team, numberTshirt} = req.body;
    if(!name || !team || !numberTshirt){
      return res.status(400).json({msg: 'Erro ao enviar os dados, preencha o cadastro completo.'})
    }

    const teamBD = await Teams.searchTeamByName(team);
    if(!teamBD){
      return res.status(400).json({msg: 'Esse time não existe na base de dados.'})
    }

    const player = await Players.createPlayer(name,teamBD,numberTshirt)
    res.status(200).json(player)
  }

  async edit(req,res){
    const id = req.params.id;
      if(id.length !== 24){
        return res.status(400).json({msg: 'Jogador não encontrado na base de dados'});
      }
    const {name, team, numberTshirt} = req.body;
    const playerBD = await Players.serchPlayerById(id)
    
      if(!team){
        const playerAtt = await Players.updatePlayer(u)
      }
      if(!playerBD){
          return res.status(400).json({msg: 'Esse jogador não existe na base de dados'});
      }

    const teamBD = await Teams.searchTeamByName(team);

    if(!teamBD){
      return res.status(400).json({msg: 'Esse time não existe na base de dados'});
    }

    const teamNumbers = teamBD.selectedNumbers;
    const numberExists = teamNumbers.find(tshirt => tshirt === numberTshirt);
  
    if(numberExists){
      return res.status(400).json({msg: 'Já possui um jogador com esse numero de camisa no time'});
    }

    const playerAtt = await Players.updatePlayer(playerBD, name, teamBD, numberTshirt, playerBD.numberTshirt, playerBD.team);
    res.status(200).json(playerAtt);
    
  }

  async delete(req,res){
    const id = req.params.id;
    if(id.length !== 24){
      return res.status(400).json('Jogador não encontrado na base de dados');
    }
    const msg = await Players.deletePlayer(id);
    res.status(200).json(msg);
  }

  async searchPlayerByName(req,res){
    const {player} = req.body
    const playerBD = await Players.serchPlayerByName(player)
    res.status(200).json(playerBD)
  }

  async searchPlayerById(req,res){
    const id = req.params.id;
    const player = await Players.serchPlayerById(id);
    res.status(200).json(player)

  }
}

export default new PlayerController();
