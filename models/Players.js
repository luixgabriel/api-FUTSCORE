import mongoose from "mongoose";
import Team from '../models/Teams.js'

const playersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    team: {type: String, required: true},
    goals: {type: Number, required: true, default: 0},
    assists: {type: Number, required: true, default: 0},
    numberTshirt: {type: Number, required: true},
})

const playersModel = mongoose.model('Players', playersSchema)


//Service
class Players {

    async createPlayer(name,team,numberTshirt){
      let tshirtDuplicate = false

      const TeamBD = await Team.searchTeamByName(team)
      if(!TeamBD){
        return {status: false, msg: 'Esse time não existe na base de dados'}
      }

      if(TeamBD.players <= TeamBD.selectedNumbers.length ){
        console.log('parou')
        return {msg: 'O time já está com todos os jogadores selecionados'}
      }

      TeamBD.selectedNumbers.forEach(element => {
        if(element === numberTshirt){
          tshirtDuplicate = true
          return tshirtDuplicate
        }
      });

      if(tshirtDuplicate){
        return {msg: 'Já possui um jogador com esse numero de camisa no time'}
      }

      await Team.updateTeam(TeamBD.id, '','','','', numberTshirt);

      const Player = await playersModel.create({name: name, team: team, numberTshirt: numberTshirt});
      return Player

    }

    async updatePlayer(player, name, team, tshirt){
      const attPlayer = await playersModel.findByIdAndUpdate(player.id, {name: name, team: team, numberTshirt: tshirt }, {new: true})
      return attPlayer
    }

    async deletePlayer(id){
      const Player = await playersModel.findById(id)
      if(!Player){
        return {msg: 'Jogador não existe na base de dados'}
      }
      const tshirt = Player.numberTshirt;
      if(!tshirt){
        return {msg: 'Jogador não existe na base de dados'}
      }
      const TeamBD = await Team.searchTeamByName(Player.team)
      let arr = TeamBD.selectedNumbers;
      arr.splice(arr.indexOf(tshirt), 1);
      await Team.removeTshirt(TeamBD.id, arr);
      await playersModel.findByIdAndDelete(id)
      
      return {msg: 'Jogador deletado com sucesso'};
     
    }

    async serchPlayerById(id){
      try {
        const Player = await playersModel.findById(id)
        return Player;
      } catch (error) {
        console.log(error)
        return {msg: 'Esse jogador não existe na base de dados'}
      }
    }

    async serchPlayerByName(name){
      try {
        const Player = await playersModel.findOne({name: name});
        return Player;
      } catch (error) {
        console.log(error)
        return {msg: 'Esse jogador não existe na base de dados'}
      }
    }
    

    async playerEvents(playerGoal, playerAssist){
      
      try {
        const PlayerGoal = await playersModel.findById(playerGoal.id)
        await playersModel.updateOne({name: PlayerGoal.name}, {goals: PlayerGoal.goals + 1})

        if(playerAssist){
          const playerAssistbd = await playersModel.findById(playerAssist.id)
          await playersModel.updateOne({name: playerAssistbd.name}, {assists: playerAssistbd.assists + 1})
        }

      } catch (error) {
        console.log(error)
        return {msg: 'Erro desconhecido'}
      }
    }

    async validate(name,numberTshirt){

    }

  }

export default new Players()