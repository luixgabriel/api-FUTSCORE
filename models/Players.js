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

  }

export default new Players()