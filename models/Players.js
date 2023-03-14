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
      const TeamBD = await Team.searchTeamByName(team)
      if(!TeamBD){
        return {status: false, msg: 'Esse time não existe na base de dados'}
      }
      const Player = await playersModel.create({name: name, team: team, numberTshirt: numberTshirt});
      return Player

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

  }

export default new Players()